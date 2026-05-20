package com.motoshop.services;

import com.motoshop.web.dto.request.ProductCommentRequest;
import com.motoshop.web.dto.response.ProductCommentResponse;

import java.util.List;

public interface ProductCommentService {
    List<ProductCommentResponse> getCommentsByProductId(Long productId);
    ProductCommentResponse addComment(ProductCommentRequest request);
    boolean hasUserCommented(Long userId, Long productId);
}
