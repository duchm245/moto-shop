package com.motoshop.repositories;

import com.motoshop.models.ProductComment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductCommentRepository extends JpaRepository<ProductComment, Long> {
    List<ProductComment> findByProductIdOrderByCreatedDateDesc(Long productId);
    boolean existsByUserIdAndProductId(Long userId, Long productId);
}
