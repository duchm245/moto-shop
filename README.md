# CRKing7 - Tổng quan dự án

## 1. Tóm tắt cấu trúc repo

Dự án được tổ chức theo mô hình monorepo với 3 ứng dụng chính:

- `CKing7_BE`: Backend API (Spring Boot) xử lý nghiệp vụ, xác thực, thanh toán, truy cập CSDL.
- `CRKing7_FE`: Frontend cho khách hàng (website bán hàng).
- `CRKing7_ADMIN`: Frontend quản trị (dashboard quản lý sản phẩm, đơn hàng, nội dung...).

Ngoài ra có file `crking7.sql` cho thấy có script/dữ liệu CSDL để khởi tạo hoặc backup.

## 2. Tổng quan Backend (`CKing7_BE`)

### 2.1 Công nghệ chính

- Java 17, Spring Boot 3 (`spring-boot-starter-web`).
- Spring Data JPA + MySQL (`mysql-connector-j`).
- Spring Security + JWT (`jjwt-api`, `jjwt-impl`, `jjwt-jackson`).
- MapStruct + Lombok cho mapping DTO/entity.
- Spring Mail, Apache HttpClient, Gson cho tích hợp và tiện ích.

### 2.2 Tổ chức kiến trúc

Backend phân lớp khá rõ:

- `web/` và `web/admin/`: REST API cho client và admin.
- `services/` + `services/impl/`: business logic.
- `repositories/`: truy cập dữ liệu JPA.
- `models/`: entity/domain model.
- `securities/`: JWT filter, user detail service, entry point.
- `config/`: CORS, security, email, payment config.

### 2.3 Entry point backend

- Chạy ứng dụng: `CKing7_BE/src/main/java/com/crking7/datn/CRKing7Application.java`.
- Cấu hình runtime: `CKing7_BE/src/main/resources/application.yaml` (port `8081`, datasource MySQL, JPA, JWT, mail).

### 2.4 Đầu mối tích hợp/thanh toán/CSDL

- CSDL: `application.yaml` dùng `jdbc:mysql://localhost:3306/motorbike_shop`.
- Thanh toán online:
  - `MomoPayController`, `MomoConfig`, `MomoEncoderUtils`
  - `VnPayController`, `VnpayConfig`
  - `ZaloPayPaymentController`, `ZaloPayConfig`
- Email: `EmailConfig` + `spring.mail` trong `application.yaml`.

## 3. Tổng quan Frontend khách hàng (`CRKing7_FE`)

### 3.1 Công nghệ chính

- React 18 + TypeScript + Vite.
- React Router DOM (điều hướng).
- Redux + Redux Thunk (quản lý state).
- Axios, React Toastify, Bootstrap, Swiper...

### 3.2 Entry point frontend

- Bootstrap app: `CRKing7_FE/src/main.tsx` (Provider Redux + `App`).
- Router tổng: `CRKing7_FE/src/App.tsx`.

### 3.3 Nhóm tính năng nổi bật (theo folder)

- Mua hàng: `home`, `product`, `detailProduct`, `cart`, `checkOut`, `checkOut/thankyou`.
- Tài khoản: `user/login`, `user/register`, `profile`, `profile/address`, `profile/detailOrder`.
- Nội dung: `articles`, `detailArticle`, `contact`, `searchProduct`.
- Có API liên quan thanh toán: `src/apis/paymentMethod.apis.ts`.

## 4. Tổng quan Frontend quản trị (`CRKing7_ADMIN`)

### 4.1 Công nghệ chính

- React 18 + TypeScript + Vite.
- Redux + React Router.
- Dashboard libs: ApexCharts.
- Hỗ trợ quản lý nội dung: React Quill.
- TailwindCSS (trong devDependencies) cùng CSS custom.

### 4.2 Entry point admin

- Bootstrap app: `CRKing7_ADMIN/src/main.tsx`.
- Router/auth gate: `CRKing7_ADMIN/src/App.tsx` (kiểm tra token, điều hướng login).

### 4.3 Nhóm tính năng quản trị

- Quản lý sản phẩm: `products/*`.
- Đơn hàng: `order/*`.
- Khuyến mãi/sale: `sale/*`.
- Danh mục, banner, bài viết: `category/*`, `banner/*`, `article/*`.
- Tài khoản/nhân viên và dashboard: `account/*`, `dashboard`, `analytics`.

## 5. Tóm tắt domain/nghiệp vụ dự kiến

Từ tên file/folder, đây là hệ thống thương mại điện tử (khả năng cao thuộc lĩnh vực xe máy/phụ tùng), gồm:

- Catalog sản phẩm (category, color, size, product image).
- Đơn hàng, giỏ hàng, địa chỉ giao hàng.
- Tài khoản người dùng, phân quyền role.
- Bài viết/nội dung, banner marketing.
- Chính sách (policy), thông báo (notification), sale/khuyến mãi.
- Tích hợp thanh toán đa kênh (MoMo, VNPay, ZaloPay).

