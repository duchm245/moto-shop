package com.motoshop.web.dto.request;

import jakarta.persistence.Column;
import lombok.Data;

import java.util.List;

@Data
public class ProductRequest {
    private String name;

    private String description;

    // ── Day 2 - Tuần 1: Tình trạng xe ────────────────────────────────────────
    /** "new" | "used" — mặc định "new" */
    private String condition = "new";
    /** Năm sản xuất */
    private Integer manufacturingYear;
    /** Số km đã đi */
    private int mileage = 0;
    // ─────────────────────────────────────────────────────────────────────────

    // ══ Day 3 - Tuần 1: Thông số kỹ thuật ═══════════════════════════════════════
    private String brand;
    private String vehicleType;
    private String engineType;
    private Integer displacement;
    private String maxPower;
    private String maxTorque;
    private String transmission;
    private String fuelSystem;
    private Double fuelCapacity;
    private String fuelConsumption;
    private String dimensions;
    private Integer weight;
    private Integer seatHeight;
    private Integer groundClearance;
    private String warrantyInfo;
    private String origin;
    private boolean isNew = false;

    // ══ Day 3 - Tuần 1: Trả góp ══════════════════════════════════════════════
    private boolean installmentSupported = false;
    private int installmentMonths = 36;
    private int downPaymentPercent = 20;
    // ════════════════════════════════════════════════════════════════════════─

    private int price;

    private Long categoryId;

    private Long userId;

    private List<VariantRequest> variants;

    private List<ProductImageRequest> images;
}
