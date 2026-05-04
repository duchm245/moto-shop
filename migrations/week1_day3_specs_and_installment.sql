-- ============================================================
-- MIGRATION: Tuần 1 - Day 3
-- Mục tiêu: Thêm 17 trường thông số kỹ thuật xe + 3 trường trả góp
--
-- NHÓM 1 — Thông tin chung xe:
--   brand, vehicle_type, is_new
--
-- NHÓM 2 — Thông số động cơ:
--   engine_type, displacement, max_power, max_torque, transmission
--
-- NHÓM 3 — Nhiên liệu & kích thước:
--   fuel_system, fuel_capacity, fuel_consumption,
--   dimensions, weight, seat_height, ground_clearance
--
-- NHÓM 4 — Bảo hành & xuất xứ:
--   warranty_info, origin
--
-- NHÓM 5 — Trả góp:
--   installment_supported, installment_months, down_payment_percent
--
-- Ghi chú:
--   - MySQL 8.0 KHÔNG hỗ trợ ADD COLUMN IF NOT EXISTS (đó là cú pháp MariaDB).
--   - Dùng stored procedure để kiểm tra INFORMATION_SCHEMA trước khi ALTER.
--   - Idempotent: có thể chạy lại nhiều lần mà không lỗi.
-- ============================================================

USE motorbike_shop;

-- ------------------------------------------------------------
-- Helper procedure: thêm cột nếu chưa tồn tại
-- ------------------------------------------------------------
DROP PROCEDURE IF EXISTS add_column_if_not_exists;

DELIMITER $$
CREATE PROCEDURE add_column_if_not_exists(
    IN p_table  VARCHAR(64),
    IN p_col    VARCHAR(64),
    IN p_def    TEXT
)
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM INFORMATION_SCHEMA.COLUMNS
        WHERE TABLE_SCHEMA = DATABASE()
          AND TABLE_NAME   = p_table
          AND COLUMN_NAME  = p_col
    ) THEN
        SET @ddl = CONCAT('ALTER TABLE `', p_table, '` ADD COLUMN ', p_def);
        PREPARE stmt FROM @ddl;
        EXECUTE stmt;
        DEALLOCATE PREPARE stmt;
    END IF;
END$$
DELIMITER ;

-- ------------------------------------------------------------
-- Nhóm 1: Thông tin chung
-- ------------------------------------------------------------
CALL add_column_if_not_exists('product', 'brand',
    '`brand` VARCHAR(100) COMMENT ''Hang xe: Honda, Yamaha, Suzuki...''');

CALL add_column_if_not_exists('product', 'vehicle_type',
    '`vehicle_type` VARCHAR(50) COMMENT ''Loai xe: Xe so, Xe tay ga, Xe con tay, Xe dien''');

CALL add_column_if_not_exists('product', 'is_new',
    '`is_new` BOOLEAN NOT NULL DEFAULT FALSE COMMENT ''Badge New - xe vua ra mat''');

-- ------------------------------------------------------------
-- Nhóm 2: Động cơ
-- ------------------------------------------------------------
CALL add_column_if_not_exists('product', 'engine_type',
    '`engine_type` VARCHAR(100) COMMENT ''Loai dong co: 4 thi SOHC, DOHC...''');

CALL add_column_if_not_exists('product', 'displacement',
    '`displacement` INT COMMENT ''Dung tich xi-lanh (cc): 110, 125, 155...''');

CALL add_column_if_not_exists('product', 'max_power',
    '`max_power` VARCHAR(50) COMMENT ''Cong suat toi da: 13.2 kW / 9500 vong/phut''');

CALL add_column_if_not_exists('product', 'max_torque',
    '`max_torque` VARCHAR(50) COMMENT ''Mo men xoan toi da: 14.4 N.m / 8000 vong/phut''');

CALL add_column_if_not_exists('product', 'transmission',
    '`transmission` VARCHAR(50) COMMENT ''Hop so: Tay ga / 6 so / Con tay''');

-- ------------------------------------------------------------
-- Nhóm 3: Nhiên liệu & kích thước
-- ------------------------------------------------------------
CALL add_column_if_not_exists('product', 'fuel_system',
    '`fuel_system` VARCHAR(100) COMMENT ''He thong nhien lieu: Phun xang Fi / Che hoa khi''');

CALL add_column_if_not_exists('product', 'fuel_capacity',
    '`fuel_capacity` DOUBLE COMMENT ''Dung tich binh xang (lit): 5.4''');

CALL add_column_if_not_exists('product', 'fuel_consumption',
    '`fuel_consumption` VARCHAR(50) COMMENT ''Muc tieu thu nhien lieu: 1.91 lit/100km''');

CALL add_column_if_not_exists('product', 'dimensions',
    '`dimensions` VARCHAR(100) COMMENT ''Kich thuoc DxRxC (mm): 1975 x 665 x 1105''');

CALL add_column_if_not_exists('product', 'weight',
    '`weight` INT COMMENT ''Khoi luong xe (kg)''');

CALL add_column_if_not_exists('product', 'seat_height',
    '`seat_height` INT COMMENT ''Chieu cao yen (mm)''');

CALL add_column_if_not_exists('product', 'ground_clearance',
    '`ground_clearance` INT COMMENT ''Khoang sang gam (mm)''');

-- ------------------------------------------------------------
-- Nhóm 4: Bảo hành & xuất xứ
-- ------------------------------------------------------------
CALL add_column_if_not_exists('product', 'warranty_info',
    '`warranty_info` VARCHAR(100) COMMENT ''Thong tin bao hanh: 12 thang''');

CALL add_column_if_not_exists('product', 'origin',
    '`origin` VARCHAR(100) COMMENT ''Xuat xu: Yamaha Viet Nam, Honda Viet Nam...''');

-- ------------------------------------------------------------
-- Nhóm 5: Trả góp
-- ------------------------------------------------------------
CALL add_column_if_not_exists('product', 'installment_supported',
    '`installment_supported` BOOLEAN NOT NULL DEFAULT FALSE COMMENT ''Ho tro tra gop: true/false''');

CALL add_column_if_not_exists('product', 'installment_months',
    '`installment_months` INT NOT NULL DEFAULT 36 COMMENT ''So thang tra gop toi da''');

CALL add_column_if_not_exists('product', 'down_payment_percent',
    '`down_payment_percent` INT NOT NULL DEFAULT 20 COMMENT ''Phan tram tra truoc toi thieu (vd: 20 = 20%)''');

-- ------------------------------------------------------------
-- Dọn dẹp
-- ------------------------------------------------------------
DROP PROCEDURE IF EXISTS add_column_if_not_exists;

-- ------------------------------------------------------------
-- Xác nhận: liệt kê tất cả cột mới của bảng product
-- ------------------------------------------------------------
SELECT column_name, column_type, is_nullable, column_default
FROM information_schema.columns
WHERE table_schema = 'motorbike_shop'
  AND table_name   = 'product'
  AND column_name IN (
    'brand', 'vehicle_type', 'is_new',
    'engine_type', 'displacement', 'max_power', 'max_torque', 'transmission',
    'fuel_system', 'fuel_capacity', 'fuel_consumption',
    'dimensions', 'weight', 'seat_height', 'ground_clearance',
    'warranty_info', 'origin',
    'installment_supported', 'installment_months', 'down_payment_percent'
  )
ORDER BY ordinal_position;
