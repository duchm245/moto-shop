package com.motoshop.web.dto.response;

import lombok.Data;

@Data
public class OrderItemResponse {
    private long id;
    private int quantity;
    private int sellPrice;
    private String productName;
    private String valueColor;
    private String valueSize;
}
