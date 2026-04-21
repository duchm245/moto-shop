-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th10 04, 2023 lúc 01:05 PM
-- Phiên bản máy phục vụ: 10.4.28-MariaDB
-- Phiên bản PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `crking7`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `address`
--

CREATE TABLE `address` (
  `id` bigint(20) NOT NULL,
  `address_detail` varchar(255) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `district` varchar(255) DEFAULT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `focus` int(11) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `province` varchar(255) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `wards` varchar(255) DEFAULT NULL,
  `user_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `address`
--

INSERT INTO `address` (`id`, `address_detail`, `created_date`, `district`, `first_name`, `focus`, `last_name`, `modified_date`, `phone`, `province`, `status`, `wards`, `user_id`) VALUES
(1, 'Nguyệt Đức', '2023-09-22 13:19:36', '251', 'Kim Thăng', 0, 'Nguyễn ', '2023-09-22 13:19:36', '0966821574', '26', 1, '9052', 3);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `article`
--

CREATE TABLE `article` (
  `id` bigint(20) NOT NULL,
  `author` varchar(255) DEFAULT NULL,
  `content` text DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `short_content` text DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `category_id` bigint(20) DEFAULT NULL,
  `user_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `article`
--

INSERT INTO `article` (`id`, `author`, `content`, `created_date`, `image`, `modified_date`, `short_content`, `status`, `title`, `category_id`, `user_id`) VALUES
(1, 'Nguyễn Kim Thăng', '<p><strong>Các nội dung chính</strong><strong style=\"color: rgb(188, 189, 193);\">[</strong><strong style=\"color: var(--shop-color-main);\">Ẩn</strong><strong style=\"color: rgb(188, 189, 193);\">]</strong></p><ul><li><a href=\"https://mode-fashion.myharavan.com/blogs/news/tips-phoi-do-voi-boots-nam-them-lich-lam-fashion#1-phoi-do-voi-boot-nam-nen-mac-voi-ao-gi\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgb(51, 51, 51);\">Phối đồ với boot nam nên mặc với áo gì?</a></li><li class=\"ql-indent-1\"><a href=\"https://mode-fashion.myharavan.com/blogs/news/tips-phoi-do-voi-boots-nam-them-lich-lam-fashion#11-cach-phoi-do-voi-boots-ao-phong-cho-su-nang-dong-cool-ngau\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgb(51, 51, 51);\">Cách phối đồ với boots, áo phông cho sự năng động, cool ngầu</a></li><li class=\"ql-indent-1\"><a href=\"https://mode-fashion.myharavan.com/blogs/news/tips-phoi-do-voi-boots-nam-them-lich-lam-fashion#12-phoi-do-voi-boot-cao-co-ao-polo-lich-su-hon-khi-di-lam\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgb(51, 51, 51);\">Phối đồ với boot cao cổ, áo polo lịch sự hơn khi đi làm</a></li><li class=\"ql-indent-1\"><a href=\"https://mode-fashion.myharavan.com/blogs/news/tips-phoi-do-voi-boots-nam-them-lich-lam-fashion#13-phoi-do-voi-boot-co-ngan-ao-so-mi-outfit-tuyet-dep-khong-nen-bo-qua\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgb(51, 51, 51);\">Phối đồ với boot cổ ngắn, áo sơ mi - Outfit tuyệt đẹp không nên bỏ qua</a></li><li><a href=\"https://mode-fashion.myharavan.com/blogs/news/tips-phoi-do-voi-boots-nam-them-lich-lam-fashion#2-phoi-do-voi-boots-nam-nen-mac-voi-quan-gi\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgb(51, 51, 51);\">Phối đồ với boots nam nên mặc với quần gì?</a></li><li class=\"ql-indent-1\"><a href=\"https://mode-fashion.myharavan.com/blogs/news/tips-phoi-do-voi-boots-nam-them-lich-lam-fashion#21-cach-phoi-do-voi-boot-co-ngan-quan-jean-rach-noi-loan\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgb(51, 51, 51);\">Cách phối đồ với boot cổ ngắn, quần jean rách nổi loạn</a></li><li class=\"ql-indent-1\"><a href=\"https://mode-fashion.myharavan.com/blogs/news/tips-phoi-do-voi-boots-nam-them-lich-lam-fashion#22-cach-phoi-do-voi-boot-co-cao-quan-kaki-di-lam\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgb(51, 51, 51);\">Cách phối đồ với boot cổ cao, quần kaki đi làm</a></li><li class=\"ql-indent-1\"><a href=\"https://mode-fashion.myharavan.com/blogs/news/tips-phoi-do-voi-boots-nam-them-lich-lam-fashion#23-phoi-do-voi-boots-nam-quan-baggy-thoi-trang\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgb(51, 51, 51);\">Phối đồ với boots nam, quần baggy thời trang</a></li></ul><h2><strong>Phối đồ với boot nam nên mặc với áo gì?</strong></h2><p>&nbsp;</p><p>Boot đã có nhưng kết hợp với áo gì cũng khiến các anh chàng có gu thêm phần băn khoăn. Kiểu áo cũng là một yếu tố giúp set đồ của bạn thêm phần hoàn hảo. Một số gợi ý dưới đây sẽ giúp chàng thêm phần đẹp và trẻ trung hơn.</p><p>&nbsp;</p><h3><strong>Cách phối đồ với boots, áo phông cho sự năng động, cool ngầu</strong></h3><p>&nbsp;</p><p>Những chiếc áo phông được xem là những chiếc áo “bảo bối” không thể thiếu trong tủ đồ của bất cứ chàng trai, cô gái nào. Sự tiện lợi, có thể phối với nhiều trang phục khác nhau đây chính là “vũ khí” giúp chàng có thể diện được ở bất cứ hoàn cảnh nào.</p><p>Đừng quá bó buộc những chiếc áo phông chỉ được phối với giày thể thao những đôi boot nam cũng là lựa chọn không tồi cho cách phối đồ với boots nam mà chàng cần chú ý. Đảm bảo giữ được sự trẻ trung, khỏe khoắn nên những đôi boot cổ cao, cổ thấp hoặc cổ lửng cũng đều giúp bạn thêm phần đẹp hơn.</p><p>&nbsp;</p><h3><strong>Phối đồ với boot cao cổ, áo polo lịch sự hơn khi đi làm</strong></h3><p>&nbsp;</p><p>Một sự lựa chọn khác trong cách phối đồ với boot nam mà zoom fashion&nbsp;muốn gửi đến chính là những chiếc áo polo. Sự kết hợp hài hòa tuy không mới nhưng đây chính là cách mix đồ không bao giờ lỗi mốt hay bị già trước tuổi.</p><p>&nbsp;</p><h3><strong>Phối đồ với boot cổ ngắn, áo sơ mi - Outfit tuyệt đẹp không nên bỏ qua</strong></h3><p>Nếu đang không biết phối đồ với boot nam thế nào thì những chiếc áo sơ mi chính là gợi ý mà các bạn không nên bỏ qua với những anh chàng yêu thích sự thanh lịch. Bộ đôi hoàn hảo khi kết hợp cùng giày boots sẽ giúp các chàng tăng lên được sự năng động. Nếu muốn trang phục có thêm điểm nhấn thì những chiếc túi xách đơn giản cũng là cách mix thời trang cho chàng.</p><p>&nbsp;</p><h2><strong>Phối đồ với boots nam nên mặc với quần gì?</strong></h2><p>&nbsp;</p><p>Việc phối cùng loại quần gì cũng khiến nhiều bạn nam phải đắn đo rất nhiều. Với những gợi ý dưới đây sẽ giúp bạn giải quyết những thắc mắc.</p><p>&nbsp;</p><h3><strong>Cách phối đồ với boot cổ ngắn, quần jean rách nổi loạn</strong></h3><p>&nbsp;</p><p>Sự năng động, nổi loạn là tất cả những gì set đồ này đem lại cho các bạn nam. Tuy nhiên, đối với những anh chàng công sở thì việc diện trang phục này là điều không phù hợp đâu nhé!</p><h3><strong>Cách phối đồ với boot cổ cao, quần kaki đi làm</strong></h3><p>&nbsp;</p><p>Hôm nay không biết nên mặc gì thì set đồ với quần kaki cùng boot chính là sự lựa chọn phù hợp nhất đem lại sự lịch sự và nam tính. Với những chiếc quần kaki màu sắc và kiểu dáng phù hợp sẽ giúp các chàng X2 sự tự tin lên rất nhiều.</p><p>&nbsp;</p><h3><strong>Phối đồ với boots nam, quần baggy thời trang</strong></h3><p>&nbsp;</p><p>Thử ngay cách kết hợp với giày boot nam cùng quần baggy để sở hữu ngay bộ trang phục siêu Hàn Quốc này nhé! Đây chính là bộ trang phục giúp các anh chàng thêm phần tự tin giống như những anh chàng đang ở bìa tạp chí.</p>', '2023-09-19 13:46:41', 'blog_1.jpg', '2023-09-19 13:46:41', '<p>Phối đồ với boot nam nên mặc với áo gì?</p><p>Boot đã có nhưng kết hợp với áo gì cũng khiến các anh chàng có gu thêm phần băn khoăn. Kiểu áo cũng là một yếu tố giúp set đồ của bạn thêm phần hoàn hảo. Một số gợi ý dưới đây sẽ giúp chàng thêm phần đẹp và trẻ trung hơn.</p>', 1, 'Tips phối đồ với boots nam thêm lịch lãm', 30, 2),
(2, 'Nguyễn Kim Thăng', '<p><strong>Các nội dung chính</strong></p><ul><li><a href=\"https://mode-fashion.myharavan.com/blogs/news/cach-phoi-do-nam-mua-dong-cuc-thoi-trang-va-trendy#1-bat-mi-tip-phoi-do-nam-mua-dong-chuan-stylist-hien-nay\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgb(51, 51, 51);\">Bật mí tip phối đồ nam mùa đông chuẩn stylist hiện nay</a></li><li class=\"ql-indent-1\"><a href=\"https://mode-fashion.myharavan.com/blogs/news/cach-phoi-do-nam-mua-dong-cuc-thoi-trang-va-trendy#11-phoi-ao-len-voi-ao-khoac-dai-cach-phoi-do-nam-mua-dong-chuan-fashionsita\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgb(51, 51, 51);\">Phối áo len với áo khoác dài - Cách phối đồ nam mùa đông chuẩn fashionsita</a></li><li class=\"ql-indent-1\"><a href=\"https://mode-fashion.myharavan.com/blogs/news/cach-phoi-do-nam-mua-dong-cuc-thoi-trang-va-trendy#12-mix-ao-len-chui-va-so-mi-combo-cuc-ky-thanh-lich\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgb(51, 51, 51);\">Mix áo len chui và sơ mi - Combo cực kỳ thanh lịch</a></li><li class=\"ql-indent-1\"><a href=\"https://mode-fashion.myharavan.com/blogs/news/cach-phoi-do-nam-mua-dong-cuc-thoi-trang-va-trendy#13-ket-hop-ao-mang-to-voi-suit-lich-lam\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgb(51, 51, 51);\">Kết hợp áo măng tô với suit lịch lãm</a></li><li class=\"ql-indent-1\"><a href=\"https://mode-fashion.myharavan.com/blogs/news/cach-phoi-do-nam-mua-dong-cuc-thoi-trang-va-trendy#14-phoi-hop-bomber-voi-ao-ni-va-quan-denim-meo-mix-do-dem-den-su-tre-trung\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgb(51, 51, 51);\">Phối hợp bomber với áo nỉ và quần denim - Mẹo mix đồ đem đến sự trẻ trung</a></li><li class=\"ql-indent-1\"><a href=\"https://mode-fashion.myharavan.com/blogs/news/cach-phoi-do-nam-mua-dong-cuc-thoi-trang-va-trendy#15-nang-tam-dien-mao-voi-cach-phoi-ao-khoac-dai-theo-phong-cach-layer\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgb(51, 51, 51);\">Nâng tầm diện mạo với cách phối áo khoác dài theo phong cách layer</a></li><li class=\"ql-indent-1\"><a href=\"https://mode-fashion.myharavan.com/blogs/news/cach-phoi-do-nam-mua-dong-cuc-thoi-trang-va-trendy#16-ao-khoac-da-mix-quan-jeans-thoi-thuong\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgb(51, 51, 51);\">Áo khoác da mix quần jeans thời thượng</a></li><li class=\"ql-indent-1\"><a href=\"https://mode-fashion.myharavan.com/blogs/news/cach-phoi-do-nam-mua-dong-cuc-thoi-trang-va-trendy#17-gap-doi-tre-trung-voi-ao-ni-quan-denim\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgb(51, 51, 51);\">Gấp đôi trẻ trung với áo nỉ, quần denim</a></li><li><a href=\"https://mode-fashion.myharavan.com/blogs/news/cach-phoi-do-nam-mua-dong-cuc-thoi-trang-va-trendy#2-mot-vai-dieu-can-luu-y-khi-phoi-do-nam-mua-dong\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgb(51, 51, 51);\">Một vài điều cần lưu ý khi phối đồ nam mùa đông</a></li><li class=\"ql-indent-1\"><a href=\"https://mode-fashion.myharavan.com/blogs/news/cach-phoi-do-nam-mua-dong-cuc-thoi-trang-va-trendy#21-lua-chon-trang-phuc-co-chat-lieu-day-dan\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgb(51, 51, 51);\">Lựa chọn trang phục có chất liệu dày dặn</a></li><li class=\"ql-indent-1\"><a href=\"https://mode-fashion.myharavan.com/blogs/news/cach-phoi-do-nam-mua-dong-cuc-thoi-trang-va-trendy#22-form-dang-vua-van-voi-co-the\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgb(51, 51, 51);\">Form dáng vừa vặn với cơ thể</a></li><li class=\"ql-indent-1\"><a href=\"https://mode-fashion.myharavan.com/blogs/news/cach-phoi-do-nam-mua-dong-cuc-thoi-trang-va-trendy#23-biet-cach-mix-tone-mau\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgb(51, 51, 51);\">Biết cách mix tone màu</a></li><li class=\"ql-indent-1\"><a href=\"https://mode-fashion.myharavan.com/blogs/news/cach-phoi-do-nam-mua-dong-cuc-thoi-trang-va-trendy#24-lua-chon-phu-kien-di-kem\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgb(51, 51, 51);\">Lựa chọn phụ kiện đi kèm</a></li></ul><h2><strong>Bật mí tip phối đồ nam mùa đông chuẩn stylist hiện nay</strong></h2><p>&nbsp;</p><p>Thời nay, biết cách ăn mặc là điều vô cùng quan trọng đối với bất cứ ai, dù là nam hay nữ. Nó sẽ giúp bạn ghi điểm trong mắt mọi người xung quanh. Do đó, dưới đây YODY sẽ chia sẻ với anh em những bí kíp phối đồ mùa đông nam cực chuẩn và hợp mốt.</p><h3><strong>Phối áo len với áo khoác dài - Cách phối đồ nam mùa đông chuẩn fashionsita</strong></h3><p>&nbsp;</p><p><img src=\"https://bizweb.dktcdn.net/100/438/408/files/phoi-do-nam-mua-dong-yodyvn.jpg?v=1663050055097\"></p><p class=\"ql-align-center\"><em>Áo khoác dạ mix cùng quần kaki đen</em></p><p>&nbsp;</p><p>Mỗi khi tiết trời đổ lạnh, những chiếc áo khoác dáng dài lại làm chao đảo giới trẻ với những mẫu mã vô cùng sành chảnh và thời trang của mình. Đây chắc hẳn là item không thể thiếu của những chàng trai đam mê style Hàn Quốc. Với áo khoác dài, anh em có rất nhiều option đa dạng, chẳng hạn như áo nỉ, áo thun dài, áo hoodie,.. Nhưng để diện mạo chuẩn idol Hàn Quốc nhất, các ông nên ưu tiên những mẫu áo len cổ lọ hoặc cổ tròn.</p><p>Chiếc áo len khi được phối cùng với áo khoác dài sẽ vừa giúp tổng thể trở nên thời thượng hơn vừa giữ ấm cho cơ thể.</p><p>Về quần và phụ kiện thì mọi người có thể kết hợp với quần âu, quần kaki bó và đôi boot cao cổ.</p><h3><strong>Mix áo len chui và sơ mi - Combo cực kỳ thanh lịch</strong></h3><p>&nbsp;</p><p>Áo len mặc ngoài sơ mi là công thức phối đồ được nhiều fashionista nổi tiếng áp dụng từ rất lâu. Tuy đơn giản nhưng bản phối này vẫn luôn hợp mốt và đem lại cho người mặc một diện mạo vô cùng điển trai và sành điệu. Chiếc sơ mi mặc bên trong sẽ giúp áo len của bạn thêm phần nổi bật và bắt hơn. Ngoài ra, với áo len anh em có 2 lựa chọn, đó là cổ tròn và cổ tim. Với những người có vóc dáng săn chắc, cân đối thì nên chọn áo len cổ tim. Còn nếu sở hữu thân hình to béo thì áo len cổ tròn sẽ là option lý tưởng nhất. Nó có khả năng đánh lừa thị giác cực đỉnh giúp người đối diện không chú ý vào phần mỡ của bụng.</p><p>Khi diện outfit này, mọi người nên ưu tiên những mẫu áo len có tone màu sáng. Nó sẽ khiến bộ đồ trở nên hút mắt và ấn tượng hơn rất nhiều. Kết hợp với chiếc quần tây hoặc&nbsp;denim&nbsp;dáng ôm là tuyệt vời.</p><h3><strong>Kết hợp áo măng tô với suit lịch lãm</strong></h3><p>&nbsp;</p><p>Điểm qua các cách phối đồ nam mùa đông, chúng ta không thể bỏ qua công thức áo măng tô kết hợp với suit lịch lãm. Đây là outfit xuất hiện rất trong những bộ film đình đám của Hollywood, Netflix như James Bond, Peaky Blinder, Kingsman,.. Những bộ suit hiện nay luôn được thêu dệt và căn chỉnh cẩn thận đến từng milimet, mang đến cho người mặc một diện mạo cực bảnh trai và thời trang.</p><p>Khi kết hợp outfit này với áo măng tô dáng dài, đảm bảo mọi ánh nhìn của chị em sẽ hướng về bạn. Cách phối đồ mùa đông cho nam này vô cùng đơn giản và không tốn thời gian. Nó phù hợp với nhiều dịp khác nhau từ đi làm, đi sự kiện quang trọng cho đến những buổi hẹn hò ở chốn sa hoa.</p><p>Để hoàn thiện set đồ, các bạn có thể kết hợp thêm giày tây oxford hoặc boot cao cổ cùng 1 chiếc khăn quàng dài.</p><h3><strong>Phối hợp bomber với áo nỉ và quần denim - Mẹo mix đồ đem đến sự trẻ trung</strong></h3><p>&nbsp;</p><p>Nếu phong cách của bạn mang hơi hướng trẻ trung và cá tính. Thì bộ 3 bomber, áo nỉ và quần jeans sẽ là option vô cùng tuyệt vời. Với outfit này, anh em có thể mặc áo sweater bên trong, áo bomber bên ngoài cùng chiếc quần denim thời thượng. Kết hợp 3 item này với nhau sẽ đem đến cho bạn một diện mạo rất trẻ trung và năng động, phù hợp để đi chơi đi hẹn hò.</p><p>Cách phối màu của set đồ này cũng không quá phức tạp. Các ông có thể thoải mái áp dụng những nguyên tắc mix màu như tương phản, tương đồng, tone sur tone, tất cả đều phù hợp.</p><p>Về phụ kiện, một đôi giày thể thao hoặc một đôi boot sang chảnh sẽ là option hoàn hảo nhất.</p><h3><strong>Nâng tầm diện mạo với cách phối áo khoác dài theo phong cách layer</strong></h3><p>&nbsp;</p><p>Dù đã xuất hiện từ rất lâu nhưng phối đồ theo phong cách layer vẫn được nhiều bạn trẻ áp dụng cho đến tập bây giờ. Nó phù hợp với cả phái nữ lẫn cánh mày râu. Những chiếc áo khoác dài được mặc theo kiểu layer sẽ đem đến một vẻ ngoài vô cùng bảnh bao và thời trang cho người mặc.</p><p>Đây là outfit vừa có khả năng giữ ấm tuyệt đối vừa đem lại cảm giác dễ chịu, thoải mái. Mọi người có thể phối nhiều loại áo bên trong như áo nỉ, áo len, áo sơ mi bên trong. Combo này sẽ tạo nên 1 set đồ cực lịch làm và thời trang.</p><h3><strong>Áo khoác da mix quần jeans thời thượng</strong></h3><p>&nbsp;</p><p>Thêm một cách phối đồ nam mùa đông tuyệt vời nữa chính là kết hợp áo khoác da với quần jeans. Set đồ này sẽ đem lại một diện mạo vô cùng mới lạ cho anh em nhưng lại vô cùng chất và thời trang. Một bản phối hay ho, an toàn cho những ai gặp khó khăn trong việc mix đồ thu đông.</p><h3><strong>Gấp đôi trẻ trung với áo nỉ, quần denim</strong></h3><p>&nbsp;</p><p>Phối áo sweater với quần jeans là tip mix đồ mùa đông cực đẹp và trẻ trung. Chiếc áo nỉ sở hữu rất nhiều kiểu dáng khác nhau. Trong đó phổ biến nhất là dáng bó và oversize. Dáng bó sẽ phù hợp với những anh chàng có thân hình cân đối, cơ bắp. Còn oversize sẽ phù hợp hơn với người dáng bình thường, thậm chí là béo.</p><p>Khi kết hợp áo nỉ với quần jeans, các bạn sẽ tạo nên 1 set đồ vô cùng trẻ trung và cá tính, phù hợp cho những buổi đi học, đi chơi cùng hội bạn.</p><p>Nếu muốn tạo thêm điểm nhấn, anh có thể kết hợp thêm sơ mi thanh lịch ở bên trong.</p><h2><strong>Một vài điều cần lưu ý khi phối đồ nam mùa đông</strong></h2><p>&nbsp;</p><h3><strong>Lựa chọn trang phục có chất liệu dày dặn</strong></h3><p>&nbsp;</p><p>Yếu tố đầu tiên cần ưu tiên khi lựa chọn outfit mùa đông chính chất liệu dày dặn. Nó sẽ giúp giữ ấm cơ thể của bạn cũng như che đi những khuyết điểm không mong muốn của cơ thể.</p><h3><strong>Form dáng vừa vặn với cơ thể</strong></h3><p>&nbsp;</p><p>Không chỉ đem lại cảm giác thoải mái, dễ chịu, một set đồ vừa vặn sẽ giúp diện mạo của bạn bắt mắt và điển trai gấp đôi.&nbsp;</p><h3><strong>Biết cách mix tone màu</strong></h3><p>&nbsp;</p><p>Biết cách phối màu trang phục là điều vô cùng quan trọng mà bất cứ ai cũng nên nắm rõ. Một set đồ có màu sắc kết hợp ăn ý, hài hoà sẽ nổi bật và hút mắt hơn rất nhiều.</p><h3><strong>Lựa chọn phụ kiện đi kèm</strong></h3><p>&nbsp;</p><p>Nếu cảm thấy set đồ của mình quá basic, nhàm chán, các bạn có thể tô thêm điểm nhấn bằng cách mix thêm những phụ kiện kèm. Hiện nay, có rất nhiều phụ kiện phù hợp với nam giới như khăn quàng,&nbsp;kính râm, đồng hồ, ví kẹp nách, vòng tay,..</p>', '2023-09-19 13:49:34', 'blog_2.jpg', '2023-09-19 13:49:34', '<p>Bật mí tip phối đồ nam mùa đông chuẩn stylist hiện nay</p><p>Thời nay, biết cách ăn mặc là điều vô cùng quan trọng đối với bất cứ ai, dù là nam hay nữ. Nó sẽ giúp bạn ghi điểm trong mắt mọi người xung quanh. Do đó, dưới đây YODY sẽ chia sẻ với anh em những bí kíp phối đồ mùa đông nam cực chuẩn và hợp mốt.</p>', 1, 'Cách phối đồ nam mùa đông cực thời trang và trendy', 30, 2);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `article_image`
--

CREATE TABLE `article_image` (
  `id` int(11) NOT NULL,
  `url` varchar(255) DEFAULT NULL,
  `article_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `banner`
--

CREATE TABLE `banner` (
  `id` bigint(20) NOT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `src` varchar(255) DEFAULT NULL,
  `status` int(11) NOT NULL,
  `category_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `banner`
--

INSERT INTO `banner` (`id`, `created_date`, `modified_date`, `name`, `src`, `status`, `category_id`) VALUES
(4, '2023-09-19 08:54:31', '2023-09-19 08:54:31', 'banner_home_1', 'slide_home_1.jpg', 1, NULL),
(5, '2023-09-19 08:54:58', '2023-09-19 08:54:58', 'Banner_home_2', 'slide_home_2.jpg', 1, NULL),
(6, '2023-09-19 08:56:00', '2023-09-19 08:56:00', 'banner_home_3', 'slide_home_3.jpg', 1, NULL);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `category`
--

CREATE TABLE `category` (
  `id` bigint(20) NOT NULL,
  `created_date` datetime DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `status` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `type` int(11) DEFAULT NULL,
  `url_image` varchar(255) DEFAULT NULL,
  `parent_category_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `category`
--

INSERT INTO `category` (`id`, `created_date`, `description`, `modified_date`, `status`, `title`, `type`, `url_image`, `parent_category_id`) VALUES
(1, '2023-09-18 08:56:39', 'danh mục cha', '2023-09-18 10:37:59', 1, 'Áo Polo', 0, 'home_category_ao_polo.jpg', 28),
(2, '2023-09-18 08:58:09', 'Danh mục con', '2023-09-18 10:17:56', 1, 'Polo họa tiết', 0, NULL, 1),
(3, '2023-09-18 08:59:00', 'danh mục con', '2023-09-18 10:17:30', 1, 'Polo trơn', 0, NULL, 1),
(4, '2023-09-18 10:12:56', 'danh mục cha', '2023-09-18 12:54:31', 1, 'Áo thun', 0, 'home_category_ao_thun.jpg', 28),
(5, '2023-09-18 10:13:27', 'danh mục cha', '2023-09-18 12:54:44', 1, 'Quần Short', 0, 'home_category_3_quan_short.jpg', 29),
(6, '2023-09-18 10:13:52', 'danh mục cha', '2023-09-18 12:54:59', 1, 'Quần Kaki', 0, 'home_category_quan_kaki.jpg', 29),
(7, '2023-09-18 10:15:30', 'danh mục cha', '2023-09-18 12:55:30', 1, 'Áo Sơ Mi', 0, 'home_category_ao_so_mi_dai_tay.jpg', 28),
(8, '2023-09-18 10:16:03', 'danh mục cha', '2023-09-18 12:55:52', 1, 'Quần Âu', 0, 'home_category_quan_au.jpg', 29),
(9, '2023-09-18 10:16:29', 'danh mục cha', '2023-09-18 12:55:40', 1, 'Quần Jean', 0, 'home_category_quan_jean.jpg', 29),
(10, '2023-09-18 10:16:45', 'danh mục cha', '2023-09-18 10:16:45', 1, 'Phụ Kiện', 0, 'home_category_phu_kien.jpg', NULL),
(11, '2023-09-18 10:24:33', 'danh mục con', '2023-09-18 10:24:33', 1, 'Polo kẻ', 0, NULL, 1),
(12, '2023-09-18 10:24:44', '', '2023-09-18 10:24:44', 1, 'Polo bo kẻ', 0, NULL, 1),
(13, '2023-09-18 10:25:13', '', '2023-09-18 10:25:13', 1, 'Polo can phối', 0, NULL, 1),
(14, '2023-09-18 10:25:46', '', '2023-09-18 10:25:46', 1, 'Áo thun in hình', 0, NULL, 4),
(15, '2023-09-18 10:26:03', '', '2023-09-18 10:26:03', 1, 'Áo tank top', 0, NULL, 4),
(16, '2023-09-18 10:27:08', '', '2023-09-18 10:27:08', 1, 'Sơ mi trơn', 0, NULL, 7),
(17, '2023-09-18 10:27:39', '', '2023-09-18 10:27:39', 1, 'Sơ mi đũi', 0, NULL, 7),
(18, '2023-09-18 10:27:49', '', '2023-09-18 10:27:49', 1, 'Sơ mi kẻ', 0, NULL, 7),
(19, '2023-09-18 10:28:04', '', '2023-09-18 10:28:04', 1, 'Sơ mi họa tiết', 0, NULL, 7),
(20, '2023-09-18 10:29:23', '', '2023-09-18 10:29:23', 1, 'Quần kaki basic', 0, NULL, 6),
(21, '2023-09-18 10:31:10', '', '2023-09-18 10:31:10', 1, 'Quần jeans basic', 0, NULL, 9),
(22, '2023-09-18 10:31:32', '', '2023-09-18 10:31:32', 1, 'Quần jeans rách', 0, NULL, 9),
(23, '2023-09-18 10:31:48', '', '2023-09-18 10:31:48', 1, 'Quần jeans xước', 0, NULL, 9),
(24, '2023-09-18 10:32:15', '', '2023-09-18 10:32:15', 1, 'Quần âu basic', 0, NULL, 8),
(25, '2023-09-18 10:32:32', '', '2023-09-18 10:32:32', 1, 'Short kaki', 0, NULL, 5),
(26, '2023-09-18 10:32:49', '', '2023-09-18 10:32:49', 1, 'Short đũi', 0, NULL, 5),
(27, '2023-09-18 10:33:01', '', '2023-09-18 10:33:01', 1, 'Short gió', 0, NULL, 5),
(28, '2023-09-18 10:37:50', 'danh mục 3 cấp', '2023-09-18 10:37:50', 1, 'Áo nam', 0, NULL, NULL),
(29, '2023-09-18 12:54:12', 'danh mục cấp 3', '2023-09-18 12:54:12', 1, 'Quần nam', 0, NULL, NULL),
(30, '2023-09-19 13:46:03', '', '2023-09-19 13:46:03', 1, 'Bài viết blog', 2, NULL, NULL);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `category_policy`
--

CREATE TABLE `category_policy` (
  `category_policy_id` bigint(20) NOT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `category_policy_name` varchar(255) NOT NULL,
  `status` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `color`
--

CREATE TABLE `color` (
  `id` bigint(20) NOT NULL,
  `value` varchar(255) DEFAULT NULL,
  `product_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `color`
--

INSERT INTO `color` (`id`, `value`, `product_id`) VALUES
(3, 'Kem Đậm', 3),
(4, 'Trắng', 3),
(5, 'Đen', 3),
(6, 'Xanh cổ vịt', 3),
(7, 'Dark navy', 3),
(8, 'Đen', 4),
(9, 'Vàng Kem', 4),
(10, 'Đen', 4),
(11, 'Xanh', 4),
(12, 'Xanh navy', 5),
(13, 'Đen', 5),
(14, 'Trắng', 5),
(15, 'Trắng', 6),
(16, 'Đen', 7),
(17, 'Nâu', 8),
(18, 'Tím phớt', 8),
(19, 'Đen', 8),
(20, 'Xanh navy', 8),
(21, 'Xanh ngọc đậm', 8),
(22, 'Xanh ngọc', 8),
(23, 'Vàng nhạt', 8),
(24, 'Vàng kem', 8),
(25, 'Trắng', 8),
(26, 'Trắng', 9),
(27, 'Trắng - Xanh đá', 10),
(28, 'Kem đậm - Trắng', 10),
(29, 'Navy - Trắng', 11),
(30, 'Đen', 12),
(31, 'Trắng', 12),
(32, 'Xanh navy', 13),
(33, 'Vàng kem', 13),
(34, 'Đen', 14),
(35, 'Đen', 15),
(36, 'Đen', 16),
(37, 'Trắng', 17),
(38, 'Xanh da trời nhạt', 17),
(39, 'Trắng kem', 17),
(40, 'Xanh da trời', 17),
(41, 'Xanh da trời nhạt', 18),
(42, 'Trắng', 18),
(43, 'Đen', 19),
(44, 'Trắng', 19),
(45, 'Xanh da trời nhạt', 19),
(46, 'Xanh navy', 19),
(47, 'Trắng', 20),
(48, 'Đen', 21),
(49, 'Trắng', 21),
(50, 'Xanh navy', 21),
(51, 'Đen', 22),
(52, 'Xanh da trời', 22),
(53, 'Xanh da trời nhạt', 22),
(54, 'Đen', 23),
(55, 'Xám', 23),
(56, 'Xanh navy', 23),
(57, 'Đen', 24),
(58, 'Xám', 24),
(59, 'Xanh navy', 24);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `company`
--

CREATE TABLE `company` (
  `id` bigint(20) NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `phone_cskh` varchar(255) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `tax_code` varchar(255) DEFAULT NULL,
  `tax_date` varchar(255) DEFAULT NULL,
  `tax_location` varchar(255) DEFAULT NULL,
  `user_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `notifications`
--

CREATE TABLE `notifications` (
  `id` bigint(20) NOT NULL,
  `content` varchar(255) DEFAULT NULL,
  `deliver_status` bit(1) DEFAULT NULL,
  `is_read` bit(1) DEFAULT NULL,
  `type` int(11) DEFAULT NULL,
  `order_id` bigint(20) DEFAULT NULL,
  `product_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `notifications`
--

INSERT INTO `notifications` (`id`, `content`, `deliver_status`, `is_read`, `type`, `order_id`, `product_id`) VALUES
(1, 'Đơn hàng 13471626 vừa được tạo, xác nhận ngay nào', b'1', b'0', 1, 3, NULL),
(2, 'Đơn hàng 72913687 vừa được tạo, xác nhận ngay nào', b'1', b'0', 1, 4, NULL),
(3, 'Đơn hàng 60195487 vừa được tạo, xác nhận ngay nào', b'1', b'0', 1, 5, NULL);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `orders`
--

CREATE TABLE `orders` (
  `id` bigint(20) NOT NULL,
  `address_detail` varchar(255) DEFAULT NULL,
  `code_orders` varchar(255) DEFAULT NULL,
  `create_date` datetime DEFAULT NULL,
  `district` varchar(255) DEFAULT NULL,
  `full_name` varchar(255) DEFAULT NULL,
  `is_checkout` bit(1) DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `note` varchar(255) DEFAULT NULL,
  `order_date` datetime DEFAULT NULL,
  `payment_method` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `province` varchar(255) DEFAULT NULL,
  `ship_date` datetime DEFAULT NULL,
  `shipping_fee` int(11) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `type` int(11) DEFAULT NULL,
  `user_name_emp` varchar(255) DEFAULT NULL,
  `wards` varchar(255) DEFAULT NULL,
  `address_id` bigint(20) DEFAULT NULL,
  `user_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `orders`
--

INSERT INTO `orders` (`id`, `address_detail`, `code_orders`, `create_date`, `district`, `full_name`, `is_checkout`, `modified_date`, `note`, `order_date`, `payment_method`, `phone`, `province`, `ship_date`, `shipping_fee`, `status`, `type`, `user_name_emp`, `wards`, `address_id`, `user_id`) VALUES
(3, 'Nguyệt Đức', '13471626', '2023-09-22 13:20:54', '251', 'Nguyễn  Kim Thăng', b'1', '2023-09-22 13:37:17', '', '2023-09-22 13:20:54', 'COD', '0966821574', '26', '2023-09-22 13:36:41', 25000, 4, 1, 'thangdev', '9052', NULL, 3),
(4, 'Nguyệt Đức', '72913687', '2023-09-22 13:38:05', '251', 'Nguyễn  Kim Thăng', b'0', '2023-09-22 13:38:05', '', '2023-09-22 13:38:05', 'COD', '0966821574', '26', NULL, 25000, 1, 1, NULL, '9052', NULL, 3),
(5, 'Nguyệt Đức', '60195487', '2023-09-22 14:17:55', '251', 'Nguyễn  Kim Thăng', b'0', '2023-09-22 14:17:55', '', '2023-09-22 14:17:55', 'COD', '0966821574', '26', NULL, 25000, 1, 1, NULL, '9052', NULL, 3),
(7, NULL, '72129668', '2023-10-04 14:32:34', NULL, NULL, b'0', '2023-10-04 14:32:34', NULL, NULL, NULL, NULL, NULL, NULL, 25000, 0, 0, NULL, NULL, NULL, 3);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `order_item`
--

CREATE TABLE `order_item` (
  `id` bigint(20) NOT NULL,
  `product_name` varchar(255) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `sell_price` int(11) DEFAULT NULL,
  `value_color` varchar(255) DEFAULT NULL,
  `value_size` varchar(255) DEFAULT NULL,
  `order_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `order_item`
--

INSERT INTO `order_item` (`id`, `product_name`, `quantity`, `sell_price`, `value_color`, `value_size`, `order_id`) VALUES
(3, 'Áo Polo trơn vải lục giác kèm logo ngực', 1, 380000, 'Xanh ngọc', 'XL', 3),
(5, 'Áo Polo trơn bo kẻ cổ', 1, 190000, 'Xanh navy', 'S', 4),
(8, 'Áo Polo trơn bo kẻ cổ', 1, 190000, 'Xanh navy', 'S', 7);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `policy`
--

CREATE TABLE `policy` (
  `policy_id` bigint(20) NOT NULL,
  `content` varchar(255) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `status` int(11) NOT NULL,
  `category_policy_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `policy_image`
--

CREATE TABLE `policy_image` (
  `policy_image_id` bigint(20) NOT NULL,
  `created_date` datetime DEFAULT NULL,
  `img` varchar(255) DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `policy_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `product`
--

CREATE TABLE `product` (
  `id` bigint(20) NOT NULL,
  `created_date` datetime DEFAULT NULL,
  `description` text DEFAULT NULL,
  `material` varchar(255) DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  `sale_price` int(11) DEFAULT NULL,
  `sku` varchar(255) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `visited` int(11) DEFAULT NULL,
  `product_author_id` bigint(20) DEFAULT NULL,
  `product_category_id` bigint(20) DEFAULT NULL,
  `sale_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `product`
--

INSERT INTO `product` (`id`, `created_date`, `description`, `material`, `modified_date`, `name`, `price`, `sale_price`, `sku`, `status`, `visited`, `product_author_id`, `product_category_id`, `sale_id`) VALUES
(3, '2023-09-18 10:49:32', '<p><span style=\"color: rgb(51, 51, 51); background-color: rgb(255, 255, 255);\">Áo polo nam cao cấp chống nhăn nhàu đang hot tại Torano</span></p><p class=\"ql-indent-2 ql-align-center\"><img src=\"https://file.hstatic.net/200000690725/file/bang-size__3__f3315ec939474c418bf6ec215eccd9b8_grande.jpg\" width=\"613\"></p>', 'cotton', '2023-09-18 17:29:00', 'Áo Polo trơn hiệu ứng', 450000, 450000, 'APTHU0', 1, 14, 2, 3, NULL),
(4, '2023-09-18 17:28:22', '<p><span style=\"color: rgb(51, 51, 51); background-color: rgb(255, 255, 255);\">Áo Polo trơn cổ bẻ tay ngắn trơn, bo kẻ nhiều màu chính là item hoàn hảo dễ mặc dễ phối đồ cho cả nam và nữ. Khám phá ngay!!!</span></p><p>+ Chất vải có độ co giãn tốt, thoáng khí và không phai màu.</p><p>+60% Poly +35% cotton +5% Spandex</p><p>+ Thấm hút mồ hôi tối đa và thoải mái khi vận động</p><p>+ Thiết kế Slimfit vừa vặn tôn dáng</p><p>+ Phù hợp với đi làm, đi học, đi chơi, hẹn hò, du lịch...</p><p>+ Áo có 4 size : S – M –L – XL</p><p>Hướng dẫn sử dụng và bảo quản:</p><p>+ Giặt ở nhiệt độ bình thường, với đồ có màu tương tự.</p><p>+ Không được dùng hóa chất tẩy.</p><p>+ Hạn chế sử dụng máy sấy và ủi ở nhiệt độ thích hợp.</p><p>+ Lộn mặt trái khi phơi tránh bị phai màu</p><p>Chính sách và điều kiện đổi trả của TORANO:</p><p>+ Cam kết chất lượng và mẫu mã sản phẩm giống với hình ảnh.</p><p>+ Cam kết được đổi trả hàng trong vòng 7 ngày.</p><p>+ Hàng phải còn nguyên tem mác và chưa qua sử dụng</p><p>+ Sản phẩm bị lỗi do vận chuyển và do nhà sản xuất</p><p><span style=\"background-color: rgb(230, 230, 230);\"><img src=\"https://file.hstatic.net/200000690725/file/z4302376489686_ddcd3100f0718a9c51ff0413fd0abad8_4dd72d5ac71c45ff9b38d02558dee786_grande.jpg\"></span></p>', 'cotton', '2023-09-18 21:00:45', 'Áo Polo trơn basic đen thêu logo ngực', 330000, 165000, 'APTBETLN4', 1, 22, 2, 3, 1),
(5, '2023-09-18 21:07:53', '<p><span style=\"background-color: rgb(255, 255, 255); color: rgb(51, 51, 51);\">Chưa có mô tả cho sản phẩm này</span></p>', 'Cotton', '2023-09-18 21:07:53', 'Áo Polo trơn bo kẻ cổ', 380000, 190000, 'APTBKC5', 1, 20, 2, 3, 1),
(6, '2023-09-18 21:19:29', '<p><span style=\"background-color: rgb(255, 255, 255); color: rgb(51, 51, 51);\">Áo polo trơn bo kẻ</span></p>', 'Coolmax', '2023-09-18 21:19:29', 'Áo polo trơn bo kẻ', 380000, 190000, 'APTBK6', 1, 16, 2, 3, 1),
(7, '2023-09-18 21:35:12', '<p><strong style=\"background-color: rgb(255, 255, 255); color: rgb(51, 51, 51);\">Áo polo trơn bo kẻ phối viền cổ cao cấp</strong></p><p class=\"ql-indent-3\"><strong style=\"background-color: rgb(255, 255, 255); color: rgb(51, 51, 51);\"><span class=\"ql-cursor\">﻿</span></strong></p>', 'cotton', '2023-09-18 21:35:12', 'Áo polo trơn bo kẻ phối viền cổ', 420000, 420000, 'APTBKPVC7', 1, 1, 2, 3, NULL),
(8, '2023-09-18 21:50:11', '<p><span style=\"background-color: rgb(255, 255, 255); color: rgb(51, 51, 51);\">Mẫu áo polo chất liệu cải tiến thế hệ mới mang lại cho các anh sự thoải mái cũng như vẻ ngoài lịch sự và đầy nam tính.</span></p><p><br></p><p class=\"ql-indent-2\"><img src=\"https://file.hstatic.net/200000690725/file/z4406137368932_abf6c2386761899901353d0b3cf8703e_8ae76348a3a04b52ac5eea3d4fa28212_grande.jpg\"><img src=\"https://file.hstatic.net/200000690725/file/z4406137468491_51130f9f9eb50cf021f0756506e7f71c_08b1b9f42ab24385b094aef0d5e8dd55_grande.jpg\"><img src=\"https://file.hstatic.net/200000690725/file/z4406137401417_dc92b8eed589c4702343cc24d5240c47_8bed0e7e93224db9b9f2384adbc4a4b4_grande.jpg\"></p><p class=\"ql-indent-2\"><img src=\"https://file.hstatic.net/200000690725/file/z4406137515948_1be26609c7013c1cea41100e1da7fa88_875ff2a88e2c44f0aa2992f48a20cd81_grande.jpg\"></p>', 'cotton', '2023-09-18 21:50:11', 'Áo Polo trơn vải lục giác kèm logo ngực', 380000, 380000, 'APTVLGKLN8', 1, 85, 2, 3, NULL),
(9, '2023-09-20 10:03:27', '<p class=\"ql-indent-1\">Hướng dẫn chọn size</p><p class=\"ql-indent-1\"><img src=\"https://theme.hstatic.net/200000690725/1001078549/14/tagsize_1_img.jpg?v=169\" alt=\"Áo polo họa tiết in tràn ESTP001\"></p>', 'cotton', '2023-09-20 10:03:27', 'Áo polo họa tiết in tràn', 420000, 420000, 'APHTIT9', 1, 2, 2, 2, NULL),
(10, '2023-09-20 11:12:14', '<p class=\"ql-indent-2\"><img src=\"https://file.hstatic.net/200000690725/file/bang-size__3__f3315ec939474c418bf6ec215eccd9b8_grande.jpg\"></p>', 'cotton', '2023-09-20 11:12:14', 'Áo polo can phối Horizontal Color Scheme', 420000, 420000, 'APCPHCS10', 1, 0, 2, 13, NULL),
(11, '2023-09-20 18:40:26', '<p><strong style=\"background-color: rgb(255, 255, 255); color: rgb(51, 51, 51);\">Áo Polo can phối họa tiết nam&nbsp;</strong><span style=\"background-color: rgb(255, 255, 255); color: rgb(51, 51, 51);\">phong cách trẻ trung và lịch lãm&nbsp;thích hợp với mọi dáng người.</span></p>', 'cotton', '2023-09-20 20:27:09', 'Áo Polo can phối họa tiết TRN', 420000, 420000, 'APCPHTT11', 1, 0, 2, 13, NULL),
(12, '2023-09-20 20:53:54', '<p class=\"ql-indent-1\"><img src=\"https://theme.hstatic.net/200000690725/1001078549/14/tagsize_1_img.jpg?v=169\" alt=\"Áo Thun in hình Barcode - ESTS004\"></p>', 'cotton', '2023-09-20 20:53:54', 'Áo Thun in hình Barcode', 300000, 300000, 'ATIHB12', 1, 0, 2, 14, NULL),
(13, '2023-09-20 20:59:42', '<p><span style=\"background-color: rgb(255, 255, 255); color: rgb(51, 51, 51);\">Áo tanktop nam cá tính, năng động mặc cực thoải mái. Mẫu áo ba lỗ nam trẻ trung với 2 màu dễ mặc.</span></p><p class=\"ql-indent-1\"><img src=\"https://theme.hstatic.net/200000690725/1001078549/14/tagsize_1_img.jpg?v=169\" alt=\"Áo Tanktop họa tiết Defeat ESTA010\"></p>', 'cotton', '2023-09-20 20:59:42', 'Áo Tanktop họa tiết Defeat', 250000, 250000, 'ATHTD13', 1, 0, 2, 15, NULL),
(14, '2023-09-20 21:04:09', '<p class=\"ql-indent-1\"><img src=\"https://theme.hstatic.net/200000690725/1001078549/14/tagsize_1_img.jpg?v=169\" alt=\"Áo tanktop họa tiết in Shoes ESTA006\"></p>', 'cotton', '2023-09-20 21:04:09', 'Áo tanktop họa tiết in Shoes', 250000, 250000, 'ATHTIS14', 1, 0, 2, 15, NULL),
(15, '2023-09-20 21:06:41', '<p><span style=\"background-color: rgb(255, 255, 255); color: rgb(51, 51, 51);\">Chưa có mô tả cho sản phẩm này</span></p>', 'cotton', '2023-09-20 21:06:41', 'Áo Tanktop họa tiết in Wild Sool', 250000, 250000, 'ATHTIWS15', 1, 0, 2, 15, NULL),
(16, '2023-09-20 21:09:09', '<p><span style=\"background-color: rgb(255, 255, 255); color: rgb(51, 51, 51);\">Chưa có mô tả cho sản phẩm này</span></p>', 'cotton', '2023-09-20 21:09:09', 'Áo tanktop in họa tiết Tents', 300000, 300000, 'ATIHTT16', 1, 0, 2, 15, NULL),
(17, '2023-09-20 21:31:01', '<p><span style=\"background-color: rgb(255, 255, 255); color: rgb(51, 51, 51);\">Sơ mi ngắn tay nam vải bamboo cao cấp mềm mại, mát và chống nhăn</span></p><p class=\"ql-indent-2\"><img src=\"https://file.hstatic.net/200000690725/file/z4341084428964_6bcba3cca07c771573358b745683b763_9ffeef4d3b4b415d99ed5500a217c14c_grande.jpg\"></p>', 'bamboo', '2023-09-20 21:54:06', 'Sơ mi ngắn tay trơn Bamboo', 400000, 400000, 'SMNTTB17', 1, 1, 2, 16, NULL),
(18, '2023-09-20 22:15:00', '<p class=\"ql-indent-1\"><img src=\"https://theme.hstatic.net/200000690725/1001078549/14/tagsize_2_img.jpg?v=169\" alt=\"Sơ mi ngắn tay trơn Oxford thêu logo DSTB605\"></p>', 'vải', '2023-09-20 22:15:00', 'Sơ mi ngắn tay trơn Oxford thêu logo', 450000, 450000, 'SMNTTOTL18', 1, 1, 2, 16, NULL),
(19, '2023-09-20 22:50:22', '<p class=\"ql-indent-1\"><img src=\"https://theme.hstatic.net/200000690725/1001078549/14/tagsize_2_img.jpg?v=169\" alt=\"Áo sơ mi dài tay trơn Bamboo 4.DATB920\"></p>', 'bamboo', '2023-09-20 22:50:22', 'Áo sơ mi dài tay trơn Bamboo', 420000, 420000, 'ASMDTTB19', 1, 4, 2, 16, NULL),
(20, '2023-09-20 22:53:02', '<p><span style=\"background-color: rgb(255, 255, 255); color: rgb(51, 51, 51);\">Sơ mi dài tay nam cao cấp vải hiệu ứng đẹp mắt.&nbsp;</span></p><p><br></p><p class=\"ql-indent-1\"><img src=\"https://theme.hstatic.net/200000690725/1001078549/14/tagsize_2_img.jpg?v=169\" alt=\"Sơ mi dài tay trơn dệt hiệu ứng EATB040\"></p>', 'vải', '2023-09-20 22:53:02', 'Sơ mi dài tay trơn dệt hiệu ứng', 450000, 450000, 'SMDTTDHU20', 1, 2, 2, 16, NULL),
(21, '2023-10-04 15:53:03', '<p>Chưa có mô tả cho sản phẩm</p>', 'cotton', '2023-10-04 15:53:03', 'Quần short nỉ bộ kẻ 3', 330000, 330000, 'QSNBK321', 1, 0, 2, 5, NULL),
(22, '2023-10-04 16:01:10', '<p>Hướng dẫn chọn size</p><p class=\"ql-indent-1\"><img src=\"https://theme.hstatic.net/200000690725/1001078549/14/tagsize_3_img.jpg?v=173\" alt=\"Quần Jeans basic slim DABJ901\"></p>', 'Jeans', '2023-10-04 16:01:10', 'Quần Jeans basic slim', 500000, 500000, 'QJBS22', 1, 0, 2, 21, NULL),
(23, '2023-10-04 16:06:56', '<p class=\"ql-indent-1\"><img src=\"https://theme.hstatic.net/200000690725/1001078549/14/tagsize_3_img.jpg?v=173\" alt=\"Quần âu slim fit điều chỉnh cạp trơn 5.EABT016\"></p>', 'Vải thô', '2023-10-04 16:06:56', 'Quần âu slim fit điều chỉnh cạp trơn', 500000, 500000, 'QASFICCT23', 1, 0, 2, 24, NULL),
(24, '2023-10-04 16:19:18', '<p class=\"ql-indent-1\"><img src=\"https://theme.hstatic.net/200000690725/1001078549/14/tagsize_3_img.jpg?v=173\" alt=\"Quần kaki dài basic DABK908\"></p>', 'cotton', '2023-10-04 16:19:18', 'Quần kaki dài basic', 500000, 500000, 'QKDB24', 1, 0, 2, 20, NULL);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `product_image`
--

CREATE TABLE `product_image` (
  `id` bigint(20) NOT NULL,
  `url` varchar(255) DEFAULT NULL,
  `product_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `product_image`
--

INSERT INTO `product_image` (`id`, `url`, `product_id`) VALUES
(9, 'ao_polo_tron_1.jpg', 3),
(10, 'ao_polo_tron_2.jpg', 3),
(11, 'ao_polo_tron_3.jpg', 3),
(12, 'ao_polo_tron_4.jpg', 3),
(13, 'ao_polo_tron_5.jpg', 3),
(14, 'ao_polo_tron_6.jpg', 3),
(15, 'ao_polo_tron_7.jpg', 3),
(16, 'ao_polo_tron_8.jpg', 3),
(17, 'ao_polo_tron_9.jpg', 3),
(18, 'ao_polo_tron_10.jpg', 3),
(19, 'ao_polo_tron_11.jpg', 3),
(20, 'ao_polo_tron_12.jpg', 3),
(21, 'ao_polo_tron_13.jpg', 3),
(22, 'ao_polo_tron_14.jpg', 3),
(23, 'ao_polo_tron_logo_nguc_1.jpg', 4),
(24, 'polo_tron_kem_theu_nguc_1.jpg', 4),
(25, 'ao_polo_tron_logo_nguc_3.jpg', 4),
(26, 'ao_polo_tron_logo_nguc_4.jpg', 4),
(29, 'ao_polo_tron_logo_nguc_trang.jpg', 4),
(30, 'polo_tron_kem_theu_nguc_3.jpg', 4),
(34, 'ao_polo_tron_logo_nguc_xanh.jpg', 4),
(35, 'ao_polo_tron_logo_nguc_xanh_1.jpg', 4),
(39, 'ao_polo_tron_logo_nguc_6.jpg', 4),
(40, 'polo_tron_bo_ke_co_1.jpg', 5),
(41, 'polo_tron_bo_ke_co_2.jpg', 5),
(42, 'polo_tron_bo_ke_co_3.jpg', 5),
(43, 'polo_tron_bo_ke_co_4.jpg', 5),
(44, 'polo_tron_bo_ke_co_5.jpg', 5),
(45, 'polo_tron_bo_ke_co_6.jpg', 5),
(46, 'polo_tron_bo_ke_co_7.jpg', 5),
(47, 'ao_polo_tron_bo_ke_1.jpg', 6),
(48, 'ao_polo_tron_bo_ke_2.jpg', 6),
(49, 'ao_polo_tron_bo_ke_3.jpg', 6),
(50, 'ao_polo_tron_bo_ke_4.jpg', 6),
(51, 'ao_polo_tron_bo_ke_phoi_vien_co_1.jpg', 7),
(52, 'ao_polo_tron_bo_ke_phoi_vien_co_2.jpg', 7),
(53, 'ao_polo_tron_bo_ke_phoi_vien_co_3.jpg', 7),
(54, 'ao_polo_tron_bo_ke_phoi_vien_co_4.jpg', 7),
(55, 'ao_polo_tron_bo_ke_phoi_vien_co_5.jpg', 7),
(56, 'polo_tron_vai_luc_giac_1.jpg', 8),
(57, 'polo_tron_vai_luc_giac_2.jpg', 8),
(58, 'polo_tron_vai_luc_giac_3.jpg', 8),
(59, 'polo_tron_vai_luc_giac_4.jpg', 8),
(60, 'polo_tron_vai_luc_giac_5.jpg', 8),
(61, 'polo_tron_vai_luc_giac_6.jpg', 8),
(62, 'polo_tron_vai_luc_giac_7.jpg', 8),
(63, 'polo_tron_vai_luc_giac_8.jpg', 8),
(64, 'polo_tron_vai_luc_giac_9.jpg', 8),
(65, 'polo_tron_vai_luc_giac_10.jpg', 8),
(66, 'polo_tron_vai_luc_giac_11.jpg', 8),
(67, 'polo_hoa_tiet_in_tran_1.jpg', 9),
(68, 'polo_hoa_tiet_in_tran_2.jpg', 9),
(69, 'polo_hoa_tiet_in_tran_3.jpg', 9),
(70, 'polo_hoa_tiet_in_tran_4.jpg', 9),
(71, 'polo_hoa_tiet_in_tran_5.jpg', 9),
(72, 'polo_hoa_tiet_in_tran_6.jpg', 9),
(73, 'polo_hoa_tiet_in_tran_7.jpg', 9),
(74, 'polo_can_phoi_horizontal_1.jpg', 10),
(75, 'polo_can_phoi_horizontal_2.jpg', 10),
(76, 'polo_can_phoi_horizontal_3.jpg', 10),
(77, 'polo_can_phoi_horizontal_4.jpg', 10),
(78, 'polo_can_phoi_horizontal_5.jpg', 10),
(79, 'polo_can_phoi_horizontal_6.jpg', 10),
(80, 'polo_can_phoi_trn_1.jpg', 11),
(81, 'polo_can_phoi_trn_2.jpg', 11),
(82, 'polo_can_phoi_trn_3.jpg', 11),
(83, 'polo_can_phoi_trn_4.jpg', 11),
(84, 'polo_can_phoi_trn_5.jpg', 11),
(85, 'ao_thun_in_bacode_1.jpg', 12),
(86, 'ao_thun_in_bacode_2.jpg', 12),
(87, 'ao_thun_in_bacode_3.jpg', 12),
(88, 'ao_thun_in_bacode_4.jpg', 12),
(89, 'ao_thun_in_bacode_5.jpg', 12),
(90, 'ao_thun_in_bacode_6.jpg', 12),
(91, 'ao_tanktop_defeat_1.jpg', 13),
(92, 'ao_tanktop_defeat_2.jpg', 13),
(93, 'ao_tanktop_defeat_3.jpg', 13),
(94, 'ao_tanktop_defeat_4.jpg', 13),
(95, 'ao_tanktop_defeat_5.jpg', 13),
(96, 'ao_tanktop_defeat_6.jpg', 13),
(97, 'ao_tanktop_shoes_1.jpg', 14),
(98, 'ao_tanktop_shoes_2.jpg', 14),
(99, 'ao_tanktop_shoes_3.jpg', 14),
(100, 'ao_tanktop_shoes_4.jpg', 14),
(101, 'ao_tanktop_wildsool_1.jpg', 15),
(102, 'ao_tanktop_wildsool_2.jpg', 15),
(103, 'ao_tanktop_wildsool_3.jpg', 15),
(104, 'ao_tanktop_wildsool_4.jpg', 15),
(105, 'ao_tanktop_tents_1.jpg', 16),
(106, 'ao_tanktop_tents_2.jpg', 16),
(107, 'ao_tanktop_tents_3.jpg', 16),
(108, 'ao_tanktop_tents_4.jpg', 16),
(109, 'so_mi_tron_bamboo_1.jpg', 17),
(110, 'so_mi_tron_bamboo_2.jpg', 17),
(111, 'so_mi_tron_bamboo_3.jpg', 17),
(112, 'so_mi_tron_bamboo_4.jpg', 17),
(113, 'so_mi_tron_bamboo_5.jpg', 17),
(114, 'so_mi_tron_oxford_1.jpg', 18),
(115, 'so_mi_tron_oxford_2.jpg', 18),
(116, 'so_mi_tron_oxford_3.jpg', 18),
(117, 'so_mi_tron_oxford_4.jpg', 18),
(118, 'so_mi_daitay_tron_1.jpg', 19),
(119, 'so_mi_daitay_tron_2.jpg', 19),
(120, 'so_mi_daitay_tron_3.jpg', 19),
(121, 'so_mi_daitay_tron_4.jpg', 19),
(122, 'so_mi_daitay_tron_5.jpg', 19),
(123, 'so_mi_daitay_tron_6.jpg', 19),
(124, 'so_mi_daitay_tron_7.jpg', 19),
(125, 'so_mi_dai_tay_hieu_ung_1.jpg', 20),
(126, 'so_mi_dai_tay_hieu_ung_2.jpg', 20),
(127, 'so_mi_dai_tay_hieu_ung_3.jpg', 20),
(128, 'so_mi_dai_tay_hieu_ung_4.jpg', 20),
(129, 'quan_short_bo_ni_ke_1.jpg', 21),
(130, 'quan_short_bo_ni_ke_2.jpg', 21),
(131, 'quan_short_bo_ni_ke_3.jpg', 21),
(132, 'quan_short_bo_ni_ke_4.jpg', 21),
(133, 'quan_jean_basic_slim_1.jpg', 22),
(134, 'quan_jean_basic_slim_2.jpg', 22),
(135, 'quan_jean_basic_slim_3.jpg', 22),
(136, 'quan_jean_basic_slim_4.jpg', 22),
(137, 'quan_jean_basic_slim_5.jpg', 22),
(138, 'quan_jean_basic_slim_6.jpg', 22),
(139, 'quan_jean_basic_slim_7.jpg', 22),
(140, 'quan_au_slim_cap_tron_1.jpg', 23),
(141, 'quan_au_slim_cap_tron_2.jpg', 23),
(142, 'quan_au_slim_cap_tron_3.jpg', 23),
(143, 'quan_au_slim_cap_tron_4.jpg', 23),
(144, 'quan_au_slim_cap_tron_5.jpg', 23),
(145, 'quan_au_slim_cap_tron_6.jpg', 23),
(146, 'quan_kaki_dai_basic_1.jpg', 24),
(147, 'quan_kaki_dai_basic_2.jpg', 24),
(148, 'quan_kaki_dai_basic_3.jpg', 24),
(149, 'quan_kaki_dai_basic_4.jpg', 24),
(150, 'quan_kaki_dai_basic_5.jpg', 24),
(151, 'quan_kaki_dai_basic_6.jpg', 24);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `role`
--

CREATE TABLE `role` (
  `id` bigint(20) NOT NULL,
  `name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `role`
--

INSERT INTO `role` (`id`, `name`) VALUES
(1, 'ROLE_ADMIN'),
(2, 'ROLE_USER'),
(3, 'ROLE_EMPLOYEE');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `sales`
--

CREATE TABLE `sales` (
  `id` bigint(20) NOT NULL,
  `created_date` datetime DEFAULT NULL,
  `discount` int(11) DEFAULT NULL,
  `end_date` datetime DEFAULT NULL,
  `is_active` int(11) DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `start_date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `sales`
--

INSERT INTO `sales` (`id`, `created_date`, `discount`, `end_date`, `is_active`, `modified_date`, `name`, `start_date`) VALUES
(1, '2023-09-19 10:48:27', 50, '2024-01-01 10:48:07', 1, '2023-09-19 10:48:27', 'Sale Vô Cực', '2023-09-19 10:48:07');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `size`
--

CREATE TABLE `size` (
  `id` bigint(20) NOT NULL,
  `sold` int(11) DEFAULT NULL,
  `total` int(11) DEFAULT NULL,
  `value` varchar(255) DEFAULT NULL,
  `color_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `size`
--

INSERT INTO `size` (`id`, `sold`, `total`, `value`, `color_id`) VALUES
(5, 0, 20, 'S', 3),
(6, 0, 20, 'M', 3),
(7, 0, 20, 'L', 3),
(8, 0, 20, 'XL', 3),
(9, 0, 20, 'S', 4),
(10, 0, 20, 'M', 4),
(11, 0, 20, 'L', 4),
(12, 0, 20, 'XL', 4),
(13, 0, 20, 'S', 5),
(14, 0, 20, 'M', 5),
(15, 0, 20, 'L', 5),
(16, 0, 20, 'XL', 5),
(17, 0, 20, 'S', 6),
(18, 0, 20, 'M', 6),
(19, 0, 20, 'L', 6),
(20, 0, 20, 'XL', 6),
(21, 0, 20, 'S', 7),
(22, 0, 20, 'M', 7),
(23, 0, 20, 'L', 7),
(24, 0, 20, 'XL', 7),
(25, 0, 20, 'S', 8),
(26, 0, 20, 'M', 8),
(27, 0, 20, 'L', 8),
(28, 0, 20, 'XL', 8),
(29, 0, 20, '2XL', 8),
(30, 1, 19, 'S', 9),
(31, 0, 20, 'M', 9),
(32, 0, 20, 'L', 9),
(33, 0, 20, 'XL', 9),
(34, 0, 20, '2XL', 9),
(35, 0, 20, 'S', 10),
(36, 0, 20, 'M', 10),
(37, 0, 20, 'L', 10),
(38, 0, 20, 'XL', 10),
(39, 0, 20, '2XL', 10),
(40, 0, 20, 'S', 11),
(41, 0, 20, 'M', 11),
(42, 0, 20, 'L', 11),
(43, 0, 20, 'XL', 11),
(44, 0, 20, '2XL', 11),
(45, 1, 19, 'S', 12),
(46, 0, 20, 'M', 12),
(47, 0, 20, 'L', 12),
(48, 0, 20, 'XL', 12),
(49, 0, 20, '2XL', 12),
(50, 0, 20, 'S', 13),
(51, 0, 20, 'M', 13),
(52, 0, 20, 'L', 13),
(53, 0, 20, 'XL', 13),
(54, 0, 20, '2XL', 13),
(55, 0, 20, 'S', 14),
(56, 0, 20, 'M', 14),
(57, 0, 20, 'L', 14),
(58, 0, 20, 'XL', 14),
(59, 0, 10, 'S', 15),
(60, 0, 10, 'M', 15),
(61, 0, 20, 'L', 15),
(62, 0, 20, 'XL', 15),
(63, 0, 10, 'S', 16),
(64, 0, 10, 'M', 16),
(65, 0, 20, 'L', 16),
(66, 0, 20, 'XL', 16),
(67, 0, 10, 'S', 17),
(68, 0, 10, 'M', 17),
(69, 0, 10, 'L', 17),
(70, 0, 20, 'XL', 17),
(71, 0, 20, '2XL', 17),
(72, 0, 10, 'S', 18),
(73, 0, 10, 'M', 18),
(74, 0, 10, 'L', 18),
(75, 0, 10, 'XL', 18),
(76, 0, 10, '2XL', 18),
(77, 0, 10, 'S', 19),
(78, 0, 10, 'M', 19),
(79, 0, 10, 'L', 19),
(80, 0, 10, 'XL', 19),
(81, 0, 10, '2XL', 19),
(82, 0, 10, 'S', 20),
(83, 0, 10, 'M', 20),
(84, 0, 10, 'L', 20),
(85, 0, 10, 'XL', 20),
(86, 0, 20, '2XL', 20),
(87, 0, 10, 'S', 21),
(88, 0, 10, 'M', 21),
(89, 0, 10, 'L', 21),
(90, 0, 20, 'XL', 21),
(91, 0, 20, '2XL', 21),
(92, 0, 10, 'S', 22),
(93, 0, 10, 'M', 22),
(94, 0, 10, 'L', 22),
(95, 1, 19, 'XL', 22),
(96, 0, 0, '2XL', 22),
(97, 0, 10, 'S', 23),
(98, 0, 20, 'M', 23),
(99, 0, 20, 'L', 23),
(100, 0, 20, 'XL', 23),
(101, 0, 10, 'S', 24),
(102, 0, 10, 'M', 24),
(103, 0, 10, 'L', 24),
(104, 0, 20, 'XL', 24),
(105, 0, 20, '2XL', 24),
(106, 0, 10, 'S', 25),
(107, 0, 20, 'M', 25),
(108, 0, 20, 'L', 25),
(109, 0, 20, 'XL', 25),
(110, 0, 10, '2XL', 25),
(111, 0, 10, 'S', 26),
(112, 0, 20, 'M', 26),
(113, 0, 20, 'L', 26),
(114, 0, 20, 'XL', 26),
(115, 0, 10, '2XL', 26),
(116, 0, 10, 'S', 27),
(117, 0, 10, 'M', 27),
(118, 0, 20, 'L', 27),
(119, 0, 10, 'XL', 27),
(120, 0, 20, '2XL', 27),
(121, 0, 10, 'S', 28),
(122, 0, 20, 'M', 28),
(123, 0, 20, 'L', 28),
(124, 0, 20, 'XL', 28),
(125, 0, 20, '2XL', 28),
(126, 0, 10, 'S', 29),
(127, 0, 20, 'M', 29),
(128, 0, 10, 'L', 29),
(129, 0, 20, 'XL', 29),
(130, 0, 10, 'S', 30),
(131, 0, 20, 'M', 30),
(132, 0, 20, 'L', 30),
(133, 0, 20, 'XL', 30),
(134, 0, 20, 'S', 31),
(135, 0, 20, 'M', 31),
(136, 0, 10, 'L', 31),
(137, 0, 20, 'XL', 31),
(138, 0, 10, 'S', 32),
(139, 0, 20, 'M', 32),
(140, 0, 20, 'L', 32),
(141, 0, 20, 'XL', 32),
(142, 0, 20, 'S', 33),
(143, 0, 20, 'M', 33),
(144, 0, 20, 'L', 33),
(145, 0, 20, 'XL', 33),
(146, 0, 10, 'S', 34),
(147, 0, 10, 'M', 34),
(148, 0, 10, 'L', 34),
(149, 0, 10, 'XL', 34),
(150, 0, 10, 'S', 35),
(151, 0, 10, 'M', 35),
(152, 0, 10, 'L', 35),
(153, 0, 10, 'XL', 35),
(154, 0, 10, 'S', 36),
(155, 0, 10, 'M', 36),
(156, 0, 10, 'L', 36),
(157, 0, 10, 'XL', 36),
(158, 0, 10, '38', 37),
(159, 0, 10, '39', 37),
(160, 0, 10, '40', 37),
(161, 0, 10, '41', 37),
(162, 0, 10, '42', 37),
(163, 0, 10, '38', 38),
(164, 0, 10, '39', 38),
(165, 0, 10, '40', 38),
(166, 0, 10, '41', 38),
(167, 0, 10, '42', 38),
(168, 0, 10, '38', 39),
(169, 0, 10, '39', 39),
(170, 0, 10, '40', 39),
(171, 0, 10, '41', 39),
(172, 0, 10, '42', 39),
(173, 0, 10, '38', 40),
(174, 0, 10, '39', 40),
(175, 0, 10, '40', 40),
(176, 0, 10, '41', 40),
(177, 0, 10, '42', 40),
(178, 0, 10, '38', 41),
(179, 0, 10, '39', 41),
(180, 0, 10, '40', 41),
(181, 0, 10, '41', 41),
(182, 0, 10, '42', 41),
(183, 0, 10, '38', 42),
(184, 0, 10, '39', 42),
(185, 0, 10, '40', 42),
(186, 0, 10, '41', 42),
(187, 0, 10, '42', 42),
(188, 0, 10, '38', 43),
(189, 0, 10, '39', 43),
(190, 0, 10, '40', 43),
(191, 0, 10, '41', 43),
(192, 0, 10, '42', 43),
(193, 0, 10, '38', 44),
(194, 0, 10, '39', 44),
(195, 0, 10, '40', 44),
(196, 0, 10, '41', 44),
(197, 0, 10, '42', 44),
(198, 0, 10, '38', 45),
(199, 0, 10, '39', 45),
(200, 0, 10, '40', 45),
(201, 0, 10, '41', 45),
(202, 0, 10, '42', 45),
(203, 0, 10, '38', 46),
(204, 0, 10, '39', 46),
(205, 0, 10, '40', 46),
(206, 0, 10, '41', 46),
(207, 0, 10, '42', 46),
(208, 0, 10, '38', 47),
(209, 0, 10, '39', 47),
(210, 0, 10, '40', 47),
(211, 0, 10, '41', 47),
(212, 0, 10, '42', 47),
(213, 0, 10, 'S', 48),
(214, 0, 10, 'M', 48),
(215, 0, 10, 'L', 48),
(216, 0, 10, 'XL', 48),
(217, 0, 10, 'S', 49),
(218, 0, 10, 'M', 49),
(219, 0, 10, 'L', 49),
(220, 0, 10, 'XL', 49),
(221, 0, 10, 'S', 50),
(222, 0, 10, 'M', 50),
(223, 0, 10, 'L', 50),
(224, 0, 10, 'XL', 50),
(225, 0, 10, '29', 51),
(226, 0, 10, '30', 51),
(227, 0, 20, '31', 51),
(228, 0, 10, '32', 51),
(229, 0, 10, '33', 51),
(230, 0, 10, '29', 52),
(231, 0, 10, '30', 52),
(232, 0, 10, '31', 52),
(233, 0, 10, '32', 52),
(234, 0, 20, '33', 52),
(235, 0, 10, '29', 53),
(236, 0, 10, '30', 53),
(237, 0, 10, '31', 53),
(238, 0, 10, '32', 53),
(239, 0, 10, '33', 53),
(240, 0, 10, '29', 54),
(241, 0, 10, '30', 54),
(242, 0, 10, '31', 54),
(243, 0, 10, '32', 54),
(244, 0, 10, '33', 54),
(245, 0, 10, '29', 55),
(246, 0, 10, '30', 55),
(247, 0, 10, '31', 55),
(248, 0, 10, '32', 55),
(249, 0, 10, '33', 55),
(250, 0, 10, '29', 56),
(251, 0, 10, '30', 56),
(252, 0, 10, '31', 56),
(253, 0, 10, '32', 56),
(254, 0, 10, '33', 56),
(255, 0, 10, '29', 57),
(256, 0, 10, '30', 57),
(257, 0, 10, '31', 57),
(258, 0, 10, '32', 57),
(259, 0, 10, '33', 57),
(260, 0, 10, '29', 58),
(261, 0, 10, '30', 58),
(262, 0, 10, '31', 58),
(263, 0, 10, '32', 58),
(264, 0, 10, '33', 58),
(265, 0, 10, '29', 59),
(266, 0, 0, '30', 59),
(267, 0, 0, '31', 59),
(268, 0, 10, '32', 59),
(269, 0, 10, '33', 59);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `social_media`
--

CREATE TABLE `social_media` (
  `id` bigint(20) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `company_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `user`
--

CREATE TABLE `user` (
  `id` bigint(20) NOT NULL,
  `created_date` datetime DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `otp` varchar(255) DEFAULT NULL,
  `otp_generated_time` datetime DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `status` int(11) NOT NULL,
  `username` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `user`
--

INSERT INTO `user` (`id`, `created_date`, `email`, `first_name`, `last_name`, `modified_date`, `otp`, `otp_generated_time`, `password`, `phone`, `status`, `username`) VALUES
(1, '2023-09-17 07:23:11', 'crking7dev@gmail.com', 'Thăng', 'Nguyễn Kim', '2023-09-17 07:23:11', NULL, NULL, '$2a$10$tlQ96jt/FZa/s68ijOMnuuzzh5ZxZ0wTSzrIH6e5EylIjISI88JZu', '0966821574', 1, 'admin'),
(2, '2023-09-17 07:28:27', 'thangdv007@gmail.com', 'Thăng', 'Nguyễn Kim', '2023-09-17 07:28:27', NULL, NULL, '$2a$10$m63ko4f6kfhbsvWl08yOa.rj9QKq0SZFzKpd79Nri4SNZWLV6s/b2', '0966821574', 1, 'thangdev'),
(3, '2023-09-18 22:13:24', 'thangdvvip@gmail.com', 'Nguyễn Kim', 'Thăng', '2023-09-18 22:13:24', '349757', '2023-09-18 22:13:24', '$2a$10$fjxthI7nO/viGEgCuTRitOwjopOdrDBLX10uzOaA8O.GbCWMZjmLu', '0966821574', 1, 'kimthang');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `user_roles`
--

CREATE TABLE `user_roles` (
  `user_id` bigint(20) NOT NULL,
  `role_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `user_roles`
--

INSERT INTO `user_roles` (`user_id`, `role_id`) VALUES
(1, 1),
(2, 3),
(3, 2);

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `address`
--
ALTER TABLE `address`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKda8tuywtf0gb6sedwk7la1pgi` (`user_id`);

--
-- Chỉ mục cho bảng `article`
--
ALTER TABLE `article`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKy5kkohbk00g0w88fi05k2hcw` (`category_id`),
  ADD KEY `FKbc2qerk3l47javnl2yvn51uoi` (`user_id`);

--
-- Chỉ mục cho bảng `article_image`
--
ALTER TABLE `article_image`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKt3rm1gwoysmll8kpy7lt1vpwc` (`article_id`);

--
-- Chỉ mục cho bảng `banner`
--
ALTER TABLE `banner`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK2evybotynuel3qb4r4tkqvjuh` (`category_id`);

--
-- Chỉ mục cho bảng `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKs2ride9gvilxy2tcuv7witnxc` (`parent_category_id`);

--
-- Chỉ mục cho bảng `category_policy`
--
ALTER TABLE `category_policy`
  ADD PRIMARY KEY (`category_policy_id`);

--
-- Chỉ mục cho bảng `color`
--
ALTER TABLE `color`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKsgsuxxoc1h5pskbjpch4id2ec` (`product_id`);

--
-- Chỉ mục cho bảng `company`
--
ALTER TABLE `company`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKdy4v2yb46hefqicjpyj7b7e4s` (`user_id`);

--
-- Chỉ mục cho bảng `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK6og1jgdhfyqm6mk8v6a1qxias` (`order_id`),
  ADD KEY `FKi82p618hfcc9vjj1tcl8n5hen` (`product_id`);

--
-- Chỉ mục cho bảng `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UKdp6m4djxyjktrcweqdonym1f3` (`code_orders`),
  ADD KEY `FKf5464gxwc32ongdvka2rtvw96` (`address_id`),
  ADD KEY `FKel9kyl84ego2otj2accfd8mr7` (`user_id`);

--
-- Chỉ mục cho bảng `order_item`
--
ALTER TABLE `order_item`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKt4dc2r9nbvbujrljv3e23iibt` (`order_id`);

--
-- Chỉ mục cho bảng `policy`
--
ALTER TABLE `policy`
  ADD PRIMARY KEY (`policy_id`),
  ADD KEY `FKbnl9fs81c4g3twaab0djievh0` (`category_policy_id`);

--
-- Chỉ mục cho bảng `policy_image`
--
ALTER TABLE `policy_image`
  ADD PRIMARY KEY (`policy_image_id`),
  ADD KEY `FKlahenqllhml78uy0gmx6ttji0` (`policy_id`);

--
-- Chỉ mục cho bảng `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UKjmivyxk9rmgysrmsqw15lqr5b` (`name`),
  ADD KEY `FK9n8if2ou1m5av8vdod3l9qx0x` (`product_author_id`),
  ADD KEY `FKid4vcfgj211k2uqjuex1x7xq0` (`product_category_id`),
  ADD KEY `FKi10av27oniox6yo7oqvjeim8y` (`sale_id`);

--
-- Chỉ mục cho bảng `product_image`
--
ALTER TABLE `product_image`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK6oo0cvcdtb6qmwsga468uuukk` (`product_id`);

--
-- Chỉ mục cho bảng `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `sales`
--
ALTER TABLE `sales`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `size`
--
ALTER TABLE `size`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK8xjuqwpb5xlnn3978a9uhreor` (`color_id`);

--
-- Chỉ mục cho bảng `social_media`
--
ALTER TABLE `social_media`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKmm4qios9uovc7d2kj0i30jac1` (`company_id`);

--
-- Chỉ mục cho bảng `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UKsb8bbouer5wak8vyiiy4pf2bx` (`username`),
  ADD UNIQUE KEY `UKob8kqyqqgmefl0aco34akdtpe` (`email`);

--
-- Chỉ mục cho bảng `user_roles`
--
ALTER TABLE `user_roles`
  ADD PRIMARY KEY (`user_id`,`role_id`),
  ADD KEY `FKrhfovtciq1l558cw6udg0h0d3` (`role_id`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `address`
--
ALTER TABLE `address`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT cho bảng `article`
--
ALTER TABLE `article`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT cho bảng `article_image`
--
ALTER TABLE `article_image`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `banner`
--
ALTER TABLE `banner`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT cho bảng `category`
--
ALTER TABLE `category`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT cho bảng `category_policy`
--
ALTER TABLE `category_policy`
  MODIFY `category_policy_id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `color`
--
ALTER TABLE `color`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=60;

--
-- AUTO_INCREMENT cho bảng `company`
--
ALTER TABLE `company`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT cho bảng `orders`
--
ALTER TABLE `orders`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT cho bảng `order_item`
--
ALTER TABLE `order_item`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT cho bảng `policy`
--
ALTER TABLE `policy`
  MODIFY `policy_id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `policy_image`
--
ALTER TABLE `policy_image`
  MODIFY `policy_image_id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `product`
--
ALTER TABLE `product`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT cho bảng `product_image`
--
ALTER TABLE `product_image`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=152;

--
-- AUTO_INCREMENT cho bảng `role`
--
ALTER TABLE `role`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT cho bảng `sales`
--
ALTER TABLE `sales`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT cho bảng `size`
--
ALTER TABLE `size`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=270;

--
-- AUTO_INCREMENT cho bảng `social_media`
--
ALTER TABLE `social_media`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `user`
--
ALTER TABLE `user`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `address`
--
ALTER TABLE `address`
  ADD CONSTRAINT `FKda8tuywtf0gb6sedwk7la1pgi` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

--
-- Các ràng buộc cho bảng `article`
--
ALTER TABLE `article`
  ADD CONSTRAINT `FKbc2qerk3l47javnl2yvn51uoi` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `FKy5kkohbk00g0w88fi05k2hcw` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`);

--
-- Các ràng buộc cho bảng `article_image`
--
ALTER TABLE `article_image`
  ADD CONSTRAINT `FKt3rm1gwoysmll8kpy7lt1vpwc` FOREIGN KEY (`article_id`) REFERENCES `article` (`id`);

--
-- Các ràng buộc cho bảng `banner`
--
ALTER TABLE `banner`
  ADD CONSTRAINT `FK2evybotynuel3qb4r4tkqvjuh` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`);

--
-- Các ràng buộc cho bảng `category`
--
ALTER TABLE `category`
  ADD CONSTRAINT `FKs2ride9gvilxy2tcuv7witnxc` FOREIGN KEY (`parent_category_id`) REFERENCES `category` (`id`);

--
-- Các ràng buộc cho bảng `color`
--
ALTER TABLE `color`
  ADD CONSTRAINT `FKsgsuxxoc1h5pskbjpch4id2ec` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`);

--
-- Các ràng buộc cho bảng `company`
--
ALTER TABLE `company`
  ADD CONSTRAINT `FKdy4v2yb46hefqicjpyj7b7e4s` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

--
-- Các ràng buộc cho bảng `notifications`
--
ALTER TABLE `notifications`
  ADD CONSTRAINT `FK6og1jgdhfyqm6mk8v6a1qxias` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`),
  ADD CONSTRAINT `FKi82p618hfcc9vjj1tcl8n5hen` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`);

--
-- Các ràng buộc cho bảng `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `FKel9kyl84ego2otj2accfd8mr7` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `FKf5464gxwc32ongdvka2rtvw96` FOREIGN KEY (`address_id`) REFERENCES `address` (`id`);

--
-- Các ràng buộc cho bảng `order_item`
--
ALTER TABLE `order_item`
  ADD CONSTRAINT `FKt4dc2r9nbvbujrljv3e23iibt` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`);

--
-- Các ràng buộc cho bảng `policy`
--
ALTER TABLE `policy`
  ADD CONSTRAINT `FKbnl9fs81c4g3twaab0djievh0` FOREIGN KEY (`category_policy_id`) REFERENCES `category_policy` (`category_policy_id`);

--
-- Các ràng buộc cho bảng `policy_image`
--
ALTER TABLE `policy_image`
  ADD CONSTRAINT `FKlahenqllhml78uy0gmx6ttji0` FOREIGN KEY (`policy_id`) REFERENCES `policy` (`policy_id`);

--
-- Các ràng buộc cho bảng `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `FK9n8if2ou1m5av8vdod3l9qx0x` FOREIGN KEY (`product_author_id`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `FKi10av27oniox6yo7oqvjeim8y` FOREIGN KEY (`sale_id`) REFERENCES `sales` (`id`),
  ADD CONSTRAINT `FKid4vcfgj211k2uqjuex1x7xq0` FOREIGN KEY (`product_category_id`) REFERENCES `category` (`id`);

--
-- Các ràng buộc cho bảng `product_image`
--
ALTER TABLE `product_image`
  ADD CONSTRAINT `FK6oo0cvcdtb6qmwsga468uuukk` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`);

--
-- Các ràng buộc cho bảng `size`
--
ALTER TABLE `size`
  ADD CONSTRAINT `FK8xjuqwpb5xlnn3978a9uhreor` FOREIGN KEY (`color_id`) REFERENCES `color` (`id`);

--
-- Các ràng buộc cho bảng `social_media`
--
ALTER TABLE `social_media`
  ADD CONSTRAINT `FKmm4qios9uovc7d2kj0i30jac1` FOREIGN KEY (`company_id`) REFERENCES `company` (`id`);

--
-- Các ràng buộc cho bảng `user_roles`
--
ALTER TABLE `user_roles`
  ADD CONSTRAINT `FK55itppkw3i07do3h7qoclqd4k` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `FKrhfovtciq1l558cw6udg0h0d3` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
