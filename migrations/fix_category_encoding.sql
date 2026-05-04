-- Fix encoding danh mục xe máy
-- Vấn đề: PowerShell pipe làm sai UTF-8, gây ra ký tự lỗi
USE motorbike_shop;

SET NAMES utf8mb4;

UPDATE category SET
    title = 'Xe số',
    description = 'Xe số - xe phổ thông, tiết kiệm nhiên liệu'
WHERE id = 31;

UPDATE category SET
    title = 'Xe tay ga',
    description = 'Xe tay ga - tiện lợi, dễ đi'
WHERE id = 32;

UPDATE category SET
    title = 'Xe côn tay',
    description = 'Xe côn tay - thể thao, mạnh mẽ'
WHERE id = 33;

UPDATE category SET
    title = 'Xe điện',
    description = 'Xe điện - thân thiện môi trường'
WHERE id = 34;

UPDATE category SET
    title = 'Tin tức xe máy',
    description = 'Tin tức và bài viết về xe máy'
WHERE id = 35;

-- Xác nhận kết quả
SELECT id, title, description FROM category ORDER BY id;
