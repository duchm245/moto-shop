# 🚀 Deploy Checklist — MotoShop (Free Tier)

> **Mục tiêu**: Triển khai MotoShop lên internet, $0/tháng  
> **Stack**: Vercel (FE + Admin) · Render.com (BE) · Railway (MySQL) · Cloudinary (ảnh)  
> **Ước tính**: ~5–7 giờ

---

## Tiến độ tổng quan

- [ ] Giai đoạn 0 — Bảo mật & Dọn dẹp
- [ ] Giai đoạn 1 — Sửa code
- [ ] Giai đoạn 2 — Setup dịch vụ cloud
- [ ] Giai đoạn 3 — Import data & Kiểm tra

---

## 🔴 GIAI ĐOẠN 0 — Bảo mật & Dọn dẹp (~30 phút)

> ⚠️ Làm bước này TRƯỚC KHI push code lên bất kỳ repo public nào.

### Vấn đề phát hiện qua khảo sát code:

| File | Vấn đề | Mức độ |
|---|---|---|
| `application-local.yaml` | Gmail App Password thật & JWT Secret lộ trong git | 🔴 Nghiêm trọng |
| `VnpayConfig.java` | `vnp_TmnCode` = `UH9Q5WZ0` + `secretKey` = `AXMYC...` hardcode trực tiếp trong source | 🔴 Nghiêm trọng |
| `ZaloPayConfig.java` | `KEY1` = `9phuA...` + `KEY2` = `Iyz2h...` hardcode trực tiếp trong source | 🔴 Nghiêm trọng |
| `MomoConfig.java` | `IPN_URL` dùng ngrok cũ hết hạn, credentials trống | 🟡 Cần chú ý |

---

### 0.1 — Xóa file credential khỏi git tracking

- [x] Chạy lệnh xóa file khỏi git (giữ lại file trên máy):
  ```bash
  git rm --cached MotoShop_BE/src/main/resources/application-local.yaml
  ```
  > ✅ File đã được ignore bởi `MotoShop_BE/.gitignore` (pattern `application-*.yaml` dòng 40) — chưa bao giờ được track.

- [x] Kiểm tra `.gitignore` đã có entry chưa — nếu chưa thêm vào:
  > ✅ Đã có: `src/main/resources/application-*.yaml` trong `MotoShop_BE/.gitignore`

- [x] Commit thay đổi:
  > ✅ Không cần commit — file chưa bao giờ bị track.

---

### 0.2 — Tạo Gmail App Password mới

- [ ] Vào: myaccount.google.com → **Security** → **2-Step Verification** → **App passwords**
- [ ] Tạo App Password mới tên `MotoShop Deploy`
- [ ] Lưu lại password mới (dạng `xxxx xxxx xxxx xxxx`)
- [ ] Thu hồi App Password cũ cho an toàn

---

### 0.3 — Generate JWT Secret mới

- [x] Chạy trong PowerShell:
  ```powershell
  [Convert]::ToBase64String((1..64 | ForEach-Object { Get-Random -Maximum 256 }))
  ```
- [x] Lưu lại chuỗi output để dùng ở Giai đoạn 2
  > ✅ JWT Secret mới đã generate: `ZQs+M2i1fQMIncW+PE9U4Fg963foh5HW6rJ8PyYKYTDo2iQDkHNk3fh6di/sLEkkBGZg9xIJsQC52rZmU4JO3Q==`

---

### 0.4 — Cập nhật `application-local.yaml` trên máy

- [ ] Sửa `spring.mail.password` → App Password mới
- [ ] Sửa `app.jwt-secret` → JWT Secret mới

---

### 0.5 — Chuyển VNPay keys ra environment variables

**File cần sửa**: `MotoShop_BE/src/main/java/com/motoshop/config/VnpayConfig.java`

- [x] Sửa 2 dòng hardcode thành đọc từ env var — **DONE** (commit `c7c89b8`)
- [x] Cũng sửa `vnp_ReturnUrl` (dòng 19) sang env var — **DONE**
- [x] Ghi lại giá trị key hiện tại vào chỗ an toàn (password manager / notepad riêng)
  - `VNPAY_TMN_CODE` = `UH9Q5WZ0`
  - `VNPAY_SECRET_KEY` = `AXMYCMIVEZIASLDLZHSREYKXEKCZIIYA`

