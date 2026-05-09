-- ============================================================
-- PHASE 4 — DỮ LIỆU MẪU: Danh mục + Sản phẩm xe máy
-- ============================================================
-- Cách chạy: Mở file này trong MySQL Workbench hoặc DataGrip,
--            chọn toàn bộ và nhấn Execute (Ctrl+Shift+Enter).
-- Encoding: UTF-8 (đảm bảo editor đang dùng UTF-8)
-- ============================================================

USE motorbike_shop;
SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ============================================================
-- BƯỚC 1: Xóa dữ liệu cũ (quần áo)
-- ============================================================

DELETE FROM order_item WHERE product_name IN (
    SELECT name FROM product WHERE product_category_id BETWEEN 1 AND 29
) OR order_id IN (3, 4, 5, 7);
DELETE FROM notifications WHERE product_id BETWEEN 3 AND 24;
DELETE FROM size WHERE color_id IN (SELECT id FROM color WHERE product_id BETWEEN 3 AND 24);
DELETE FROM color WHERE product_id BETWEEN 3 AND 24;
DELETE FROM product_image WHERE product_id BETWEEN 3 AND 24;
DELETE FROM variant WHERE product_id BETWEEN 3 AND 24;
DELETE FROM product WHERE id BETWEEN 3 AND 24;
UPDATE article SET category_id = NULL WHERE category_id = 30;
UPDATE banner SET category_id = NULL WHERE category_id BETWEEN 1 AND 30;
DELETE FROM category WHERE parent_category_id IS NOT NULL AND id BETWEEN 1 AND 30;
DELETE FROM category WHERE id BETWEEN 1 AND 30;

-- ============================================================
-- BƯỚC 2: Danh mục xe máy mới
-- ============================================================

INSERT IGNORE INTO category (id, created_date, description, modified_date, status, title, type, url_image, parent_category_id)
VALUES
(31, NOW(), 'Xe so - xe pho thong, tiet kiem nhien lieu', NOW(), 1, 'Xe số', 0, 'category_xe_so.jpg', NULL),
(32, NOW(), 'Xe tay ga - tien loi, de di', NOW(), 1, 'Xe tay ga', 0, 'category_xe_tay_ga.jpg', NULL),
(33, NOW(), 'Xe con tay - the thao, manh me', NOW(), 1, 'Xe côn tay', 0, 'category_xe_con_tay.jpg', NULL),
(34, NOW(), 'Xe dien - than thien moi truong', NOW(), 1, 'Xe điện', 0, 'category_xe_dien.jpg', NULL),
(35, NOW(), 'Tin tuc va bai viet ve xe may', NOW(), 1, 'Tin tức xe máy', 2, NULL, NULL);

UPDATE article SET category_id = 35 WHERE category_id IS NULL;
ALTER TABLE category AUTO_INCREMENT = 36;

-- ============================================================
-- BƯỚC 3: Sản phẩm xe máy mẫu
-- ============================================================

INSERT IGNORE INTO product (
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
 '<p>Honda Wave Alpha 110 la mau xe so pho thong ban chay nhat Viet Nam voi thiet ke gon gang, tiet kiem nhien lieu xuat sac va do ben cao.</p>',
 'HONDA-WAVE-ALPHA-110',
 18990000, 18990000, 1, 0,
 'new', 2024, 0,
 'Honda', 'Xe số', 1,
 '4 thi, SOHC, 2 van, 1 xi-lanh', 110, '6.0 kW / 7500 vong/phut', '8.68 Nm / 5500 vong/phut', '4 so',
 'Bo che hoa khi', 4.0, '1.63 lit/100km',
 '1896 x 694 x 1061 mm', 99, 761, 145,
 '3 nam hoac 30000 km', 'Honda Viet Nam',
 1, 36, 20,
 1, 31, NULL,
 NOW(), NOW()),

-- ② Honda Air Blade 125
(102,
 'Honda Air Blade 125',
 '<p>Honda Air Blade 125 - xe tay ga the thao voi thiet ke manh me, dong co eSP tien tien cho hieu suat vuot troi va tiet kiem nhien lieu toi uu.</p>',
 'HONDA-AIR-BLADE-125',
 52900000, 52900000, 1, 0,
 'new', 2024, 0,
 'Honda', 'Xe tay ga', 1,
 '4 thi, eSP, SOHC, 2 van, 1 xi-lanh', 125, '9.2 kW / 8500 vong/phut', '12.0 Nm / 5000 vong/phut', 'Tay ga (CVT)',
 'Phun xang dien tu PGM-FI', 5.3, '1.79 lit/100km',
 '1916 x 681 x 1132 mm', 118, 790, 138,
 '3 nam hoac 30000 km', 'Honda Viet Nam',
 1, 36, 20,
 1, 32, NULL,
 NOW(), NOW()),

