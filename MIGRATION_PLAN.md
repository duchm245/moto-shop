# 🏍️ KẾ HOẠCH CHUYỂN ĐỔI MOTOSHOP: Quần Áo → Xe Máy
> Tham khảo: https://muaxe.minhlongmoto.com/

---

## 📌 1. PHÂN TÍCH TRANG THAM KHẢO (minhlongmoto.com)

### 1.1 Cấu trúc Navigation
- Menu theo **hãng xe**: Honda, Yamaha, Suzuki, TVS, GPX, Zontes, SYM, Vinfast, Halim
- Menu theo **loại xe**: Xe số, Xe tay ga, Xe côn tay, Xe điện
- Trang đặc biệt: `/sale/`, `/new/`, `/dai-ly/` (địa chỉ đại lý)

### 1.2 Thông số kỹ thuật trên trang chi tiết sản phẩm
Lấy ví dụ từ trang **Yamaha Exciter 155**:

| Thông số | Giá trị ví dụ |
|---|---|
| Phân khối | 155 CC |
| Loại động cơ | 4 thì, 4 van, SOHC |
| Công suất tối đa | 13.2 kW / 9,500 vòng/phút |
| Mô men xoắn | 14.4 N·m / 8,000 vòng/phút |
| Hộp số | 6 số |
| Hệ thống nhiên liệu | Phun xăng điện tử Fi |
| Tiêu thụ nhiên liệu | 1.91 lít/100km |
| Dung tích bình xăng | 5.4 lít |
| Kích thước (D×R×C) | 1,975 × 665 × 1,105 mm |
| Khối lượng | 119 kg |
| Chiều cao yên | 795 mm |
| Khoảng sáng gầm | 150 mm |
| Lốp trước | 120/70-17M/C |
| Lốp sau | 90/80-17M/C |
| Phanh trước | Đĩa đơn thủy lực |
| Phanh sau | Đĩa đơn thủy lực |
| Hệ thống đèn | LED |
| Xuất xứ | Yamaha Việt Nam |
| Bảo hành | 12 tháng |

### 1.3 Tính năng đặc biệt của website bán xe máy
- ✅ **So sánh xe**: Chọn nhiều xe để so sánh thông số song song
- ✅ **Yêu cầu tư vấn**: Form điền thông tin để nhân viên liên hệ lại
- ✅ **Nhiều phiên bản/màu**: Mỗi xe có nhiều phiên bản (Tiêu chuẩn, Cao cấp, Giới hạn) × nhiều màu
- ✅ **Badge trạng thái**: `Sale`, `New` hiển thị trên card xe
- ✅ **Giải thưởng đại lý**: Hiển thị uy tín thương hiệu
- ✅ **Chính sách bảo hành/bảo trì/bảo dưỡng** (khác hẳn quần áo)
- ✅ **Hướng dẫn mua xe online**

### 1.4 Danh mục xe (Categories)
| Theo loại | Theo hãng |
|---|---|
| Xe số | Honda |
| Xe tay ga | Yamaha |
| Xe côn tay | Suzuki |
| Xe điện | TVS, GPX, Zontes, SYM, Vinfast, Halim |

---

## 📌 2. HIỆN TRẠNG SOURCE CODE

### 2.1 Những điểm KHÔNG phù hợp với xe máy

| Layer | File/Vị trí | Vấn đề |
|---|---|---|
| **BE** | `Product.java` | Có trường `material` (chất liệu vải) |
| **BE** | `Size.java` | Bảng `size` lưu S/M/L/XL — vô nghĩa với xe máy |
| **BE** | `Color.java` | Cấu trúc ổn, có thể tái sử dụng cho màu xe |
| **FE** | `product.type.ts` | Có trường `material`, `Size` theo quần áo |
| **FE** | `detailProduct/index.tsx` | Label "Kích thước", chính sách đổi trả 7 ngày theo quần áo |
| **FE** | `detailProduct/index.tsx` | Không có bảng thông số kỹ thuật |
| **FE** | `home/index.tsx` | Hardcode category ID 28, 29 |
| **FE** | `home/index.tsx` | "Miễn phí giao hàng từ 800K" |
| **ADMIN** | `pages/products/` | Form nhập liệu không có field thông số xe |
| **DB** | `motorbike_shop.sql` | Dữ liệu mẫu là quần áo |

