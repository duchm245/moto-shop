-- ============================================================
-- MIGRATION: Tuần 1 - Day 2
-- Mục tiêu: Thêm trường tình trạng xe (mới / cũ) vào bảng product
--
-- Các cột thêm:
--   condition          — "new" | "used"  (mặc định "new")
--   manufacturing_year — Năm sản xuất    (nullable, vd: 2023)
--   mileage            — Số km đã đi     (mặc định 0)
--
-- Ghi chú thực tế khi áp dụng:
--   - manufacturing_year và mileage được Hibernate auto-create khi BE khởi động.
--   - `condition` phải ALTER thủ công vì là reserved keyword trong MySQL,
--     Hibernate không thể tạo cột này tự động.
--   - Sau đó MODIFY mileage để đồng bộ NOT NULL constraint với entity.
-- ============================================================

USE motorbike_shop;

-- ------------------------------------------------------------
-- Bước 1: Thêm cột `condition` (reserved keyword — phải escape)
-- (manufacturing_year và mileage đã được Hibernate tạo sẵn)
-- ------------------------------------------------------------
-- Chỉ ADD nếu cột chưa tồn tại (MySQL 8.0 không có IF NOT EXISTS cho ALTER TABLE)
SET @col_exists = (
    SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS
    WHERE TABLE_SCHEMA = DATABASE()
      AND TABLE_NAME   = 'product'
      AND COLUMN_NAME  = 'condition'
);
SET @sql = IF(
    @col_exists = 0,
    'ALTER TABLE product ADD COLUMN `condition` VARCHAR(10) NOT NULL DEFAULT ''new'' COMMENT ''Tinh trang xe: new | used''',
    'SELECT ''[SKIP] Column condition already exists'' AS info'
);
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- ------------------------------------------------------------
-- Bước 2: Đồng bộ NOT NULL constraint cho mileage
-- ------------------------------------------------------------
ALTER TABLE product
    MODIFY COLUMN mileage INT NOT NULL DEFAULT 0;

-- ------------------------------------------------------------
-- Xác nhận
-- ------------------------------------------------------------
SELECT column_name, column_type, is_nullable, column_default
FROM information_schema.columns
WHERE table_schema = 'motorbike_shop'
  AND table_name   = 'product'
  AND column_name IN ('condition', 'manufacturing_year', 'mileage')
ORDER BY ordinal_position;

