# 🚀 Hướng dẫn Triển khai MotoShop lên VPS (Docker)

> **VPS**: DigitalOcean Droplet Singapore | IP: `152.42.189.255`  
> **OS**: Ubuntu 24.04 LTS | **RAM**: 1GB | **Disk**: 25GB  
> **Phương pháp**: Docker Compose (4 containers)
## SSH USERNAME: root
## SSH PASS: HoangMinhDuc@2451998a
---

## Kiến trúc hệ thống

```
Internet
    │
    ├── :80  ──► [motoshop-fe]    React Frontend  (Nginx)
    ├── :81  ──► [motoshop-admin] React Admin     (Nginx)
    └── :8081──► [motoshop-be]    Spring Boot API
                      │
                 [motoshop-db]    MySQL 8 (nội bộ, không expose ra ngoài)
```

---

## Bước 1 – Chuẩn bị trên máy Local (Windows)

### 1.1 Build Frontend
```powershell
cd MotoShop_FE
npm run build
```
> ✅ Output: thư mục `MotoShop_FE/dist/`

### 1.2 Build Admin
```powershell
cd MotoShop_ADMIN
npm run build
```
> ✅ Output: thư mục `MotoShop_ADMIN/dist/`

### 1.3 Build Backend JAR
```powershell
cd MotoShop_BE
.\mvnw.cmd package -DskipTests
```
> ✅ Output: `MotoShop_BE/target/motoshop-0.0.1-SNAPSHOT.jar`

---

## Bước 2 – Cài Docker trên VPS

SSH vào VPS:
```powershell
ssh root@152.42.189.255
```

Cài Docker (1 lệnh):
```bash
curl -fsSL https://get.docker.com | sh
```

Kiểm tra cài thành công:
```bash
docker --version
docker compose version
```
> ✅ Kết quả mong đợi: `Docker version 26.x.x` và `Docker Compose version v2.x.x`

---

## Bước 3 – Upload code lên VPS

Mở **PowerShell mới** (không phải cửa sổ SSH), chạy từ thư mục gốc project:

```powershell
# Upload toàn bộ project lên VPS (bỏ qua node_modules)
scp -r -o "StrictHostKeyChecking=no" `
  --exclude=node_modules `
  "C:\Users\Thinkpad T14 G3\Desktop\doan\Moto-shop" `
  root@152.42.189.255:/opt/motoshop
```

> ⚠️ Nếu lệnh trên không hỗ trợ `--exclude`, dùng `rsync` hoặc tạo file zip:

**Cách thay thế (dùng zip):**
```powershell
# Zip project (bỏ qua node_modules)
Compress-Archive -Path "C:\Users\Thinkpad T14 G3\Desktop\doan\Moto-shop\*" `
  -DestinationPath "C:\Users\Thinkpad T14 G3\Desktop\motoshop.zip" `
  -Force

# Upload lên VPS
scp "C:\Users\Thinkpad T14 G3\Desktop\motoshop.zip" root@152.42.189.255:/opt/

# Trên VPS: giải nén
mkdir -p /opt/motoshop
apt install -y unzip
unzip /opt/motoshop.zip -d /opt/motoshop/
```

---

## Bước 4 – Khởi động toàn bộ hệ thống

Trên VPS:
```bash
cd /opt/motoshop

