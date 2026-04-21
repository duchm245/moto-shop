package com.motoshop.mapper;

import com.motoshop.models.Color;
import com.motoshop.web.dto.request.ColorRequest;
import com.motoshop.web.dto.request.ColorUDRequest;
import com.motoshop.web.dto.response.ColorResponse;
import org.mapstruct.*;

@Mapper
public interface ColorMapper {

    @Mapping(target = "sizes", source = "sizes")
    ColorResponse mapModelToResponse(Color color);

    @Mapping(target = "product.id", source = "productId")
    Color mapRequestedToModel(ColorRequest colorRequest);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateModel(@MappingTarget Color color, ColorRequest colorRequest);
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateModel2(@MappingTarget Color color, ColorUDRequest colorRequest);

    @Mapping(target = "product.id", source = "productId")
    Color mapRequestedToModel2(ColorUDRequest colorRequest);

}