> 💡 Các key này sẽ được điền vào Render.com **Environment Variables** ở Giai đoạn 2B — không còn nằm trong source code nữa.

---

### 0.6 — Chuyển ZaloPay keys ra environment variables

**File cần sửa**: `MotoShop_BE/src/main/java/com/motoshop/config/ZaloPayConfig.java`

- [x] Sửa toàn bộ file — **DONE** (commit `c7c89b8`)
- [x] Ghi lại giá trị key hiện tại vào chỗ an toàn:
  - `ZALOPAY_APP_ID` = `553`
  - `ZALOPAY_KEY1`   = `9phuAOYhan4urywHTh0ndEXiV3pKHr5Q`
  - `ZALOPAY_KEY2`   = `Iyz2habzyr7AG8SgvoBCbKwKi3UzlLi3`

> 💡 Tương tự VNPay — các key này sẽ được điền vào Render.com **Environment Variables** ở Giai đoạn 2B.

---

### 0.7 — Cập nhật Render env vars cho VNPay & ZaloPay (nhắc ở Giai đoạn 2B)

> Ghi nhớ thêm các biến này vào Render.com ở bước 2B:

```
VNPAY_TMN_CODE        = UH9Q5WZ0
VNPAY_SECRET_KEY      = AXMYCMIVEZIASLDLZHSREYKXEKCZIIYA
VNPAY_RETURN_URL      = https://motoshop-fe.vercel.app/thank-you
ZALOPAY_APP_ID        = 553
ZALOPAY_KEY1          = 9phuAOYhan4urywHTh0ndEXiV3pKHr5Q
ZALOPAY_KEY2          = Iyz2habzyr7AG8SgvoBCbKwKi3UzlLi3
ZALOPAY_REDIRECT_URL  = https://motoshop-fe.vercel.app/thank-you
```

---

## 🔧 GIAI ĐOẠN 1 — Sửa code (~2–3 giờ)

### 1A — FE: Chuyển API_URL sang biến môi trường

**File cần sửa**: `MotoShop_FE/src/constants/utils.ts`

- [ ] Sửa file từ hardcode sang env var:
  ```typescript
  // TRƯỚC
  export const API_URL = "http://localhost:8081";
  export const API_URL_IMAGE = "http://localhost:8081/src/static/images/";

  // SAU
  export const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8081";
  export const API_URL_IMAGE = import.meta.env.VITE_IMAGE_URL ?? "http://localhost:8081/src/static/images/";
  ```

- [ ] Tạo `MotoShop_FE/.env.development`:
  ```env
  VITE_API_URL=http://localhost:8081
  VITE_IMAGE_URL=http://localhost:8081/src/static/images/
  ```

- [ ] Tạo `MotoShop_FE/.env.production`:
  ```env
  VITE_API_URL=https://DIEN_URL_RENDER_VAO_DAY.onrender.com
  VITE_IMAGE_URL=/images/
  ```

- [ ] Tạo `MotoShop_FE/.env.example` (commit file này, không commit file kia):
  ```env
  VITE_API_URL=http://localhost:8081
  VITE_IMAGE_URL=http://localhost:8081/src/static/images/
  ```

- [ ] Thêm vào `MotoShop_FE/.gitignore`:
  ```
  .env.development
  .env.production
  ```

---

### 1B — Admin: Chuyển API_URL sang biến môi trường

**File cần sửa**: `MotoShop_ADMIN/src/constants/utils.ts`

- [ ] Sửa file:
  ```typescript
  // TRƯỚC
  export const API_URL = "http://localhost:8081";
  export const API_URL_IMAGE = "/src/static/images/";

  // SAU
  export const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8081";
  export const API_URL_IMAGE = import.meta.env.VITE_IMAGE_URL ?? "/src/static/images/";
  ```

- [ ] Tạo `MotoShop_ADMIN/.env.development`:
  ```env
  VITE_API_URL=http://localhost:8081
  VITE_IMAGE_URL=/src/static/images/
  ```