# Khởi động tất cả containers
docker compose up -d --build
```

> ⏳ Lần đầu chạy mất **3–5 phút** (pull image, build, khởi động MySQL)

Kiểm tra trạng thái:
```bash
docker compose ps
```

Kết quả mong đợi:
```
NAME              STATUS
motoshop-db       Up (healthy)
motoshop-be       Up
motoshop-fe       Up
motoshop-admin    Up
```

---

## Bước 5 – Upload ảnh sản phẩm lên VPS

> Ảnh sản phẩm (~112 file, ~37MB) cần được copy riêng vào Docker Volume của backend.

### Phân tích dung lượng
| Mục | Giá trị |
|---|---|
| Số file ảnh | 112 file |
| Tổng kích thước | ~37 MB |
| Disk VPS còn trống | ~19 GB |
| Tỉ lệ sử dụng thêm | 0.2% → **Hoàn toàn ổn** |

### Lưu ý quan trọng về ảnh
> [!WARNING]
> Ảnh được lưu trong **Docker Volume** (`images_data`). Nếu chạy `docker compose down -v` (có flag `-v`), **volume sẽ bị xóa và mất toàn bộ ảnh**. Chỉ dùng `docker compose down` (không có `-v`) khi muốn giữ lại data.

> [!NOTE]
> **Production thật** sẽ dùng Object Storage (AWS S3, DigitalOcean Spaces) thay vì lưu trên server. Với đồ án demo, upload trực tiếp lên VPS là đủ và phù hợp.

### Thực hiện upload ảnh

**Bước 5.1** – Upload ảnh lên VPS (PowerShell local):
```powershell
scp -r "C:\Users\Thinkpad T14 G3\Desktop\doan\Moto-shop\MotoShop_ADMIN\src\static\images" root@152.42.189.255:/tmp/
```

**Bước 5.2** – Copy ảnh vào Docker container (Web Console / SSH):
```bash
docker cp /tmp/images/. motoshop-be:/app/images/
```

**Bước 5.3** – Kiểm tra ảnh đã vào chưa:
```bash
docker exec motoshop-be ls /app/images/ | head -10
```

---

## Bước 6 – Kiểm tra & Truy cập

| Trang | URL |
|---|---|
| 🌍 **Frontend** | http://152.42.189.255 |
| 🔐 **Admin** | http://152.42.189.255:81 |
| 🔌 **API** | http://152.42.189.255:8081 |

---

## Lệnh hữu ích khi quản lý

```bash
# Xem logs của backend
docker logs motoshop-be -f

# Xem logs của database
docker logs motoshop-db -f

# Restart một container cụ thể
docker restart motoshop-be

# Dừng toàn bộ hệ thống
docker compose down

# Dừng và XÓA toàn bộ data (cẩn thận!)
docker compose down -v
```

---

## Xử lý lỗi thường gặp

### ❌ BE không kết nối được DB
```bash
# Kiểm tra DB đã healthy chưa
docker inspect motoshop-db | grep Health
# Restart BE sau khi DB healthy
docker restart motoshop-be
```

### ❌ Port 80 bị chiếm
```bash
# Kiểm tra xem có gì đang dùng port 80
lsof -i :80
# Dừng nginx hệ thống nếu có
systemctl stop nginx
```

### ❌ Hết RAM – Server bị đơ / SSH không vào được
> **Nguyên nhân:** VPS 1GB RAM không đủ cho Spring Boot + MySQL + Docker build cùng lúc.

```bash
# ⭐ PHẢI làm NGAY sau khi SSH vào lần đầu (trước khi chạy Docker)
fallocate -l 2G /swapfile
chmod 600 /swapfile
mkswap /swapfile
swapon /swapfile
echo '/swapfile none swap sw 0 0' >> /etc/fstab