### 2.2 Những điểm CÓ THỂ GIỮ NGUYÊN
- Hệ thống **xác thực / đăng nhập / OTP** → Giữ nguyên
- Hệ thống **giỏ hàng** → Giữ nguyên (thay label)
- Hệ thống **đơn hàng / thanh toán** (Momo, VNPay, ZaloPay) → Giữ nguyên
- Hệ thống **bài viết** (article) → Giữ nguyên (dùng đăng bài review xe)
- Hệ thống **sale / khuyến mãi** → Giữ nguyên
- Hệ thống **banner** → Giữ nguyên (thay ảnh)
- Hệ thống **phân trang, tìm kiếm** → Giữ nguyên

---

## 📌 3. KẾ HOẠCH THAY ĐỔI CHI TIẾT

---

### 🔴 GIAI ĐOẠN 1: BACKEND (MotoShop_BE)

#### 1A. Thay đổi Entity `Product.java`
```
XÓA: trường material (chất liệu vải)

THÊM:
- brand          VARCHAR(100)   -- Hãng xe (Honda, Yamaha...)
- engineType     VARCHAR(100)   -- Loại động cơ (4 thì SOHC, DOHC...)
- displacement   INT            -- Dung tích xi-lanh (cc)
- maxPower       VARCHAR(50)    -- Công suất tối đa (vd: "13.2kW/9500rpm")
- maxTorque      VARCHAR(50)    -- Mô men xoắn tối đa
- transmission   VARCHAR(50)    -- Hộp số (Tay ga / 6 số / Côn tay)
- fuelSystem     VARCHAR(100)   -- Hệ thống nhiên liệu (Phun xăng Fi / Chế hòa khí)
- fuelCapacity   FLOAT          -- Dung tích bình xăng (lít)
- fuelConsumption VARCHAR(50)   -- Tiêu thụ nhiên liệu (lít/100km)
- dimensions     VARCHAR(100)   -- Kích thước D×R×C (mm)
- weight         INT            -- Khối lượng (kg)
- seatHeight     INT            -- Chiều cao yên (mm)
- groundClearance INT           -- Khoảng sáng gầm (mm)
- warrantyInfo   VARCHAR(100)   -- Bảo hành (vd: "12 tháng")
- origin         VARCHAR(100)   -- Xuất xứ (Yamaha VN, Honda VN...)
- vehicleType    VARCHAR(50)    -- Loại xe (Xe số, Tay ga, Côn tay, Xe điện)
- isNew          BOOLEAN        -- Badge "New"
```

#### 1B. Xử lý bảng `Size` (quan trọng - cần quyết định)

**Phương án A — Giữ bảng size, đổi ý nghĩa** *(Đề xuất cho đồ án)*
- Đổi `size.value` từ "S/M/L/XL" sang "Phiên bản" xe
- Ví dụ: "Tiêu Chuẩn", "Cao Cấp", "Giới Hạn", "Đặc Biệt"
- Ưu điểm: Ít thay đổi code nhất, không cần migration phức tạp

**Phương án B — Tạo bảng `Variant` mới**
- Tạo entity `Variant.java` với các trường rõ ràng hơn
- Nhược điểm: Tốn effort, cần cập nhật nhiều tầng

#### 1C. Cập nhật DTO
- Cập nhật `ProductDTO` thêm các trường mới
- Cập nhật `ProductRequest` cho form tạo/sửa sản phẩm

#### 1D. Cập nhật API (ProductRest.java)
- Thêm filter theo: `brand`, `vehicleType`, `displacement`, `transmission`
- Cập nhật endpoint search để hỗ trợ filter xe máy

#### 1E. Migration Database
```sql
-- Thêm cột mới vào bảng product
ALTER TABLE product
  ADD COLUMN brand VARCHAR(100),
  ADD COLUMN engine_type VARCHAR(100),
  ADD COLUMN displacement INT,
  ADD COLUMN max_power VARCHAR(50),
  ADD COLUMN max_torque VARCHAR(50),
  ADD COLUMN transmission VARCHAR(50),
  ADD COLUMN fuel_system VARCHAR(100),
  ADD COLUMN fuel_capacity FLOAT,
  ADD COLUMN fuel_consumption VARCHAR(50),
  ADD COLUMN dimensions VARCHAR(100),
  ADD COLUMN weight INT,
  ADD COLUMN seat_height INT,
  ADD COLUMN ground_clearance INT,
  ADD COLUMN warranty_info VARCHAR(100),
  ADD COLUMN origin VARCHAR(100),
  ADD COLUMN vehicle_type VARCHAR(50),
  ADD COLUMN is_new BOOLEAN DEFAULT FALSE,
  DROP COLUMN material;

-- Cập nhật bảng category với danh mục xe máy
-- (xóa data cũ, nhập mới)
UPDATE size SET value = 'Tiêu Chuẩn' WHERE value IN ('S', 'XS');
UPDATE size SET value = 'Cao Cấp' WHERE value IN ('M', 'L');
UPDATE size SET value = 'Giới Hạn' WHERE value IN ('XL', 'XXL');
```

