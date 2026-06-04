-- ============================================================
-- Bài viết mẫu - tiếng Việt đầy đủ dấu (title + content + short_content)
-- Import:
--   docker cp add_articles.sql motorbike-shop-mysql:/tmp/add_articles.sql
--   docker exec -e MYSQL_PWD=123456 motorbike-shop-mysql mysql --default-character-set=utf8mb4 -u root motorbike_shop -e "source /tmp/add_articles.sql"
-- ============================================================

USE `motorbike_shop`;

SET NAMES utf8mb4;
SET CHARACTER SET utf8mb4;
SET character_set_connection = utf8mb4;

DELETE FROM `article` WHERE `id` >= 3;
UPDATE `article` SET `category_id` = 35 WHERE `id` IN (1, 2);

INSERT INTO `article`
  (`id`, `author`, `content`, `created_date`, `image`, `modified_date`,
   `short_content`, `status`, `title`, `category_id`, `user_id`)
VALUES

-- =====================================================
-- Tin tức xe máy (category_id = 35)
-- =====================================================
(3, 'Huy Trinh',
 '<h2>Honda ra mắt Air Blade 2025 với công nghệ eSP+</h2><p>Honda Việt Nam vừa chính thức giới thiệu Honda Air Blade 2025 — phiên bản nâng cấp toàn diện với động cơ eSP+ thế hệ mới, tăng công suất lên 9.5 kW và giảm tiêu hao nhiên liệu xuống còn 1.7 lít/100km.</p><p>Xe được bổ sung màn hình LCD đa thông tin, khóa thông minh Smart Key và hệ thống phanh CBS tích hợp. Giá bán dự kiến từ 55.000.000 VNĐ, có mặt tại các đại lý ủy quyền Honda trên toàn quốc từ tháng 7/2025.</p>',
 '2026-05-15 09:00:00', 'blog_1.jpg', '2026-05-15 09:00:00',
 '<p>Honda Việt Nam ra mắt Air Blade 2025 với động cơ eSP+ mới, tiết kiệm nhiên liệu hơn và nhiều tính năng hiện đại.</p>',
 1, 'Honda Air Blade 2025 ra mắt: Nâng cấp toàn diện động cơ eSP+', 35, 2),

(4, 'Huy Trinh',
 '<h2>Yamaha Exciter 2025 — Vua Côn Tay thế hệ mới</h2><p>Yamaha Motor Việt Nam vừa trình làng Exciter 2025 với thiết kế hoàn toàn mới mang phong cách R-series, động cơ VVA 155cc được tối ưu hóa cho hiệu suất và tiết kiệm nhiên liệu.</p><p>Đặc biệt, phiên bản cao cấp RC được trang bị quickshifter và đèn pha LED dạng thiên thạch. Đây là dòng xe côn tay bán chạy nhất phân khúc 150-160cc tại Việt Nam trong suốt nhiều năm liên tiếp.</p>',
 '2026-05-20 14:30:00', 'blog_2.jpg', '2026-05-20 14:30:00',
 '<p>Yamaha Exciter 2025 ra mắt với thiết kế hoàn toàn mới, động cơ VVA 155cc cải tiến và nhiều trang bị cao cấp.</p>',
 1, 'Yamaha Exciter 2025 lộ diện: Thiết kế mới, mạnh mẽ hơn bao giờ hết', 35, 2),

(5, 'Huy Trinh',
 '<h2>Top 5 xe tay ga đáng mua nhất năm 2025</h2><p>Thị trường xe tay ga Việt Nam năm 2025 sôi động với nhiều model mới và cũ cạnh tranh khốc liệt. Dưới đây là 5 cái tên đáng chú ý nhất:</p><ol><li><strong>Honda Air Blade 125</strong> — Tiết kiệm, bền bỉ, giá hợp lý</li><li><strong>Yamaha NVX 155 VVA</strong> — Thể thao, mạnh mẽ, phù hợp phượt</li><li><strong>Honda SH 160i</strong> — Đẳng cấp, sang trọng, phù hợp công sở</li><li><strong>Honda Vario 160</strong> — Thực dụng, khoang chứa đồ lớn</li><li><strong>Yamaha Freego 125</strong> — Trẻ trung, kết nối thông minh</li></ol>',
 '2026-05-25 10:00:00', 'blog_1.jpg', '2026-05-25 10:00:00',
 '<p>Tổng hợp 5 mẫu xe tay ga đáng mua nhất năm 2025 theo từng nhu cầu sử dụng.</p>',
 1, 'Top 5 xe tay ga đáng mua nhất 2025 theo từng nhu cầu', 35, 2),

