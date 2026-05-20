package com.motoshop.web.dto.request;

import lombok.Data;

@Data
public class ProductCommentRequest {
    private Long userId;
    private Long productId;
    private int rating;
    private String content;
}
