package com.motoshop.web.dto.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.motoshop.models.dtos.VariantDto;
import lombok.Data;

import java.sql.Date;
import java.util.List;

@Data
public class ProductResponse {
    private Long id;

    private String name;

    private String description;

    private String sku;

    // ── Day 2 - Tuần 1: Tình trạng xe ────────────────────────────────────────
    /** "new" | "used" */
    private String condition;
    /** Năm sản xuất */
    private Integer manufacturingYear;
    /** Số km đã đi */
    private int mileage;
    // ─────────────────────────────────────────────────────────────────────────

    // ══ Day 3 - Tuần 1: Thông số kỹ thuật xe máy ══════════════════════════════
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
    // ══════════════════════════════════════════════════════════════════════════

    private int visited;

    private int price;

    private int salePrice;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "HH:mm:ss dd-MM-yyyy", timezone = "Asia/Ho_Chi_Minh")
    private Date modifiedDate;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "HH:mm:ss dd-MM-yyyy", timezone = "Asia/Ho_Chi_Minh")
    private Date createdDate;

    private int status;

    private long author;

    private long category;

    private long sale;

    private List<VariantDto> variants;

    private List<ProductImageResponse> images;
}
