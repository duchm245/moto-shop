# 🏍️ KẾ HOẠCH CHUYỂN ĐỔI MOTOSHOP: Quần Áo → Xe Máy

> Tham khảo: https://muaxe.minhlongmoto.com/

---

## 🎯 TỔNG QUAN TIẾN ĐỘ

> **Cập nhật lần cuối:** 2026-05-09

| Giai đoạn | Layer | Tuần | Tiến độ |
|---|---|---|---|
| 🔴 **Giai đoạn 1** | Backend (`MotoShop_BE`) | Tuần 1 | ✅ Hoàn thành (Day 1–5) |
| 🟡 **Giai đoạn 2** | Frontend khách hàng (`MotoShop_FE`) | Tuần 2 | ✅ Hoàn thành (Day 1–5) |
| 🟢 **Giai đoạn 3** | Admin panel (`MotoShop_ADMIN`) | Tuần 3 | ✅ Hoàn thành (Day 1–5) |
| 🔵 **Giai đoạn 4** | Dữ liệu mẫu (Database) | Tuần 4 | ✅ Hoàn thành (Day 1–4) |

### 📍 Đang dừng ở đây

> **Giai đoạn 4 · Day 5** — Test end-to-end toàn bộ luồng mua hàng (FE + Admin + DB)

---

## 📌 A. BỐI CẢNH & PHÂN TÍCH

<details>
<summary>Xem phân tích trang tham khảo & hiện trạng source code</summary>

### A.1 Trang tham khảo (minhlongmoto.com)

- Menu theo **hãng**: Honda, Yamaha, Suzuki, TVS, GPX, Zontes, SYM, Vinfast, Halim
- Menu theo **loại**: Xe số, Xe tay ga, Xe côn tay, Xe điện
- Tính năng đặc trưng: So sánh xe · Yêu cầu tư vấn · Badge New/Sale · Nhiều phiên bản × màu · Chính sách bảo hành

### A.2 Những điểm KHÔNG phù hợp (cần sửa)

| Layer | File | Vấn đề |
|---|---|---|
| BE | `Product.java` | Trường `material` (chất liệu vải) |
| BE | `Size.java` | Bảng `size` lưu S/M/L/XL — vô nghĩa với xe |
| FE | `product.type.ts` | Trường `material`, `Size` theo quần áo |
| FE | `detailProduct/index.tsx` | Label "Kích thước", chính sách đổi trả 7 ngày |
| FE | `home/index.tsx` | Hardcode category ID 28, 29; "Miễn phí giao hàng từ 800K" |
| ADMIN | `pages/products/` | Form không có field thông số xe |
| DB | `motorbike_shop.sql` | Dữ liệu mẫu là quần áo |

### A.3 Những điểm GIỮ NGUYÊN

- Xác thực / đăng nhập / OTP
- Giỏ hàng, đơn hàng, thanh toán (MoMo, VNPay, ZaloPay)
- Bài viết, sale/khuyến mãi, banner, phân trang, tìm kiếm

### A.4 Quyết định đã xác nhận

| # | Câu hỏi | Quyết định |
|---|---|---|
| 1 | Xử lý bảng `size`? | ✅ Tạo bảng `variant` mới |
| 2 | Bán xe cũ hay xe mới? | ✅ Cả hai — thêm `condition`, `mileage`, `manufacturingYear` |
| 3 | Thanh toán trả góp? | ✅ Hiển thị tham khảo + form đăng ký tư vấn |
| 4 | Nguồn ảnh? | ✅ Ảnh từ web hãng (học tập) hoặc Wikimedia Commons |

</details>

---

## 🔴 GIAI ĐOẠN 1 — BACKEND · `MotoShop_BE` · Tuần 1

