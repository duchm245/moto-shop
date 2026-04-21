package com.motoshop.mapper;

import com.motoshop.models.Article;
import com.motoshop.models.ArticleImage;
import com.motoshop.models.Category;
import com.motoshop.web.dto.request.ArticleRequest;
import com.motoshop.web.dto.request.ArticleUDRequest;
import com.motoshop.web.dto.request.CategoryRequest;
import com.motoshop.web.dto.response.ArticleImageResponse;
import com.motoshop.web.dto.response.ArticleResponse;
import org.mapstruct.*;

@Mapper
public interface ArticleMapper {
    @Mapping(target = "userId", source = "user.id")
    @Mapping(target = "categoryId", source = "category.id")
    ArticleResponse mapToResponse(Article article);

    ArticleImageResponse mapImageToResponse(ArticleImage articleImage);

    @Mapping(target = "category.id", source = "categoryId")
    @Mapping(target = "user.id", source = "userId")
    Article mapRequestToModel(ArticleRequest articleRequest);


    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateModel(@MappingTarget Article article, ArticleRequest articleRequest);
}
