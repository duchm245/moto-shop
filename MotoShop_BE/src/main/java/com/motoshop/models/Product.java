package com.motoshop.models;

import java.util.*;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity

@Table(name = "product",uniqueConstraints = { @UniqueConstraint(columnNames = { "name" }) })

public class Product {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column
	private Long id;

	@Column
	private String name;

	@Column(columnDefinition = "TEXT")
	private String description;

	@Column
	private String sku;

	// ── Day 2 - Tuần 1: Trường tình trạng xe (mới / cũ) ─────────────────────

	/**
	 * Tình trạng xe: "new" (xe mới) hoặc "used" (xe đã qua sử dụng).
	 * Mặc định là "new".
	 * Đổi tên từ "condition" (reserved keyword trong MySQL) → "vehicleCondition".
	 * Tên cột DB: vehicle_condition.
	 */
	@Column(name = "vehicle_condition", length = 10, columnDefinition = "VARCHAR(10) DEFAULT 'new'")
	private String vehicleCondition = "new";

	/**
	 * Năm sản xuất của xe (ví dụ: 2023, 2024).
	 */
	@Column
	private Integer manufacturingYear;

	/**
	 * Số km đã đi — chỉ có ý nghĩa khi vehicleCondition = "used".
	 * Với xe mới, luôn = 0.
	 */
	@Column(columnDefinition = "INT DEFAULT 0")
	private int mileage = 0;

	// ─────────────────────────────────────────────────────────────────────────

	// ══ Day 3 - Tuần 1: Thông số kỹ thuật xe máy ══════════════════════════════

	/** Hãng xe: Honda, Yamaha, Suzuki, TVS, Vinfast, SYM... */
	@Column(length = 100)
	private String brand;

	/** Loại xe: "Xe số", "Xe tay ga", "Xe côn tay", "Xe điện" */
	@Column(length = 50)
	private String vehicleType;

	/** Loại động cơ: "4 thì, 4 van, SOHC", "DOHC"... */
	@Column(length = 100)
	private String engineType;

	/** Dung tích xi-lanh (cc): 110, 125, 155... */
	@Column
	private Integer displacement;

	/** Công suất tối đa: "13.2 kW / 9,500 vòng/phút" */
	@Column(length = 50)
	private String maxPower;

	/** Mô men xoắn tối đa: "14.4 N·m / 8,000 vòng/phút" */
	@Column(length = 50)
	private String maxTorque;

	/** Hộp số: "Tay ga", "6 số", "Côn tay" */
	@Column(length = 50)
	private String transmission;

	/** Hệ thống nhiên liệu: "Phun xăng điện tử Fi", "Chế hòa khí" */
	@Column(length = 100)
	private String fuelSystem;

	/** Dung tích bình xăng (lít): 5.4 */
	@Column
	private Double fuelCapacity;

	/** Mức tiêu thụ nhiên liệu: "1.91 lít/100km" */
	@Column(length = 50)
	private String fuelConsumption;

	/** Kích thước D×R×C (mm): "1,975 × 665 × 1,105" */
	@Column(length = 100)
	private String dimensions;

	/** Khối lượng xe (kg) */
	@Column
	private Integer weight;

	/** Chiều cao yên (mm) */
	@Column
	private Integer seatHeight;

	/** Khoảng sáng gầm (mm) */
	@Column
	private Integer groundClearance;

	/** Thông tin bảo hành: "12 tháng" */
	@Column(length = 100)
	private String warrantyInfo;

	/** Xuất xứ: "Yamaha Việt Nam", "Honda Việt Nam"... */
	@Column(length = 100)
	private String origin;

	/**
	 * Badge "New" — đánh dấu xe vừa ra mắt.
	 * Khác với `vehicleCondition`: newArrival=true có thể tắt sau vài tháng,
	 * còn vehicleCondition="new" nghĩa là xe chưa qua sử dụng.
	 * NOTE: Không đặt tên "isNew" vì Lombok sẽ sinh getter isNew() → JPA map sang cột "new" (bỏ prefix "is").
	 */
	@Column(name = "is_new", columnDefinition = "BOOLEAN DEFAULT FALSE")
	private boolean newArrival = false;

	// ══ Day 3 - Tuần 1: Thông tin trả góp ════════════════════════════════════

	/** Xe có hỗ trợ mua trả góp không */
	@Column(columnDefinition = "BOOLEAN DEFAULT FALSE")
	private boolean installmentSupported = false;

	/** Số tháng trả góp tối đa (vd: 36) */
	@Column(columnDefinition = "INT DEFAULT 36")
	private int installmentMonths = 36;

	/** Phần trăm trả trước tối thiểu (vd: 20 = 20%) */
	@Column(columnDefinition = "INT DEFAULT 20")
	private int downPaymentPercent = 20;

	// ══════════════════════════════════════════════════════════════════════════

	@Column
	private int visited;

	@Column
	private int price;

	@Column
	private int salePrice;

	@Column
	private Date modifiedDate;

	@Column
	private Date createdDate;

	@Column
	private int status;

	@ManyToOne
	@JoinColumn(name = "product_author_id")
	private User productAuthor;

	@ManyToOne
	@JoinColumn(name = "product_category_id")
	private Category productCategory;

	@ManyToOne
	@JoinColumn(name = "sale_id")
	private Sale sale;

	/**
	 * Danh sách phiên bản xe (Variant): thay thế Color+Size cho mô hình xe máy.
	 * Mỗi variant = 1 tổ hợp (tên phiên bản × màu xe × tồn kho).
	 * Day 1 - Tuần 1 Migration.
	 */
	@OneToMany(mappedBy = "product", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	private List<Variant> variants = new ArrayList<>();

	@OneToMany(mappedBy = "product", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	private List<ProductImage> productImages = new ArrayList<>();

	@OneToMany(mappedBy = "product", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@JsonIgnore
	private List<Notification> notifications = new ArrayList<>();
}