- [x] **Day 1** — Tạo `Variant.java`, migration tạo bảng `variant`
- [x] **Day 2** — Thêm trường xe cũ/mới (`condition`, `mileage`, `manufacturingYear`)
- [x] **Day 3** — Thêm trường trả góp + thông số kỹ thuật vào `Product.java`
- [x] **Day 4** — Cập nhật DTO, Service, API
  - [x] Cập nhật `ProductDTO` với tất cả trường mới
  - [x] Cập nhật `ProductRequest` cho form tạo/sửa
  - [x] Thêm filter: `brand`, `vehicleType`, `condition` vào `ProductRepository`
  - [x] Fix `/api/product/allProduct` trả về đúng dữ liệu
- [x] **Day 5** — Test API với Postman ✅ Tất cả 8 TC pass
  - [x] TC-01: GET allProduct → 6 sản phẩm, đầy đủ trường
  - [x] TC-02: Filter brand=Honda → 2 xe đúng
  - [x] TC-03: Filter vehicleType=Xe tay ga → 2 xe đúng
  - [x] TC-04: Filter vehicleCondition=new/used → đúng
  - [x] TC-05: Filter kết hợp brand+vehicleType+giá → đúng
  - [x] TC-06: POST tạo xe mới (TVS NTORQ 125) → id=107, variants OK
  - [x] TC-07: GET /product/{id} → đủ 15 trường thông số, variants, images
  - [x] TC-08: Phân trang + sort → total=6, perPage=5 đúng
  - **Bug đã fix:** `boolean isNew` → `newArrival` (Lombok/JPA conflict)
  - **Bug đã fix:** `condition` (MySQL keyword) → `vehicleCondition` / cột `vehicle_condition`

### Chi tiết kỹ thuật

#### Entity `Product.java` — Các trường cần thêm/xóa

```
XÓA: material

THÊM — Thông tin chung:
  brand, vehicleType, isNew

THÊM — Thông số kỹ thuật:
  engineType, displacement, maxPower, maxTorque,
  transmission, fuelSystem, fuelCapacity, fuelConsumption,
  dimensions, weight, seatHeight, groundClearance,
  warrantyInfo, origin

THÊM — Tình trạng:
  condition ("new"|"used"), manufacturingYear, mileage

THÊM — Trả góp:
  installmentSupported, installmentMonths, downPaymentPercent
```

#### Entity `Variant.java` — Mới hoàn toàn

```java
@Entity @Table(name = "variant")
public class Variant {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;       // "Tiêu Chuẩn", "Cao Cấp", "Giới Hạn"
    private String colorName;  // "Đỏ đen", "Xanh xám"
    private String colorCode;  // "#CC0000"
    private int stock;
    private int sold;
    @ManyToOne @JoinColumn(name = "product_id")
    private Product product;
}
```

#### Migration SQL (tổng hợp)

```sql
-- Bảng mới
CREATE TABLE variant (
  id          BIGINT AUTO_INCREMENT PRIMARY KEY,
  name        VARCHAR(100) NOT NULL,
  color_name  VARCHAR(100),
  color_code  VARCHAR(20),
  stock       INT DEFAULT 0,
  sold        INT DEFAULT 0,
  product_id  BIGINT,
  FOREIGN KEY (product_id) REFERENCES product(id)
);

-- Cập nhật bảng product
ALTER TABLE product
  DROP COLUMN material,
  ADD COLUMN brand VARCHAR(100),
  ADD COLUMN vehicle_type VARCHAR(50),
  ADD COLUMN is_new BOOLEAN DEFAULT FALSE,
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
  ADD COLUMN condition VARCHAR(10) DEFAULT 'new',
  ADD COLUMN manufacturing_year INT,
  ADD COLUMN mileage INT DEFAULT 0,
  ADD COLUMN installment_supported BOOLEAN DEFAULT FALSE,
  ADD COLUMN installment_months INT DEFAULT 36,
  ADD COLUMN down_payment_percent INT DEFAULT 20;
```

### 🧪 Day 5 — Test Cases Postman

> **Điều kiện:** Backend đang chạy tại `http://localhost:8080`

#### TC-01: Lấy tất cả sản phẩm (không filter)

