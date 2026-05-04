package com.motoshop.web.dto.request;

import lombok.Data;

@Data
public class VariantRequest {
    private Long id;
    private String name;
    private String colorName;
    private String colorCode;
    private int stock;
}
