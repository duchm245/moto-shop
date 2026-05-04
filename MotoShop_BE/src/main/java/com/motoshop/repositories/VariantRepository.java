package com.motoshop.repositories;

import com.motoshop.models.Product;
import com.motoshop.models.Variant;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface VariantRepository extends JpaRepository<Variant, Long> {
    List<Variant> findByProduct(Product product);
    void deleteAllByProduct(Product product);
}