```
GET http://localhost:8080/api/product/allProduct
→ Expect: status=200, data là mảng sản phẩm, mỗi item có brand, vehicleType, variants[]
```

#### TC-02: Filter theo hãng xe

```
GET http://localhost:8080/api/product/allProduct?brand=Honda
→ Expect: tất cả sản phẩm trong data đều có brand="Honda"
```

#### TC-03: Filter theo loại xe

```
GET http://localhost:8080/api/product/allProduct?vehicleType=Xe+tay+ga
→ Expect: tất cả sản phẩm đều có vehicleType="Xe tay ga"
```

#### TC-04: Filter theo tình trạng xe

```
GET http://localhost:8080/api/product/allProduct?condition=new
GET http://localhost:8080/api/product/allProduct?condition=used
→ Expect: lọc đúng trường condition
```

#### TC-05: Filter kết hợp brand + vehicleType + khoảng giá

```
GET http://localhost:8080/api/product/allProduct?brand=Yamaha&vehicleType=Xe+côn+tay&minPrice=30000000&maxPrice=80000000
→ Expect: data thỏa mãn cả 3 điều kiện
```

#### TC-06: Tạo sản phẩm xe máy mới (POST)

```
POST http://localhost:8080/api/admin/product   (hoặc endpoint tạo SP của admin)
Content-Type: application/json

{
  "name": "Honda Wave Alpha 110",
  "description": "Xe số phổ thông tiết kiệm nhiên liệu",
  "price": 18990000,
  "categoryId": 1,
  "userId": 1,
  "brand": "Honda",
  "vehicleType": "Xe số",
  "engineType": "4 thì, 4 van, SOHC",
  "displacement": 110,
  "maxPower": "5.9 kW / 7,500 vòng/phút",
  "maxTorque": "8.68 N·m / 5,500 vòng/phút",
  "transmission": "4 số",
  "fuelSystem": "Phun xăng điện tử Fi",
  "fuelCapacity": 4.6,
  "fuelConsumption": "1.91 lít/100km",
  "dimensions": "1,910 × 699 × 1,063",
  "weight": 99,
  "seatHeight": 763,
  "groundClearance": 148,
  "warrantyInfo": "12 tháng",
  "origin": "Honda Việt Nam",
  "condition": "new",
  "manufacturingYear": 2024,
  "mileage": 0,
  "installmentSupported": true,
  "installmentMonths": 36,
  "downPaymentPercent": 20,
  "isNew": true,
  "variants": [
    {"name": "Tiêu Chuẩn", "colorName": "Đỏ đen", "colorCode": "#CC0000", "stock": 5},
    {"name": "Tiêu Chuẩn", "colorName": "Xanh xám", "colorCode": "#4A7C96", "stock": 3}
  ],
  "images": [
    {"url": "https://example.com/wave-alpha-1.jpg"}
  ]
}
→ Expect: status=200, trả về product với id mới, variants đầy đủ
```

#### TC-07: Lấy chi tiết 1 sản phẩm

```
GET http://localhost:8080/api/product/{id}
→ Expect: trả về đầy đủ 15 trường thông số kỹ thuật, variants[], images[]
```

#### TC-08: Phân trang

```
GET http://localhost:8080/api/product/allProduct?pageNo=1&pageSize=5&sortBy=price&sortDirection=asc
→ Expect: data có tối đa 5 phần tử, sắp xếp giá tăng dần
```

#### ✅ Checklist xác nhận Day 5

- [ ] TC-01 pass
- [ ] TC-02 pass
- [ ] TC-03 pass
- [ ] TC-04 pass
- [ ] TC-05 pass
- [ ] TC-06 pass (tạo được sản phẩm xe máy)
- [ ] TC-07 pass (response có đủ trường xe máy)
- [ ] TC-08 pass

---

## 🟡 GIAI ĐOẠN 2 — FRONTEND KHÁCH HÀNG · `MotoShop_FE` · Tuần 2

