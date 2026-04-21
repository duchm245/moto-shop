package com.motoshop.repositories;

import com.motoshop.models.Product;
import com.motoshop.models.ProductImage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductImageRepository extends JpaRepository<ProductImage, Long> {
    List<ProductImage> findByProduct(Product product);

    ProductImage findByUrlAndProductId(String url, long productId);
}
