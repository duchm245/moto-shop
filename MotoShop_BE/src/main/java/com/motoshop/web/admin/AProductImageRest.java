package com.motoshop.web.admin;

import com.motoshop.helper.ApiResponse;
import com.motoshop.services.ProductImageService;
import com.motoshop.services.ProductService;
import com.motoshop.web.dto.request.ProductRequest;
import com.motoshop.web.dto.request.ProductUDRequest;
import com.motoshop.web.dto.response.ProductResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/productImage")
public class AProductImageRest {
    private final ProductImageService productImageService;

    public AProductImageRest(ProductImageService productImageService) {
        this.productImageService = productImageService;
    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> delete(@PathVariable(name = "id") long id) {
        try {
            productImageService.delete(id);
            return new ResponseEntity<>(ApiResponse.build(200, true, "thành công", "Xóa ảnh sản phẩm thành công!"), HttpStatus.OK);
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Xóa ảnh sản phẩm không thành công! Lỗi " + e.getMessage());
        }
    }
}
