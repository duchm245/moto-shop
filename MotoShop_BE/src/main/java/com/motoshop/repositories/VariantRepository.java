package com.motoshop.repositories;

import com.motoshop.models.Product;
import com.motoshop.models.Variant;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface VariantRepository extends JpaRepository<Variant, Long> {
    List<Variant> findByProduct(Product product);
    void deleteAllByProduct(Product product);
    Optional<Variant> findByProductAndColorNameAndName(Product product, String colorName, String name);
}
