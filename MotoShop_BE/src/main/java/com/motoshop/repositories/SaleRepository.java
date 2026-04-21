package com.motoshop.repositories;

import com.motoshop.models.Banner;
import com.motoshop.models.Color;
import com.motoshop.models.Sale;
import com.motoshop.models.Size;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface SaleRepository extends JpaRepository<Sale, Long> {
    Sale findByName(String name);

    List<Sale> findByIsActive(Integer isActive);

    @Query("SELECT s FROM Sale s WHERE (:keyword IS NULL OR s.name LIKE %:keyword%) " +
            "AND (:isActive IS NULL OR s.isActive = :isActive)"
    )
    Page<Sale> findAllSale(@Param("keyword") String keyword,
                           @Param("isActive") Integer isActive,
                           Pageable pageable);
}