---

### 🟡 GIAI ĐOẠN 2: FRONTEND (MotoShop_FE)

#### 2A. Cập nhật TypeScript Types (`src/types/product.type.ts`)
```typescript
// TRƯỚC (quần áo)
export interface Product {
  material: string;   // XÓA
  colors: Color[];    // GIỮ - dùng cho màu xe
  ...
}

export interface Size {
  value: string; // S/M/L → đổi thành Tiêu Chuẩn/Cao Cấp/Giới Hạn
}

// SAU (xe máy)
export interface Product {
  brand: string;
  engineType: string;
  displacement: number;
  maxPower: string;
  maxTorque: string;
  transmission: string;
  fuelSystem: string;
  fuelCapacity: number;
  fuelConsumption: string;
  dimensions: string;
  weight: number;
  seatHeight: number;
  groundClearance: number;
  warrantyInfo: string;
  origin: string;
  vehicleType: string;
  isNew: boolean;
  colors: Color[];    // GIỮ NGUYÊN
  ...
}
```

#### 2B. Trang Chi Tiết Sản Phẩm (`src/pages/detailProduct/index.tsx`)

**Thay đổi:**
- Label `"Kích thước"` → `"Phiên bản"`
- Xóa nội dung tab "Chính sách đổi trả" theo quần áo → thêm nội dung bảo hành xe
- Xóa "Miễn phí giao hàng từ 800K" → đổi thành "Giao xe tận nơi toàn quốc"
- Xóa "Đổi trả trong 7 ngày nếu lỗi" → "Bảo hành chính hãng"

**Thêm mới — Bảng thông số kỹ thuật:**
```tsx
<div className="product-specs-table">
  <h3>Thông số kỹ thuật</h3>
  <table>
    <tbody>
      <tr><td>Hãng xe</td><td>{product?.brand}</td></tr>
      <tr><td>Loại xe</td><td>{product?.vehicleType}</td></tr>
      <tr><td>Phân khối</td><td>{product?.displacement} CC</td></tr>
      <tr><td>Loại động cơ</td><td>{product?.engineType}</td></tr>
      <tr><td>Công suất tối đa</td><td>{product?.maxPower}</td></tr>
      <tr><td>Mô men xoắn</td><td>{product?.maxTorque}</td></tr>
      <tr><td>Hộp số</td><td>{product?.transmission}</td></tr>
      <tr><td>Hệ thống nhiên liệu</td><td>{product?.fuelSystem}</td></tr>
      <tr><td>Dung tích bình xăng</td><td>{product?.fuelCapacity} lít</td></tr>
      <tr><td>Mức tiêu thụ nhiên liệu</td><td>{product?.fuelConsumption}</td></tr>
      <tr><td>Kích thước (D×R×C)</td><td>{product?.dimensions} mm</td></tr>
      <tr><td>Khối lượng</td><td>{product?.weight} kg</td></tr>
      <tr><td>Chiều cao yên</td><td>{product?.seatHeight} mm</td></tr>
      <tr><td>Bảo hành</td><td>{product?.warrantyInfo}</td></tr>
      <tr><td>Xuất xứ</td><td>{product?.origin}</td></tr>
    </tbody>
  </table>
</div>
```

#### 2C. Trang Danh Sách Sản Phẩm (`src/pages/product/index.tsx`)

**Thay filter cũ → filter xe máy:**
```
XÓA: filter kích thước (S/M/L/XL)
GIỮ: filter màu sắc, khoảng giá

THÊM:
- Filter Hãng xe (Honda, Yamaha, Suzuki, TVS...)
- Filter Loại xe (Xe số, Tay ga, Côn tay, Xe điện)
- Filter Phân khối (≤110cc, 111-150cc, 151-300cc, >300cc)
- Filter Hộp số (Tay ga, Số tay, Côn tay)
```

