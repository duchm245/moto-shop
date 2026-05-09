-- ============================================================
-- MIGRATION: Tuần 2 - Day 2
-- Mục tiêu: Nhập 6 sản phẩm xe máy mẫu với đầy đủ thông số kỹ thuật,
--           variant (phiên bản + màu) và ảnh placeholder.
--
-- ⚠️  CHẠY FILE NÀY QUA DATAGRIP / MYSQL WORKBENCH (không dùng PowerShell pipe)
--     để tránh lỗi encoding tiếng Việt.
--
-- Danh sách xe:
--   [1] Honda Wave Alpha 110     → category 31 (Xe số)
--   [2] Honda Air Blade 125      → category 32 (Xe tay ga)
--   [3] Yamaha Exciter 155       → category 33 (Xe côn tay)
--   [4] Yamaha Grande 125        → category 32 (Xe tay ga)
--   [5] Suzuki Raider 150 Fi     → category 33 (Xe côn tay)
--   [6] VinFast Evo 200          → category 34 (Xe điện)
--
-- product_author_id = 1 (admin)
-- ============================================================

USE motorbike_shop;
SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ============================================================
-- BẢNG PRODUCT
-- ============================================================

INSERT INTO product (
    id, name, description, sku, price, sale_price, status, visited,
    vehicle_condition, manufacturing_year, mileage,
    brand, vehicle_type, is_new,
    engine_type, displacement, max_power, max_torque, transmission,
    fuel_system, fuel_capacity, fuel_consumption,
    dimensions, weight, seat_height, ground_clearance,
    warranty_info, origin,
    installment_supported, installment_months, down_payment_percent,
    product_author_id, product_category_id, sale_id,
    created_date, modified_date
)
VALUES

-- ① Honda Wave Alpha 110
(101,
 'Honda Wave Alpha 110',
 '<p>Honda Wave Alpha 110 là mẫu xe số phổ thông bán chạy nhất Việt Nam với thiết kế gọn gàng, tiết kiệm nhiên liệu xuất sắc và độ bền cao. Phù hợp cho học sinh, sinh viên và người đi làm hàng ngày.</p>',
 'HONDA-WAVE-ALPHA-110',
 18990000, 18990000, 1, 0,
 'new', 2024, 0,
 'Honda', 'Xe số', 1,
 '4 thì, SOHC, 2 van, 1 xi-lanh', 110, '6,0 kW / 7.500 vòng/phút', '8,68 Nm / 5.500 vòng/phút', '4 số',
 'Bộ chế hòa khí', 4.0, '1,63 lít/100km',
 '1.896 x 694 x 1.061 mm', 99, 761, 145,
 '3 năm hoặc 30.000 km', 'Honda Việt Nam',
 1, 36, 20,
 1, 31, NULL,
 NOW(), NOW()),

-- ② Honda Air Blade 125
(102,
 'Honda Air Blade 125',
 '<p>Honda Air Blade 125 - xe tay ga thể thao với thiết kế mạnh mẽ, động cơ eSP tiên tiến cho hiệu suất vượt trội và tiết kiệm nhiên liệu tối ưu.</p>',
 'HONDA-AIR-BLADE-125',
 52900000, 52900000, 1, 0,
 'new', 2024, 0,
 'Honda', 'Xe tay ga', 1,
 '4 thì, eSP, SOHC, 2 van, 1 xi-lanh', 125, '9,2 kW / 8.500 vòng/phút', '12,0 N·m / 5.000 vòng/phút', 'Tay ga (CVT)',
 'Phun xăng điện tử PGM-FI', 5.3, '1,79 lít/100km',
 '1.916 × 681 × 1.132 mm', 118, 790, 138,
 '3 năm hoặc 30.000 km', 'Honda Việt Nam',
 1, 36, 20,
 1, 32, NULL,
 NOW(), NOW()),

