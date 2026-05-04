-- ============================================================
-- MIGRATION: Tuần 1 - Day 1
-- Mục tiêu: Tạo bảng `variant` thay thế hệ thống Color+Size
--            (vốn được thiết kế cho quần áo S/M/L/XL)
--
-- Bảng variant lưu từng phiên bản của xe máy, bao gồm:
--   - Tên phiên bản (Tiêu Chuẩn / Cao Cấp / Giới Hạn / Đặc Biệt)
--   - Màu xe (tên + mã HEX)
--   - Tồn kho + số đã bán
--
-- Ghi chú:
--   - Bảng `color` và `size` GIỮ NGUYÊN (không xóa) vì vẫn
--     có dữ liệu cũ và OrderItem đang tham chiếu valueColor/valueSize.
--   - Dữ liệu mẫu variant sẽ nhập ở Tuần 4 sau khi có sản phẩm.
-- ============================================================

USE motorbike_shop;

-- ------------------------------------------------------------
-- 1. Tạo bảng variant
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS variant (
    id            BIGINT AUTO_INCREMENT PRIMARY KEY,
    name          VARCHAR(100) NOT NULL COMMENT 'Tên phiên bản: Tiêu Chuẩn / Cao Cấp / Giới Hạn / Đặc Biệt',
    color_name    VARCHAR(100)          COMMENT 'Tên màu xe: Đỏ đen, Xanh xám, Trắng đen...',
    color_code    VARCHAR(20)           COMMENT 'Mã màu HEX: #CC0000, #4A6FA5...',
    stock         INT NOT NULL DEFAULT 0 COMMENT 'Số lượng tồn kho',
    sold          INT NOT NULL DEFAULT 0 COMMENT 'Số lượng đã bán',
    product_id    BIGINT NOT NULL,
    CONSTRAINT fk_variant_product FOREIGN KEY (product_id) REFERENCES product(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  COMMENT='Phiên bản xe máy — thay thế Color+Size cho quần áo';

-- ------------------------------------------------------------
-- 2. Xác nhận tạo thành công
-- ------------------------------------------------------------
SHOW CREATE TABLE variant;
DESCRIBE variant;