# Kiểm tra
free -h
```
> ✅ Sau khi tạo swap 2GB: tổng bộ nhớ ảo = 3GB, đủ để chạy ổn định.

### ❌ Backend restart-loop do giới hạn heap lớn hơn RAM container
> **Dấu hiệu:** Container `motoshop-be` liên tục chuyển sang trạng thái `Restarting`, API không truy cập được hoặc log cho thấy tiến trình Java bị hệ điều hành dừng vì thiếu bộ nhớ (OOM/OOMKilled).

**Nguyên nhân:** Docker image trước đây hard-code JVM heap tối đa là `512 MB`:

```dockerfile
ENTRYPOINT ["java", "-Xmx512m", "-Xms256m", "-jar", "app.jar"]
```

Trong khi `docker-compose.yml` chỉ cấp tối đa `450 MB` cho container backend. Ngoài heap, JVM còn cần RAM cho Metaspace, thread stack, code cache và thư viện native. Vì vậy, heap `512 MB` không thể nằm trong container `450 MB`; khi Java sử dụng nhiều bộ nhớ, container có thể bị OOMKilled và Docker lại tự khởi động nó do chính sách `restart: unless-stopped`, tạo thành restart-loop.

**Giải pháp đã áp dụng:** Không hard-code heap trong image. `Dockerfile` đọc `JAVA_OPTS` do Docker Compose truyền vào:

```dockerfile
ENTRYPOINT ["sh", "-c", "exec java $JAVA_OPTS -jar app.jar"]
```

Giới hạn JVM và container trong `docker-compose.yml`:

```yaml
environment:
  JAVA_OPTS: "-Xmx384m -Xms192m"
deploy:
  resources:
    limits:
      memory: 450M
```

`-Xmx384m` chừa khoảng `66 MB` trong giới hạn container cho phần bộ nhớ ngoài heap. Từ khóa `exec` giúp tiến trình Java nhận tín hiệu dừng trực tiếp từ Docker và thoát đúng cách.

Sau khi sửa, rebuild riêng backend và kiểm tra:

```bash
cd /opt/motoshop
docker compose up -d --build be

# Container phải ở trạng thái Up, không phải Restarting
docker compose ps be

# RestartCount phải là 0 và log phải có "Started MotoShopApplication"
docker inspect -f '{{.RestartCount}}' motoshop-be
docker logs --tail 100 motoshop-be
```

> **Lưu ý:** `JAVA_OPTS` phải luôn nhỏ hơn giới hạn `memory` của container. Nếu tăng heap, cần tăng giới hạn container tương ứng và bảo đảm VPS vẫn còn đủ RAM/swap.

### ❌ Ảnh không hiển thị (403 Permission denied)
> **Nguyên nhân:** File upload từ Windows có thể bị sai quyền trong container Nginx.

```bash
docker exec motoshop-fe chmod -R 755 /usr/share/nginx/html/
docker exec motoshop-admin chmod -R 755 /usr/share/nginx/html/
```

### ❌ CORS error – API bị block trên trình duyệt
> **Nguyên nhân:** `CorsConfig.java` chỉ cho phép `localhost`, chưa có IP VPS.

Sửa file `MotoShop_BE/src/main/java/com/motoshop/config/CorsConfig.java`, thêm vào `allowedOrigins`:
```java
"http://152.42.189.255",    // VPS Frontend
"http://152.42.189.255:81" // VPS Admin
```
Sau đó rebuild JAR và redeploy:
```bash
# Local
.\mvnw.cmd package -DskipTests
scp target/motoshop-0.0.1-SNAPSHOT.jar root@152.42.189.255:/opt/motoshop/MotoShop_BE/target/

# VPS
cd /opt/motoshop && docker compose build be && docker compose up -d be
```

### ❌ `dpkg was interrupted` khi cài package
> **Nguyên nhân:** Lệnh apt-get bị ngắt giữa chừng (mất SSH, hết RAM...).

```bash
dpkg --configure -a
# Sau đó chạy lại lệnh cài đặt
```

---

## Dọn dẹp sau khi Demo xong

```bash
# Dừng và xóa toàn bộ containers + volumes
docker compose down -v

# Xóa tất cả images để giải phóng dung lượng
docker system prune -a
```

Sau đó vào **DigitalOcean Dashboard** → **Droplet `motoshop-demo`** → **Settings** → **Destroy** để xóa server và dừng tính tiền.

---

## Thông tin Credentials

> ⚠️ Chỉ dùng cho môi trường demo, không dùng cho production thật!

| Dịch vụ | Username | Password |
|---|---|---|
| MySQL | root | MotoDB@2026 |
| Spring Boot Admin | admin | Admin@2026 |
| Admin Panel | linh | linh2005 |