-- ③ Yamaha Exciter 155 VVA
(103,
 'Yamaha Exciter 155 VVA',
 '<p>Yamaha Exciter 155 VVA - biểu tượng của dòng xe côn tay thể thao với công nghệ VVA (Variable Valve Actuation), mang lại cảm giác lái phấn khích và mạnh mẽ.</p>',
 'YAMAHA-EXCITER-155-VVA',
 52900000, 52900000, 1, 0,
 'new', 2024, 0,
 'Yamaha', 'Xe côn tay', 1,
 '4 thì, 4 van, SOHC, VVA, 1 xi-lanh', 155, '13,2 kW / 9.500 vòng/phút', '14,4 N·m / 8.000 vòng/phút', '6 số',
 'Phun xăng điện tử', 5.4, '1,91 lít/100km',
 '1.975 × 665 × 1.105 mm', 119, 795, 150,
 '3 năm hoặc 30.000 km', 'Yamaha Việt Nam',
 1, 36, 20,
 1, 33, NULL,
 NOW(), NOW()),

-- ④ Yamaha Grande 125 Hybrid
(104,
 'Yamaha Grande 125 Hybrid',
 '<p>Yamaha Grande 125 Hybrid - xe tay ga cao cấp dành cho phái đẹp với công nghệ hybrid SmartPower, thiết kế sang trọng và nhiều tính năng tiện ích hiện đại.</p>',
 'YAMAHA-GRANDE-125',
 49900000, 49900000, 1, 0,
 'new', 2024, 0,
 'Yamaha', 'Xe tay ga', 0,
 '4 thì, 4 van, SOHC, BluCore, 1 xi-lanh', 125, '7,3 kW / 8.000 vòng/phút', '10,6 N·m / 6.000 vòng/phút', 'Tay ga (CVT)',
 'Phun xăng điện tử', 5.5, '1,76 lít/100km',
 '1.840 × 680 × 1.145 mm', 112, 761, 127,
 '3 năm hoặc 30.000 km', 'Yamaha Việt Nam',
 1, 36, 20,
 1, 32, NULL,
 NOW(), NOW()),

-- ⑤ Suzuki Raider R150 Fi
(105,
 'Suzuki Raider R150 Fi',
 '<p>Suzuki Raider R150 Fi - mẫu xe côn tay thể thao mạnh mẽ với động cơ phun xăng Fi, phong cách thiết kế hầm hố và hiệu suất vượt trội phân khúc 150cc.</p>',
 'SUZUKI-RAIDER-R150',
 46990000, 46990000, 1, 0,
 'new', 2024, 0,
 'Suzuki', 'Xe côn tay', 0,
 '4 thì, DOHC, 4 van, làm mát bằng dầu, 1 xi-lanh', 150, '11,3 kW / 10.000 vòng/phút', '13,8 N·m / 8.000 vòng/phút', '6 số',
 'Phun xăng điện tử Fi', 4.8, '2,1 lít/100km',
 '1.985 × 700 × 1.060 mm', 126, 795, 170,
 '2 năm hoặc 20.000 km', 'Suzuki Việt Nam',
 1, 36, 20,
 1, 33, NULL,
 NOW(), NOW()),

-- ⑥ VinFast Evo 200
(106,
 'VinFast Evo 200',
 '<p>VinFast Evo 200 - xe máy điện thông minh với phạm vi hoạt động lên đến 200km/lần sạc, kết nối điện thoại thông minh và thiết kế hiện đại, thân thiện với môi trường.</p>',
 'VINFAST-EVO-200',
 29990000, 29990000, 1, 0,
 'new', 2024, 0,
 'VinFast', 'Xe điện', 1,
 'Động cơ điện 3 pha không chổi than', NULL, '4,0 kW (đỉnh 6,0 kW)', NULL, 'Tay ga (1 cấp)',
 'Điện (pin Lithium)', NULL, '1,9 kWh/100km',
 '1.840 × 700 × 1.100 mm', 108, 755, 140,
 '3 năm hoặc 30.000 km', 'VinFast Việt Nam',
 1, 36, 20,
 1, 34, NULL,
 NOW(), NOW());