(6, 'Huy Trinh',
 '<h2>Xe máy điện bùng nổ tại Việt Nam năm 2025</h2><p>Theo số liệu từ Hiệp hội các nhà sản xuất xe máy Việt Nam (VAMM), doanh số xe điện hai bánh tăng trưởng 45% trong quý 1/2025 so với cùng kỳ năm ngoái. VinFast, Honda và Yadea đang dẫn đầu thị phần với các dòng xe có phạm vi hoạt động từ 100–200 km/lần sạc.</p><p>Với việc xăng liên tục tăng giá và ý thức bảo vệ môi trường ngày càng cao, người tiêu dùng Việt Nam đang dần chuyển sang xe điện như một giải pháp di chuyển bền vững cho tương lai.</p>',
 '2026-06-01 08:00:00', 'blog_2.jpg', '2026-06-01 08:00:00',
 '<p>Doanh số xe điện hai bánh tăng 45% quý 1/2025. Xu hướng chuyển đổi sang xe điện đang diễn ra mạnh mẽ tại Việt Nam.</p>',
 1, 'Xe máy điện bùng nổ tại Việt Nam: Tăng trưởng 45% trong quý 1/2025', 35, 2),

-- =====================================================
-- Tin khuyến mãi (category_id = 36)
-- =====================================================
(7, 'Huy Trinh',
 '<h2>Ưu đãi Hè 2025 — Mua xe, nhận quà liền tay!</h2><p>Nhân dịp hè 2025, LT Motor triển khai chương trình khuyến mãi đặc biệt áp dụng cho toàn bộ xe mới từ nay đến hết 31/07/2025:</p><ul><li><strong>Tặng ngay mũ bảo hiểm cao cấp</strong> trị giá 500.000đ cho mỗi xe mua</li><li><strong>Giảm 500.000đ</strong> phí làm đăng ký xe</li><li><strong>Bảo hiểm vật chất 1 năm miễn phí</strong> cho xe trên 50 triệu</li><li><strong>Trả góp 0% lãi suất</strong> 6 tháng đầu khi mua qua VPBank</li></ul><p><em>Áp dụng tại showroom LT Motor. Số lượng có hạn, liên hệ ngay để đăng ký!</em></p>',
 '2026-06-01 07:00:00', 'blog_1.jpg', '2026-06-01 07:00:00',
 '<p>LT Motor khuyến mãi hè 2025: Tặng mũ bảo hiểm, giảm phí đăng ký, bảo hiểm miễn phí và trả góp 0% lãi suất 6 tháng đầu.</p>',
 1, '[Khuyến mãi Hè 2025] Mua xe – Tặng quà – Trả góp 0% lãi suất', 36, 2),

(8, 'Huy Trinh',
 '<h2>Tri ân khách hàng thân thiết — Ưu đãi độc quyền tháng 6</h2><p>Để tri ân những khách hàng đã đồng hành cùng LT Motor, chúng tôi gửi tặng chương trình ưu đãi đặc biệt dành riêng cho tháng 6/2025:</p><ul><li><strong>Khách VIP</strong> (mua từ lần 2 trở lên): Giảm thêm 1.000.000đ trên giá niêm yết</li><li><strong>Giới thiệu bạn bè:</strong> Nhận ngay 500.000đ cho mỗi khách hàng giới thiệu thành công mua xe</li><li><strong>Sinh nhật tháng 6:</strong> Giảm 300.000đ phí dịch vụ bảo dưỡng và tặng quà bất ngờ</li></ul><p>Liên hệ hotline <strong>0334 018 518</strong> để biết thêm chi tiết và đăng ký nhận ưu đãi.</p>',
 '2026-06-03 09:00:00', 'blog_2.jpg', '2026-06-03 09:00:00',
 '<p>Chương trình tri ân khách hàng thân thiết tháng 6: Giảm giá VIP, thưởng giới thiệu bạn bè và ưu đãi sinh nhật.</p>',
 1, 'Tri ân khách hàng thân thiết: Ưu đãi độc quyền tháng 6/2025', 36, 2),

