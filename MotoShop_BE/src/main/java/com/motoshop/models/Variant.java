package com.motoshop.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Variant — Phiên bản xe máy.
 *
 * Thay thế hệ thống Color + Size (dùng cho quần áo).
 * Mỗi Variant đại diện cho một tổ hợp (phiên bản × màu) của xe,
 * ví dụ: "Cao Cấp — Đỏ đen", "Tiêu Chuẩn — Xanh xám".
 *
 * Migration: Day 1 - Tuần 1
 */
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "variant")
public class Variant {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private Long id;

    /**
     * Tên phiên bản: "Tiêu Chuẩn", "Cao Cấp", "Giới Hạn", "Đặc Biệt"
     */
    @Column(nullable = false, length = 100)
    private String name;

    /**
     * Tên màu xe: "Đỏ đen", "Xanh xám", "Trắng đen", ...
     */
    @Column(length = 100)
    private String colorName;

    /**
     * Mã màu HEX: "#CC0000", "#4A6FA5", ...
     */
    @Column(length = 20)
    private String colorCode;

    /**
     * Số lượng tồn kho
     */
    @Column(nullable = false, columnDefinition = "INT DEFAULT 0")
    private int stock;

    /**
     * Số lượng đã bán
     */
    @Column(nullable = false, columnDefinition = "INT DEFAULT 0")
    private int sold;

    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    @JsonIgnore
    private Product product;
}
