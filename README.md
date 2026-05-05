# MotoShop 🏍️

> Nền tảng thương mại điện tử chuyên doanh xe máy — bán hàng, quản trị, và thanh toán đa kênh tích hợp trên một hệ thống.

![Java](https://img.shields.io/badge/Java-17-blue?logo=openjdk)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.x-brightgreen?logo=springboot)
![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript)
![MySQL](https://img.shields.io/badge/MySQL-8.x-4479A1?logo=mysql)
![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?logo=vite)
![License](https://img.shields.io/badge/license-MIT-green)

---

## Mục lục

- [Tổng quan](#tổng-quan)
- [Kiến trúc hệ thống](#kiến-trúc-hệ-thống)
- [Tính năng nổi bật](#tính-năng-nổi-bật)
- [Yêu cầu hệ thống](#yêu-cầu-hệ-thống)
- [Cài đặt & Chạy local](#cài-đặt--chạy-local)
  - [1. Clone repo](#1-clone-repo)
  - [2. Khởi động MySQL (Docker)](#2-khởi-động-mysql-docker)
  - [3. Import dữ liệu mẫu](#3-import-dữ-liệu-mẫu)
  - [4. Cấu hình Backend](#4-cấu-hình-backend)
  - [5. Chạy Backend](#5-chạy-backend)
  - [6. Chạy Frontend](#6-chạy-frontend)
- [Cấu trúc thư mục](#cấu-trúc-thư-mục)
- [Biến môi trường](#biến-môi-trường)
- [Thanh toán tích hợp](#thanh-toán-tích-hợp)
- [Xử lý lỗi thường gặp](#xử-lý-lỗi-thường-gặp)
- [Tài liệu liên quan](#tài-liệu-liên-quan)

---

## Tổng quan

**MotoShop** là hệ thống thương mại điện tử dành cho đại lý xe máy, bao gồm:

| Thành phần | Công nghệ | Mô tả |
|---|---|---|
| `MotoShop_BE` | Spring Boot 3 + Java 17 | REST API, xác thực, nghiệp vụ, kết nối CSDL |
| `MotoShop_FE` | React 18 + TypeScript + Vite | Website bán hàng cho khách |
| `MotoShop_ADMIN` | React 18 + TypeScript + Vite | Dashboard quản trị nội bộ |

Dự án tổ chức theo **monorepo** — tất cả 3 ứng dụng nằm trong cùng một repository.

---

## Kiến trúc hệ thống

```
┌─────────────────────────────────────────────┐
│                  Client Browser              │
│                                             │
│  MotoShop_FE (port 5173)  MotoShop_ADMIN (port 5174) │
└──────────────┬──────────────────┬───────────┘
               │   HTTP / Axios   │
               ▼                  ▼
┌─────────────────────────────────────────────┐
│          MotoShop_BE  (port 8081)           │
│  Spring Security + JWT                      │
│  REST Controllers (web/ + web/admin/)       │
│  Services → Repositories (JPA)             │
└──────────────────────┬──────────────────────┘
                       │
                       ▼
              MySQL 8.x  (port 3306)
              database: motorbike_shop
```

### Backend — Phân lớp chi tiết

```
MotoShop_BE/src/main/java/com/motoshop/
├── web/              # REST controllers (client API)
├── web/admin/        # REST controllers (admin API)
├── services/         # Business logic (interface)
├── services/impl/    # Business logic (implementation)
├── repositories/     # Spring Data JPA repositories
├── models/           # JPA Entities / Domain models
├── securities/       # JWT filter, UserDetailsService, entry point
└── config/           # CORS, Security, Email, Payment config
```

---

## Tính năng nổi bật

### Khách hàng (`MotoShop_FE`)
- 🛒 **Mua hàng**: duyệt sản phẩm, giỏ hàng, thanh toán (COD / MoMo / VNPay / ZaloPay)
- 👤 **Tài khoản**: đăng ký, đăng nhập, quản lý hồ sơ, địa chỉ giao hàng, lịch sử đơn hàng
- 📰 **Nội dung**: bài viết, thông báo, trang liên hệ, tìm kiếm sản phẩm

### Quản trị (`MotoShop_ADMIN`)
- 📦 **Sản phẩm**: thêm/sửa/xóa xe, quản lý biến thể (màu sắc, phiên bản), hình ảnh
- 🧾 **Đơn hàng**: xem, xử lý trạng thái, lịch sử đơn hàng
- 🏷️ **Khuyến mãi / Sale**: quản lý chương trình giảm giá
- 🗂️ **Danh mục, Banner, Bài viết**: quản lý nội dung trang chủ
- 📊 **Dashboard & Analytics**: biểu đồ doanh thu với ApexCharts

### Backend (`MotoShop_BE`)
- 🔐 **Xác thực**: JWT (access token + refresh token), phân quyền ROLE_USER / ROLE_ADMIN
- 📧 **Email OTP**: xác minh tài khoản qua email
- 💳 **Thanh toán**: MoMo, VNPay, ZaloPay tích hợp sẵn
- 🛵 **Thông số xe máy**: lưu đặc tả kỹ thuật chi tiết (động cơ, công suất, dung tích...)

---

## Yêu cầu hệ thống

| Công cụ | Phiên bản tối thiểu |
|---|---|
| Java | 17 |
| Maven | 3.8+ (hoặc dùng `mvnw` có sẵn) |
| Node.js | 18+ |
| npm | 9+ |
| Docker | 20+ (để chạy MySQL) |
| MySQL | 8.x (qua Docker) |

**Kiểm tra nhanh:**
```powershell
java -version
mvn -v        # hoặc .\MotoShop_BE\mvnw.cmd -v
node -v
npm -v
docker -v
```

---

## Cài đặt & Chạy local

> 📖 Tài liệu chi tiết hơn: [README_LOCAL.md](./README_LOCAL.md)

### 1. Clone repo

```bash
git clone <repository-url>
cd Moto-shop
```

### 2. Khởi động MySQL (Docker)

```powershell
# Lần đầu — tạo container
docker run --name motorbike-shop-mysql `
  -e MYSQL_ROOT_PASSWORD=123456 `
  -e MYSQL_DATABASE=motorbike_shop `
  -p 3306:3306 `
  -v motorbike_shop_mysql_data:/var/lib/mysql `
  -d mysql:8.0

# Những lần sau — khởi động lại
docker start motorbike-shop-mysql
```

### 3. Import dữ liệu mẫu

> **Thay `YOUR_PASSWORD`** bằng password MySQL của bạn (mặc định: `123456`).

**PowerShell:**
```powershell
# Import schema + dữ liệu mẫu
Get-Content .\motorbike_shop.sql | docker exec -i -e MYSQL_PWD=YOUR_PASSWORD motorbike-shop-mysql mysql -u root motorbike_shop

# Chạy migration (tạo bảng variant và các bảng mới)
Get-Content .\migrations\week1_day1_create_variant_table.sql | docker exec -i -e MYSQL_PWD=YOUR_PASSWORD motorbike-shop-mysql mysql -u root motorbike_shop
```

**CMD:**
```cmd
docker exec -i -e MYSQL_PWD=YOUR_PASSWORD motorbike-shop-mysql mysql -u root motorbike_shop < .\motorbike_shop.sql
docker exec -i -e MYSQL_PWD=YOUR_PASSWORD motorbike-shop-mysql mysql -u root motorbike_shop < .\migrations\week1_day1_create_variant_table.sql
```

### 4. Cấu hình Backend

File cấu hình: `MotoShop_BE/src/main/resources/application.yaml`

Các giá trị **mặc định** (dùng được ngay nếu chạy MySQL theo hướng dẫn trên):

| Tham số | Giá trị mặc định |
|---|---|
| `DB_URL` | `jdbc:mysql://localhost:3306/motorbike_shop` |
| `DB_USERNAME` | `root` |
| `DB_PASSWORD` | `123456` |
| `SERVER_PORT` | `8081` |

> Để ghi đè: tạo file `MotoShop_BE/src/main/resources/application-local.yaml` với các giá trị tùy chỉnh. File này đã được `.gitignore`.

### 5. Chạy Backend

```powershell
cd .\MotoShop_BE
.\mvnw.cmd spring-boot:run
```

Hoặc nếu đã cài Maven global:
```powershell
cd .\MotoShop_BE
mvn spring-boot:run
```

✅ Backend sẵn sàng tại: `http://localhost:8081`

### 6. Chạy Frontend

Mở **2 terminal riêng biệt**:

**Terminal 1 — Frontend khách hàng:**
```powershell
cd .\MotoShop_FE
npm install
npm run dev
# Mở: http://localhost:5173
```

**Terminal 2 — Frontend quản trị:**
```powershell
cd .\MotoShop_ADMIN
npm install
npm run dev
# Mở: http://localhost:5174
```

> Cả hai frontend đều trỏ API về `http://localhost:8081`.  
> Nếu đổi cổng backend, cập nhật `API_URL` trong:
> - `MotoShop_FE/src/constants/utils.ts`
> - `MotoShop_ADMIN/src/constants/utils.ts`

---

## Cấu trúc thư mục

```
Moto-shop/
├── MotoShop_BE/                  # Spring Boot backend
│   └── src/main/
│       ├── java/com/motoshop/    # Java source code
│       └── resources/
│           ├── application.yaml  # Cấu hình chính (commit được)
│           └── application-local.yaml  # Secret local (gitignore)
├── MotoShop_FE/                  # Frontend khách hàng (React + Vite)
├── MotoShop_ADMIN/               # Frontend quản trị (React + Vite)
├── migrations/                   # SQL migration scripts
├── motorbike_shop.sql            # Dữ liệu mẫu + schema ban đầu
├── README.md                     # Tài liệu này
├── README_LOCAL.md               # Hướng dẫn chạy local chi tiết
├── MIGRATION_PLAN.md             # Kế hoạch phát triển / migration
└── NOTES_IMAGE_STORAGE.md        # Ghi chú về chiến lược lưu ảnh
```

---

## Biến môi trường

| File | Mục đích | Commit lên Git? |
|---|---|---|
| `application.yaml` | Template, dùng `${VAR:DEFAULT}` | ✅ Có |
| `application-local.yaml` | Secret thật cho môi trường local | ❌ Không (gitignore) |
| `.env.example` | Mẫu biến môi trường cho production | ✅ Có (không chứa secret) |

**Các biến quan trọng cho production:**

```bash
SPRING_PROFILES_ACTIVE=prod
DB_URL=jdbc:mysql://your-db-host:3306/motorbike_shop?useSSL=true
DB_USERNAME=your_user
DB_PASSWORD=your_password
MAIL_USERNAME=your_mail@gmail.com
MAIL_PASSWORD=your_app_password
JWT_SECRET=<generated_secret>
```

**Sinh JWT secret:**
```powershell
# PowerShell
[Convert]::ToBase64String((1..64 | ForEach-Object { Get-Random -Maximum 256 }))
```
```bash
# Linux / macOS
openssl rand -base64 64
```

---

## Thanh toán tích hợp

| Cổng thanh toán | Controller | Config |
|---|---|---|
| MoMo | `MomoPayController` | `MomoConfig`, `MomoEncoderUtils` |
| VNPay | `VnPayController` | `VnpayConfig` |
| ZaloPay | `ZaloPayPaymentController` | `ZaloPayConfig` |

> Thông tin key/credential của từng cổng thanh toán phải được cấu hình qua biến môi trường — **không hardcode** vào source code.

---

## Xử lý lỗi thường gặp

<details>
<summary>❌ Không kết nối được MySQL</summary>

- Kiểm tra Docker container đang chạy: `docker ps`
- Kiểm tra `DB_USERNAME` / `DB_PASSWORD` trong `application-local.yaml`
- Đảm bảo database `motorbike_shop` đã được tạo và import SQL thành công

</details>

<details>
<summary>❌ Cổng 8081 đã được sử dụng</summary>

- Tìm process đang chiếm cổng: `netstat -ano | findstr :8081`
- Tắt process đó hoặc đổi `server.port` trong `application.yaml`
- Nếu đổi cổng, cập nhật `API_URL` trong cả `MotoShop_FE` và `MotoShop_ADMIN`

</details>

<details>
<summary>❌ Lỗi khi chạy npm install / npm run dev</summary>

Xóa cache và cài lại:
```powershell
Remove-Item -Recurse -Force .\node_modules
Remove-Item -Force .\package-lock.json
npm install
```
> Chỉ xóa `package-lock.json` khi chấp nhận cập nhật lockfile.

</details>

<details>
<summary>❌ Maven không nhận diện được lệnh mvn</summary>

Dùng Maven wrapper có sẵn trong repo thay thế:
```powershell
cd .\MotoShop_BE
.\mvnw.cmd spring-boot:run
```

</details>

---

## Tài liệu liên quan

- [README_LOCAL.md](./README_LOCAL.md) — Hướng dẫn chạy local chi tiết
- [MIGRATION_PLAN.md](./MIGRATION_PLAN.md) — Kế hoạch phát triển tính năng
- [NOTES_IMAGE_STORAGE.md](./NOTES_IMAGE_STORAGE.md) — Chiến lược lưu trữ hình ảnh sản phẩm

---

> Dự án được phát triển phục vụ mục đích học tập / đồ án tốt nghiệp.
