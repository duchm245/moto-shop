package com.motoshop.mapper;

import com.motoshop.models.OrderItem;
import com.motoshop.web.dto.request.OrderItemRequest;
import com.motoshop.web.dto.response.OrderItemResponse;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper
public interface OrderItemMapper {
    OrderItemResponse mapToResponse(OrderItem orderItem);

    OrderItem mapToModel(OrderItemRequest orderItemRequest);
}
