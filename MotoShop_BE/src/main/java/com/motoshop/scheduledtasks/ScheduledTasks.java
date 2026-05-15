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

    @Scheduled(cron = "0 * * * * *")  // Chạy mỗi phút
    public void updateSaleStatus() {
        Date currentDate = new Date();
        List<Sale> allSales = saleRepository.findAll();
        for (Sale sale : allSales) {
            boolean started = sale.getStartDate() != null && !sale.getStartDate().after(currentDate);
            boolean ended   = sale.getEndDate()   != null &&  sale.getEndDate().before(currentDate);

            if (started && !ended && sale.getIsActive() != 1) {
                // Đến giờ bắt đầu → bật sale
                sale.setIsActive(1);
                saleRepository.save(sale);
                // Cập nhật salePrice cho tất cả sản phẩm thuộc sale
                List<Product> products = productRepository.findBySaleId(sale.getId());
                for (Product p : products) {
                    int discounted = (int) Math.round(p.getPrice() * (1.0 - sale.getDiscount() / 100.0));
                    p.setSalePrice(discounted);
                    productRepository.save(p);
                }
                log.info("Sale '{}' đã được kích hoạt, cập nhật giá {} sản phẩm", sale.getName(), products.size());
            } else if (ended && sale.getIsActive() != 0) {
                // Hết hạn → tắt sale, reset giá về giá gốc
                sale.setIsActive(0);
                saleRepository.save(sale);
                List<Product> products = productRepository.findBySaleId(sale.getId());
                for (Product p : products) {
                    p.setSalePrice(p.getPrice());
                    productRepository.save(p);
                }
                log.info("Sale '{}' đã hết hạn, reset giá {} sản phẩm", sale.getName(), products.size());
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
