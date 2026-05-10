-- ============================================================
-- Thêm danh mục bài viết (type = 2) cho trang Tin tức
-- Hiển thị dưới dạng sub-tab và tag badge trên mỗi bài viết
-- ============================================================

INSERT IGNORE INTO category (id, created_date, description, modified_date, status, title, type, url_image, parent_category_id)
VALUES
  (35, NOW(), 'Tin tức sự kiện xe máy, hoạt động cửa hàng', NOW(), 1, 'Tin sự kiện',   2, NULL, NULL),
  (36, NOW(), 'Chương trình khuyến mại, ưu đãi giảm giá',   NOW(), 1, 'Tin khuyến mại', 2, NULL, NULL),
  (37, NOW(), 'Tuyển dụng nhân sự cửa hàng xe máy',         NOW(), 1, 'Tin tuyển dụng', 2, NULL, NULL);

ALTER TABLE category AUTO_INCREMENT = 38;
