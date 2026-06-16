package com.motoshop.mapper;

import com.motoshop.models.Sale;
import com.motoshop.web.dto.request.SaleRequest;
import com.motoshop.web.dto.response.SaleResponse;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(uses = ProductMapper.class)
public interface SaleMapper {

    SaleResponse mapModelToResponse(Sale sale);
    Sale mapRequestToModel(SaleRequest saleRequest);
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateModel(@MappingTarget Sale Sale, SaleRequest saleRequest);

}
