package com.motoshop.web.dto.request;

import lombok.Data;

@Data
public class CancelOrdersRequest {

    private Long orderId;

    private String note;

}
