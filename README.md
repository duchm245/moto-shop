# MotoShop 🏍️

> Nền tảng thương mại điện tử chuyên kinh doanh xe máy — Spring Boot 3 + React 18 + MySQL 8.

![Java](https://img.shields.io/badge/Java-17-blue?logo=openjdk)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.x-brightgreen?logo=springboot)
![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript)
![MySQL](https://img.shields.io/badge/MySQL-8.x-4479A1?logo=mysql)

---

## Mục lục

1. [Tổng quan](#tổng-quan)
2. [Tính năng](#tính-năng)
3. [Kiến trúc hệ thống](#kiến-trúc-hệ-thống)
4. [Cài đặt & Chạy local](#cài-đặt--chạy-local)
5. [Công nghệ & Thư viện sử dụng](#công-nghệ--thư-viện-sử-dụng)
6. [Phần mềm & Công cụ phát triển](#phần-mềm--công-cụ-phát-triển)
7. [Cơ sở dữ liệu](#cơ-sở-dữ-liệu)
8. [Tác vụ tự động](#tác-vụ-tự-động)
9. [Biến môi trường](#biến-môi-trường)
10. [Tích hợp thanh toán](#tích-hợp-thanh-toán)
11. [Lưu trữ ảnh sản phẩm](#lưu-trữ-ảnh-sản-phẩm)
12. [Xử lý lỗi thường gặp](#xử-lý-lỗi-thường-gặp)
13. [Cấu trúc thư mục](#cấu-trúc-thư-mục)
14. [Sơ đồ ERD](#sơ-đồ-erd)

---

## Tổng quan

**MotoShop** là hệ thống thương mại điện tử dành cho đại lý xe máy, tổ chức theo **monorepo** gồm 3 ứng dụng:

| Thành phần | Công nghệ | Mô tả |
|---|---|---|
| `MotoShop_BE` | Spring Boot 3 + Java 17 | REST API, xác thực JWT, nghiệp vụ, CSDL |
| `MotoShop_FE` | React 18 + TypeScript + Vite | Website bán hàng cho khách |
| `MotoShop_ADMIN` | React 18 + TypeScript + Vite | Dashboard quản trị nội bộ |

---

## Tính năng

**Khách hàng (`MotoShop_FE`)**
- Tìm kiếm & lọc xe theo hãng / loại / giá / tình trạng
- Xem thông số kỹ thuật chi tiết, so sánh xe, tính toán trả góp, yêu cầu tư vấn
- Thêm vào giỏ hàng & thanh toán đa kênh (COD / MoMo / VNPay / ZaloPay)
- Đăng ký, đăng nhập, theo dõi đơn hàng & quản lý địa chỉ giao hàng
- Đọc tin tức xe máy, sự kiện & cập nhật khuyến mãi

**Quản trị (`MotoShop_ADMIN`)**
- Quản lý xe máy: thêm / sửa / xóa, biến thể (màu, phiên bản), thông số kỹ thuật
- Xử lý đơn hàng, quản lý khách hàng, yêu cầu tư vấn
- Chương trình Sale / Khuyến mãi, Banner, Bài viết
- Dashboard & Analytics (ApexCharts), cấu hình thông tin cửa hàng

**Backend (`MotoShop_BE`)**
- JWT (access + refresh token), phân quyền ROLE_USER / ROLE_ADMIN / ROLE_EMPLOYEE
- Xác minh tài khoản qua Email OTP
- Tích hợp MoMo, VNPay, ZaloPay
- Scheduled tasks: tự động cập nhật trạng thái sale & cảnh báo tồn kho

---

## Kiến trúc hệ thống

```
MotoShop_FE (5173)     MotoShop_ADMIN (5174)
        │                       │
        └───────── Axios ────────┘
                    │
           MotoShop_BE (8081)
         Spring Security + JWT
         REST Controllers / Services / JPA
                    │
              MySQL 8.x (3306)
           database: motorbike_shop
```

```
MotoShop_BE/src/main/java/com/motoshop/
├── web/           # REST controllers (client API)
├── web/admin/     # REST controllers (admin API)
├── services/      # Business logic
├── repositories/  # Spring Data JPA
├── models/        # JPA Entities
├── securities/    # JWT filter, UserDetailsService
└── config/        # CORS, Security, Payment config
```

---

## Cài đặt & Chạy local

### Yêu cầu hệ thống

| Công cụ | Phiên bản |
|---|---|
| Java (JDK) | 17 |
| Maven | 3.8+ (hoặc dùng `mvnw` có sẵn trong project) |
| Node.js | 18+ |
| npm | 9+ |
| Docker Desktop | 20+ |

```powershell
# Kiểm tra nhanh
java -version; node -v; npm -v; docker -v
```

---

### Bước 1 — Clone & Khởi động MySQL

```powershell
git clone <repository-url>
cd Moto-shop

# Lần đầu — tạo container MySQL
docker run --name motorbike-shop-mysql `
  -e MYSQL_ROOT_PASSWORD=123456 `
  -e MYSQL_DATABASE=motorbike_shop `
  -p 3306:3306 `
  -v motorbike_shop_mysql_data:/var/lib/mysql `
  -d mysql:8.0

# Những lần sau — chỉ cần:
docker start motorbike-shop-mysql
```

### Bước 2 — Import database

```powershell
# PowerShell
Get-Content .\motoshop_full_dump.sql | docker exec -i -e MYSQL_PWD=123456 motorbike-shop-mysql mysql -u root motorbike_shop
```

```cmd
:: CMD
docker exec -i -e MYSQL_PWD=123456 motorbike-shop-mysql mysql -u root motorbike_shop < .\motoshop_full_dump.sql
```

### Bước 3 — Cấu hình Backend (tuỳ chọn)

`application.yaml` đã có giá trị mặc định dùng được ngay:

| Tham số | Giá trị mặc định |
|---|---|
| DB URL | `jdbc:mysql://localhost:3306/motorbike_shop` |
| DB user / password | `root` / `123456` |
| Server port | `8081` |
| JWT expiration | `7200000 ms` (2 giờ) |

Nếu cần ghi đè, tạo `MotoShop_BE/src/main/resources/application-local.yaml`:

```yaml
spring:
  datasource:
    password: YOUR_PASSWORD
app:
  jwt:
    secret: YOUR_JWT_SECRET
```

> `application-local.yaml` đã có trong `.gitignore` — không bị commit lên Git.

### Bước 4 — Chạy ứng dụng

Mở **3 terminal độc lập** từ thư mục gốc `Moto-shop/`:

```powershell
# Terminal 1 — Backend API
cd MotoShop_BE && .\mvnw.cmd spring-boot:run      # → http://localhost:8081

# Terminal 2 — Frontend khách hàng
cd MotoShop_FE && npm install && npm run dev       # → http://localhost:5173

# Terminal 3 — Admin panel
cd MotoShop_ADMIN && npm install && npm run dev    # → http://localhost:5174
```

**Tài khoản mặc định:** `admin / 123456` (ROLE_ADMIN)

---

## Công nghệ & Thư viện sử dụng

### Backend — Spring Boot 3 (Java 17, Maven)

| Thư viện | Phiên bản | Chức năng |
|---|---|---|
| Spring Boot | 3.0.5 | Framework chính, khởi động & tự động cấu hình ứng dụng |
| Spring Web | — | Xây dựng REST API (HTTP endpoints, JSON response) |
| Spring Data JPA | — | Tương tác CSDL qua ORM (Hibernate), giảm code SQL thủ công |
| Spring Security | — | Xác thực người dùng, phân quyền theo vai trò (ROLE) |
| Spring Mail | — | Gửi email (OTP xác minh tài khoản, thông báo) |
| Spring Validation | — | Kiểm tra dữ liệu đầu vào tự động (Bean Validation / JSR-380) |
| MySQL Connector/J | — | Driver JDBC kết nối MySQL |
| JJWT (api + impl + jackson) | 0.11.2 | Tạo, ký và xác thực JSON Web Token (HS512) |
| Lombok | — | Tự sinh getter / setter / constructor, giảm boilerplate |
| MapStruct | 1.5.3 | Chuyển đổi tự động giữa JPA Entity và DTO |
| Gson | 2.8.8 | Xử lý JSON (dùng trong tích hợp cổng thanh toán) |
| Apache HttpClient | — | Gửi HTTP request đến API bên thứ ba (MoMo, ZaloPay) |
| Commons IO | 2.11.0 | Tiện ích đọc / ghi file |

**Lệnh Maven:**

```powershell
.\mvnw.cmd spring-boot:run              # Chạy ứng dụng (dev)
.\mvnw.cmd clean package -DskipTests    # Build file JAR
.\mvnw.cmd test                         # Chạy unit test
java -jar target/MotoShop_BE-*.jar      # Chạy file JAR đã build
.\mvnw.cmd dependency:tree              # Xem cây dependency
```

---

### Frontend — React 18 + TypeScript + Vite

> Áp dụng cho cả `MotoShop_FE` (cổng 5173) và `MotoShop_ADMIN` (cổng 5174).

| Thư viện | Phiên bản | Chức năng |
|---|---|---|
| React + React DOM | 18.2.0 | Thư viện UI, xây dựng giao diện theo component |
| React Router DOM | 6.15.0 | Điều hướng trang trong SPA (client-side routing) |
| Redux + React Redux | 4.2.1 / 8.1.2 | Quản lý state toàn cục của ứng dụng |
| Redux Thunk | 2.4.2 | Middleware xử lý action bất đồng bộ (gọi API) |
| Axios | 1.5.0 | Gửi HTTP request đến backend REST API |
| Bootstrap | 5.3.1 | Framework CSS responsive (grid, component sẵn) |
| Swiper | 10.2.0 | Carousel / slider ảnh sản phẩm |
| React Toastify | 9.1.3 | Hiển thị thông báo toast (thành công / lỗi) |
| React Modal | 3.16.1 | Hộp thoại popup |
| noUiSlider | 15.7.1 | Thanh trượt lọc giá |
| date-fns | 2.30.0 | Định dạng và tính toán ngày tháng |
| Lodash | 4.17.21 | Thư viện tiện ích JavaScript (debounce, cloneDeep…) |
| TypeScript | 5.0.2 | Kiểm tra kiểu dữ liệu tĩnh, phát hiện lỗi lúc biên dịch |
| Vite | 4.4.5 | Công cụ build nhanh (ESM native, HMR tức thì) |
| ESLint + Prettier | — | Kiểm tra và định dạng code tự động |

**Chỉ có trong `MotoShop_ADMIN`:**

| Thư viện | Phiên bản | Chức năng |
|---|---|---|
| ApexCharts + React ApexCharts | 3.41.1 / 1.4.1 | Vẽ biểu đồ thống kê (doanh thu, đơn hàng) |
| React Datepicker | 4.16.0 | Component chọn khoảng ngày (lọc báo cáo) |
| React Quill | 2.0.0 | Trình soạn thảo văn bản phong phú (WYSIWYG) cho bài viết |
| jwt-decode | 3.1.2 | Giải mã nội dung JWT phía client (đọc thông tin user) |
| TailwindCSS | 3.3.3 | Framework CSS tiện ích (utility-first) |
| PostCSS + Autoprefixer | 8.4.28 / 10.4.15 | Xử lý và tối ưu CSS, tự thêm prefix cho trình duyệt cũ |

**Lệnh npm:**

```powershell
npm install          # Cài đặt toàn bộ dependencies
npm run dev          # Khởi động dev server (hot reload)
npm run build        # Build production (TypeScript compile + Vite bundle)
npm run preview      # Xem trước bản build production cục bộ
npm run lint         # Kiểm tra lỗi cú pháp với ESLint
npm run lint:fix     # Tự động sửa lỗi ESLint có thể sửa được
npm run prettier     # Kiểm tra định dạng code với Prettier
npm run prettier:fix # Tự động định dạng toàn bộ code
```

---

## Phần mềm & Công cụ phát triển

### IntelliJ IDEA

**Mục đích:** IDE chính để phát triển backend Java / Spring Boot (`MotoShop_BE`).

**Chức năng chính:**
- Nhận diện annotations Spring Boot (`@RestController`, `@Service`, `@Autowired`…), code completion thông minh
- Tích hợp Maven: tải dependencies, build, run trực tiếp mà không cần mở terminal
- Debugger tích hợp: đặt breakpoint, xem giá trị biến runtime, step over / into / out
- Kiểm tra lỗi tĩnh, refactoring an toàn (rename, extract method, inline variable…)
- Terminal tích hợp, Git GUI (commit, push, pull, blame, diff) ngay trong IDE

**Phím tắt quan trọng:**

| Phím tắt | Chức năng |
|---|---|
| `Shift + F10` | Chạy ứng dụng |
| `Shift + F9` | Chạy ở chế độ Debug |
| `Ctrl + B` | Nhảy đến định nghĩa (Go to definition) |
| `Alt + Enter` | Gợi ý sửa lỗi nhanh (Quick fix) |
| `Ctrl + Alt + L` | Định dạng code tự động |
| `Ctrl + Shift + F` | Tìm kiếm toàn dự án |
| `Ctrl + Shift + Alt + S` | Mở Project Structure (cấu hình JDK, module) |
| `Double Shift` | Tìm nhanh mọi thứ (file, class, action) |
| `Ctrl + E` | Mở file vừa chỉnh sửa gần đây |

---

### Visual Studio Code (VS Code)

**Mục đích:** IDE phát triển frontend cho `MotoShop_FE` và `MotoShop_ADMIN`.

**Extension cần cài:**

| Extension | Chức năng |
|---|---|
| ESLint | Phát hiện lỗi cú pháp JavaScript / TypeScript theo cấu hình dự án |
| Prettier – Code Formatter | Tự động định dạng code khi lưu file |
| ES7+ React/Redux Snippets | Snippet gõ nhanh (`rafce` → component, `useState`…) |
| TypeScript Importer | Tự động import khi gõ tên hàm / component |
| Tailwind CSS IntelliSense | Gợi ý class Tailwind (dùng trong Admin) |
| GitLens | Xem git blame, lịch sử thay đổi từng dòng code |
| Auto Rename Tag | Tự đổi tên tag đóng khi sửa tag mở trong JSX / HTML |

**Phím tắt quan trọng:**

| Phím tắt | Chức năng |
|---|---|
| `` Ctrl + ` `` | Mở / đóng terminal tích hợp |
| `Ctrl + Shift + P` | Mở Command Palette (tìm mọi lệnh) |
| `Ctrl + P` | Tìm nhanh file theo tên |
| `Ctrl + Shift + F` | Tìm kiếm toàn bộ dự án |
| `Alt + Shift + F` | Format code (Prettier) |
| `F12` | Nhảy đến định nghĩa (Go to definition) |
| `Ctrl + /` | Comment / bỏ comment dòng hiện tại |
| `Ctrl + D` | Chọn thêm từ giống nhau (multi-cursor edit) |

---

### Antigravity — Google AI Coding Assistant

**Website:** https://antigravity.google

**Mục đích:** Trợ lý AI của Google hỗ trợ lập trình viên viết code nhanh hơn, hiệu quả hơn trong quá trình phát triển.

**Chức năng chính:**
- Gợi ý và tự động hoàn thành code (code completion) theo ngữ cảnh đang viết
- Giải thích đoạn code được chọn bằng ngôn ngữ tự nhiên (tiếng Việt / tiếng Anh)
- Tạo code mới từ mô tả yêu cầu (viết bằng comment hoặc chat)
- Phát hiện lỗi logic và đề xuất cách sửa
- Refactor code: tối ưu hiệu năng, đổi tên biến, tách hàm…
- Hỗ trợ nhiều ngôn ngữ: Java, TypeScript, JavaScript, SQL, YAML…

**Ứng dụng trong dự án:**
- Viết nhanh boilerplate Spring Boot (Controller, Service, Repository)
- Gợi ý câu truy vấn JPQL / SQL cho `ProductRepository`, `OrdersRepository`
- Giải thích annotation: `@Scheduled`, `@PreAuthorize`, `@Transactional`…
- Hỗ trợ viết component React, Redux action, Axios interceptor

---

### Postman

**Mục đích:** Kiểm thử và gỡ lỗi REST API backend trong quá trình phát triển.

**Chức năng chính:**
- Gửi HTTP request: `GET`, `POST`, `PUT`, `DELETE`, `PATCH` đến backend
- Đính kèm header xác thực: `Authorization: Bearer <JWT_token>`
- Gửi request body dạng JSON hoặc form-data (upload ảnh sản phẩm)
- Lưu collection request phân theo module (Auth, Product, Order, Admin…)
- Quản lý biến môi trường (`{{base_url}}`, `{{token}}`) dùng chung cho dev / prod
- Viết test script tự động kiểm tra response (status code, giá trị JSON…)

**Ví dụ request dùng trong dự án:**

```
POST  {{base_url}}/api/auth/login
Body: { "username": "admin", "password": "123456" }
→ Trả về JWT token dùng cho các request tiếp theo

GET   {{base_url}}/api/products
→ Lấy danh sách sản phẩm (public, không cần token)

GET   {{base_url}}/api/admin/orders
Header: Authorization: Bearer {{token}}
→ Lấy danh sách đơn hàng (yêu cầu ROLE_ADMIN)
```

---

### Docker Desktop

**Mục đích:** Chạy MySQL 8 trong container, không cần cài trực tiếp vào máy, dễ reset và chia sẻ môi trường.

**Chức năng chính:**
- Quản lý container (start, stop, restart, xóa) qua GUI hoặc lệnh CLI
- Kéo (pull) image từ Docker Hub (`mysql:8.0`)
- Quản lý volume để dữ liệu MySQL bền vững qua các lần tắt / bật máy
- Xem log real-time, thống kê CPU / RAM từng container

**Lệnh Docker thường dùng:**

```powershell
docker ps                              # Xem container đang chạy
docker ps -a                           # Xem tất cả container
docker start motorbike-shop-mysql      # Khởi động container MySQL
docker stop motorbike-shop-mysql       # Dừng container
docker logs motorbike-shop-mysql       # Xem log MySQL
docker exec -it motorbike-shop-mysql mysql -u root -p  # Vào MySQL shell
docker volume ls                       # Xem danh sách volume
```

> Xem lệnh khởi tạo container lần đầu tại phần [Hướng dẫn cài đặt chi tiết](#hướng-dẫn-cài-đặt-chi-tiết).

---

### DataGrip

**Mục đích:** Quản lý, truy vấn và kiểm tra dữ liệu MySQL trực quan, thay thế MySQL Workbench.

**Chức năng chính:**
- Kết nối MySQL, duyệt toàn bộ schema: bảng, cột, index, khóa ngoại, trigger
- Soạn và chạy SQL query, kết quả hiển thị dạng bảng có thể sửa trực tiếp
- Tự động sinh sơ đồ ERD (Entity Relationship Diagram) từ schema
- So sánh schema giữa 2 database để phát hiện sai lệch sau migration
- Export / import dữ liệu (CSV, SQL, JSON, Excel…)

**Cấu hình kết nối:**

| Tham số | Giá trị |
|---|---|
| Host | `localhost` |
| Port | `3306` |
| Database | `motorbike_shop` |
| User | `root` |
| Password | `123456` |
| Driver | MySQL 8.x (DataGrip tự tải) |

**Lệnh SQL hay dùng:**

```sql
SHOW TABLES;
DESCRIBE product;
SELECT * FROM product LIMIT 10;
SELECT * FROM orders WHERE status = 'PENDING';
SELECT COUNT(*) FROM user;
SELECT * FROM variant WHERE quantity <= 100;   -- Sản phẩm sắp hết hàng
```

---

## Cơ sở dữ liệu

**Database:** `motorbike_shop` — MySQL 8.x

**Tài khoản mặc định (sau khi import dump):**

| Tài khoản | Email | Mật khẩu | Vai trò |
|---|---|---|---|
| admin | duchm245@gmail.com | `123456` | ROLE_ADMIN |
| linhdev | thangdv007@gmail.com | `123456` | ROLE_EMPLOYEE |
| HuyTrinh | thangdvvip@gmail.com | `123456` | ROLE_USER |

**Các bảng chính:**

| Bảng | Mô tả |
|---|---|
| `user`, `role`, `user_roles` | Tài khoản người dùng và phân quyền |
| `product`, `product_image` | Danh mục xe máy và ảnh sản phẩm |
| `variant` | Biến thể sản phẩm (màu sắc, phiên bản, tồn kho) |
| `category` | Danh mục / hãng xe |
| `color`, `size` | Thuộc tính sản phẩm |
| `orders`, `order_item` | Đơn hàng và chi tiết đơn hàng |
| `address` | Địa chỉ giao hàng của khách |
| `sales` | Chương trình khuyến mãi / giảm giá |
| `article`, `article_image` | Bài viết / tin tức |
| `banner` | Banner marketing trang chủ |
| `policy`, `policy_image` | Chính sách cửa hàng |
| `notifications` | Thông báo nội bộ (cảnh báo hết hàng) |
| `consult_request` | Yêu cầu tư vấn từ khách hàng |
| `company`, `social_media` | Thông tin cửa hàng và mạng xã hội |

---

## Tác vụ tự động

Backend có 2 tác vụ chạy ngầm, được cấu hình bằng `@Scheduled` của Spring:

| Lịch chạy | Cron | Chức năng |
|---|---|---|
| Mỗi 1 phút | `0 * * * * *` | Kích hoạt / hủy Sale theo ngày, cập nhật giá khuyến mãi trên sản phẩm |
| 20:30 hàng ngày | `0 30 20 ? * *` | Quét tồn kho, tạo thông báo cảnh báo admin khi variant ≤ 100 đơn vị |

---

## Biến môi trường

| File | Mục đích | Commit vào Git? |
|---|---|---|
| `application.yaml` | Template với giá trị mặc định cho dev | ✅ Có |
| `application-local.yaml` | Ghi đè cho máy cá nhân (password thật) | ❌ Không |

**Biến cần thiết khi deploy production:**

```bash
SPRING_PROFILES_ACTIVE=prod
DB_URL=jdbc:mysql://your-db-host:3306/motorbike_shop?useSSL=true
DB_USERNAME=your_user
DB_PASSWORD=your_password
MAIL_USERNAME=your_mail@gmail.com
MAIL_PASSWORD=your_app_password
JWT_SECRET=<generated_base64_secret>
JWT_EXPIRATION_MS=7200000
```

**Tạo JWT secret:**

```powershell
# PowerShell
[Convert]::ToBase64String((1..64 | ForEach-Object { Get-Random -Maximum 256 }))
```

```bash
# Linux / macOS
openssl rand -base64 64
```

---

## Tích hợp thanh toán

| Cổng | Controller | Config |
|---|---|---|
| MoMo | `MomoPayController` | `MomoConfig` |
| VNPay | `VnPayController` | `VnpayConfig` |
| ZaloPay | `ZaloPayPaymentController` | `ZaloPayConfig` |

> Credentials thanh toán phải cấu hình qua biến môi trường — **không hardcode** trong source code.

---

## Lưu trữ ảnh sản phẩm

Ảnh được lưu trực tiếp trong source code:

```
MotoShop_FE/src/static/images/    ← file ảnh (.jpg, .png, .webp)
MotoShop_ADMIN/src/static/images/ ← bản sao cho admin panel
```

Database (`product_image.url`) chỉ lưu **tên file**, ví dụ: `honda_wave_alpha_110.webp`. Frontend ghép URL qua hằng số trong `utils.ts`:

```ts
export const API_URL_IMAGE = "/src/static/images/";
```

> ⚠️ Cách lưu này phù hợp cho đồ án / development. Khi nâng cấp production nên chuyển sang Cloudinary hoặc self-hosted `/uploads/` với `WebMvcConfig`.

---

## Xử lý lỗi thường gặp

<details>
<summary>❌ Không kết nối được MySQL</summary>

- Kiểm tra container đang chạy: `docker ps`
- Kiểm tra password trong `application-local.yaml`
- Đảm bảo đã import SQL thành công

</details>

<details>
<summary>❌ Cổng 8081 / 5173 / 5174 đã bị chiếm</summary>

```powershell
netstat -ano | findstr :8081
```

Tắt process đó, hoặc đổi port trong `application.yaml` (backend) / `vite.config.ts` (frontend) rồi cập nhật `API_URL` tương ứng.

</details>

<details>
<summary>❌ Lỗi npm install / npm run dev</summary>

```powershell
Remove-Item -Recurse -Force .\node_modules
npm install
```

</details>

<details>
<summary>❌ Lệnh mvn không nhận diện được</summary>

Dùng Maven Wrapper có sẵn trong project thay vì `mvn`:

```powershell
cd MotoShop_BE
.\mvnw.cmd spring-boot:run
```

</details>

---

## Cấu trúc thư mục

```
Moto-shop/
├── MotoShop_BE/            # Spring Boot backend
│   └── src/main/java/com/motoshop/
│       ├── web/            # REST controllers
│       ├── services/       # Business logic
│       ├── repositories/   # Spring Data JPA
│       ├── models/         # JPA Entities
│       ├── securities/     # JWT, Spring Security
│       └── config/         # CORS, Payment config
├── MotoShop_FE/            # Frontend khách hàng (React + Vite)
├── MotoShop_ADMIN/         # Frontend quản trị (React + Vite)
├── migrations/             # SQL migration scripts (theo thứ tự)
├── motoshop_full_dump.sql  # Full dump — import một lần để có đủ dữ liệu
└── README.md
```

---

---

## Sơ đồ ERD

File ảnh sơ đồ ERD nằm trong thư mục `docs/diagrams/`.

| File | Mô tả |
|---|---|
| `erd_motoshop.png` | Ảnh ERD gốc ban đầu |
| `erd_motoshop_final.png` | ✅ **Phiên bản mới nhất** — đúng logic nghiệp vụ + đẹp như ảnh gốc |
| `erd_motoshop.mmd` | File nguồn Mermaid (có thể dùng để tái tạo / chỉnh sửa) |
| `erd_motoshop.md` | File Markdown xem trong VS Code (Ctrl+Shift+V) |

### Cách tái tạo ảnh ERD bằng AI (Prompt mẫu)

Nếu cần tạo lại ảnh ERD với phong cách tương tự `erd_motoshop_final.png` (vừa đúng logic vừa đẹp mắt), hãy dùng prompt sau khi làm việc với AI (Antigravity / Gemini / ChatGPT):

<details>
<summary>📋 Nhấn để xem Prompt mẫu tạo ảnh ERD</summary>

```
Tạo một ảnh sơ đồ ERD (Entity Relationship Diagram) chuyên nghiệp cho hệ thống cơ sở dữ liệu MotoShop với tiêu đề "SƠ ĐỒ ERD - CƠ SỞ DỮ LIỆU MOTOSHOP".

=== PHONG CÁCH TRỰC QUAN ===
- Nền trắng sạch
- Các hộp thực thể màu vàng kem (#FFF2CC)
- Tiêu đề bảng chữ đậm màu xanh đậm (#1F3864)
- Viền đen mảnh
- Đường nối màu đen với ký hiệu Crow's Foot chuẩn tại đầu nhiều (many-end)
- Font chữ Arial hoặc sans-serif tương tự
- Các hộp xếp thành lưới ngay ngắn, đường nối không chồng chéo

=== BỐ CỤC LƯỚI (trái sang phải, trên xuống dưới) ===
Hàng 1: USER | ROLE | CATEGORY | SALE | BANNER
Hàng 2: ADDRESS | USER_ROLES | PRODUCT | VARIANT
Hàng 3: ORDERS | | PRODUCT_IMAGE | ARTICLE
Hàng 4: ORDER_ITEM | NOTIFICATION

=== NỘI DUNG CÁC BẢNG ===

USER: id(PK), username, password, email, firstName, lastName, phone, status, createdDate
ROLE: id(PK), name
USER_ROLES: user_id(FK), role_id(FK)
ADDRESS: id(PK), user_id(FK), province, district, wards, addressDetail, isDefault
CATEGORY: id(PK), name, image, status, type, parent_id(FK)
SALE: id(PK), name, discount, startDate, endDate, isActive
BANNER: id(PK), name, src, createdDate, status, category_id(FK)
PRODUCT: id(PK), name, sku, price, salePrice, status, brand, vehicleType, displacement, newArrival, product_category_id(FK), sale_id(FK)
VARIANT: id(PK), name, colorName, colorCode, stock, sold, product_id(FK)
PRODUCT_IMAGE: id(PK), url, product_id(FK)
ORDERS: id(PK), codeOrders, fullName, phone, status, totalPrice, paymentMethod, user_id(FK), address_id(FK)
ORDER_ITEM: id(PK), quantity, sellPrice, productName, variantId, order_id(FK)
ARTICLE: id(PK), title, shortContent, content, author, createdDate, image, status, user_id(FK), category_id(FK)
NOTIFICATION: id(PK), content, isRead, type, order_id(FK), product_id(FK)

=== CÁC MỐI QUAN HỆ (Crow's Foot — one-to-many nếu không ghi khác) ===
- USER → USER_ROLES (1:N)
- ROLE → USER_ROLES (1:N)
- USER → ADDRESS (1:N)
- USER → ORDERS (1:N)
- USER → ARTICLE (1:N)
- ADDRESS → ORDERS (1:N)
- ORDERS → ORDER_ITEM (1:N)
- ORDERS → NOTIFICATION (1:N)
- CATEGORY → PRODUCT (1:N)
- CATEGORY → BANNER (1:N)
- CATEGORY → ARTICLE (1:N)
- SALE → PRODUCT (1:N)
- PRODUCT → VARIANT (1:N)
- PRODUCT → PRODUCT_IMAGE (1:N)
- PRODUCT → NOTIFICATION (1:N)

Yêu cầu: Ảnh phải rõ nét, sắc sảo, in được, không bị mờ, độ phân giải cao.
```

</details>

### Cách tái tạo ảnh ERD bằng Mermaid CLI (Terminal)

```powershell
# Tạo ảnh mới từ file nguồn (scale 3 = độ phân giải cao, không bị mờ)
npx @mermaid-js/mermaid-cli -i docs/diagrams/erd_motoshop.mmd -o docs/diagrams/erd_output.png -s 3
```

---

> Dự án phát triển phục vụ mục đích học tập / đồ án tốt nghiệp.