**Cập nhật card sản phẩm:**
- Thêm badge `New` / `Sale`
- Hiển thị `{displacement} CC` dưới tên xe
- Hiển thị loại xe (Xe tay ga, Xe số...)
- Thêm nút `"Yêu cầu tư vấn"` trên card

#### 2D. Trang Chủ (`src/pages/home/index.tsx`)
- Cập nhật hardcode ID category 28, 29 → ID danh mục xe máy thực tế
- Đổi section title "Sản phẩm nổi bật" → "Xe máy nổi bật"
- Cập nhật text "Miễn phí giao hàng từ 800K" → chính sách phù hợp
- Cập nhật ngày đếm ngược flash sale

#### 2E. Giỏ Hàng (`src/pages/cart/`)
- Đổi label `"Kích thước"` → `"Phiên bản"`
- Đổi label `"Màu sắc"` → `"Màu xe"` (có thể giữ nguyên)

#### 2F. Trang Liên Hệ (`src/pages/contact/`)
- Cập nhật nội dung: thêm thông tin showroom, giờ mở cửa, địa chỉ cửa hàng xe

---

### 🟢 GIAI ĐOẠN 3: ADMIN PANEL (MotoShop_ADMIN)

#### 3A. Form Thêm/Sửa Sản Phẩm (`src/pages/products/`)

**Xóa field:**
- `material` (chất liệu)

**Thêm fields mới:**
```
Section "Thông tin chung":
- brand          → Dropdown: Honda / Yamaha / Suzuki / TVS / ...
- vehicleType    → Dropdown: Xe số / Xe tay ga / Xe côn tay / Xe điện
- isNew          → Checkbox: Xe mới ra mắt

Section "Thông số kỹ thuật":
- engineType     → Text: Loại động cơ
- displacement   → Number: Phân khối (cc)
- maxPower       → Text: Công suất tối đa
- maxTorque      → Text: Mô men xoắn
- transmission   → Dropdown: Tay ga / Số tay / Côn tay

Section "Tiêu thụ & Kích thước":
- fuelSystem     → Text: Hệ thống nhiên liệu
- fuelCapacity   → Number: Dung tích bình (lít)
- fuelConsumption→ Text: Mức tiêu thụ (lít/100km)
- dimensions     → Text: Kích thước D×R×C
- weight         → Number: Khối lượng (kg)
- seatHeight     → Number: Chiều cao yên (mm)
- groundClearance→ Number: Khoảng sáng gầm (mm)

Section "Bảo hành & Xuất xứ":
- warrantyInfo   → Text: Thông tin bảo hành
- origin         → Text: Xuất xứ
```

#### 3B. Danh Sách Sản Phẩm (Bảng quản lý)
- Thêm cột: **Hãng**, **Loại xe**, **Phân khối (CC)**
- Thêm filter: theo hãng, loại xe

#### 3C. Quản Lý Danh Mục (`src/pages/category/`)
- Xóa danh mục quần áo cũ
- Thêm danh mục xe máy mới (xem mục 4B)

---

### 🔵 GIAI ĐOẠN 4: DỮ LIỆU MẪU (Database)

#### 4A. Danh mục (Category)
```
Loại xe (parent categories):
├── Xe số
├── Xe tay ga
├── Xe côn tay
└── Xe điện

Hãng xe (có thể là sub-category hoặc thuộc tính):
├── Honda
├── Yamaha
├── Suzuki
├── TVS
├── GPX
├── Vinfast
└── SYM
```

#### 4B. Sản phẩm mẫu (cần nhập mới)
| Model | Hãng | Loại | CC |
|---|---|---|---|
| Wave Alpha 110 | Honda | Xe số | 110 |
| Air Blade 125 | Honda | Xe tay ga | 125 |
| Exciter 155 | Yamaha | Xe côn tay | 155 |
| Grande 125 | Yamaha | Xe tay ga | 125 |
| Raider 150 Fi | Suzuki | Xe côn tay | 150 |
| NTORQ 125 | TVS | Xe tay ga | 125 |

#### 4C. Phiên bản xe (bảng `size` → đổi ý nghĩa)
```
value: "Tiêu Chuẩn"
value: "Cao Cấp"
value: "Giới Hạn"
value: "Đặc Biệt"
```

#### 4D. Màu xe (bảng `color`)
```
Đỏ đen, Xanh xám, Trắng đen, Đen, Bạc, Cam đen
```

