package com.motoshop.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebMvcConfig implements WebMvcConfigurer {

    @Value("${app.image-path:../MotoShop_ADMIN/src/static/images/}")
    private String imagePath;

    /**
     * Cho phép backend serve ảnh tĩnh từ thư mục Admin/src/static/images/.
     * URL: http://localhost:8081/src/static/images/<filename>
     *
     * Có thể override qua biến môi trường IMAGE_PATH nếu deploy lên server.
     * Ví dụ local: IMAGE_PATH=C:/Users/ADMIN/Desktop/doan/moto-shop/MotoShop_ADMIN/src/static/images/
     */
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        String location = imagePath.startsWith("file:") ? imagePath : "file:" + imagePath;
        // Đảm bảo path kết thúc bằng /
        if (!location.endsWith("/")) {
            location = location + "/";
        }
        registry.addResourceHandler("/src/static/images/**")
                .addResourceLocations(location);
    }
}