- [x] **Day 1** — Cập nhật TypeScript types (`Variant`, `Product` interface)
- [x] **Day 2** — UI chọn Phiên bản + Màu (thay `Color` + `Size` cũ)
- [x] **Day 3** — Bảng thông số kỹ thuật (15 trường) trong trang chi tiết
- [x] **Day 4** — UI trả góp (tính toán + modal hiển thị)
- [x] **Day 5** — Badge tình trạng xe cũ/mới trên card và trang chi tiết

### Chi tiết kỹ thuật

#### TypeScript Types (`src/types/product.type.ts`)

```typescript
export interface Variant {
  id: number;
  name: string;      // "Tiêu Chuẩn" / "Cao Cấp" / "Giới Hạn"
  colorName: string;
  colorCode: string;
  stock: number;
  sold: number;
}

export interface Product {
  brand: string; vehicleType: string; isNew: boolean;
  engineType: string; displacement: number;
  maxPower: string; maxTorque: string; transmission: string;
  fuelSystem: string; fuelCapacity: number; fuelConsumption: string;
  dimensions: string; weight: number; seatHeight: number;
  groundClearance: number; warrantyInfo: string; origin: string;
  condition: 'new' | 'used'; manufacturingYear: number; mileage: number;
  installmentSupported: boolean; installmentMonths: number; downPaymentPercent: number;
  variants: Variant[]; // thay thế colors + sizes
}
```

#### Trang Chi Tiết (`detailProduct/index.tsx`)

- Label `"Kích thước"` → `"Phiên bản"`; chọn variant gộp 1 bước: `"Cao Cấp — Đỏ đen"`
- Thêm bảng thông số kỹ thuật 15 trường
- Tab "Chính sách đổi trả" → "Bảo hành & Bảo dưỡng"
- Nút `[Trả góp]` mở modal:

```
Trả trước 20%: 3,798,000đ
├── 24 tháng → ~720,000đ/tháng
└── 36 tháng → ~510,000đ/tháng
```

```typescript
// Lãi suất ~1.2%/tháng (FE Credit, HD Saison...)
const calcInstallment = (price, months, downPct, rate = 0.012) => {
  const loan = price * (1 - downPct / 100);
  return Math.round(loan * rate * Math.pow(1+rate, months) / (Math.pow(1+rate, months) - 1));
};
```

#### Trang Danh Sách (`product/index.tsx`)

```
XÓA filter: S/M/L/XL
GIỮ filter: Màu sắc, Khoảng giá
THÊM filter: Hãng xe · Loại xe · Phân khối (cc) · Tình trạng · Năm SX
```

Card: thêm badge `New`/`Sale`, hiển thị `{displacement} CC`, nút "Yêu cầu tư vấn".

#### Trang Chủ, Giỏ hàng, Contact

- Trang chủ: cập nhật category ID 28, 29 → ID thực tế; đổi text "Miễn phí giao hàng từ 800K"
- Giỏ hàng: `"Kích thước"` → `"Phiên bản"` · `"Màu sắc"` → `"Màu xe"`
- Contact: thêm showroom, giờ mở cửa, địa chỉ

---

## 🟢 GIAI ĐOẠN 3 — ADMIN PANEL · `MotoShop_ADMIN` · Tuần 3

- [x] **Day 1–2** — Bộ lọc xe máy trong trang danh sách sản phẩm (admin)
  - [x] Cột: Hãng xe · Loại xe · CC · Tình trạng
  - [x] Dropdown filter: Hãng xe / Loại xe / Tình trạng + nút "Xóa lọc"
- [x] **Day 3** — Form thêm/sửa sản phẩm (tất cả trường mới)
- [x] **Day 4–5** — Cập nhật trang chủ FE, giỏ hàng, contact

### Chi tiết kỹ thuật

#### Form Thêm/Sửa Sản Phẩm

