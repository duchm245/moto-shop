package com.motoshop.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.nio.file.Path;
import java.nio.file.Paths;

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
        // Resolve to absolute path để đảm bảo Spring Boot serve đúng trên mọi môi trường
        Path absolutePath = Paths.get(imagePath).toAbsolutePath().normalize();
        // Dùng forward slash và đảm bảo kết thúc bằng /
        String location = "file:" + absolutePath.toString().replace("\\", "/") + "/";

        registry.addResourceHandler("/src/static/images/**")
                .addResourceLocations(location);
    }
}
