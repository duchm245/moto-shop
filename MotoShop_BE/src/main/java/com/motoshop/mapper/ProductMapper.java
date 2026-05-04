package com.motoshop.mapper;

import com.motoshop.models.*;
import com.motoshop.models.dtos.ProductDto;
import com.motoshop.web.dto.request.ProductUDRequest;
import com.motoshop.web.dto.response.*;
import com.motoshop.web.dto.request.ProductRequest;
import org.mapstruct.*;

@Mapper
public interface ProductMapper{
    @Mapping(target = "variants", source = "variants")
    @Mapping(target = "images", source = "productImages")
    @Mapping(target = "category",source = "productCategory.id")
    @Mapping(target = "author",source = "productAuthor.id")
    @Mapping(target = "sale",source = "sale.id")
    ProductResponse mapModelToResponse(Product product);

    @Mapping(target = "variants", source = "variants")
    @Mapping(target = "images", source = "productImages")
    @Mapping(target = "category",source = "productCategory.id")
    @Mapping(target = "author",source = "productAuthor.id")
    @Mapping(target = "sale",source = "sale.id")
    ProductDto mapModelToResponseDTO(Product product);

    ProductImageResponse mapImageToImageResponse(ProductImage productImage);

    @Mapping(target = "productCategory.id", source = "categoryId")
    @Mapping(target = "productAuthor.id", source = "userId")
    @Mapping(target = "variants", ignore = true)
    Product mapRequestedToModel(ProductRequest productRequest);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "productCategory.id", source = "categoryId")
    @Mapping(target = "productAuthor.id", source = "userId")
    @Mapping(target = "variants", ignore = true)
    void updateModel(@MappingTarget Product product, ProductRequest productRequest);

    CategoryResponse mapModelToResponse(Category category);

    @Mapping(target = "roles",source = "roles")
    UserResponse mapModelToResponse(User user);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "variants", ignore = true)
    void updateModel2(@MappingTarget Product product, ProductUDRequest productRequest);
}
