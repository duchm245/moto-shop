package com.motoshop.web.dto.request;

import lombok.Data;

@Data
public class ConsultRequestDto {
    private String fullName;
    private String phone;
    private String email;
    private String note;
    private Long productId;
    private String productName;
}
