package com.motoshop.web;

import com.motoshop.helper.ApiResponse;
import com.motoshop.models.ConsultRequest;
import com.motoshop.repositories.ConsultRequestRepository;
import com.motoshop.web.dto.request.ConsultRequestDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/consult")
public class ConsultRest {

    private final ConsultRequestRepository consultRequestRepository;

    public ConsultRest(ConsultRequestRepository consultRequestRepository) {
        this.consultRequestRepository = consultRequestRepository;
    }

    /**
     * POST /api/consult — Khách hàng gửi yêu cầu tư vấn (không cần đăng nhập)
     */
    @PostMapping
    public ResponseEntity<?> create(@RequestBody ConsultRequestDto dto) {
        try {
            ConsultRequest entity = new ConsultRequest();
            entity.setFullName(dto.getFullName());
            entity.setPhone(dto.getPhone());
            entity.setEmail(dto.getEmail());
            entity.setNote(dto.getNote());
            entity.setProductId(dto.getProductId());
            entity.setProductName(dto.getProductName());
            entity.setStatus(0);
            entity.setCreatedDate(new Date());
            entity.setUpdatedDate(new Date());
            consultRequestRepository.save(entity);
            return new ResponseEntity<>(
                ApiResponse.build(200, true, "Yêu cầu tư vấn đã được ghi nhận. Chúng tôi sẽ liên hệ sớm!", null),
                HttpStatus.OK
            );
        } catch (Exception e) {
            return new ResponseEntity<>(
                ApiResponse.build(500, false, "Lỗi hệ thống, vui lòng thử lại.", null),
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    /**
     * GET /api/consult/admin — Admin xem danh sách yêu cầu tư vấn (có phân trang + lọc theo status)
     */
    @GetMapping("/admin")
    public ResponseEntity<?> getAll(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) Integer status
    ) {
        try {
            Pageable pageable = PageRequest.of(page, size);
            Page<ConsultRequest> result = (status != null)
                ? consultRequestRepository.findByStatusOrderByCreatedDateDesc(status, pageable)
                : consultRequestRepository.findByOrderByCreatedDateDesc(pageable);

            Map<String, Object> data = new HashMap<>();
            data.put("content", result.getContent());
            data.put("totalElements", result.getTotalElements());
            data.put("totalPages", result.getTotalPages());
            data.put("currentPage", page);
            return new ResponseEntity<>(ApiResponse.build(200, true, "Thành công", data), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(
                ApiResponse.build(500, false, "Lỗi hệ thống", null),
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    /**
     * PUT /api/consult/admin/{id}/status — Admin cập nhật trạng thái xử lý
     */
    @PutMapping("/admin/{id}/status")
    public ResponseEntity<?> updateStatus(
            @PathVariable Long id,
            @RequestParam int status
    ) {
        try {
            ConsultRequest entity = consultRequestRepository.findById(id).orElseThrow();
            entity.setStatus(status);
            entity.setUpdatedDate(new Date());
            consultRequestRepository.save(entity);
            return new ResponseEntity<>(ApiResponse.build(200, true, "Cập nhật thành công", null), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(
                ApiResponse.build(500, false, "Lỗi hệ thống", null),
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }
}
