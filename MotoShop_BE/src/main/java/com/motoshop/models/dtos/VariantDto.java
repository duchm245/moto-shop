package com.motoshop.models.dtos;

import lombok.*;

/**
 * VariantDto — DTO cho Variant (phiên bản xe máy).
 *
 * Dùng để truyền dữ liệu qua API khi tạo/cập nhật sản phẩm.
 * Mỗi variant = 1 tổ hợp (phiên bản × màu xe).
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Data
public class VariantDto {

    private Long id;

    /** Tên phiên bản: "Tiêu Chuẩn", "Cao Cấp", "Giới Hạn", "Đặc Biệt" */
    private String name;

    /** Tên màu xe: "Đỏ đen", "Xanh xám", ... */
    private String colorName;

    /** Mã màu HEX: "#CC0000" */
    private String colorCode;

    /** Số lượng tồn kho */
    private int stock;

    /** Số lượng đã bán */
    private int sold;
}
