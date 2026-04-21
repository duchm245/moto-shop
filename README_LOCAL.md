# Hướng dẫn chạy CRKing7 ở môi trường local

## 1. Mục tiêu

Tài liệu này hướng dẫn chạy toàn bộ hệ thống trên máy local gồm:

- Backend: `CKing7_BE` (Spring Boot, cổng `8081`)
- Frontend khách hàng: `CRKing7_FE` (Vite)
- Frontend quản trị: `CRKing7_ADMIN` (Vite)

## 2. Yêu cầu cài đặt trước

### 2.1 Công cụ bắt buộc

- `Git`
- `Java 17`
- `Maven` (hoặc dùng `mvnw` có sẵn trong repo)
- `Node.js` (khuyến nghị Node 18+)
- `MySQL 8.x`
    - cài đặt docker (windown: docker desktop)
    - chạy lệnh sau:
    docker run --name motorbike-shop-mysql -e MYSQL_ROOT_PASSWORD=123456 -e MYSQL_DATABASE=motorbike_shop -p 3306:3306 -v motorbike_shop_mysql_data:/var/lib/mysql -d mysql:8.0

    - khởi động lại docker:
    docker start motorbike-shop-mysql

### 2.2 Kiểm tra nhanh phiên bản (PowerShell)

```powershell
java -version
mvn -v
node -v
npm -v
mysql --version
```

> Nếu máy chưa có Maven global, vẫn có thể chạy backend bằng `.\mvnw.cmd`.

## 3. Chuẩn bị cơ sở dữ liệu

### 3.1 Tạo database

Mở MySQL và tạo database:

```sql
CREATE DATABASE motorbike_shop CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 3.2 Import dữ liệu mẫu

Repo có file `crking7.sql` ở thư mục gốc. Import bằng một trong hai cách:

- Dùng MySQL Workbench: mở file SQL rồi chạy toàn bộ script.
- Hoặc dùng CLI:

```powershell
mysql -u root -p motorbike_shop < .\crking7.sql
```

## 4. Cấu hình backend

File cấu hình chính: `CKing7_BE/src/main/resources/application.yaml`.

Các giá trị mặc định hiện tại:

- DB URL: `jdbc:mysql://localhost:3306/motorbike_shop?useSSL=false`
- DB user: `root`
- DB password: `123456`
- Server port: `8081`

Nếu máy bạn dùng thông tin DB khác, sửa trực tiếp trong `application.yaml` trước khi chạy.

## 5. Chạy từng ứng dụng

Khuyến nghị mở 3 terminal độc lập.

### 5.1 Chạy backend (`CKing7_BE`)

```powershell
cd .\CKing7_BE
.\mvnw.cmd spring-boot:run
```

Hoặc nếu đã có Maven global:

```powershell
cd .\CKing7_BE
mvn spring-boot:run
```

Backend chạy mặc định tại: `http://localhost:8081`.

### 5.2 Chạy frontend khách hàng (`CRKing7_FE`)

```powershell
cd .\CRKing7_FE
npm install
npm run dev
```

### 5.3 Chạy frontend admin (`CRKing7_ADMIN`)

```powershell
cd .\CRKing7_ADMIN
npm install
npm run dev
```

## 6. Kiểm tra sau khi chạy

### 6.1 Kiểm tra backend

- Mở `http://localhost:8081`
- Hoặc kiểm tra log backend không còn lỗi kết nối DB.

### 6.2 Kiểm tra frontend

- Mở URL Vite hiển thị trên terminal của `CRKing7_FE` (thường là `http://localhost:5173`).
- Mở URL Vite hiển thị trên terminal của `CRKing7_ADMIN` (nếu trùng cổng sẽ tự nhảy sang cổng khác, ví dụ `5174`).

### 6.3 Kiểm tra kết nối API

Cả FE và ADMIN đều đang cấu hình:

- `CRKing7_FE/src/constants/utils.ts` -> `API_URL = "http://localhost:8081"`
- `CRKing7_ADMIN/src/constants/utils.ts` -> `API_URL = "http://localhost:8081"`

Nếu backend chạy cổng khác, cần sửa lại 2 file trên.

## 7. Lỗi thường gặp và cách xử lý

### 7.1 Lỗi không kết nối được MySQL

- Kiểm tra MySQL đã chạy chưa.
- Kiểm tra `username/password` trong `application.yaml`.
- Kiểm tra database `motorbike_shop` đã tạo và import SQL chưa.

### 7.2 Lỗi cổng `8081` đã được sử dụng

- Tắt tiến trình đang dùng cổng đó, hoặc đổi `server.port` trong `application.yaml`.
- Nếu đổi cổng backend, cập nhật `API_URL` ở cả FE và ADMIN.

### 7.3 Lỗi `npm install` hoặc `npm run dev`

- Xóa `node_modules` và cài lại:

```powershell
Remove-Item -Recurse -Force .\node_modules
Remove-Item -Force .\package-lock.json
npm install
```

> Chỉ xóa `package-lock.json` khi bạn chấp nhận cập nhật lại lockfile.

## 8. Quy trình khởi động nhanh (tóm tắt)

1. Tạo DB `motorbike_shop` và import `crking7.sql`.
2. Chạy backend tại `CKing7_BE`.
3. Chạy frontend khách hàng tại `CRKing7_FE`.
4. Chạy frontend admin tại `CRKing7_ADMIN`.
5. Mở các URL Vite và kiểm tra gọi API về `http://localhost:8081`.

## 9. Bảo mật – Cấu hình biến môi trường

`application.yaml` **không còn chứa secret** – mọi giá trị nhạy cảm đã được đưa ra biến môi trường.

### 9.1 Cấu trúc file

| File | Mô tả | Commit lên git? |
|------|--------|----------------|
| `application.yaml` | Chỉ chứa `${VAR:CHANGE_ME}` | ✅ Có |
| `application-local.yaml` | Secret thật, tự động nạp khi dev | ❌ Không (đã gitignore) |
| `.env.example` | Template biến môi trường cho production | ✅ Có (không có secret thật) |

### 9.2 Chạy local (không cần thay đổi gì thêm)

Spring Boot tự nạp `application-local.yaml` khi `SPRING_PROFILES_ACTIVE=local` (mặc định):

```powershell
cd .\CKing7_BE
.\mvnw.cmd spring-boot:run
```

### 9.3 Triển khai production (Docker / CI-CD)

Đặt các biến môi trường sau (xem mẫu đầy đủ trong `.env.example`):

```bash
SPRING_PROFILES_ACTIVE=prod
DB_URL=jdbc:mysql://your-db-host:3306/motorbike_shop?useSSL=true
DB_USERNAME=your_user
DB_PASSWORD=your_password
MAIL_USERNAME=your_mail@gmail.com
MAIL_PASSWORD=your_app_password
JWT_SECRET=$(openssl rand -base64 64)
```

Với Docker Compose, dùng file `.env` hoặc khai báo trong `environment:` block.

### 9.4 Sinh JWT secret mới

```powershell
# PowerShell
[Convert]::ToBase64String((1..64 | ForEach-Object { Get-Random -Maximum 256 }))
```

```bash
# Linux/Mac
openssl rand -base64 64
```