#### 4E. Ảnh & Banner
- Thay toàn bộ ảnh sản phẩm quần áo → ảnh xe máy
- Thay ảnh banner homepage → banner xe máy

---

## 📌 4. TÍNH NĂNG BỔ SUNG (Lấy cảm hứng từ minhlongmoto)

### 4.1 So sánh xe máy *(Tính năng mới)*
- Cho phép chọn 2-3 xe để so sánh thông số kỹ thuật song song
- Hiển thị bảng so sánh floating ở cuối trang
- **BE**: Thêm endpoint `/api/products/compare?ids=1,2,3`
- **FE**: Component `CompareTable`, store compare list trong Redux

### 4.2 Yêu cầu tư vấn *(Tính năng mới)*
- Form popup: Họ tên, SĐT, xe quan tâm, ghi chú
- **BE**: Thêm entity `ConsultRequest`, controller `/api/consult`
- **FE**: Modal `ConsultModal` gắn trên card và trang chi tiết xe

### 4.3 Chính sách bảo hành/bảo trì *(Thay thế chính sách đổi trả)*
- Trang `/warranty` mô tả chính sách bảo hành xe máy
- Tab trong trang chi tiết: "Bảo hành & Bảo dưỡng"

---

## 📌 5. LỘ TRÌNH TRIỂN KHAI

```
TUẦN 1 — Backend
├── Day 1-2: Migration DB schema (ALTER TABLE)
├── Day 2-3: Cập nhật Product.java, DTO
└── Day 4-5: Cập nhật API filter, test Postman

TUẦN 2 — Frontend Core
├── Day 1:   Cập nhật TypeScript types
├── Day 2-3: Cập nhật trang chi tiết sản phẩm (bảng thông số)
└── Day 4-5: Cập nhật filter trang danh sách

TUẦN 3 — Frontend & Admin
├── Day 1-2: Cập nhật Admin form thêm/sửa sản phẩm
├── Day 3:   Cập nhật trang chủ, giỏ hàng, contact
└── Day 4-5: Nhập dữ liệu xe mẫu, test toàn bộ

TUẦN 4 — Tính năng bổ sung
├── Day 1-3: Tính năng So sánh xe
└── Day 4-5: Form Yêu cầu tư vấn
```

---

## 📌 6. CÁC QUYẾT ĐỊNH ĐÃ XÁC NHẬN

| # | Câu hỏi | Quyết định |
|---|---|---|
| 1 | Xử lý bảng `size`? | ✅ **Phương án B** — Tạo bảng `variant` mới |
| 2 | Bán xe cũ hay xe mới? | ✅ **Cả hai** — thêm `mileage`, `manufacturingYear`, `condition` |
| 3 | Thanh toán trả góp? | ✅ **Có** — thêm module trả góp |
| 4 | Ảnh sản phẩm? | ✅ Dùng ảnh từ web hãng (demo) hoặc Wikimedia Commons |

---

## 📌 7. CHI TIẾT CÁC QUYẾT ĐỊNH MỚI

### 7.1 Phương án B — Tạo bảng `Variant` mới

**Tại sao tốt hơn Phương án A:**
- Rõ ràng về mặt nghiệp vụ: `Variant` = phiên bản xe (không nhầm với "kích cỡ")
- Dễ mở rộng thêm trường sau này
- Code sạch hơn cho đồ án

**Backend — Tạo entity mới `Variant.java`:**
```java
@Entity
@Table(name = "variant")
public class Variant {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String name;        // "Tiêu Chuẩn", "Cao Cấp", "Giới Hạn"

    @Column
    private String colorCode;   // Mã màu hex hoặc tên màu

    @Column
    private String colorName;   // "Đỏ đen", "Xanh xám"...

    @Column
    private int stock;          // Số lượng tồn kho

    @Column
    private int sold;           // Số lượng đã bán

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;
}
```

**Thay đổi `Product.java`:**
```java
// XÓA:
@OneToMany(mappedBy = "product") private List<Color> colors;
// (Color và Size không còn quan hệ với Product nữa)

// THÊM:
@OneToMany(mappedBy = "product", cascade = CascadeType.ALL)
private List<Variant> variants = new ArrayList<>();
```