-- ③ Yamaha Exciter 155 VVA
(103,
 'Yamaha Exciter 155 VVA',
 '<p>Yamaha Exciter 155 VVA - bieu tuong cua dong xe con tay the thao voi cong nghe VVA, mang lai cam giac lai phan khich va manh me.</p>',
 'YAMAHA-EXCITER-155-VVA',
 52900000, 52900000, 1, 0,
 'new', 2024, 0,
 'Yamaha', 'Xe côn tay', 1,
 '4 thi, 4 van, SOHC, VVA, 1 xi-lanh', 155, '13.2 kW / 9500 vong/phut', '14.4 Nm / 8000 vong/phut', '6 so',
 'Phun xang dien tu', 5.4, '1.91 lit/100km',
 '1975 x 665 x 1105 mm', 119, 795, 150,
 '3 nam hoac 30000 km', 'Yamaha Viet Nam',
 1, 36, 20,
 1, 33, NULL,
 NOW(), NOW()),

-- ④ Yamaha Grande 125 Hybrid
(104,
 'Yamaha Grande 125 Hybrid',
 '<p>Yamaha Grande 125 Hybrid - xe tay ga cao cap danh cho phai dep voi cong nghe hybrid SmartPower, thiet ke sang trong va nhieu tinh nang tien ich.</p>',
 'YAMAHA-GRANDE-125',
 49900000, 49900000, 1, 0,
 'new', 2024, 0,
 'Yamaha', 'Xe tay ga', 0,
 '4 thi, 4 van, SOHC, BluCore, 1 xi-lanh', 125, '7.3 kW / 8000 vong/phut', '10.6 Nm / 6000 vong/phut', 'Tay ga (CVT)',
 'Phun xang dien tu', 5.5, '1.76 lit/100km',
 '1840 x 680 x 1145 mm', 112, 761, 127,
 '3 nam hoac 30000 km', 'Yamaha Viet Nam',
 1, 36, 20,
 1, 32, NULL,
 NOW(), NOW()),

-- ⑤ Suzuki Raider R150 Fi
(105,
 'Suzuki Raider R150 Fi',
 '<p>Suzuki Raider R150 Fi - mau xe con tay the thao manh me voi dong co phun xang Fi, phong cach ham ho va hieu suat vuot troi phan khuc 150cc.</p>',
 'SUZUKI-RAIDER-R150',
 46990000, 46990000, 1, 0,
 'new', 2024, 0,
 'Suzuki', 'Xe côn tay', 0,
 '4 thi, DOHC, 4 van, lam mat bang dau, 1 xi-lanh', 150, '11.3 kW / 10000 vong/phut', '13.8 Nm / 8000 vong/phut', '6 so',
 'Phun xang dien tu Fi', 4.8, '2.1 lit/100km',
 '1985 x 700 x 1060 mm', 126, 795, 170,
 '2 nam hoac 20000 km', 'Suzuki Viet Nam',
 1, 36, 20,
 1, 33, NULL,
 NOW(), NOW()),

-- ⑥ VinFast Evo 200
(106,
 'VinFast Evo 200',
 '<p>VinFast Evo 200 - xe may dien thong minh voi pham vi hoat dong len den 200km/lan sac, ket noi dien thoai thong minh va thiet ke hien dai.</p>',
 'VINFAST-EVO-200',
 29990000, 29990000, 1, 0,
 'new', 2024, 0,
 'VinFast', 'Xe điện', 1,
 'Dong co dien 3 pha khong choi than', NULL, '4.0 kW (dinh 6.0 kW)', NULL, 'Tay ga (1 cap)',
 'Dien (pin Lithium)', NULL, '1.9 kWh/100km',
 '1840 x 700 x 1100 mm', 108, 755, 140,
 '3 nam hoac 30000 km', 'VinFast Viet Nam',
 1, 36, 20,
 1, 34, NULL,
 NOW(), NOW());

