# 📸 Ghi chú: Cơ chế lưu & hiển thị ảnh sản phẩm

> **Ngày ghi:** 2026-04-22  
> **Trạng thái:** ⚠️ Cần nâng cấp — đang dùng cách đơn giản cho môi trường development

---

## 1. Cơ chế hiện tại

### Ảnh được lưu ở đâu?

Toàn bộ ảnh sản phẩm được đặt **thủ công** vào thư mục:

```
MotoShop_FE/src/static/images/
├── ao_polo_tron_1.jpg
├── ao_polo_tron_2.jpg
├── polo_tron_vai_luc_giac_1.jpg
└── ...
```

> ⚠️ Ảnh được nhúng thẳng vào source code frontend — **không upload qua API**, **không có server lưu trữ riêng**.

---

### Database lưu gì?

Bảng `product_image` chỉ lưu **tên file** (không phải URL đầy đủ):

```sql
CREATE TABLE `product_image` (
  `id`         bigint(20) NOT NULL,
  `url`        varchar(255) DEFAULT NULL,  -- chỉ là tên file, vd: "ao_polo_tron_1.jpg"
  `product_id` bigint(20) DEFAULT NULL
);
```

Ví dụ dữ liệu:
```sql
INSERT INTO `product_image` VALUES
(9,  'ao_polo_tron_1.jpg', 3),
(10, 'ao_polo_tron_2.jpg', 3);
```

---

### API Backend trả về gì?

Endpoint `GET /api/product/{id}` trả về JSON:

```json
{
  "id": 3,
  "name": "Áo Polo trơn hiệu ứng",
  "images": [
    { "id": 9,  "url": "ao_polo_tron_1.jpg" },
    { "id": 10, "url": "ao_polo_tron_2.jpg" }
  ]
}
```

---

### Frontend ghép URL như thế nào?

**File:** `MotoShop_FE/src/constants/utils.ts`
```ts
export const API_URL_IMAGE = "/src/static/images/";
```

**Sử dụng trong component:**
```tsx
<img src={`${API_URL_IMAGE}${item.url}`} />
// Kết quả: /src/static/images/ao_polo_tron_1.jpg
```

---

### Luồng hoàn chỉnh

```
[1] Đặt file ảnh vào: MotoShop_FE/src/static/images/ao_polo_tron_1.jpg
        │
[2] Database: product_image.url = "ao_polo_tron_1.jpg"
        │
[3] Backend API: GET /api/product/3
    → { images: [{ url: "ao_polo_tron_1.jpg" }] }
        │
[4] Frontend ghép URL:
    "/src/static/images/" + "ao_polo_tron_1.jpg"
        │
[5] Browser render:
    <img src="/src/static/images/ao_polo_tron_1.jpg" />
```

---

## 2. Hạn chế của cách hiện tại

| Vấn đề | Mô tả |
|--------|-------|
| 🔴 Không thể upload từ Admin | Muốn thêm ảnh mới phải copy tay vào source code |
| 🔴 Ảnh tăng → source code nặng | Ảnh nằm trong repo, `git clone` chậm, nặng |
| 🔴 Không scale được | Nhiều người dùng → không thể chia sẻ ảnh qua CDN |
| 🟡 Chỉ phù hợp development | Khi deploy production sẽ gặp vấn đề về path |
| 🟡 Không có backup tập trung | Ảnh mất nếu mất code |

---

## 3. Kế hoạch nâng cấp (TODO)

### Phương án A — Cloudinary (Khuyến nghị cho project nhỏ/vừa)

**Ưu điểm:** Miễn phí tier, CDN sẵn, resize/optimize ảnh tự động, dễ tích hợp Spring Boot.

**Các bước cần làm:**

- [ ] Tạo tài khoản Cloudinary tại https://cloudinary.com
- [ ] Thêm dependency vào `pom.xml`:
  ```xml
  <dependency>
      <groupId>com.cloudinary</groupId>
      <artifactId>cloudinary-http44</artifactId>
      <version>1.36.0</version>
  </dependency>
  ```
- [ ] Thêm config Cloudinary vào `application.yaml`:
  ```yaml
  cloudinary:
    cloud-name: ${CLOUDINARY_CLOUD_NAME}
    api-key: ${CLOUDINARY_API_KEY}
    api-secret: ${CLOUDINARY_API_SECRET}
  ```
- [ ] Tạo `CloudinaryService.java` để upload file
- [ ] Thêm endpoint `POST /api/admin/upload` nhận `MultipartFile`
- [ ] Cập nhật `product_image.url` để lưu **URL đầy đủ** từ Cloudinary
  - Ví dụ: `https://res.cloudinary.com/demo/image/upload/v1234/ao_polo_tron_1.jpg`
- [ ] Cập nhật `API_URL_IMAGE = ""` trong frontend (vì URL đã đầy đủ)
- [ ] Cập nhật Admin panel để gọi API upload thay vì nhập tên file thủ công

---

### Phương án B — Lưu file trên server (Self-hosted)

**Ưu điểm:** Không phụ thuộc dịch vụ ngoài, kiểm soát hoàn toàn.

**Các bước cần làm:**

- [ ] Tạo endpoint `POST /api/admin/upload` nhận `MultipartFile`
- [ ] Lưu file vào thư mục cố định trên server (ví dụ: `/uploads/images/`)
- [ ] Cấu hình Spring Boot phục vụ static file:
  ```java
  @Configuration
  public class WebConfig implements WebMvcConfigurer {
      @Override
      public void addResourceHandlers(ResourceHandlerRegistry registry) {
          registry.addResourceHandler("/images/**")
                  .addResourceLocations("file:/uploads/images/");
      }
  }
  ```
- [ ] Cập nhật `product_image.url` lưu tên file (giữ nguyên)
- [ ] Cập nhật `API_URL_IMAGE = "http://localhost:8081/images/"` trong frontend

---

### Phương án C — AWS S3 / Firebase Storage (Cho dự án lớn)

Phù hợp khi có nhiều người dùng, cần độ tin cậy cao. Chi phí cao hơn nhưng scale tốt.

---

## 4. File liên quan cần sửa khi nâng cấp

| File | Nội dung cần sửa |
|------|-----------------|
| `MotoShop_FE/src/constants/utils.ts` | Cập nhật `API_URL_IMAGE` |
| `MotoShop_ADMIN/src/constants/utils.ts` | Cập nhật `API_URL_IMAGE` |
| `MotoShop_BE/.env` | Thêm credentials dịch vụ lưu trữ |
| `MotoShop_BE/pom.xml` | Thêm dependency (nếu dùng Cloudinary) |
| `MotoShop_BE/.../ProductImageServiceImpl.java` | Thêm logic upload |
| `MotoShop_BE/.../AProductImageRest.java` | Thêm endpoint upload |
| `motorbike_shop.sql` | Cột `url` sẽ lưu URL đầy đủ thay vì tên file |