```
XÓA: field material

Section "Thông tin chung":
  brand       → Dropdown: Honda / Yamaha / Suzuki / TVS / ...
  vehicleType → Dropdown: Xe số / Tay ga / Côn tay / Xe điện
  isNew       → Checkbox

Section "Thông số kỹ thuật":
  engineType, displacement, maxPower, maxTorque, transmission,
  fuelSystem, fuelCapacity, fuelConsumption, dimensions,
  weight, seatHeight, groundClearance, warrantyInfo, origin

Section "Tình trạng xe":
  condition         → Radio: Xe mới / Xe cũ
  manufacturingYear → Number
  mileage           → Number (ẩn nếu condition = "new")

Section "Trả góp":
  installmentSupported → Checkbox
  installmentMonths    → Number
  downPaymentPercent   → Number
```

#### Bảng Danh Sách Sản Phẩm

- Thêm cột: Hãng · Loại xe · CC · Tình trạng
- Thêm filter nhanh theo hãng và loại xe

---

## 🔵 GIAI ĐOẠN 4 — DỮ LIỆU MẪU · Database · Tuần 4

- [x] **Day 1** — Chuẩn bị ảnh xe (16 ảnh placeholder tải về `MotoShop_FE/src/static/images/`)
- [x] **Day 2** — SQL sản phẩm 6 xe mẫu (`migrations/phase4_complete.sql`)
- [x] **Day 3** — SQL variant + màu sắc (trong cùng script phase4_complete.sql)
- [x] **Day 4** — Chạy `migrations/phase4_complete.sql` ✅ 6 xe · 17 variants · 12 ảnh đã vào DB
- [ ] **Day 5** — Test end-to-end toàn bộ luồng mua hàng

### Chi tiết kỹ thuật

#### Danh mục cần tạo

```
Loại xe:  Xe số · Xe tay ga · Xe côn tay · Xe điện
Hãng xe:  Honda · Yamaha · Suzuki · TVS · GPX · Vinfast · SYM
```

#### Sản phẩm mẫu cần nhập

| Model | Hãng | Loại | CC |
|---|---|---|---|
| Wave Alpha 110 | Honda | Xe số | 110 |
| Air Blade 125 | Honda | Xe tay ga | 125 |
| Exciter 155 | Yamaha | Xe côn tay | 155 |
| Grande 125 | Yamaha | Xe tay ga | 125 |
| Raider 150 Fi | Suzuki | Xe côn tay | 150 |
| NTORQ 125 | TVS | Xe tay ga | 125 |

**Variant mẫu:** Tiêu Chuẩn / Cao Cấp / Giới Hạn / Đặc Biệt × Đỏ đen / Xanh xám / Trắng đen / Đen

#### Ảnh cần chuẩn bị

| Xe | Số lượng |
|---|---|
| Honda Wave Alpha 110 | 2 ảnh SP + 1 banner |
| Honda Air Blade 125 | 2 ảnh SP |
| Yamaha Exciter 155 | 2 ảnh SP |
| Yamaha Grande 125 | 2 ảnh SP |
| Suzuki Raider 150 | 2 ảnh SP |
| Vinfast / TVS | 2 ảnh SP |
| Banner trang chủ | 3 ảnh (1920×600px) |

> ⚠️ Ảnh từ `honda.com.vn`, `yamaha-motor.com.vn` chỉ dùng học tập/đồ án.
> Free thay thế: Wikimedia Commons · Unsplash · Pexels (search "motorcycle").

---

## ⭐ TÍNH NĂNG BỔ SUNG *(Sau khi hoàn thành 4 giai đoạn core)*

- [ ] **So sánh xe** — `GET /api/products/compare?ids=1,2,3` + component `CompareTable`
- [ ] **Yêu cầu tư vấn** — Entity `ConsultRequest`, `POST /api/consult` + modal `ConsultModal`
- [ ] **Trang bảo hành** — `/warranty` + tab "Bảo hành & Bảo dưỡng" trong chi tiết sản phẩm
