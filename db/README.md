# db/ — Quản lý cơ sở dữ liệu

Thư mục này chứa các file SQL để thiết lập và đồng bộ database giữa các thành viên trong nhóm.

## Cấu trúc

| File | Mục đích |
|---|---|
| `01_schema.sql` | Tạo tất cả các bảng (`CREATE TABLE IF NOT EXISTS`) — **chạy trước** |
| `02_data.sql` | Insert dữ liệu mẫu mới nhất — **chạy sau** |

---

## Hướng dẫn setup lần đầu (thành viên mới)

> **Yêu cầu:** Docker Desktop đang chạy và container `motorbike-shop-mysql` đã được khởi động.

### Bước 1 — Khởi động MySQL container
```powershell
docker start motorbike-shop-mysql
```
> Nếu chưa có container, xem hướng dẫn tạo mới trong README.md gốc.

### Bước 2 — Tạo schema (các bảng)
```powershell
# PowerShell
Get-Content .\db\01_schema.sql | docker exec -i -e MYSQL_PWD=123456 motorbike-shop-mysql mysql -u root motorbike_shop
```
```cmd
:: CMD
docker exec -i -e MYSQL_PWD=123456 motorbike-shop-mysql mysql -u root motorbike_shop < db\01_schema.sql
```

### Bước 3 — Import dữ liệu mẫu
```powershell
# PowerShell
Get-Content .\db\02_data.sql | docker exec -i -e MYSQL_PWD=123456 motorbike-shop-mysql mysql -u root motorbike_shop
```
```cmd
:: CMD
docker exec -i -e MYSQL_PWD=123456 motorbike-shop-mysql mysql -u root motorbike_shop < db\02_data.sql
```

### Bước 4 — Chạy ứng dụng
```powershell
# Terminal 1 — Backend
cd MotoShop_BE
.\mvnw.cmd clean spring-boot:run "-Dspring-boot.run.jvmArguments=-Dspring.profiles.active=local -Dspring.devtools.restart.enabled=false"

# Terminal 2 — Frontend khách hàng
cd MotoShop_FE
npm run dev   # → http://localhost:3000

# Terminal 3 — Admin panel
cd MotoShop_ADMIN
npm run dev   # → http://localhost:3001
```

**Tài khoản mặc định:** `admin / 123456` (ROLE_ADMIN)

---

## Đồng bộ dữ liệu khi có cập nhật từ nhóm

Khi có thành viên push `02_data.sql` mới lên Git, bạn cần chạy một trong hai cách sau:

---

### ✅ Cách 1 — Xóa trắng & import lại (Khuyên dùng)

> Dùng khi: **setup lần đầu**, dữ liệu local đang lỗi thời, hoặc muốn đồng bộ hoàn toàn giống nhau.

```powershell
# Bước 1: Pull code mới nhất
git pull origin dev

# Bước 2: Xóa sạch database cũ, tạo lại từ đầu
docker exec -e MYSQL_PWD=123456 motorbike-shop-mysql mysql -u root -e "DROP DATABASE IF EXISTS motorbike_shop; CREATE DATABASE motorbike_shop CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"

# Bước 3: Tạo lại toàn bộ bảng
Get-Content .\db\01_schema.sql | docker exec -i -e MYSQL_PWD=123456 motorbike-shop-mysql mysql -u root motorbike_shop

# Bước 4: Import dữ liệu mới nhất
Get-Content .\db\02_data.sql | docker exec -i -e MYSQL_PWD=123456 motorbike-shop-mysql mysql -u root motorbike_shop
```

> ✔️ Sau khi xong, **reload trình duyệt** là thấy dữ liệu mới ngay, không cần restart BE.

---

### ⚡ Cách 2 — Chỉ cập nhật dữ liệu mới (Nhanh hơn)

> Dùng khi: Chỉ muốn **thêm data mới** từ đồng nghiệp mà không muốn mất dữ liệu đang test trên máy.  
> File `02_data.sql` dùng `INSERT IGNORE` nên **bỏ qua bản ghi đã tồn tại**, không ghi đè.

```powershell
# Bước 1: Pull code mới nhất
git pull origin dev

# Bước 2: Import thẳng vào DB đang có (không xóa gì cả)
Get-Content .\db\02_data.sql | docker exec -i -e MYSQL_PWD=123456 motorbike-shop-mysql mysql -u root motorbike_shop
```

> ⚠️ **Lưu ý:** Cách này chỉ thêm bản ghi mới, **không cập nhật** bản ghi đã tồn tại.  
> Nếu muốn cập nhật timestamp hay sửa dữ liệu cũ → dùng **Cách 1**.

---

## Quy trình đồng bộ dữ liệu trong nhóm

```
┌─────────────────────────────────────────────────────────────┐
│  QUY TRÌNH KHI CÓ DỮ LIỆU QUAN TRỌNG THAY ĐỔI              │
│                                                             │
│  1. Thành viên A thêm/sửa dữ liệu quan trọng trên máy      │
│  2. Export file 02_data.sql mới (xem lệnh bên dưới)         │
│  3. git add db/02_data.sql → git commit → git push          │
│  4. Thành viên B, C: git pull                               │
│  5. Thành viên B, C chạy Cách 1 hoặc Cách 2 ở trên         │
└─────────────────────────────────────────────────────────────┘
```

### Lệnh export dữ liệu mới nhất (dành cho người cập nhật)

```powershell
# Bước 1: Export từ MySQL (file tạm UTF-16)
docker exec -e MYSQL_PWD=123456 motorbike-shop-mysql mysqldump `
  -u root --no-create-info --complete-insert --insert-ignore `
  --skip-triggers --set-charset --single-transaction --disable-keys `
  motorbike_shop `
  role user user_roles address category sales product variant product_image `
  banner article article_image orders order_item notifications company `
  social_media category_policy policy policy_image consult_request product_comment `
  > db\02_data_raw.sql

# Bước 2: Convert encoding về UTF-8
$raw = Get-Content "db\02_data_raw.sql" -Encoding Unicode
[System.IO.File]::WriteAllLines("db\02_data.sql", $raw, [System.Text.UTF8Encoding]::new($false))
Remove-Item "db\02_data_raw.sql"

# Bước 3: Commit & push
git add db/02_data.sql
git commit -m "data: update seed data $(Get-Date -Format 'yyyy-MM-dd')"
git push origin dev
```

---

## Lưu ý quan trọng

- ⚠️ `02_data.sql` **KHÔNG được** chứa dữ liệu nhạy cảm (password thật, API key...).  
  Mật khẩu trong file này đã được mã hóa BCrypt, an toàn để commit.
- ✅ `01_schema.sql` dùng `CREATE TABLE IF NOT EXISTS` — **an toàn để chạy lại nhiều lần**.
- ✅ `02_data.sql` dùng `INSERT IGNORE` — **an toàn để chạy lại** trên DB đã có dữ liệu.
- ✅ Khi schema thay đổi (thêm cột, thêm bảng), nhớ cập nhật cả `01_schema.sql`.
