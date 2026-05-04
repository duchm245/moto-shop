package com.motoshop.web.dto.request;

import lombok.Data;

import java.util.List;

@Data
public class ProductUDRequest {
    private long id;

    private String name;

    private String description;

    // ── Day 2 - Tuần 1: Tình trạng xe ────────────────────────────────────────
    private String condition;
    private Integer manufacturingYear;
    private int mileage;
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
    private boolean isNew;

    // ══ Day 3 - Tuần 1: Trả góp ══════════════════════════════════════════════
    private boolean installmentSupported;
    private int installmentMonths;
    private int downPaymentPercent;
    // ═════════════════════════════════════════════════════════════════════════

    private int price;

    private Long categoryId;

    private Long userId;

    private List<VariantRequest> variants;

    private List<ProductImageUDRequest> images;
}
