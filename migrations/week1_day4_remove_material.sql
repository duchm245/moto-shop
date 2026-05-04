-- Week 1 Day 4: Xóa cột material khỏi bảng product
-- Cột này thuộc về hệ thống quần áo cũ, không còn phù hợp với xe máy.
-- Chạy SAU khi đã chạy week1_day1, day2, day3.
-- Ghi chú: MySQL 8.0 không hỗ trợ DROP COLUMN IF EXISTS (cú pháp MariaDB).
--          Dùng INFORMATION_SCHEMA để kiểm tra trước khi DROP.

USE motorbike_shop;

SET @col_exists = (
    SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS
    WHERE TABLE_SCHEMA = DATABASE()
      AND TABLE_NAME   = 'product'
      AND COLUMN_NAME  = 'material'
);
SET @sql = IF(
    @col_exists > 0,
    'ALTER TABLE product DROP COLUMN material',
    'SELECT ''[SKIP] Column material does not exist'' AS info'
);
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;
