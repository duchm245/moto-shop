package com.motoshop.mapper;

import com.motoshop.models.Address;
import com.motoshop.models.Category;
import com.motoshop.models.Orders;
import com.motoshop.web.dto.request.AddressRequest;
import com.motoshop.web.dto.request.CategoryRequest;
import com.motoshop.web.dto.request.OrdersRequest;
import com.motoshop.web.dto.response.OrdersResponse;
import org.mapstruct.*;

@Mapper(uses = OrderItemMapper.class)
public interface OrdersMapper {
    @Mapping(target = "items", source = "orderItems")
    @Mapping(target = "user", source = "user.id")
    OrdersResponse mapToResponse(Orders orders);

    Orders mapToModel(OrdersRequest ordersRequest);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateModel(@MappingTarget Orders orders, OrdersRequest ordersRequest);
}
