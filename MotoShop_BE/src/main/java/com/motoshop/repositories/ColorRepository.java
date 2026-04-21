package com.motoshop.repositories;

import com.motoshop.models.Color;
import com.motoshop.models.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ColorRepository extends JpaRepository<Color, Long> {

    Color findByValueAndProductId(String value, long productId);

    List<Color> findByProduct(Product product);

    @Query("SELECT DISTINCT c.value FROM Color c")
    List<String> findDistinctColorValues();
}