- [ ] Tạo `MotoShop_ADMIN/.env.production`:
  ```env
  VITE_API_URL=https://DIEN_URL_RENDER_VAO_DAY.onrender.com
  VITE_IMAGE_URL=/images/
  ```

- [ ] Tạo `MotoShop_ADMIN/.env.example` và thêm `.gitignore` tương tự FE

---

### 1C — FE + Admin: Thêm vercel.json (SPA routing)

> Không có file này → F5 trang con sẽ bị 404 trên Vercel.

- [ ] Tạo `MotoShop_FE/vercel.json`:
  ```json
  {
    "rewrites": [
      { "source": "/(.*)", "destination": "/index.html" }
    ]
  }
  ```

- [ ] Tạo `MotoShop_ADMIN/vercel.json` (nội dung giống hệt)

---

### 1D — BE: Cập nhật CorsConfig.java

- [ ] Mở file CorsConfig trong `MotoShop_BE/src/main/java/com/motoshop/config/`
- [ ] Thêm domain production vào `allowedOrigins`:
  ```java
  .allowedOrigins(
      "http://localhost:3000",
      "http://localhost:3001",
      "http://localhost:5173",
      "http://localhost:5174",
      "https://motoshop-fe.vercel.app",    // ← THÊM — cập nhật URL thật sau
      "https://motoshop-admin.vercel.app"  // ← THÊM — cập nhật URL thật sau
  )
  ```
  > Cập nhật lại URL đúng sau khi Vercel deploy xong ở bước 2C/2D.

---

### 1E — BE: Sửa EmailUtils.java (5 chỗ hardcode localhost)

- [ ] Sửa dòng ~63:
  `http://localhost:8080/api/login` → `https://motoshop-fe.vercel.app/login`

- [ ] Sửa dòng ~91:
  `http://localhost:3000/order/detail/` → `https://motoshop-fe.vercel.app/order/detail/`

- [ ] Sửa dòng ~117:
  `http://localhost:3000/` → `https://motoshop-fe.vercel.app/`

- [ ] Sửa dòng ~143:
  `http://localhost:3000/order/detail/` → `https://motoshop-fe.vercel.app/order/detail/`

- [ ] Sửa dòng ~163:
  `http://localhost:3000/` → `https://motoshop-fe.vercel.app/`

---

### 1F — BE: Sửa callback URL thanh toán *(bỏ qua nếu chỉ dùng COD)*

- [ ] **`VnpayConfig.java`** — sửa ReturnUrl:
  ```java
  public static String vnp_ReturnUrl = "https://motoshop-fe.vercel.app/thank-you";
  ```

- [ ] **`ZaloPayConfig.java`** — sửa REDIRECT_URL:
  ```java
  public static String REDIRECT_URL = "https://motoshop-fe.vercel.app/thank-you";
  ```

- [ ] **`MomoConfig.java`** — sửa các URL:
  ```java
  public static String RETURN_URL   = "https://motoshop-fe.vercel.app/success/payment";
  public static String NOTIFY_URL   = "https://motoshop-fe.vercel.app/success/payment";
  public static String IPN_URL      = "https://DIEN_URL_RENDER.onrender.com/api/momo/ipn";
  public static String REDIRECT_URL = "https://motoshop-fe.vercel.app/success/payment";
  ```

---

### 1G — Commit & Push toàn bộ thay đổi

- [ ] Kiểm tra không có file nhạy cảm trong staged:
  ```bash
  git status
  git diff --cached --name-only
  ```

- [ ] Commit:
  ```bash
  git add .
  git commit -m "feat: prepare codebase for production deployment

  - Use VITE_API_URL/VITE_IMAGE_URL env vars in FE and Admin
  - Add vercel.json for SPA routing (fix F5 404)
  - Add production domains to CORS allowedOrigins
  - Fix localhost URLs in EmailUtils email templates
  - Fix payment gateway callback URLs"
  ```

- [ ] Push:
  ```bash
  git push origin main
  ```

---

## ☁️ GIAI ĐOẠN 2 — Setup dịch vụ cloud (~1–2 giờ)

