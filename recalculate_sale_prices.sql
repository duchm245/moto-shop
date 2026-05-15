-- ============================================================
-- Script: Tính lại salePrice cho tất cả sản phẩm đang sale
-- Database: motorbike_shop
-- Chạy script này khi muốn force-update giá sale ngay lập tức
-- ============================================================

USE motorbike_shop;

-- Xem trước: danh sách sản phẩm và giá sẽ được cập nhật
SELECT
    p.id           AS product_id,
    p.name         AS product_name,
    p.price        AS gia_goc,
    p.sale_price   AS sale_price_cu,
    s.discount     AS discount_pct,
    ROUND(p.price * (1 - s.discount / 100.0)) AS sale_price_moi
FROM products p
JOIN sales s ON p.sale_id = s.id
WHERE s.is_active = 1;

-- ============================================================
-- Cập nhật salePrice theo công thức: price * (1 - discount/100)
-- ============================================================
UPDATE products p
JOIN sales s ON p.sale_id = s.id
SET p.sale_price = ROUND(p.price * (1 - s.discount / 100.0))
WHERE s.is_active = 1;

-- Xác nhận kết quả
SELECT
    p.id, p.name, p.price,
    p.sale_price AS sale_price_sau_update,
    s.discount, s.name AS sale_name
FROM products p
JOIN sales s ON p.sale_id = s.id
WHERE s.is_active = 1;

SELECT ROW_COUNT() AS so_san_pham_da_cap_nhat;