**Migration SQL:**
```sql
CREATE TABLE variant (
  id            BIGINT AUTO_INCREMENT PRIMARY KEY,
  name          VARCHAR(100) NOT NULL,   -- Tên phiên bản
  color_name    VARCHAR(100),            -- Tên màu
  color_code    VARCHAR(20),             -- Mã màu hex (#FF0000)
  stock         INT DEFAULT 0,
  sold          INT DEFAULT 0,
  product_id    BIGINT,
  FOREIGN KEY (product_id) REFERENCES product(id)
);

-- Giữ bảng color và size nhưng KHÔNG dùng cho Product nữa
-- (hoặc DROP nếu không còn tham chiếu nào)
```

**Frontend — Cập nhật type:**
```typescript
// XÓA: interface Size, interface Color (quan hệ với product)
// THÊM:
export interface Variant {
  id: number;
  name: string;        // "Tiêu Chuẩn" / "Cao Cấp" / "Giới Hạn"
  colorName: string;   // "Đỏ đen"
  colorCode: string;   // "#CC0000"
  stock: number;
  sold: number;
}

export interface Product {
  // ...các trường khác...
  variants: Variant[];  // THAY THẾ colors + sizes
}
```

**UI thay đổi trong trang chi tiết sản phẩm:**
```
TRƯỚC: chọn [Màu sắc] → chọn [Kích thước]
SAU:   chọn [Phiên bản + Màu xe] — gộp 1 bước duy nhất
       Ví dụ: "Cao Cấp — Đỏ đen", "Tiêu Chuẩn — Xanh xám"
```

---

### 7.2 Bán cả xe cũ và xe mới

**Thêm trường vào `Product.java`:**
```java
@Column
private String condition;       // "new" | "used"

@Column
private int manufacturingYear;  // Năm sản xuất (vd: 2022, 2023)

@Column
private int mileage;            // Số km đã đi (0 nếu xe mới)
```

**Migration SQL:**
```sql
ALTER TABLE product
  ADD COLUMN condition VARCHAR(10) DEFAULT 'new',
  ADD COLUMN manufacturing_year INT,
  ADD COLUMN mileage INT DEFAULT 0;
```

**Frontend — Hiển thị trên card và trang chi tiết:**
```tsx
{product.condition === 'used' && (
  <span className="badge badge-used">Xe cũ</span>
)}
{product.condition === 'new' && (
  <span className="badge badge-new">Xe mới</span>
)}

// Trang chi tiết — thêm vào bảng thông số:
<tr><td>Tình trạng</td><td>{product.condition === 'new' ? 'Xe mới' : 'Xe đã qua sử dụng'}</td></tr>
<tr><td>Năm sản xuất</td><td>{product.manufacturingYear}</td></tr>
{product.condition === 'used' && (
  <tr><td>Số km đã đi</td><td>{product.mileage.toLocaleString()} km</td></tr>
)}
```

**Bộ lọc thêm trong trang danh sách:**
```
- Filter Tình trạng: Xe mới / Xe cũ / Tất cả
- Filter Năm sản xuất: 2020, 2021, 2022, 2023, 2024, 2025
- Filter Số km: < 5,000 km / 5,000–20,000 km / > 20,000 km
```

**Admin form — thêm section "Tình trạng xe":**
```
- condition          → Radio: Xe mới / Xe cũ
- manufacturingYear  → Number: Năm sản xuất
- mileage            → Number: Số km đã đi (ẩn nếu xe mới)
```

---

### 7.3 Thanh toán trả góp

**Cách tiếp cận đề nghị cho đồ án:**
Không tích hợp đơn vị tài chính thật (phức tạp), thay vào đó hiển thị **thông tin trả góp tham khảo** + **form đăng ký tư vấn trả góp**.

**Thêm trường vào `Product.java`:**
```java
@Column
private boolean installmentSupported; // Hỗ trợ trả góp: true/false

@Column
private int installmentMonths;        // Số tháng tối đa (vd: 36)

@Column
private int downPaymentPercent;       // % trả trước (vd: 20 → 20%)
```

**Công thức tính trả góp (FE — hiển thị tham khảo):**
```typescript
// Lãi suất cố định ví dụ: 1.2%/tháng (HD Saison, FE Credit...)
const calculateInstallment = (price, months, downPct, rate = 0.012) => {
  const loanAmount = price * (1 - downPct / 100);
  const monthly = loanAmount * rate * Math.pow(1+rate, months)
                  / (Math.pow(1+rate, months) - 1);
  return Math.round(monthly);
};
```