### 2A — Railway: Tạo MySQL instance

- [ ] Vào [railway.app](https://railway.app) → Đăng nhập bằng GitHub
- [ ] **New Project** → **Deploy a template** → chọn **MySQL**
- [ ] Đợi khởi tạo xong (~1–2 phút)
- [ ] Vào tab **Variables** → ghi lại:

  | Biến | Giá trị (ghi vào đây) |
  |---|---|
  | `MYSQLHOST` | ` ` |
  | `MYSQLPORT` | ` ` |
  | `MYSQLUSER` | ` ` |
  | `MYSQLPASSWORD` | ` ` |
  | `MYSQLDATABASE` | ` ` |

---

### 2B — Render.com: Deploy Spring Boot BE

- [ ] Vào [render.com](https://render.com) → Đăng nhập bằng GitHub
- [ ] **New +** → **Web Service** → chọn repo GitHub
- [ ] Điền cấu hình:

  | Setting | Giá trị |
  |---|---|
  | Name | `motoshop-be` |
  | Root Directory | `MotoShop_BE` |
  | Runtime | `Java` |
  | Build Command | `chmod +x mvnw && ./mvnw clean package -DskipTests` |
  | Start Command | `java -jar target/MotoShop_BE-*.jar` |
  | Instance Type | `Free` |

- [ ] Thêm **Environment Variables**:

  ```
  SPRING_PROFILES_ACTIVE = prod
  SERVER_PORT            = 10000
  DB_URL                 = jdbc:mysql://{MYSQLHOST}:{MYSQLPORT}/{MYSQLDATABASE}?useSSL=true&allowPublicKeyRetrieval=true&useUnicode=true&characterEncoding=UTF-8
  DB_USERNAME            = {MYSQLUSER từ bước 2A}
  DB_PASSWORD            = {MYSQLPASSWORD từ bước 2A}
  MAIL_USERNAME          = duchm245@gmail.com
  MAIL_PASSWORD          = {App Password mới từ bước 0.2}
  JWT_SECRET             = {JWT Secret mới từ bước 0.3}
  JWT_EXPIRATION_MS      = 86400000
  IMAGE_PATH             = ./uploads/
  JPA_DDL_AUTO           = update
  ```

- [ ] Click **Create Web Service** → đợi build ~5–10 phút
- [ ] Ghi lại URL BE: `https://______________________________.onrender.com`
- [ ] Quay lại cập nhật URL vào:
  - [ ] `MotoShop_FE/.env.production` → `VITE_API_URL=https://...`
  - [ ] `MotoShop_ADMIN/.env.production` → `VITE_API_URL=https://...`

---

### 2C — Vercel: Deploy MotoShop_FE

- [ ] Vào [vercel.com](https://vercel.com) → **Add New... → Project**
- [ ] Import repo GitHub → Cấu hình:

  | Setting | Giá trị |
  |---|---|
  | Project Name | `motoshop-fe` |
  | Root Directory | `MotoShop_FE` |
  | Framework Preset | `Vite` |
  | Build Command | `npm run build` |
  | Output Directory | `dist` |

- [ ] Thêm **Environment Variables** trong Vercel:
  ```
  VITE_API_URL   = https://{render-url}.onrender.com
  VITE_IMAGE_URL = /images/
  ```

- [ ] Click **Deploy** → đợi ~2–3 phút
- [ ] Ghi lại URL FE: `https://______________________________.vercel.app`

---

### 2D — Vercel: Deploy MotoShop_ADMIN

- [ ] **Add New... → Project** → Import cùng repo (tạo project mới)
- [ ] Cấu hình:

  | Setting | Giá trị |
  |---|---|
  | Project Name | `motoshop-admin` |
  | Root Directory | `MotoShop_ADMIN` |
  | Framework Preset | `Vite` |
  | Build Command | `npm run build` |
  | Output Directory | `dist` |

- [ ] Thêm **Environment Variables**:
  ```
  VITE_API_URL   = https://{render-url}.onrender.com
  VITE_IMAGE_URL = /images/
  ```

- [ ] Click **Deploy** → đợi ~2–3 phút
- [ ] Ghi lại URL Admin: `https://______________________________.vercel.app`

---

### 2E — Cập nhật CORS với URL Vercel thật

- [ ] Mở `CorsConfig.java`, điền đúng URL thật vừa có:
  ```java
  "https://{ten-fe}.vercel.app",
  "https://{ten-admin}.vercel.app"
  ```
- [ ] Commit + push → Render tự redeploy BE (~3–5 phút)

---

## 🗄️ GIAI ĐOẠN 3 — Import data & Kiểm tra (~1 giờ)

### 3A — Export database từ local

- [ ] Chạy dump:
  ```powershell
  docker exec motorbike-shop-mysql mysqldump `
    -uroot -p123456 `
    --no-tablespaces `
    motorbike_shop > motoshop_dump.sql
  ```
- [ ] Kiểm tra file tạo thành công (kích thước > 0)

---

### 3B — Import database lên Railway

- [ ] Cách 1 — Qua Railway GUI: vào MySQL project → **Data** tab → **Import** → upload file `.sql`

- [ ] Cách 2 — Qua CLI:
  ```bash
  mysql -h {MYSQLHOST} -P {MYSQLPORT} -u {MYSQLUSER} -p{MYSQLPASSWORD} {MYSQLDATABASE} < motoshop_dump.sql
  ```

- [ ] Xác nhận import thành công:
  ```sql
  SELECT COUNT(*) FROM product;   -- phải > 0
  SELECT COUNT(*) FROM user;      -- phải > 0
  ```

---

### 3C — Checklist kiểm tra cuối cùng

**Backend:**
- [ ] `GET https://{render}.onrender.com/api/products` → trả JSON *(chờ 30–60s nếu BE vừa ngủ)*

**Frontend:**
- [ ] Trang chủ FE load bình thường, sản phẩm hiển thị
- [ ] Ảnh sản phẩm load được
- [ ] F5 trên trang `/products` → không bị 404
- [ ] Đăng nhập user (`HuyTrinh / 123456`) → vào được trang cá nhân
- [ ] Thêm giỏ → Checkout → COD → Đặt hàng thành công

**Admin:**
- [ ] Trang login Admin load bình thường
- [ ] Đăng nhập Admin (`admin / 123456`) → vào được dashboard
- [ ] F5 trên trang con Admin → không bị 404
- [ ] Xem danh sách đơn hàng vừa tạo

**Email:**
- [ ] Đăng ký tài khoản mới → nhận được email OTP trong vòng 1 phút

---

## 🐛 Xử lý lỗi thường gặp

| Triệu chứng | Nguyên nhân | Cách fix |
|---|---|---|
| CORS error trên browser | Domain Vercel chưa có trong CorsConfig | Sửa CorsConfig, redeploy BE |
| `Network Error` / API không gọi được | `VITE_API_URL` sai hoặc BE đang ngủ | Kiểm tra env var Vercel; chờ 60s rồi thử lại |
| Ảnh không hiển thị | `VITE_IMAGE_URL` sai | Sửa env var, redeploy Vercel |
| F5 bị 404 | Thiếu `vercel.json` | Tạo file, commit, redeploy |
| DB connection refused | Sai `DB_URL` trong Render | Kiểm tra host/port/password Railway |
| Build fail: `./mvnw: Permission denied` | mvnw thiếu quyền execute | Đổi Build Command thành `chmod +x mvnw && ./mvnw clean package -DskipTests` |
| Email không gửi được | App Password sai | Kiểm tra `MAIL_PASSWORD` trong Render env vars |
| BE khởi động chậm (~60s) | Render free tier sleep sau 15 phút | Bình thường, không phải lỗi |

---

## 📝 Ghi chú URL sau khi deploy

| Thành phần | URL thật |
|---|---|
| **MotoShop_FE** | `https://` |
| **MotoShop_ADMIN** | `https://` |
| **MotoShop_BE (Render)** | `https://` |
| **Railway MySQL** | (internal, lưu trong Render env vars) |

---

*File này được lưu tại: `docs/DeployChecklist.md`*
