package com.motoshop.web;

import com.motoshop.helper.ApiResponse;
import com.motoshop.services.ProductCommentService;
import com.motoshop.web.dto.request.ProductCommentRequest;
import com.motoshop.web.dto.response.ProductCommentResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/review")
public class ProductCommentRest {

    private final ProductCommentService commentService;

    public ProductCommentRest(ProductCommentService commentService) {
        this.commentService = commentService;
    }

    @GetMapping("/{productId}")
    public ResponseEntity<?> getReviews(@PathVariable Long productId) {
        try {
            List<ProductCommentResponse> reviews = commentService.getCommentsByProductId(productId);
            return new ResponseEntity<>(ApiResponse.build(200, true, "Thành công", reviews), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(ApiResponse.build(500, false, "Lỗi server", null), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping
    public ResponseEntity<?> addReview(@RequestBody ProductCommentRequest request) {
        try {
            if (request.getUserId() == null) {
                return new ResponseEntity<>(ApiResponse.build(401, false, "Vui lòng đăng nhập để đánh giá", null), HttpStatus.OK);
            }
            if (request.getContent() == null || request.getContent().isBlank()) {
                return new ResponseEntity<>(ApiResponse.build(400, false, "Nội dung đánh giá không được để trống", null), HttpStatus.OK);
            }
            if (commentService.hasUserCommented(request.getUserId(), request.getProductId())) {
                return new ResponseEntity<>(ApiResponse.build(400, false, "Bạn đã đánh giá sản phẩm này rồi", null), HttpStatus.OK);
            }
            ProductCommentResponse response = commentService.addComment(request);
            return new ResponseEntity<>(ApiResponse.build(200, true, "Đánh giá thành công", response), HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(ApiResponse.build(400, false, e.getMessage(), null), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(ApiResponse.build(500, false, "Lỗi server", null), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
