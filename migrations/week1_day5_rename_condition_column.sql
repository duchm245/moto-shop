-- Bước 1: Copy data từ cột cũ sang cột mới
UPDATE product SET vehicle_condition = `condition`;

-- Bước 2: Kiểm tra trước khi xoá (đảm bảo data đã copy đúng)
SELECT id, name, `condition`, vehicle_condition FROM product LIMIT 10;

-- Bước 3: Xoá cột cũ (chạy sau khi xác nhận Bước 2 OK)
ALTER TABLE product DROP COLUMN `condition`;

-- Bước 4: Xác nhận kết quả cuối
SELECT id, name, vehicle_condition FROM product LIMIT 10;
