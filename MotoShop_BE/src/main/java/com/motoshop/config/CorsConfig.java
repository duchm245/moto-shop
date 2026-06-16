package com.motoshop.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        // API endpoints
        registry.addMapping("/api/**")
                .allowedOrigins(
                    // Local development
                    "http://localhost:3000",
                    "http://localhost:3001",
                    "http://localhost:5173",  // MotoShop_FE (Vite)
                    "http://localhost:5174",  // MotoShop_ADMIN (Vite)
                    // Production (Vercel) - update with real URLs after deploy
                    "https://motoshop-fe.vercel.app",
                    "https://motoshop-admin.vercel.app"
                )
                .allowedMethods("GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS")
                .allowCredentials(true);

        // Static image resources - allow FE and Admin to load images
        registry.addMapping("/src/static/images/**")
                .allowedOrigins(
                    // Local development
                    "http://localhost:3000",
                    "http://localhost:3001",
                    "http://localhost:5173",
                    "http://localhost:5174",
                    // Production (Vercel)
                    "https://motoshop-fe.vercel.app",
                    "https://motoshop-admin.vercel.app"
                )
                .allowedMethods("GET")
                .allowCredentials(false);
    }
}