**UI trong trang chi tiết sản phẩm:**
```
[Mua ngay]  [Trả góp]  [Yêu cầu tư vấn]

Khi click [Trả góp]:
┌─────────────────────────────────┐
│  Trả góp Honda Wave Alpha 110   │
│  Giá: 18,990,000đ               │
│  Trả trước 20%: 3,798,000đ      │
│  Góp 24 tháng: ~720,000đ/tháng  │
│  Góp 36 tháng: ~510,000đ/tháng  │
│  [Đăng ký tư vấn trả góp]       │
└─────────────────────────────────┘
```

**Migration SQL:**
```sql
ALTER TABLE product
  ADD COLUMN installment_supported BOOLEAN DEFAULT FALSE,
  ADD COLUMN installment_months INT DEFAULT 36,
  ADD COLUMN down_payment_percent INT DEFAULT 20;
```

---

### 7.4 Nguồn ảnh xe máy cho Demo

> ⚠️ **Lưu ý bản quyền**: Ảnh từ website thương mại (minhlongmoto, honda.com.vn...) có bản quyền. Chỉ dùng cho mục đích học tập/đồ án, KHÔNG dùng thương mại.

**Nguồn ảnh khuyến nghị (ưu tiên theo thứ tự):**

| Nguồn | Chất lượng | Bản quyền | Cách lấy |
|---|---|---|---|
| **Website chính hãng** (`honda.com.vn`, `yamaha-motor.com.vn`) | ⭐⭐⭐⭐⭐ | Demo/học tập OK | Download thủ công |
| **Wikimedia Commons** | ⭐⭐⭐ | ✅ Free (CC License) | commons.wikimedia.org |
| **Unsplash / Pexels** | ⭐⭐⭐ | ✅ Free | unsplash.com (search "motorcycle") |
| **Google Images** (filter "Labeled for reuse") | ⭐⭐⭐ | Cần kiểm tra từng ảnh | Google → Tools → Usage Rights |

**Ảnh cần chuẩn bị cho demo (tối thiểu):**

| Xe | File ảnh cần có |
|---|---|
| Honda Wave Alpha 110 | 2 ảnh sản phẩm + 1 banner |
| Honda Air Blade 125 | 2 ảnh sản phẩm |
| Yamaha Exciter 155 | 2 ảnh sản phẩm |
| Yamaha Grande 125 | 2 ảnh sản phẩm |
| Suzuki Raider 150 | 2 ảnh sản phẩm |
| Xe điện Vinfast | 2 ảnh sản phẩm |
| Banner trang chủ | 3 ảnh banner (1920×600px) |

**Cách nhanh nhất cho đồ án:**
```
1. Vào honda.com.vn → trang từng model → F12 → Network tab
   → Tìm URL ảnh JPG/WebP → Download
2. Đổi tên file: wave-alpha-1.jpg, wave-alpha-2.jpg
3. Upload vào thư mục ảnh của project (theo cấu hình hiện tại)
```

---

## 📌 8. CẬP NHẬT LỘ TRÌNH (sau quyết định)

```
TUẦN 1 — Backend nền tảng
├── Day 1: Tạo Variant.java, migration tạo bảng variant
├── Day 2: Thêm trường xe cũ/mới (condition, mileage, year)
├── Day 3: Thêm trường trả góp + thêm trường thông số kỹ thuật
├── Day 4: Cập nhật DTO, Service, ProductRest API
└── Day 5: Test API với Postman

TUẦN 2 — Frontend TypeScript + Chi tiết sản phẩm
├── Day 1: Cập nhật types (Variant, Product interface)
├── Day 2: UI chọn Phiên bản+Màu (thay Color+Size cũ)
├── Day 3: Bảng thông số kỹ thuật (15 trường)
├── Day 4: UI trả góp (tính toán + hiển thị)
└── Day 5: Tình trạng xe cũ/mới trên UI

TUẦN 3 — Frontend Danh sách + Admin
├── Day 1-2: Bộ lọc xe máy (hãng, loại, cc, tình trạng)
├── Day 3: Admin form nhập liệu (thêm tất cả trường mới)
└── Day 4-5: Trang chủ + giỏ hàng + contact

TUẦN 4 — Dữ liệu + Hoàn thiện
├── Day 1: Chuẩn bị và upload ảnh xe
├── Day 2: Nhập 6-8 sản phẩm xe mẫu
├── Day 3: Nhập variant + màu cho từng xe
└── Day 4-5: Test end-to-end toàn bộ luồng mua hàng
```