(9, 'Huy Trinh',
 '<h2>Flash Sale cuối tuần — Giảm đến 3 triệu đồng!</h2><p>Mỗi Thứ 7 và Chủ Nhật, LT Motor áp dụng chương trình Flash Sale với những ưu đãi cực hấp dẫn:</p><ul><li>Xe tay ga Honda, Yamaha dưới 40 triệu: <strong>Giảm 1.000.000đ</strong> khi thanh toán tiền mặt</li><li>Xe tay ga trên 40 triệu: <strong>Giảm 2.000.000đ</strong> khi thanh toán tiền mặt</li><li>Xe côn tay, xe phân khúc lớn: <strong>Giảm 3.000.000đ</strong> khi đặt cọc trước 3 ngày</li></ul><p><em>Không kết hợp với các khuyến mãi khác. Áp dụng tại showroom LT Motor.</em></p>',
 '2026-06-04 08:00:00', 'blog_1.jpg', '2026-06-04 08:00:00',
 '<p>Flash Sale cuối tuần mỗi Thứ 7 và Chủ Nhật: Giảm từ 1 đến 3 triệu đồng tùy dòng xe khi thanh toán tiền mặt.</p>',
 1, 'Flash Sale cuối tuần: Giảm đến 3.000.000đ – Chỉ tại LT Motor!', 36, 2),

(10, 'Huy Trinh',
 '<h2>Trả góp 0% lãi suất — Sở hữu xe ngay hôm nay!</h2><p>LT Motor hợp tác với VPBank và Techcombank triển khai gói trả góp đặc biệt áp dụng từ 01/06 đến 31/08/2025:</p><ul><li>Lãi suất <strong>0%</strong> trong 6 tháng đầu</li><li>Trả trước chỉ từ <strong>20%</strong> giá trị xe</li><li>Thủ tục đơn giản, duyệt nhanh trong <strong>1 giờ</strong></li><li>Không cần tài sản thế chấp với khoản vay dưới 50 triệu</li><li>Áp dụng cho tất cả các dòng xe tại showroom</li></ul><p>Chỉ cần CCCD và bằng lái xe, bạn đã có thể sở hữu chiếc xe mơ ước ngay hôm nay!</p>',
 '2026-06-04 10:00:00', 'blog_2.jpg', '2026-06-04 10:00:00',
 '<p>Gói trả góp 0% lãi suất 6 tháng đầu, trả trước chỉ 20%, duyệt nhanh trong 1 giờ áp dụng đến 31/08/2025.</p>',
 1, 'Gói trả góp 0% lãi suất 6 tháng: Sở hữu xe mơ ước với chi phí tối thiểu', 36, 2),

-- =====================================================
-- Tin tuyển dụng (category_id = 37)
-- =====================================================
(11, 'Huy Trinh',
 '<h2>Tuyển dụng Nhân viên Tư vấn Bán hàng xe máy</h2><p>LT Motor đang mở rộng đội ngũ và tìm kiếm những ứng viên nhiệt huyết, đam mê xe máy để đảm nhận vị trí <strong>Nhân viên Tư vấn Bán hàng</strong>.</p><h3>Mô tả công việc</h3><ul><li>Tư vấn, giới thiệu sản phẩm xe máy cho khách hàng tại showroom</li><li>Theo dõi và chăm sóc khách hàng tiềm năng</li><li>Hỗ trợ khách hàng làm thủ tục mua xe, đăng ký, bảo hiểm</li><li>Đạt doanh số theo chỉ tiêu hàng tháng</li></ul><h3>Yêu cầu</h3><ul><li>Tốt nghiệp THPT trở lên, ưu tiên chuyên ngành kinh tế</li><li>Có đam mê với xe máy</li><li>Kỹ năng giao tiếp tốt, ngoại hình ưa nhìn</li><li>Có bằng lái xe A1 trở lên</li></ul><h3>Quyền lợi</h3><ul><li>Lương cơ bản 6–8 triệu + hoa hồng không giới hạn</li><li>Đóng đầy đủ BHXH, BHYT, BHTN</li><li>Thưởng theo doanh số tháng/quý/năm</li></ul>',
 '2026-05-28 08:00:00', 'blog_1.jpg', '2026-05-28 08:00:00',
 '<p>LT Motor tuyển Nhân viên Tư vấn Bán hàng: Lương 6–8 triệu + hoa hồng, môi trường năng động, cơ hội thăng tiến rõ ràng.</p>',
 1, '[Tuyển dụng] Nhân viên Tư vấn Bán hàng xe máy – Thu nhập 15-25 triệu/tháng', 37, 2),

