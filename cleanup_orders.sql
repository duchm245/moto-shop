-- ============================================================
-- Xóa đơn hàng liên quan đến "Nguyễn Kim Thắng"
-- và cập nhật tên mới (HuyTrinh / Huy Trinh)
-- Chạy file này trên database motorbike_shop hiện tại
-- ============================================================

USE `motorbike_shop`;

SET FOREIGN_KEY_CHECKS = 0;

-- 1. Xóa notifications liên quan đến các đơn hàng cũ
DELETE FROM `notifications` WHERE `order_id` IN (3, 4, 5);

-- 2. Xóa order_item liên quan
DELETE FROM `order_item` WHERE `order_id` IN (3, 4, 5);

-- 3. Xóa các đơn hàng của "Nguyễn Kim Thắng"
DELETE FROM `orders` WHERE `id` IN (3, 4, 5);

-- 4. Cập nhật tên trong bảng address (user_id = 3)
UPDATE `address`
SET `first_name` = 'Huy',
    `last_name`  = 'Trinh'
WHERE `user_id` = 3;

-- 5. Cập nhật author bài viết
UPDATE `article`
SET `author` = 'Huy Trinh'
WHERE `author` IN ('Nguyen Kim Thang', 'Nguyễn Kim Thắng');

SET FOREIGN_KEY_CHECKS = 1;

-- ============================================================
-- XONG! Đã xóa 3 đơn hàng và cập nhật tên mới.
-- ============================================================