-- ============================================================
-- BẢNG VARIANT (phiên bản + màu sắc)
-- ============================================================

INSERT INTO variant (id, name, color_name, color_code, stock, sold, product_id)
VALUES
-- Wave Alpha 110
(1001, 'Tiêu Chuẩn', 'Đỏ đen',   '#CC0000', 50, 0, 101),
(1002, 'Tiêu Chuẩn', 'Trắng đen', '#F5F5F5', 40, 0, 101),
(1003, 'Tiêu Chuẩn', 'Xanh đen',  '#1A3A6B', 30, 0, 101),

-- Air Blade 125
(1004, 'Tiêu Chuẩn',  'Đen mờ',    '#2B2B2B', 30, 0, 102),
(1005, 'Cao Cấp',     'Trắng ngọc', '#E8F5E9', 25, 0, 102),
(1006, 'Đặc Biệt',    'Đỏ đen',    '#CC0000', 20, 0, 102),

-- Exciter 155 VVA
(1007, 'Tiêu Chuẩn',   'Đen nhám',    '#1C1C1C', 25, 0, 103),
(1008, 'Giới Hạn RC',  'Xanh trắng',  '#0047AB', 15, 0, 103),
(1009, 'Giới Hạn RC',  'Vàng đen',    '#FFD700', 10, 0, 103),

-- Grande 125 Hybrid
(1010, 'Tiêu Chuẩn', 'Hồng trắng', '#FFB6C1', 30, 0, 104),
(1011, 'Tiêu Chuẩn', 'Xanh pastel', '#B0E0E6', 25, 0, 104),
(1012, 'Cao Cấp',    'Trắng bạc',   '#F8F8FF', 20, 0, 104),

-- Raider R150
(1013, 'Tiêu Chuẩn', 'Đen đỏ',    '#1C1C1C', 20, 0, 105),
(1014, 'Tiêu Chuẩn', 'Trắng xanh','#FFFFFF',  15, 0, 105),

-- VinFast Evo 200
(1015, 'Bản Tiêu Chuẩn', 'Trắng ngọc', '#ECEFF1', 40, 0, 106),
(1016, 'Bản Cao Cấp',    'Xanh dương',  '#1565C0', 30, 0, 106),
(1017, 'Bản Cao Cấp',    'Đen bóng',    '#212121', 25, 0, 106);

-- ============================================================
-- BẢNG PRODUCT_IMAGE (ảnh placeholder - tên file sẽ cập nhật sau)
-- ============================================================

INSERT INTO product_image (id, url, product_id)
VALUES
-- Wave Alpha 110
(2001, 'wave_alpha_1.jpg', 101),
(2002, 'wave_alpha_2.jpg', 101),

-- Air Blade 125
(2003, 'air_blade_1.jpg', 102),
(2004, 'air_blade_2.jpg', 102),

-- Exciter 155
(2005, 'exciter_155_1.jpg', 103),
(2006, 'exciter_155_2.jpg', 103),

-- Grande 125
(2007, 'grande_125_1.jpg', 104),
(2008, 'grande_125_2.jpg', 104),

-- Raider 150
(2009, 'raider_150_1.jpg', 105),
(2010, 'raider_150_2.jpg', 105),

-- VinFast Evo 200
(2011, 'vinfast_evo_1.jpg', 106),
(2012, 'vinfast_evo_2.jpg', 106);

SET FOREIGN_KEY_CHECKS = 1;

-- ============================================================
-- Xác nhận kết quả
-- ============================================================
SELECT
    p.id,
    p.name,
    p.price,
    p.brand,
    p.vehicle_type,
    p.displacement,
    p.condition,
    COUNT(v.id) AS so_phien_ban,
    COUNT(pi.id) AS so_anh
FROM product p
LEFT JOIN variant v ON v.product_id = p.id
LEFT JOIN product_image pi ON pi.product_id = p.id
WHERE p.id BETWEEN 101 AND 106
GROUP BY p.id
ORDER BY p.id;
