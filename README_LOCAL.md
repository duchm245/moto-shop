# Hướng dẫn chạy MotoShop ở môi trường local

Tài liệu này hướng dẫn khởi động toàn bộ hệ thống trên máy local gồm:

| Ứng dụng | Công nghệ | Cổng mặc định |
|---|---|---|
| `MotoShop_BE` | Spring Boot | `8081` |
| `MotoShop_FE` | React + Vite | `5173` |
| `MotoShop_ADMIN` | React + Vite | `5174` |

---

## Mục lục

1. [Yêu cầu cài đặt trước](#1-yêu-cầu-cài-đặt-trước)
2. [Khởi động MySQL bằng Docker](#2-khởi-động-mysql-bằng-docker)
3. [Chuẩn bị cơ sở dữ liệu](#3-chuẩn-bị-cơ-sở-dữ-liệu)
4. [Cấu hình Backend](#4-cấu-hình-backend)
5. [Chạy từng ứng dụng](#5-chạy-từng-ứng-dụng)
6. [Kiểm tra sau khi chạy](#6-kiểm-tra-sau-khi-chạy)
7. [Lỗi thường gặp](#7-lỗi-thường-gặp)
8. [Khởi động nhanh (tóm tắt)](#8-khởi-động-nhanh-tóm-tắt)
9. [Bảo mật & Biến môi trường](#9-bảo-mật--biến-môi-trường)

---

## 1. Yêu cầu cài đặt trước

| Công cụ | Phiên bản khuyến nghị | Ghi chú |
|---|---|---|
| Java | 17 | |
| Maven | 3.8+ | Hoặc dùng `mvnw` có sẵn trong repo |
| Node.js | 18+ | |
| npm | 9+ | |
| Docker Desktop | Mới nhất | Dùng để chạy MySQL |

**Kiểm tra nhanh phiên bản (PowerShell):**

```powershell
java -version
mvn -v        # hoặc .\MotoShop_BE\mvnw.cmd -v
node -v
npm -v
docker -v
```

> Nếu máy chưa cài Maven global, vẫn chạy được backend bằng `.\mvnw.cmd` có sẵn trong thư mục `MotoShop_BE`.

---

## 2. Khởi động MySQL bằng Docker

### Lần đầu — tạo container

```powershell
docker run --name motorbike-shop-mysql `
  -e MYSQL_ROOT_PASSWORD=123456 `
  -e MYSQL_DATABASE=motorbike_shop `
  -p 3306:3306 `
  -v motorbike_shop_mysql_data:/var/lib/mysql `
  -d mysql:8.0
```

### Những lần sau — khởi động lại container

```powershell
docker start motorbike-shop-mysql
```

### Kiểm tra container đang chạy

```powershell
docker ps
```

---

## 3. Chuẩn bị cơ sở dữ liệu

> **Lưu ý:** Thay `YOUR_PASSWORD` bằng password MySQL của bạn (mặc định: `123456`).  
> Khi dùng pipe (`|`) hoặc redirect (`<`), MySQL không nhận password qua bàn phím — phải truyền qua biến môi trường `-e MYSQL_PWD=`.

Chạy các lệnh sau từ **thư mục gốc của project** (`Moto-shop/`).

### 3.1 Import schema + dữ liệu mẫu

**PowerShell:**
```powershell
Get-Content .\motorbike_shop.sql | docker exec -i -e MYSQL_PWD=YOUR_PASSWORD motorbike-shop-mysql mysql -u root motorbike_shop
```

**CMD:**
```cmd
docker exec -i -e MYSQL_PWD=YOUR_PASSWORD motorbike-shop-mysql mysql -u root motorbike_shop < .\motorbike_shop.sql
```

### 3.2 Chạy migration

**PowerShell:**
```powershell
Get-Content .\migrations\week1_day1_create_variant_table.sql | docker exec -i -e MYSQL_PWD=YOUR_PASSWORD motorbike-shop-mysql mysql -u root motorbike_shop
```

**CMD:**
```cmd
docker exec -i -e MYSQL_PWD=YOUR_PASSWORD motorbike-shop-mysql mysql -u root motorbike_shop < .\migrations\week1_day1_create_variant_table.sql
```

---

## 4. Cấu hình Backend

File cấu hình chính: `MotoShop_BE/src/main/resources/application.yaml`

Các giá trị mặc định — **dùng được ngay** nếu chạy MySQL theo hướng dẫn ở mục 2:

| Tham số | Giá trị mặc định |
|---|---|
| DB URL | `jdbc:mysql://localhost:3306/motorbike_shop?useSSL=false` |
| DB user | `root` |
| DB password | `123456` |
| Server port | `8081` |

Nếu cần ghi đè (ví dụ: đổi password), tạo file `application-local.yaml` cùng thư mục:

```yaml
# MotoShop_BE/src/main/resources/application-local.yaml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/motorbike_shop?useSSL=false
    username: root
    password: YOUR_PASSWORD
```

> File `application-local.yaml` đã được thêm vào `.gitignore` — không bị commit lên Git.

---

## 5. Chạy từng ứng dụng

Khuyến nghị mở **3 terminal độc lập**.

### 5.1 Backend (`MotoShop_BE`)

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

### 5.2 Frontend khách hàng (`MotoShop_FE`)

```powershell
cd .\MotoShop_FE
npm install
npm run dev
```

✅ Mở: `http://localhost:5173`

### 5.3 Frontend quản trị (`MotoShop_ADMIN`)

```powershell
cd .\MotoShop_ADMIN
npm install
npm run dev
```

✅ Mở: `http://localhost:5174` (tự nhảy cổng nếu 5173 đã bị chiếm)

---

## 6. Kiểm tra sau khi chạy

### 6.1 Backend

- Truy cập `http://localhost:8081` — không báo lỗi là ổn.
- Kiểm tra log terminal: không có lỗi kết nối DB.

### 6.2 Frontend

- `MotoShop_FE`: Vite in URL lên terminal (thường là `http://localhost:5173`).
- `MotoShop_ADMIN`: Tương tự, thường là `http://localhost:5174`.

### 6.3 Kiểm tra kết nối API

Cả hai frontend đều trỏ API về cùng một địa chỉ backend:

| File | Hằng số |
|---|---|
| `MotoShop_FE/src/constants/utils.ts` | `API_URL = "http://localhost:8081"` |
| `MotoShop_ADMIN/src/constants/utils.ts` | `API_URL = "http://localhost:8081"` |

> Nếu backend chạy cổng khác, cập nhật `API_URL` trong cả hai file trên.

---

## 7. Lỗi thường gặp

### ❌ Không kết nối được MySQL

- Kiểm tra container đang chạy: `docker ps`
- Kiểm tra `username` / `password` trong `application-local.yaml`.
- Kiểm tra database `motorbike_shop` đã tồn tại và đã import SQL thành công.

### ❌ Cổng `8081` đã được sử dụng

```powershell
# Tìm process đang chiếm cổng
netstat -ano | findstr :8081
```

- Tắt process đó, hoặc đổi `server.port` trong `application.yaml`.
- Nếu đổi cổng, cập nhật `API_URL` ở cả `MotoShop_FE` và `MotoShop_ADMIN`.

### ❌ Lỗi `npm install` hoặc `npm run dev`

Xóa cache và cài lại:

```powershell
Remove-Item -Recurse -Force .\node_modules
Remove-Item -Force .\package-lock.json
npm install
```

> Chỉ xóa `package-lock.json` khi bạn chấp nhận cập nhật lại lockfile.

### ❌ Maven không nhận diện được lệnh `mvn`

Dùng Maven wrapper có sẵn thay thế:

```powershell
cd .\MotoShop_BE
.\mvnw.cmd spring-boot:run
```

---

## 8. Khởi động nhanh (tóm tắt)

```
1. docker start motorbike-shop-mysql
2. cd .\MotoShop_BE  →  .\mvnw.cmd spring-boot:run
3. cd .\MotoShop_FE  →  npm run dev
4. cd .\MotoShop_ADMIN  →  npm run dev
```

---

## 9. Bảo mật & Biến môi trường

### Phân loại file cấu hình

| File | Mục đích | Commit lên Git? |
|---|---|---|
| `application.yaml` | Template, dùng `${VAR:DEFAULT}` | ✅ Có |
| `application-local.yaml` | Secret thật cho môi trường local | ❌ Không (gitignore) |
| `.env.example` | Mẫu biến môi trường cho production | ✅ Có (không chứa secret thật) |

### Chạy local

Spring Boot tự nạp `application-local.yaml` khi profile `local` được kích hoạt (mặc định):

```powershell
cd .\MotoShop_BE
.\mvnw.cmd spring-boot:run
```

### Triển khai production

Đặt các biến môi trường sau (xem mẫu đầy đủ trong `.env.example`):

```bash
SPRING_PROFILES_ACTIVE=prod
DB_URL=jdbc:mysql://your-db-host:3306/motorbike_shop?useSSL=true
DB_USERNAME=your_user
DB_PASSWORD=your_password
MAIL_USERNAME=your_mail@gmail.com
MAIL_PASSWORD=your_app_password
JWT_SECRET=<generated_secret>
```

Với Docker Compose, dùng file `.env` hoặc khai báo trong block `environment:`.

### Sinh JWT secret mới

```powershell
# PowerShell
[Convert]::ToBase64String((1..64 | ForEach-Object { Get-Random -Maximum 256 }))
```

```bash
# Linux / macOS
openssl rand -base64 64
```