-- ============================================================
-- BƯỚC 4: Variant (phiên bản + màu sắc)
-- ============================================================

DELETE FROM variant WHERE product_id BETWEEN 101 AND 106;

INSERT INTO variant (id, name, color_name, color_code, stock, sold, product_id) VALUES
-- Wave Alpha 110
(1001, 'Tiêu Chuẩn', 'Đỏ đen',    '#CC0000', 50, 0, 101),
(1002, 'Tiêu Chuẩn', 'Trắng đen', '#F5F5F5', 40, 0, 101),
(1003, 'Tiêu Chuẩn', 'Xanh đen',  '#1A3A6B', 30, 0, 101),
-- Air Blade 125
(1004, 'Tiêu Chuẩn', 'Đen mờ',    '#2B2B2B', 30, 0, 102),
(1005, 'Cao Cấp',    'Trắng ngọc','#E8F5E9', 25, 0, 102),
(1006, 'Đặc Biệt',  'Đỏ đen',    '#CC0000', 20, 0, 102),
-- Exciter 155 VVA
(1007, 'Tiêu Chuẩn',  'Đen nhám',  '#1C1C1C', 25, 0, 103),
(1008, 'Giới Hạn RC', 'Xanh trắng','#0047AB', 15, 0, 103),
(1009, 'Giới Hạn RC', 'Vàng đen',  '#FFD700', 10, 0, 103),
-- Grande 125 Hybrid
(1010, 'Tiêu Chuẩn', 'Hồng trắng', '#FFB6C1', 30, 0, 104),
(1011, 'Tiêu Chuẩn', 'Xanh pastel','#B0E0E6', 25, 0, 104),
(1012, 'Cao Cấp',    'Trắng bạc',  '#F8F8FF', 20, 0, 104),
-- Raider R150
(1013, 'Tiêu Chuẩn', 'Đen đỏ',    '#1C1C1C', 20, 0, 105),
(1014, 'Tiêu Chuẩn', 'Trắng xanh','#FFFFFF',  15, 0, 105),
-- VinFast Evo 200
(1015, 'Bản Tiêu Chuẩn', 'Trắng ngọc','#ECEFF1', 40, 0, 106),
(1016, 'Bản Cao Cấp',    'Xanh dương', '#1565C0', 30, 0, 106),
(1017, 'Bản Cao Cấp',    'Đen bóng',   '#212121', 25, 0, 106);

-- ============================================================
-- BƯỚC 5: Ảnh sản phẩm
-- ============================================================

DELETE FROM product_image WHERE product_id BETWEEN 101 AND 106;

INSERT INTO product_image (id, url, product_id) VALUES
(2001, 'wave_alpha_1.jpg',   101),
(2002, 'wave_alpha_2.jpg',   101),
(2003, 'air_blade_1.jpg',    102),
(2004, 'air_blade_2.jpg',    102),
(2005, 'exciter_155_1.jpg',  103),
(2006, 'exciter_155_2.jpg',  103),
(2007, 'grande_125_1.jpg',   104),
(2008, 'grande_125_2.jpg',   104),
(2009, 'raider_150_1.jpg',   105),
(2010, 'raider_150_2.jpg',   105),
(2011, 'vinfast_evo_1.jpg',  106),
(2012, 'vinfast_evo_2.jpg',  106);

-- ============================================================
-- Reset AUTO_INCREMENT
-- ============================================================
ALTER TABLE category AUTO_INCREMENT = 36;
ALTER TABLE product AUTO_INCREMENT = 200;
ALTER TABLE variant AUTO_INCREMENT = 2000;
ALTER TABLE product_image AUTO_INCREMENT = 3000;

SET FOREIGN_KEY_CHECKS = 1;

-- ============================================================
-- Xác nhận kết quả
-- ============================================================
SELECT 'CATEGORIES' AS section, id, title, type, status FROM category ORDER BY id;
SELECT 'PRODUCTS' AS section, p.id, p.name, p.brand, p.vehicle_type, p.displacement,
       p.vehicle_condition, p.price,
       COUNT(DISTINCT v.id) AS variants, COUNT(DISTINCT pi.id) AS images
FROM product p
LEFT JOIN variant v ON v.product_id = p.id
LEFT JOIN product_image pi ON pi.product_id = p.id
WHERE p.id BETWEEN 101 AND 106
GROUP BY p.id ORDER BY p.id;
