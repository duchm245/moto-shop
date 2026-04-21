package com.motoshop.mapper;

import com.motoshop.models.Article;
import com.motoshop.models.ArticleImage;
import com.motoshop.models.Notification;
import com.motoshop.web.dto.request.ArticleRequest;
import com.motoshop.web.dto.response.ArticleImageResponse;
import com.motoshop.web.dto.response.ArticleResponse;
import com.motoshop.web.dto.response.NotificationResponse;
import org.mapstruct.*;

@Mapper
public interface NotificationMapper {
    @Mapping(target = "orders", source = "orders.id")
    @Mapping(target = "product", source = "product.id")
    NotificationResponse mapToResponse(Notification notification);

//    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
//    void updateModel(@MappingTarget Notification notification, NotificationResponse notificationResponse);
}
