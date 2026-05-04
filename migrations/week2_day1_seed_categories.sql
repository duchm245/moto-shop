-- ============================================================
-- MIGRATION: Tuần 2 - Day 1
-- Mục tiêu: Xóa danh mục quần áo cũ, nhập danh mục xe máy mới
--
-- Cấu trúc danh mục xe máy:
--
--   [31] Xe số        (parent)
--   [32] Xe tay ga    (parent)
--   [33] Xe côn tay   (parent)
--   [34] Xe điện      (parent)
--   [35] Bài viết blog (giữ lại, đổi ID để tránh xung đột với id=30 cũ)
--
-- Lưu ý:
--   - Các sản phẩm quần áo cũ (id 3-24) và danh mục cũ (id 1-29) sẽ bị xóa.
--   - Bảng size, color (liên quan quần áo cũ) sẽ được xóa data nhưng giữ bảng.
--   - Bảng variant đã được tạo ở week1_day1 → không cần tạo lại.
--   - ID bắt đầu từ 31 để tránh AUTO_INCREMENT conflict nếu còn record cũ.
-- ============================================================

USE motorbike_shop;

-- Tắt kiểm tra FK để có thể xóa tự do
SET FOREIGN_KEY_CHECKS = 0;

-- ============================================================
-- BƯỚC 1: Xóa data cũ liên quan đến quần áo
-- (theo thứ tự FK: xóa con trước, cha sau)
-- ============================================================

-- Xóa order_item liên quan sản phẩm cũ (nếu còn)
DELETE FROM order_item WHERE product_name IN (
    SELECT name FROM product WHERE product_category_id BETWEEN 1 AND 29
) OR order_id IN (3, 4, 5, 7);

-- Xóa notifications cũ
DELETE FROM notifications WHERE product_id BETWEEN 3 AND 24;

-- Xóa size (liên quan color cũ)
DELETE FROM size WHERE color_id IN (
    SELECT id FROM color WHERE product_id BETWEEN 3 AND 24
);

-- Xóa color cũ
DELETE FROM color WHERE product_id BETWEEN 3 AND 24;

-- Xóa product_image cũ
DELETE FROM product_image WHERE product_id BETWEEN 3 AND 24;

-- Xóa variant cũ (nếu có)
DELETE FROM variant WHERE product_id BETWEEN 3 AND 24;

-- Xóa products cũ
DELETE FROM product WHERE id BETWEEN 3 AND 24;

-- Xóa article liên quan danh mục cũ (category_id = 30)
-- Giữ lại article nhưng reset category_id để tránh FK lỗi
UPDATE article SET category_id = NULL WHERE category_id = 30;

-- Xóa banner liên quan danh mục cũ
UPDATE banner SET category_id = NULL WHERE category_id BETWEEN 1 AND 30;

-- Xóa danh mục con trước (có parent_category_id)
DELETE FROM category WHERE parent_category_id IS NOT NULL AND id BETWEEN 1 AND 30;

-- Xóa danh mục cha
DELETE FROM category WHERE id BETWEEN 1 AND 30;

-- ============================================================
-- BƯỚC 2: Nhập danh mục xe máy mới
-- type = 0: danh mục sản phẩm
-- type = 2: danh mục bài viết
-- status = 1: hiện
-- ============================================================

INSERT IGNORE INTO `category` (`id`, `created_date`, `description`, `modified_date`, `status`, `title`, `type`, `url_image`, `parent_category_id`)
VALUES
-- Danh mục sản phẩm - Loại xe (parent, không có parent_category_id)
(31, NOW(), 'Xe số - xe phổ thông, tiết kiệm nhiên liệu', NOW(), 1, 'Xe số', 0, 'category_xe_so.jpg', NULL),
(32, NOW(), 'Xe tay ga - tiện lợi, dễ đi', NOW(), 1, 'Xe tay ga', 0, 'category_xe_tay_ga.jpg', NULL),
(33, NOW(), 'Xe côn tay - thể thao, mạnh mẽ', NOW(), 1, 'Xe côn tay', 0, 'category_xe_con_tay.jpg', NULL),
(34, NOW(), 'Xe điện - thân thiện môi trường', NOW(), 1, 'Xe điện', 0, 'category_xe_dien.jpg', NULL),

-- Danh mục bài viết (giữ để blog hoạt động)
(35, NOW(), 'Tin tức và bài viết về xe máy', NOW(), 1, 'Tin tức xe máy', 2, NULL, NULL);

-- ============================================================
-- BƯỚC 3: Gán lại category cho article (bài viết cũ về boot/phối đồ
--         sẽ được gán vào category 35 - có thể xóa sau nếu muốn)
-- ============================================================
UPDATE article SET category_id = 35 WHERE category_id IS NULL;

-- ============================================================
-- BƯỚC 4: Reset AUTO_INCREMENT để ID tiếp theo bắt đầu từ 36
-- ============================================================
ALTER TABLE category AUTO_INCREMENT = 36;

-- Bật lại kiểm tra FK
SET FOREIGN_KEY_CHECKS = 1;

-- ============================================================
-- Xác nhận kết quả
-- ============================================================
SELECT id, title, type, status, parent_category_id
FROM category
ORDER BY id;
