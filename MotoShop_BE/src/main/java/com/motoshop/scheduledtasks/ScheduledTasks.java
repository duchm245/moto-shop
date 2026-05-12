package com.motoshop.scheduledtasks;

import com.motoshop.models.*;
import com.motoshop.repositories.NotificationRepository;
import com.motoshop.repositories.ProductRepository;
import com.motoshop.repositories.SaleRepository;
import com.motoshop.services.NotificationService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.List;

@Component
@Slf4j
public class ScheduledTasks {

    @Autowired
    private SaleRepository saleRepository;
    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private NotificationRepository notificationRepository;

    @Autowired
    private NotificationService notificationService;

    public ScheduledTasks(SaleRepository saleRepository,
                            ProductRepository productRepository,
                          NotificationRepository notificationRepository,
                          NotificationService notificationService) {
        this.saleRepository = saleRepository;
        this.productRepository = productRepository;
        this.notificationRepository = notificationRepository;
        this.notificationService = notificationService;

    }

    @Scheduled(cron = "59 59 23 ? * * ")
    public void updateSaleStatus() {
        // Lấy thời gian hiện tại
        Date currentDate = new Date();
        // Lấy danh sách tất cả các Sale
        List<Sale> activeSales = saleRepository.findAll();
        // Kiểm tra và cập nhật trạng thái (isActive) của Sale
        for (Sale sale : activeSales) {
            if (sale.getEndDate().before(currentDate)) {
                sale.setIsActive(0);
                saleRepository.save(sale);
            }
        }
    }
     @Scheduled(cron = "0 30 20 ? * * ")
    public void scanProduct(){
        List<Product> products = productRepository.findAll();
        for(Product p: products){
            List<Variant> variants = p.getVariants();
            for(Variant variant: variants){
                if((variant.getStock() - variant.getSold()) <= 100){
                    Notification notification = new Notification();
                    notification.setIsRead(false);
                    notification.setDeliverStatus(false);
                    notification.setType(3);
                    notification.setContent(String.format(
                        "Sản phẩm %s phiên bản %s màu %s sắp hết hàng, kiểm tra ngay nào",
                        p.getName(), variant.getName(), variant.getColorName()
                    ));
                    notification.setProduct(p);
                    notificationService.createNotification(notification);
                }
            }
        }
    }
}
