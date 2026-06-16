package com.motoshop.services.impl;

import com.motoshop.config.Constants;
import com.motoshop.mapper.SaleMapper;
import com.motoshop.models.*;
import com.motoshop.repositories.*;
import com.motoshop.services.SaleService;
import com.motoshop.web.dto.request.SaleRequest;
import com.motoshop.web.dto.response.SaleResponse;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.util.Pair;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class SaleServiceImpl implements SaleService {
    private final SaleRepository saleRepository;

    private final ProductRepository productRepository;
    private final SaleMapper saleMapper;

    public SaleServiceImpl(SaleRepository saleRepository,
                           ProductRepository productRepository,
                           SaleMapper saleMapper) {
        this.saleRepository = saleRepository;
        this.productRepository = productRepository;
        this.saleMapper = saleMapper;
    }

    @Override
    public SaleResponse getSale(Long id) {
        Sale sale = saleRepository.findById(id).orElseThrow();
        return saleMapper.mapModelToResponse(sale);
    }

    @Override
    public SaleResponse getSaleByName(String name) {
        Sale sale = saleRepository.findByName(name);
        return saleMapper.mapModelToResponse(sale);
    }

    @Override
    public SaleResponse create(SaleRequest saleRequest) {
        Sale sale = saleRepository.findByName(saleRequest.getName());
        if (sale == null) {
            Sale newSale = saleMapper.mapRequestToModel(saleRequest);
            Date currentDate = new Date();
            // isActive = 1 nếu startDate đã qua (hoặc null), ngược lại = 0 chờ ScheduledTask kích hoạt
            boolean alreadyStarted = newSale.getStartDate() == null || !newSale.getStartDate().after(currentDate);
            newSale.setIsActive(alreadyStarted ? 1 : 0);
            newSale.setCreatedDate(currentDate);
            newSale.setModifiedDate(currentDate);
            Sale saleResp = saleRepository.save(newSale);
            return saleMapper.mapModelToResponse(saleResp);
        } else {
            return null;
        }
    }

    @Override
    public SaleResponse update(long id, SaleRequest saleRequest) {
        Sale sale = saleRepository.findById(id).orElseThrow();
        if (sale == null) {
            return null;
        } else {
            saleMapper.updateModel(sale, saleRequest);
            Date date = new Date();
            sale.setModifiedDate(date);
            saleRepository.save(sale);
            // Nếu sale đang active → cập nhật lại salePrice của tất cả sản phẩm theo discount mới
            if (sale.getIsActive() == 1) {
                List<Product> products = productRepository.findBySaleId(sale.getId());
                for (Product product : products) {
                    int salePrice = (int) Math.round(product.getPrice() * (1.0 - sale.getDiscount() / 100.0));
                    product.setSalePrice(salePrice);
                }
                productRepository.saveAll(products);
            }
            return saleMapper.mapModelToResponse(sale);
        }
    }

    @Override
    public Pair<List<SaleResponse>, Integer> getAll(String keyword, Integer isActive, int pageNo, int pageSize, String sortBy, boolean desc) {
        Sort.Direction sortDirection = desc ? Sort.Direction.DESC : Sort.Direction.ASC;
        if (pageNo < 1) {
            pageNo = 1;
        }
        Pageable pageable = PageRequest.of(pageNo - 1, pageSize, sortDirection, sortBy);
        Page<Sale> sales = saleRepository.findAllSale(keyword, isActive, pageable);
        int total = (int) sales.getTotalElements();
        List<SaleResponse> ordersResponses = sales.getContent().stream()
                .map(saleMapper::mapModelToResponse)
                .toList();
        return Pair.of(ordersResponses, total);
    }

    @Override
    public void delete(long id) {
        Sale sale = saleRepository.findById(id).orElseThrow();
        if (sale != null) {
            sale.setProducts(null);
            saleRepository.save(sale);
        }
        saleRepository.delete(sale);
    }

    @Override
    public String addProductsToSale(Long id, List<Long> productIds) {
        Sale sale = saleRepository.findById(id).orElseThrow();
        List<Product> products = productRepository.findAllById(productIds);
        // Luôn cập nhật sale và salePrice, bất kể isActive
        for (Product product : products) {
            product.setSale(sale);
            if (sale.getIsActive() == 1) {
                // Sale đang chạy → tính giá giảm ngay
                int salePrice = (int) Math.round(product.getPrice() * (1.0 - sale.getDiscount() / 100.0));
                product.setSalePrice(salePrice);
            } else {
                // Sale chưa bắt đầu → giữ giá gốc, ScheduledTask sẽ cập nhật sau
                product.setSalePrice(product.getPrice());
            }
        }
        // Lưu thay đổi vào cơ sở dữ liệu
        productRepository.saveAll(products);
        return "Đã thêm sản phẩm vào khuyến mãi thành công";
    }

    @Override
    @Transactional
    public String removeProductsFromSale(Long saleId, List<Long> productIds) {
        Sale sale = saleRepository.findById(saleId).orElseThrow();
        List<Product> products = sale.getProducts();
        if (products != null && !products.isEmpty()) {
            // Cập nhật giá salePrice của các sản phẩm về giá ban đầu (price)
            for (Product product : products) {
                if (productIds.contains(product.getId())) {
                    product.setSale(null);
                    product.setSalePrice(product.getPrice());
                }
            }
            // Lưu thay đổi vào cơ sở dữ liệu
            saleRepository.save(sale);
            productRepository.saveAll(products);
        }
        return "Xóa sản phẩm khỏi khuyến mãi thành công";
    }

    @Override
    public String hideSale(Long id) {
        Sale sale = saleRepository.findById(id).orElseThrow();
        Date date = new Date();
        sale.setIsActive(0);
        sale.setModifiedDate(date);
        saleRepository.save(sale);
        return "Khuyến mãi đã được ẩn";
    }

    @Override
    public String showSale(Long id) {
        Sale sale = saleRepository.findById(id).orElseThrow();
        Date date = new Date();
        sale.setIsActive(1);
        sale.setModifiedDate(date);
        saleRepository.save(sale);
        return "Khuyến mãi đã được hiện";
    }

    @Override
    public String recalculateAllSalePrices() {
        List<Sale> activeSales = saleRepository.findAll().stream()
                .filter(s -> s.getIsActive() != null && s.getIsActive() == 1)
                .toList();
        int totalUpdated = 0;
        for (Sale sale : activeSales) {
            List<Product> products = productRepository.findBySaleId(sale.getId());
            for (Product product : products) {
                int salePrice = (int) Math.round(product.getPrice() * (1.0 - sale.getDiscount() / 100.0));
                product.setSalePrice(salePrice);
            }
            productRepository.saveAll(products);
            totalUpdated += products.size();
        }
        return "Đã tính lại giá sale cho " + totalUpdated + " sản phẩm thuộc " + activeSales.size() + " chương trình khuyến mãi";
    }
}