(12, 'Huy Trinh',
 '<h2>Tuyển Kỹ thuật viên Bảo dưỡng Xe máy</h2><p>Nhằm nâng cao chất lượng dịch vụ hậu mãi, LT Motor cần tuyển <strong>Kỹ thuật viên Bảo dưỡng</strong> có tay nghề và kinh nghiệm thực tế.</p><h3>Mô tả công việc</h3><ul><li>Thực hiện bảo dưỡng định kỳ, sửa chữa xe máy các hãng Honda, Yamaha, Suzuki</li><li>Chuẩn đoán lỗi và tư vấn phương án sửa chữa cho khách hàng</li><li>Ghi chép phiếu sửa chữa, quản lý phụ tùng thay thế</li></ul><h3>Yêu cầu</h3><ul><li>Tốt nghiệp trường kỹ thuật chuyên ngành cơ khí, điện tử hoặc tương đương</li><li>Có ít nhất 1 năm kinh nghiệm sửa chữa xe máy</li><li>Ưu tiên có chứng chỉ kỹ thuật của Honda/Yamaha</li><li>Chịu khó, cẩn thận và có tinh thần trách nhiệm cao</li></ul><h3>Quyền lợi</h3><ul><li>Lương cơ bản 8–12 triệu tùy kinh nghiệm</li><li>Thưởng năng suất hàng tháng</li><li>Được đào tạo kỹ thuật chính hãng tại Honda/Yamaha</li></ul>',
 '2026-06-01 09:00:00', 'blog_2.jpg', '2026-06-01 09:00:00',
 '<p>LT Motor tuyển Kỹ thuật viên Bảo dưỡng xe máy: Lương 8–12 triệu, đào tạo chính hãng, môi trường chuyên nghiệp.</p>',
 1, '[Tuyển dụng] Kỹ thuật viên Bảo dưỡng xe máy – Lương 8-12 triệu', 37, 2),

(13, 'Huy Trinh',
 '<h2>Tuyển Nhân viên Chăm sóc Khách hàng (CSKH)</h2><p>LT Motor đang tìm kiếm <strong>Nhân viên CSKH</strong> năng động, có kỹ năng giao tiếp tốt để hỗ trợ khách hàng trước và sau bán hàng.</p><h3>Mô tả công việc</h3><ul><li>Tiếp nhận và xử lý yêu cầu, khiếu nại của khách hàng qua điện thoại, Zalo, Facebook</li><li>Theo dõi đơn hàng, phối hợp giao xe đúng hẹn</li><li>Nhắc lịch bảo dưỡng, chăm sóc khách hàng cũ</li><li>Khảo sát sự hài lòng sau khi mua xe</li></ul><h3>Yêu cầu</h3><ul><li>Tốt nghiệp Cao đẳng trở lên</li><li>Kỹ năng giao tiếp xuất sắc, giọng nói rõ ràng, dễ nghe</li><li>Thành thạo máy tính văn phòng</li><li>Kinh nghiệm CSKH hoặc telesales là lợi thế</li></ul><h3>Quyền lợi</h3><ul><li>Lương cơ bản 6–8 triệu + KPI bonus</li><li>Giờ làm việc linh hoạt (hành chính hoặc ca)</li><li>Môi trường trẻ trung, thân thiện</li></ul>',
 '2026-06-03 08:30:00', 'blog_1.jpg', '2026-06-03 08:30:00',
 '<p>LT Motor tuyển Nhân viên CSKH: Lương 6–8 triệu + KPI bonus, giờ linh hoạt, môi trường trẻ trung và năng động.</p>',
 1, '[Tuyển dụng] Nhân viên Chăm sóc Khách hàng – Giờ làm việc linh hoạt', 37, 2);

ALTER TABLE `article` AUTO_INCREMENT = 14;
