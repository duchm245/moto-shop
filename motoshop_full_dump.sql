-- ============================================================
--  Moto Shop — Full Database Setup
--  Chạy file này MỘT LẦN để có đầy đủ schema + dữ liệu mẫu.
--  Không cần chạy thêm bất kỳ file migration nào khác.
--
--  Tài khoản mặc định (mật khẩu đều là: 123456)
--    admin     → ROLE_ADMIN    (duchm245@gmail.com)
--    thangdev  → ROLE_EMPLOYEE (thangdv007@gmail.com)
--    kimthang  → ROLE_USER     (thangdvvip@gmail.com)
--
--  Cách chạy:
--    mysql -u root -p < motoshop_full_dump.sql
--    hoặc mở trong phpMyAdmin / DataGrip rồi Execute.
-- ============================================================

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET FOREIGN_KEY_CHECKS = 0;
SET NAMES utf8mb4;
SET time_zone = "+00:00";

-- ============================================================
-- TẠO DATABASE
-- ============================================================
CREATE DATABASE IF NOT EXISTS `motorbike_shop`
  DEFAULT CHARACTER SET utf8mb4
  DEFAULT COLLATE utf8mb4_unicode_ci;

USE `motorbike_shop`;

-- ============================================================
-- XÓA BẢNG CŨ NẾU CÓ (thứ tự ngược với FK)
-- ============================================================
DROP TABLE IF EXISTS `article_image`;
DROP TABLE IF EXISTS `article`;
DROP TABLE IF EXISTS `notifications`;
DROP TABLE IF EXISTS `order_item`;
DROP TABLE IF EXISTS `orders`;
DROP TABLE IF EXISTS `variant`;
DROP TABLE IF EXISTS `product_image`;
DROP TABLE IF EXISTS `size`;
DROP TABLE IF EXISTS `color`;
DROP TABLE IF EXISTS `product`;
DROP TABLE IF EXISTS `banner`;
DROP TABLE IF EXISTS `address`;
DROP TABLE IF EXISTS `social_media`;
DROP TABLE IF EXISTS `company`;
DROP TABLE IF EXISTS `category`;
DROP TABLE IF EXISTS `policy_image`;
DROP TABLE IF EXISTS `policy`;
DROP TABLE IF EXISTS `category_policy`;
DROP TABLE IF EXISTS `sales`;
DROP TABLE IF EXISTS `user_roles`;
DROP TABLE IF EXISTS `role`;
DROP TABLE IF EXISTS `user`;

-- ============================================================
-- TẠO BẢNG
-- ============================================================

CREATE TABLE `role` (
  `id`   bigint(20)   NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `user` (
  `id`                 bigint(20)   NOT NULL AUTO_INCREMENT,
  `created_date`       datetime     DEFAULT NULL,
  `email`              varchar(255) DEFAULT NULL,
  `first_name`         varchar(255) DEFAULT NULL,
  `last_name`          varchar(255) DEFAULT NULL,
  `modified_date`      datetime     DEFAULT NULL,
  `otp`                varchar(255) DEFAULT NULL,
  `otp_generated_time` datetime     DEFAULT NULL,
  `password`           varchar(255) NOT NULL,
  `phone`              varchar(255) DEFAULT NULL,
  `status`             int(11)      NOT NULL,
  `username`           varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UKsb8bbouer5wak8vyiiy4pf2bx` (`username`),
  UNIQUE KEY `UKob8kqyqqgmefl0aco34akdtpe` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `user_roles` (
  `user_id` bigint(20) NOT NULL,
  `role_id` bigint(20) NOT NULL,
  PRIMARY KEY (`user_id`, `role_id`),
  KEY `FKrhfovtciq1l558cw6udg0h0d3` (`role_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `sales` (
  `id`            bigint(20)   NOT NULL AUTO_INCREMENT,
  `created_date`  datetime     DEFAULT NULL,
  `discount`      int(11)      DEFAULT NULL,
  `end_date`      datetime     DEFAULT NULL,
  `is_active`     int(11)      DEFAULT NULL,
  `modified_date` datetime     DEFAULT NULL,
  `name`          varchar(255) DEFAULT NULL,
  `start_date`    datetime     DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `company` (
  `id`            bigint(20)   NOT NULL AUTO_INCREMENT,
  `address`       varchar(255) DEFAULT NULL,
  `created_date`  datetime     DEFAULT NULL,
  `modified_date` datetime     DEFAULT NULL,
  `name`          varchar(255) DEFAULT NULL,
  `phone`         varchar(255) DEFAULT NULL,
  `phone_cskh`    varchar(255) DEFAULT NULL,
  `status`        int(11)      DEFAULT NULL,
  `tax_code`      varchar(255) DEFAULT NULL,
  `tax_date`      varchar(255) DEFAULT NULL,
  `tax_location`  varchar(255) DEFAULT NULL,
  `user_id`       bigint(20)   DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKdy4v2yb46hefqicjpyj7b7e4s` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `social_media` (
  `id`         bigint(20)   NOT NULL AUTO_INCREMENT,
  `name`       varchar(255) DEFAULT NULL,
  `url`        varchar(255) DEFAULT NULL,
  `company_id` bigint(20)   DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKmm4qios9uovc7d2kj0i30jac1` (`company_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `category_policy` (
  `category_policy_id`   bigint(20)   NOT NULL AUTO_INCREMENT,
  `created_date`         datetime     DEFAULT NULL,
  `modified_date`        datetime     DEFAULT NULL,
  `category_policy_name` varchar(255) NOT NULL,
  `status`               int(11)      NOT NULL,
  PRIMARY KEY (`category_policy_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `policy` (
  `policy_id`          bigint(20)   NOT NULL AUTO_INCREMENT,
  `content`            varchar(255) DEFAULT NULL,
  `created_date`       datetime     DEFAULT NULL,
  `modified_date`      datetime     DEFAULT NULL,
  `name`               varchar(255) NOT NULL,
  `status`             int(11)      NOT NULL,
  `category_policy_id` bigint(20)   NOT NULL,
  PRIMARY KEY (`policy_id`),
  KEY `FKbnl9fs81c4g3twaab0djievh0` (`category_policy_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `policy_image` (
  `policy_image_id` bigint(20)   NOT NULL AUTO_INCREMENT,
  `created_date`    datetime     DEFAULT NULL,
  `img`             varchar(255) DEFAULT NULL,
  `modified_date`   datetime     DEFAULT NULL,
  `status`          int(11)      DEFAULT NULL,
  `policy_id`       bigint(20)   NOT NULL,
  PRIMARY KEY (`policy_image_id`),
  KEY `FKlahenqllhml78uy0gmx6ttji0` (`policy_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `category` (
  `id`                 bigint(20)   NOT NULL AUTO_INCREMENT,
  `created_date`       datetime     DEFAULT NULL,
  `description`        varchar(255) DEFAULT NULL,
  `modified_date`      datetime     DEFAULT NULL,
  `status`             int(11)      NOT NULL,
  `title`              varchar(255) NOT NULL,
  `type`               int(11)      DEFAULT NULL,
  `url_image`          varchar(255) DEFAULT NULL,
  `parent_category_id` bigint(20)   DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKs2ride9gvilxy2tcuv7witnxc` (`parent_category_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `banner` (
  `id`            bigint(20)   NOT NULL AUTO_INCREMENT,
  `created_date`  datetime     DEFAULT NULL,
  `modified_date` datetime     DEFAULT NULL,
  `name`          varchar(255) NOT NULL,
  `src`           varchar(255) DEFAULT NULL,
  `status`        int(11)      NOT NULL,
  `category_id`   bigint(20)   DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK2evybotynuel3qb4r4tkqvjuh` (`category_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `address` (
  `id`             bigint(20)   NOT NULL AUTO_INCREMENT,
  `address_detail` varchar(255) DEFAULT NULL,
  `created_date`   datetime     DEFAULT NULL,
  `district`       varchar(255) DEFAULT NULL,
  `first_name`     varchar(255) DEFAULT NULL,
  `focus`          int(11)      DEFAULT NULL,
  `last_name`      varchar(255) DEFAULT NULL,
  `modified_date`  datetime     DEFAULT NULL,
  `phone`          varchar(255) DEFAULT NULL,
  `province`       varchar(255) DEFAULT NULL,
  `status`         int(11)      DEFAULT NULL,
  `wards`          varchar(255) DEFAULT NULL,
  `user_id`        bigint(20)   DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKda8tuywtf0gb6sedwk7la1pgi` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Schema cuoi cung sau tat ca migration (material da xoa, vehicle_condition doi ten tu condition)
CREATE TABLE `product` (
  `id`                    bigint(20)   NOT NULL AUTO_INCREMENT,
  `created_date`          datetime     DEFAULT NULL,
  `description`           text         DEFAULT NULL,
  `modified_date`         datetime     DEFAULT NULL,
  `name`                  varchar(255) DEFAULT NULL,
  `price`                 int(11)      DEFAULT NULL,
  `sale_price`            int(11)      DEFAULT NULL,
  `sku`                   varchar(255) DEFAULT NULL,
  `status`                int(11)      DEFAULT NULL,
  `visited`               int(11)      DEFAULT NULL,
  `product_author_id`     bigint(20)   DEFAULT NULL,
  `product_category_id`   bigint(20)   DEFAULT NULL,
  `sale_id`               bigint(20)   DEFAULT NULL,
  `vehicle_condition`     varchar(10)  NOT NULL DEFAULT 'new',
  `manufacturing_year`    int(11)      DEFAULT NULL,
  `mileage`               int(11)      NOT NULL DEFAULT 0,
  `brand`                 varchar(100) DEFAULT NULL,
  `vehicle_type`          varchar(50)  DEFAULT NULL,
  `is_new`                tinyint(1)   NOT NULL DEFAULT 0,
  `engine_type`           varchar(100) DEFAULT NULL,
  `displacement`          int(11)      DEFAULT NULL,
  `max_power`             varchar(50)  DEFAULT NULL,
  `max_torque`            varchar(50)  DEFAULT NULL,
  `transmission`          varchar(50)  DEFAULT NULL,
  `fuel_system`           varchar(100) DEFAULT NULL,
  `fuel_capacity`         double       DEFAULT NULL,
  `fuel_consumption`      varchar(50)  DEFAULT NULL,
  `dimensions`            varchar(100) DEFAULT NULL,
  `weight`                int(11)      DEFAULT NULL,
  `seat_height`           int(11)      DEFAULT NULL,
  `ground_clearance`      int(11)      DEFAULT NULL,
  `warranty_info`         varchar(100) DEFAULT NULL,
  `origin`                varchar(100) DEFAULT NULL,
  `installment_supported` tinyint(1)   NOT NULL DEFAULT 0,
  `installment_months`    int(11)      NOT NULL DEFAULT 36,
  `down_payment_percent`  int(11)      NOT NULL DEFAULT 20,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UKjmivyxk9rmgysrmsqw15lqr5b` (`name`),
  KEY `FK9n8if2ou1m5av8vdod3l9qx0x` (`product_author_id`),
  KEY `FKid4vcfgj211k2uqjuex1x7xq0` (`product_category_id`),
  KEY `FKi10av27oniox6yo7oqvjeim8y` (`sale_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `color` (
  `id`         bigint(20)   NOT NULL AUTO_INCREMENT,
  `value`      varchar(255) DEFAULT NULL,
  `product_id` bigint(20)   DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKsgsuxxoc1h5pskbjpch4id2ec` (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `size` (
  `id`       bigint(20)   NOT NULL AUTO_INCREMENT,
  `sold`     int(11)      DEFAULT NULL,
  `total`    int(11)      DEFAULT NULL,
  `value`    varchar(255) DEFAULT NULL,
  `color_id` bigint(20)   DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK8xjuqwpb5xlnn3978a9uhreor` (`color_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `product_image` (
  `id`         bigint(20)   NOT NULL AUTO_INCREMENT,
  `url`        varchar(255) DEFAULT NULL,
  `product_id` bigint(20)   DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK6oo0cvcdtb6qmwsga468uuukk` (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `variant` (
  `id`         bigint(20)   NOT NULL AUTO_INCREMENT,
  `name`       varchar(100) NOT NULL,
  `color_name` varchar(100) DEFAULT NULL,
  `color_code` varchar(20)  DEFAULT NULL,
  `stock`      int(11)      NOT NULL DEFAULT 0,
  `sold`       int(11)      NOT NULL DEFAULT 0,
  `product_id` bigint(20)   NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_variant_product` (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `orders` (
  `id`             bigint(20)   NOT NULL AUTO_INCREMENT,
  `address_detail` varchar(255) DEFAULT NULL,
  `code_orders`    varchar(255) DEFAULT NULL,
  `create_date`    datetime     DEFAULT NULL,
  `district`       varchar(255) DEFAULT NULL,
  `full_name`      varchar(255) DEFAULT NULL,
  `is_checkout`    bit(1)       DEFAULT NULL,
  `modified_date`  datetime     DEFAULT NULL,
  `note`           varchar(255) DEFAULT NULL,
  `order_date`     datetime     DEFAULT NULL,
  `payment_method` varchar(255) DEFAULT NULL,
  `phone`          varchar(255) DEFAULT NULL,
  `province`       varchar(255) DEFAULT NULL,
  `ship_date`      datetime     DEFAULT NULL,
  `shipping_fee`   int(11)      DEFAULT NULL,
  `status`         int(11)      DEFAULT NULL,
  `type`           int(11)      DEFAULT NULL,
  `user_name_emp`  varchar(255) DEFAULT NULL,
  `wards`          varchar(255) DEFAULT NULL,
  `address_id`     bigint(20)   DEFAULT NULL,
  `user_id`        bigint(20)   DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UKdp6m4djxyjktrcweqdonym1f3` (`code_orders`),
  KEY `FKf5464gxwc32ongdvka2rtvw96` (`address_id`),
  KEY `FKel9kyl84ego2otj2accfd8mr7` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `order_item` (
  `id`           bigint(20)   NOT NULL AUTO_INCREMENT,
  `product_name` varchar(255) DEFAULT NULL,
  `quantity`     int(11)      DEFAULT NULL,
  `sell_price`   int(11)      DEFAULT NULL,
  `value_color`  varchar(255) DEFAULT NULL,
  `value_size`   varchar(255) DEFAULT NULL,
  `order_id`     bigint(20)   DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKt4dc2r9nbvbujrljv3e23iibt` (`order_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `notifications` (
  `id`             bigint(20)   NOT NULL AUTO_INCREMENT,
  `content`        varchar(255) DEFAULT NULL,
  `deliver_status` bit(1)       DEFAULT NULL,
  `is_read`        bit(1)       DEFAULT NULL,
  `type`           int(11)      DEFAULT NULL,
  `order_id`       bigint(20)   DEFAULT NULL,
  `product_id`     bigint(20)   DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK6og1jgdhfyqm6mk8v6a1qxias` (`order_id`),
  KEY `FKi82p618hfcc9vjj1tcl8n5hen` (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `article` (
  `id`            bigint(20)   NOT NULL AUTO_INCREMENT,
  `author`        varchar(255) DEFAULT NULL,
  `content`       text         DEFAULT NULL,
  `created_date`  datetime     DEFAULT NULL,
  `image`         varchar(255) DEFAULT NULL,
  `modified_date` datetime     DEFAULT NULL,
  `short_content` text         DEFAULT NULL,
  `status`        int(11)      DEFAULT NULL,
  `title`         varchar(255) DEFAULT NULL,
  `category_id`   bigint(20)   DEFAULT NULL,
  `user_id`       bigint(20)   DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKy5kkohbk00g0w88fi05k2hcw` (`category_id`),
  KEY `FKbc2qerk3l47javnl2yvn51uoi` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `article_image` (
  `id`         int(11)      NOT NULL AUTO_INCREMENT,
  `url`        varchar(255) DEFAULT NULL,
  `article_id` bigint(20)   DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKt3rm1gwoysmll8kpy7lt1vpwc` (`article_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- DU LIEU
-- ============================================================

INSERT INTO `role` VALUES (1,'ROLE_ADMIN'),(2,'ROLE_USER'),(3,'ROLE_EMPLOYEE');
ALTER TABLE `role` AUTO_INCREMENT = 4;

-- mat khau 123456 cho ca 3 tai khoan
INSERT INTO `user`
  (`id`,`created_date`,`email`,`first_name`,`last_name`,`modified_date`,
   `otp`,`otp_generated_time`,`password`,`phone`,`status`,`username`)
VALUES
(1,'2023-09-17 07:23:11','duchm245@gmail.com','Linh','Quản Trị',
 '2023-09-17 07:23:11',NULL,NULL,
 '$2a$10$1Xmt73dPIjrpTIFrU04hx.WCLdIjaV9yrCUN6QbhjbT8ntIRuOS.i','0966821574',1,'admin'),
(2,'2023-09-17 07:28:27','thangdv007@gmail.com','Linh','Dev',
 '2023-09-17 07:28:27',NULL,NULL,
 '$2a$10$1Xmt73dPIjrpTIFrU04hx.WCLdIjaV9yrCUN6QbhjbT8ntIRuOS.i','0334018518',1,'linhdev'),
(3,'2023-09-18 22:13:24','thangdvvip@gmail.com','Trịnh','',
 '2023-09-18 22:13:24','349757','2023-09-18 22:13:24',
 '$2a$10$1Xmt73dPIjrpTIFrU04hx.WCLdIjaV9yrCUN6QbhjbT8ntIRuOS.i','0966821574',1,'HuyTrinh');
ALTER TABLE `user` AUTO_INCREMENT = 4;

INSERT INTO `user_roles` VALUES (1,1),(2,1),(3,3);

INSERT INTO `sales`
  (`id`,`created_date`,`discount`,`end_date`,`is_active`,`modified_date`,`name`,`start_date`)
VALUES
(1,'2023-09-19 10:48:27',50,'2024-01-01 10:48:07',1,'2023-09-19 10:48:27',
 'Sale Vo Cuc','2023-09-19 10:48:07');
ALTER TABLE `sales` AUTO_INCREMENT = 2;

-- type=0: danh muc san pham | type=2: danh muc bai viet
INSERT INTO `category`
  (`id`,`created_date`,`description`,`modified_date`,`status`,`title`,`type`,`url_image`,`parent_category_id`)
VALUES
(31,'2024-01-01 00:00:00','Xe số - xe phổ thông, tiết kiệm nhiên liệu','2024-01-01 00:00:00',1,'Xe số',0,'category_xe_so.jpg',NULL),
(32,'2024-01-01 00:00:00','Xe tay ga - tiện lợi, dễ đi','2024-01-01 00:00:00',1,'Xe tay ga',0,'category_xe_tay_ga.jpg',NULL),
(33,'2024-01-01 00:00:00','Xe côn tay - thể thao, mạnh mẽ','2024-01-01 00:00:00',1,'Xe côn tay',0,'category_xe_con_tay.jpg',NULL),
(34,'2024-01-01 00:00:00','Xe điện - thân thiện môi trường','2024-01-01 00:00:00',1,'Xe điện',0,'category_xe_dien.jpg',NULL),
(35,'2024-01-01 00:00:00','Tin tức và bài viết về xe máy','2024-01-01 00:00:00',1,'Tin tức xe máy',2,NULL,NULL),
(36,'2024-01-01 00:00:00','Chương trình khuyến mãi, ưu đãi giảm giá','2024-01-01 00:00:00',1,'Tin khuyến mãi',2,NULL,NULL),
(37,'2024-01-01 00:00:00','Tuyển dụng nhân sự cửa hàng xe máy','2024-01-01 00:00:00',1,'Tin tuyển dụng',2,NULL,NULL);
ALTER TABLE `category` AUTO_INCREMENT = 38;

INSERT INTO `banner` VALUES
(4,'2023-09-19 08:54:31','2023-09-19 08:54:31','banner_home_1','slide_home_1.jpg',1,NULL),
(5,'2023-09-19 08:54:58','2023-09-19 08:54:58','Banner_home_2','slide_home_2.jpg',1,NULL),
(6,'2023-09-19 08:56:00','2023-09-19 08:56:00','banner_home_3','slide_home_3.jpg',1,NULL);
ALTER TABLE `banner` AUTO_INCREMENT = 7;

INSERT INTO `address`
  (`id`,`address_detail`,`created_date`,`district`,`first_name`,`focus`,
   `last_name`,`modified_date`,`phone`,`province`,`status`,`wards`,`user_id`)
VALUES
(1,'Nguyệt Đức','2023-09-22 13:19:36','251','Kim Thắng',0,
 'Nguyễn','2023-09-22 13:19:36','0966821574','26',1,'9052',3);
ALTER TABLE `address` AUTO_INCREMENT = 2;

INSERT INTO `orders`
  (`id`,`address_detail`,`code_orders`,`create_date`,`district`,`full_name`,
   `is_checkout`,`modified_date`,`note`,`order_date`,`payment_method`,
   `phone`,`province`,`ship_date`,`shipping_fee`,`status`,`type`,
   `user_name_emp`,`wards`,`address_id`,`user_id`)
VALUES
(3,'Nguyệt Đức','13471626','2023-09-22 13:20:54','251','Nguyễn Kim Thắng',
 b'1','2023-09-22 13:37:17','','2023-09-22 13:20:54','COD',
 '0966821574','26','2023-09-22 13:36:41',25000,4,1,'linhdev','9052',NULL,3),
(4,'Nguyệt Đức','72913687','2023-09-22 13:38:05','251','Nguyễn Kim Thắng',
 b'0','2023-09-22 13:38:05','','2023-09-22 13:38:05','COD',
 '0966821574','26',NULL,25000,1,1,NULL,'9052',NULL,3),
(5,'Nguyệt Đức','60195487','2023-09-22 14:17:55','251','Nguyễn Kim Thắng',
 b'0','2023-09-22 14:17:55','','2023-09-22 14:17:55','COD',
 '0966821574','26',NULL,25000,1,1,NULL,'9052',NULL,3),
(7,NULL,'72129668','2023-10-04 14:32:34',NULL,NULL,
 b'0','2023-10-04 14:32:34',NULL,NULL,NULL,
 NULL,NULL,NULL,25000,0,0,NULL,NULL,NULL,3);
ALTER TABLE `orders` AUTO_INCREMENT = 8;

INSERT INTO `notifications` VALUES
(1,'Đơn hàng 13471626 vừa được tạo, xác nhận ngay nào',b'1',b'0',1,3,NULL),
(2,'Đơn hàng 72913687 vừa được tạo, xác nhận ngay nào',b'1',b'0',1,4,NULL),
(3,'Đơn hàng 60195487 vừa được tạo, xác nhận ngay nào',b'1',b'0',1,5,NULL);
ALTER TABLE `notifications` AUTO_INCREMENT = 4;

INSERT INTO `article`
  (`id`,`author`,`content`,`created_date`,`image`,`modified_date`,
   `short_content`,`status`,`title`,`category_id`,`user_id`)
VALUES
(1,'Nguyen Kim Thang',
 '<p>Mẹo chọn mua xe máy phù hợp: Cần xem xét mục đích sử dụng, ngân sách, thương hiệu và dịch vụ hậu mãi. Cập nhật nội dung qua trang quản trị.</p>',
 '2023-09-19 13:46:41','blog_1.jpg','2023-09-19 13:46:41',
 '<p>Hướng dẫn chọn mua xe máy phù hợp với nhu cầu và ngân sách.</p>',
 1,'Mẹo chọn mua xe máy phù hợp cho người mới',35,2),
(2,'Nguyen Kim Thang',
 '<p>Bảo dưỡng xe máy định kỳ giúp xe hoạt động ổn định, tiết kiệm nhiên liệu và tăng tuổi thọ động cơ. Cập nhật nội dung qua trang quản trị.</p>',
 '2023-09-19 13:49:34','blog_2.jpg','2023-09-19 13:49:34',
 '<p>Hướng dẫn bảo dưỡng xe máy định kỳ để xe luôn hoạt động tốt và bền bỉ.</p>',
 1,'Hướng dẫn bảo dưỡng xe máy định kỳ đúng cách',35,2);
ALTER TABLE `article` AUTO_INCREMENT = 3;

-- ============================================================
-- PRODUCT (38 san pham xe may: ID 101-138)
-- ============================================================
INSERT INTO `product` (
  `id`,`created_date`,`description`,`modified_date`,`name`,
  `price`,`sale_price`,`sku`,`status`,`visited`,
  `product_author_id`,`product_category_id`,`sale_id`,
  `vehicle_condition`,`manufacturing_year`,`mileage`,
  `brand`,`vehicle_type`,`is_new`,
  `engine_type`,`displacement`,`max_power`,`max_torque`,`transmission`,
  `fuel_system`,`fuel_capacity`,`fuel_consumption`,
  `dimensions`,`weight`,`seat_height`,`ground_clearance`,
  `warranty_info`,`origin`,
  `installment_supported`,`installment_months`,`down_payment_percent`
) VALUES
(101,'2024-01-01 00:00:00','<p>Honda Wave Alpha 110 - mẫu xe số phổ thông bán chạy nhất Việt Nam với thiết kế gọn gàng, tiết kiệm nhiên liệu xuất sắc và độ bền cao.</p>','2024-01-01 00:00:00','Honda Wave Alpha 110',18990000,18990000,'HONDA-WAVE-ALPHA-110',1,0,1,31,NULL,'new',2024,0,'Honda','Xe số',1,'4 thì, SOHC, 2 van, 1 xi-lanh',110,'6.0 kW / 7500 vòng/phút','8.68 Nm / 5500 vòng/phút','4 số','Bộ chế hòa khí',4.0,'1.63 lít/100km','1896 x 694 x 1061 mm',99,761,145,'3 năm hoặc 30000 km','Honda Việt Nam',1,36,20),
(102,'2024-01-01 00:00:00','<p>Honda Air Blade 125 - xe tay ga thể thao với thiết kế mạnh mẽ, động cơ eSP tiên tiến cho hiệu suất vượt trội và tiết kiệm nhiên liệu tối ưu.</p>','2024-01-01 00:00:00','Honda Air Blade 125',52900000,52900000,'HONDA-AIR-BLADE-125',1,0,1,32,NULL,'new',2024,0,'Honda','Xe tay ga',1,'4 thì, eSP, SOHC, 2 van, 1 xi-lanh',125,'9.2 kW / 8500 vòng/phút','12.0 Nm / 5000 vòng/phút','Tay ga (CVT)','Phun xăng điện tử PGM-FI',5.3,'1.79 lít/100km','1916 x 681 x 1132 mm',118,790,138,'3 năm hoặc 30000 km','Honda Việt Nam',1,36,20),
(103,'2024-01-01 00:00:00','<p>Yamaha Exciter 155 VVA - biểu tượng của dòng xe côn tay thể thao với công nghệ VVA, mang lại cảm giác lái phấn khích và mạnh mẽ.</p>','2024-01-01 00:00:00','Yamaha Exciter 155 VVA',52900000,52900000,'YAMAHA-EXCITER-155-VVA',1,0,1,33,NULL,'new',2024,0,'Yamaha','Xe côn tay',1,'4 thì, 4 van, SOHC, VVA, 1 xi-lanh',155,'13.2 kW / 9500 vòng/phút','14.4 Nm / 8000 vòng/phút','6 số','Phun xăng điện tử',5.4,'1.91 lít/100km','1975 x 665 x 1105 mm',119,795,150,'3 năm hoặc 30000 km','Yamaha Việt Nam',1,36,20),
(104,'2024-01-01 00:00:00','<p>Yamaha Grande 125 Hybrid - xe tay ga cao cấp dành cho phái đẹp với công nghệ hybrid SmartPower, thiết kế sang trọng và nhiều tính năng tiện ích.</p>','2024-01-01 00:00:00','Yamaha Grande 125 Hybrid',49900000,49900000,'YAMAHA-GRANDE-125',1,0,1,32,NULL,'new',2024,0,'Yamaha','Xe tay ga',0,'4 thì, 4 van, SOHC, BluCore, 1 xi-lanh',125,'7.3 kW / 8000 vòng/phút','10.6 Nm / 6000 vòng/phút','Tay ga (CVT)','Phun xăng điện tử',5.5,'1.76 lít/100km','1840 x 680 x 1145 mm',112,761,127,'3 năm hoặc 30000 km','Yamaha Việt Nam',1,36,20),
(105,'2024-01-01 00:00:00','<p>Suzuki Raider R150 Fi - mẫu xe côn tay thể thao mạnh mẽ với động cơ phun xăng Fi, phong cách hầm hố và hiệu suất vượt trội phân khúc 150cc.</p>','2024-01-01 00:00:00','Suzuki Raider R150 Fi',46990000,46990000,'SUZUKI-RAIDER-R150',1,0,1,33,NULL,'new',2024,0,'Suzuki','Xe côn tay',0,'4 thì, DOHC, 4 van, làm mát bằng dầu, 1 xi-lanh',150,'11.3 kW / 10000 vòng/phút','13.8 Nm / 8000 vòng/phút','6 số','Phun xăng điện tử Fi',4.8,'2.1 lít/100km','1985 x 700 x 1060 mm',126,795,170,'2 năm hoặc 20000 km','Suzuki Việt Nam',1,36,20),
(106,'2024-01-01 00:00:00','<p>VinFast Evo 200 - xe máy điện thông minh với phạm vi hoạt động lên đến 200km/lần sạc, kết nối điện thoại thông minh và thiết kế hiện đại.</p>','2024-01-01 00:00:00','VinFast Evo 200',29990000,29990000,'VINFAST-EVO-200',1,0,1,34,NULL,'new',2024,0,'VinFast','Xe điện',1,'Động cơ điện 3 pha không chổi than',NULL,'4.0 kW (đỉnh 6.0 kW)',NULL,'Tay ga (1 cấp)','Điện (pin Lithium)',NULL,'1.9 kWh/100km','1840 x 700 x 1100 mm',108,755,140,'3 năm hoặc 30000 km','VinFast Việt Nam',1,36,20),
(107,'2024-01-01 00:00:00','<p>Honda Wave RSX 110 - xe số thể thao với thiết kế trẻ trung, động cơ 4 thì tiết kiệm nhiên liệu, phù hợp học sinh sinh viên.</p>','2024-01-01 00:00:00','Honda Wave RSX 110',30490000,30490000,'HONDA-WAVE-RSX-110',1,0,1,31,NULL,'new',2024,0,'Honda','Xe số',1,'4 thì, SOHC, 2 van',110,'5.5 kW / 7500 rpm','8.05 Nm / 5500 rpm','4 số','Phun xăng điện tử PGM-FI',3.7,'1.66 lít/100km','1897 x 696 x 1069 mm',101,771,149,'3 năm hoặc 30000 km','Honda Việt Nam',1,36,20),
(108,'2024-01-01 00:00:00','<p>Honda Future 125 FI - xe số quốc dân với thiết kế đơn giản, tiết kiệm nhiên liệu và độ bền cao, lựa chọn của hàng triệu người Việt.</p>','2024-01-01 00:00:00','Honda Future 125 FI',30290000,30290000,'HONDA-FUTURE-125-FI',1,0,1,31,NULL,'new',2024,0,'Honda','Xe số',0,'4 thì, SOHC, 2 van',125,'6.7 kW / 7500 rpm','10.0 Nm / 6000 rpm','4 số','Phun xăng điện tử PGM-FI',4.0,'1.58 lít/100km','1924 x 699 x 1076 mm',107,778,148,'3 năm hoặc 30000 km','Honda Việt Nam',1,36,20),
(109,'2024-01-01 00:00:00','<p>Honda Super Cub C125 - huyền thoại 60 năm tuổi với thiết kế cổ điển đặc biệt, động cơ 125cc hiện đại và khả năng tiết kiệm nhiên liệu tuyệt vời.</p>','2024-01-01 00:00:00','Honda Super Cub C125',68000000,68000000,'HONDA-SUPER-CUB-C125',1,0,1,31,NULL,'new',2024,0,'Honda','Xe số',1,'4 thì, SOHC, 2 van, làm mát bằng không khí',125,'6.9 kW / 7500 rpm','10.3 Nm / 5500 rpm','4 số tự động','Phun xăng điện tử PGM-FI',3.7,'1.82 lít/100km','1869 x 760 x 1000 mm',102,779,135,'3 năm hoặc 30000 km','Honda Việt Nam',1,36,20),
(110,'2024-01-01 00:00:00','<p>Honda Blade 125 - xe số trẻ trung với thiết kế sporty ấn tượng, động cơ 125cc mạnh mẽ và tiết kiệm nhiên liệu với hệ thống phun xăng PGM-FI.</p>','2024-01-01 00:00:00','Honda Blade 125',23990000,23990000,'HONDA-BLADE-125',1,0,1,31,NULL,'new',2024,0,'Honda','Xe số',0,'4 thì, SOHC, 2 van',125,'7.0 kW / 7500 rpm','10.12 Nm / 5500 rpm','4 số','Phun xăng điện tử PGM-FI',3.7,'1.73 lít/100km','1918 x 692 x 1067 mm',103,770,145,'3 năm hoặc 30000 km','Honda Việt Nam',1,36,20),
(111,'2024-01-01 00:00:00','<p>Honda Vision - xe tay ga quốc dân với thiết kế thanh lịch, sức chứa hàng hóa lớn và tiết kiệm nhiên liệu xuất sắc, phù hợp cho người đi hàng ngày.</p>','2024-01-01 00:00:00','Honda Vision 110',32990000,32990000,'HONDA-VISION-110',1,0,1,32,NULL,'new',2024,0,'Honda','Xe tay ga',1,'4 thì, SOHC, 2 van, làm mát bằng không khí',110,'6.0 kW / 8000 rpm','8.68 Nm / 5500 rpm','Tay ga (CVT)','Phun xăng điện tử PGM-FI',5.0,'1.76 lít/100km','1824 x 683 x 1088 mm',104,761,130,'3 năm hoặc 30000 km','Honda Việt Nam',1,36,20),
(112,'2024-01-01 00:00:00','<p>Honda Vario 125 - xe tay ga thể thao với thiết kế khỏe khoắn, động cơ eSP 125cc tiết kiệm nhiên liệu và nhiều tính năng hiện đại.</p>','2024-01-01 00:00:00','Honda Vario 125',39990000,39990000,'HONDA-VARIO-125',1,0,1,32,NULL,'new',2024,0,'Honda','Xe tay ga',0,'4 thì, SOHC, 2 van, eSP',125,'8.3 kW / 8500 rpm','10.9 Nm / 5000 rpm','Tay ga (CVT)','Phun xăng điện tử PGM-FI',5.5,'1.76 lít/100km','1939 x 694 x 1133 mm',116,789,140,'3 năm hoặc 30000 km','Honda Việt Nam',1,36,20),
(113,'2024-01-01 00:00:00','<p>Honda Vario 160 - xe tay ga phân khúc cao với động cơ 160cc mạnh mẽ, thiết kế sang trọng và nhiều tính năng công nghệ tiên tiến.</p>','2024-01-01 00:00:00','Honda Vario 160',50490000,50490000,'HONDA-VARIO-160',1,0,1,32,NULL,'new',2024,0,'Honda','Xe tay ga',1,'4 thì, SOHC, 2 van, eSP+',160,'12.3 kW / 8500 rpm','14.7 Nm / 6500 rpm','Tay ga (CVT)','Phun xăng điện tử PGM-FI',5.5,'1.98 lít/100km','1936 x 694 x 1133 mm',125,790,143,'3 năm hoặc 30000 km','Honda Việt Nam',1,36,20),
(114,'2024-01-01 00:00:00','<p>Honda SH Mode 125 - xe tay ga cao cấp phân khúc trung với thiết kế thanh lịch, trang bị đầy đủ tính năng và công nghệ hiện đại.</p>','2024-01-01 00:00:00','Honda SH Mode 125',56990000,56990000,'HONDA-SH-MODE-125',1,0,1,32,NULL,'new',2024,0,'Honda','Xe tay ga',0,'4 thì, SOHC, 2 van, eSP',125,'8.7 kW / 8500 rpm','11.2 Nm / 5000 rpm','Tay ga (CVT)','Phun xăng điện tử PGM-FI',5.7,'1.74 lít/100km','1924 x 696 x 1153 mm',129,768,155,'3 năm hoặc 30000 km','Honda Việt Nam',1,36,20),
(115,'2024-01-01 00:00:00','<p>Honda SH 160i - biểu tượng xe tay ga cao cấp Việt Nam với động cơ 160cc, thiết kế sang trọng đẳng cấp và nhiều trang bị tiện nghi hàng đầu.</p>','2024-01-01 00:00:00','Honda SH 160i',77990000,77990000,'HONDA-SH-160I',1,0,1,32,NULL,'new',2024,0,'Honda','Xe tay ga',0,'4 thì, SOHC, 2 van, eSP+',160,'12.3 kW / 8500 rpm','14.7 Nm / 6500 rpm','Tay ga (CVT)','Phun xăng điện tử PGM-FI',8.0,'2.1 lít/100km','1940 x 698 x 1148 mm',140,790,150,'3 năm hoặc 30000 km','Honda Việt Nam',1,36,20),
(116,'2024-01-01 00:00:00','<p>Honda ADV350 - adventure scooter cao cấp với động cơ 350cc, thiết kế khám phá đường trường, trang bị hệ thống ABS và nhiều công nghệ tiên tiến.</p>','2024-01-01 00:00:00','Honda ADV 350',120000000,120000000,'HONDA-ADV-350',1,0,1,32,NULL,'new',2024,0,'Honda','Xe tay ga',1,'4 thì, SOHC, 4 van, làm mát bằng nước',350,'25.8 kW / 7500 rpm','32 Nm / 5250 rpm','Tay ga (CVT)','Phun xăng điện tử PGM-FI',11.0,'3.3 lít/100km','2175 x 815 x 1320 mm',212,805,165,'3 năm hoặc 30000 km','Honda Việt Nam',1,36,20),
(117,'2024-01-01 00:00:00','<p>Honda Winner X - xe côn tay thể thao với động cơ 150cc mạnh mẽ, thiết kế hung hãn và hệ thống phun xăng Fi cho hiệu suất vận hành vượt trội.</p>','2024-01-01 00:00:00','Honda Winner X',45690000,45690000,'HONDA-WINNER-X',1,0,1,33,NULL,'new',2024,0,'Honda','Xe côn tay',1,'4 thì, DOHC, 4 van, làm mát bằng nước',150,'12.0 kW / 10000 rpm','13.8 Nm / 8000 rpm','6 số','Phun xăng điện tử PGM-FI',4.8,'2.1 lít/100km','2007 x 698 x 1077 mm',123,795,175,'3 năm hoặc 30000 km','Honda Việt Nam',1,36,20),
(118,'2024-01-01 00:00:00','<p>Honda CBR150R - sportbike thuần túy với thiết kế khí động như CBR1000RR, động cơ 150cc DOHC 4 van sức mạnh ấn tượng trong phân khúc 150cc.</p>','2024-01-01 00:00:00','Honda CBR150R',89000000,89000000,'HONDA-CBR150R',1,0,1,33,NULL,'new',2024,0,'Honda','Xe côn tay',1,'4 thì, DOHC, 4 van, làm mát bằng nước',150,'12.5 kW / 10000 rpm','13.8 Nm / 8500 rpm','6 số','Phun xăng điện tử PGM-FI',11.0,'2.8 lít/100km','2012 x 726 x 1064 mm',136,795,170,'3 năm hoặc 30000 km','Honda Việt Nam',1,36,20),
(119,'2024-01-01 00:00:00','<p>Honda CB350 - neo-classic phong cách retro với động cơ 350cc 2 xi-lanh, thiết kế cổ điển sang trọng kết hợp công nghệ hiện đại.</p>','2024-01-01 00:00:00','Honda CB350 H-ness',150000000,150000000,'HONDA-CB350-HNESS',1,0,1,33,NULL,'new',2024,0,'Honda','Xe côn tay',1,'4 thì, OHC, 2 xi-lanh song song',350,'21.0 kW / 5500 rpm','29.0 Nm / 3000 rpm','5 số','Phun xăng điện tử PGM-FI',15.0,'3.5 lít/100km','2117 x 800 x 1107 mm',181,800,166,'3 năm hoặc 30000 km','Honda Việt Nam',1,36,20),
(120,'2024-01-01 00:00:00','<p>Honda CUV e - xe máy điện cao cấp với thiết kế hiện đại, pin Li-ion dung lượng lớn, kết nối smartphone và nhiều tính năng thông minh hàng đầu.</p>','2024-01-01 00:00:00','Honda CUV e',50000000,50000000,'HONDA-CUV-E',1,0,1,34,NULL,'new',2024,0,'Honda','Xe điện',1,'Động cơ điện Hub-motor',NULL,'1.4 kW (đỉnh 4 kW)',NULL,'Tay ga (1 cấp)','Điện (pin Li-ion)',NULL,'2.2 kWh/100km','1875 x 720 x 1082 mm',108,745,152,'3 năm hoặc 30000 km','Honda Việt Nam',1,0,0),
(121,'2024-01-01 00:00:00','<p>Yamaha Jupiter FI - xe số quen thuộc với người Việt với thiết kế gọn gàng, động cơ 113cc BluCore tiết kiệm nhiên liệu hàng đầu phân khúc.</p>','2024-01-01 00:00:00','Yamaha Jupiter FI',18400000,18400000,'YAMAHA-JUPITER-FI',1,0,1,31,NULL,'new',2024,0,'Yamaha','Xe số',0,'4 thì, SOHC, 2 van, BluCore',113,'6.0 kW / 8000 rpm','8.7 Nm / 6000 rpm','4 số','Phun xăng điện tử',4.2,'1.47 lít/100km','1880 x 695 x 1060 mm',99,763,141,'3 năm hoặc 30000 km','Yamaha Việt Nam',1,36,20),
(122,'2024-01-01 00:00:00','<p>Yamaha Jupiter Finn - phiên bản nâng cấp của Jupiter với động cơ BluCore thế hệ mới, thiết kế sang trọng và tính năng bảo vệ tự động tiên tiến.</p>','2024-01-01 00:00:00','Yamaha Jupiter Finn',20490000,20490000,'YAMAHA-JUPITER-FINN',1,0,1,31,NULL,'new',2024,0,'Yamaha','Xe số',1,'4 thì, SOHC, 2 van, BluCore',113,'6.0 kW / 8000 rpm','8.7 Nm / 6000 rpm','4 số tự động','Phun xăng điện tử',4.2,'1.47 lít/100km','1880 x 695 x 1060 mm',100,763,141,'3 năm hoặc 30000 km','Yamaha Việt Nam',1,36,20),
(123,'2024-01-01 00:00:00','<p>Yamaha NVX 155 VVA - xe tay ga thể thao với thiết kế hiệu suất cao, động cơ 155cc VVA cho cảm giác vận hành mạnh mẽ và tiết kiệm nhiên liệu.</p>','2024-01-01 00:00:00','Yamaha NVX 155 VVA',53900000,53900000,'YAMAHA-NVX-155-VVA',1,0,1,32,NULL,'new',2024,0,'Yamaha','Xe tay ga',0,'4 thì, SOHC, 4 van, VVA',155,'11.4 kW / 8000 rpm','14.0 Nm / 6000 rpm','Tay ga (CVT)','Phun xăng điện tử',5.4,'2.0 lít/100km','1940 x 680 x 1140 mm',127,790,150,'3 năm hoặc 30000 km','Yamaha Việt Nam',1,36,20),
(124,'2024-01-01 00:00:00','<p>Yamaha Janus 125 - xe tay ga phổ thông với thiết kế thanh lịch, động cơ 125cc tiết kiệm nhiên liệu và khoang chứa đồ lớn tiện lợi.</p>','2024-01-01 00:00:00','Yamaha Janus 125',30490000,30490000,'YAMAHA-JANUS-125',1,0,1,32,NULL,'new',2024,0,'Yamaha','Xe tay ga',0,'4 thì, SOHC, 4 van, BluCore',125,'7.0 kW / 8000 rpm','10.0 Nm / 6000 rpm','Tay ga (CVT)','Phun xăng điện tử',4.9,'1.85 lít/100km','1812 x 668 x 1120 mm',98,760,135,'3 năm hoặc 30000 km','Yamaha Việt Nam',1,36,20),
(125,'2024-01-01 00:00:00','<p>Yamaha Freego 125 - xe tay ga thông minh với hệ thống Y-Connect kết nối smartphone, thiết kế trẻ trung ấn tượng và tính năng Smart Key hiện đại.</p>','2024-01-01 00:00:00','Yamaha Freego 125',31490000,31490000,'YAMAHA-FREEGO-125',1,0,1,32,NULL,'new',2024,0,'Yamaha','Xe tay ga',1,'4 thì, SOHC, 4 van, BluCore',125,'7.3 kW / 8000 rpm','10.6 Nm / 6000 rpm','Tay ga (CVT)','Phun xăng điện tử',5.0,'1.85 lít/100km','1836 x 704 x 1149 mm',104,760,145,'3 năm hoặc 30000 km','Yamaha Việt Nam',1,36,20),
(126,'2024-01-01 00:00:00','<p>Yamaha Latte 125 - xe tay ga dành cho nữ với thiết kế nhẹ nhàng uyển chuyển, mâm xả phông thấp giữ xe dễ dàng và nhiều tính năng thông minh.</p>','2024-01-01 00:00:00','Yamaha Latte 125',39490000,39490000,'YAMAHA-LATTE-125',1,0,1,32,NULL,'new',2024,0,'Yamaha','Xe tay ga',1,'4 thì, SOHC, 4 van, BluCore',125,'7.0 kW / 8000 rpm','10.0 Nm / 6000 rpm','Tay ga (CVT)','Phun xăng điện tử',4.0,'1.85 lít/100km','1765 x 680 x 1090 mm',97,720,130,'3 năm hoặc 30000 km','Yamaha Việt Nam',1,36,20),
(127,'2024-01-01 00:00:00','<p>Yamaha MT-15 - naked bike thể thao với thiết kế MT-DNA hung hãn, động cơ 155cc VVA mạnh mẽ và hệ thống traction control cho cảm giác lái đỉnh cao.</p>','2024-01-01 00:00:00','Yamaha MT-15',71900000,71900000,'YAMAHA-MT15',1,0,1,33,NULL,'new',2024,0,'Yamaha','Xe côn tay',1,'4 thì, SOHC, 4 van, VVA, làm mát bằng nước',155,'13.6 kW / 10000 rpm','14.1 Nm / 7500 rpm','6 số','Phun xăng điện tử',10.0,'2.8 lít/100km','1930 x 800 x 1055 mm',139,810,160,'3 năm hoặc 30000 km','Yamaha Việt Nam',1,36,20),
(128,'2024-01-01 00:00:00','<p>Yamaha MT-03 - naked bike 2 xi-lanh mạnh mẽ với động cơ 321cc, thiết kế MT-DNA dữ dằn ấn tượng và thể tạo vận hành thể thao đỉnh cao.</p>','2024-01-01 00:00:00','Yamaha MT-03',115000000,115000000,'YAMAHA-MT03',1,0,1,33,NULL,'new',2024,0,'Yamaha','Xe côn tay',1,'4 thì, DOHC, 4 van, 2 xi-lanh song song, làm mát bằng nước',321,'31.0 kW / 10750 rpm','29.5 Nm / 9000 rpm','6 số','Phun xăng điện tử',14.0,'3.8 lít/100km','2005 x 740 x 1050 mm',168,780,145,'3 năm hoặc 30000 km','Yamaha Việt Nam',1,36,20),
(129,'2024-01-01 00:00:00','<p>Yamaha XSR155 - neo-retro sport với thiết kế cổ điển kết hợp hiệu suất hiện đại, động cơ 155cc VVA và khung kim cương chắc chắn cho trải nghiệm lái thú vị.</p>','2024-01-01 00:00:00','Yamaha XSR155',79900000,79900000,'YAMAHA-XSR155',1,0,1,33,NULL,'new',2024,0,'Yamaha','Xe côn tay',1,'4 thì, SOHC, 4 van, VVA, làm mát bằng nước',155,'13.6 kW / 10000 rpm','14.4 Nm / 8000 rpm','6 số','Phun xăng điện tử',10.0,'2.8 lít/100km','2000 x 800 x 1060 mm',134,810,160,'3 năm hoặc 30000 km','Yamaha Việt Nam',1,36,20),
(130,'2024-01-01 00:00:00','<p>Yamaha YZF-R15M - fullsport thừa hưởng DNA MotoGP, trang bị VVA, TCS và quickshifter, thể hiện tinh thần chiến binh đua trong phân khúc 150cc.</p>','2024-01-01 00:00:00','Yamaha YZF-R15M',90000000,90000000,'YAMAHA-R15M',1,0,1,33,NULL,'new',2024,0,'Yamaha','Xe côn tay',1,'4 thì, SOHC, 4 van, VVA, làm mát bằng nước',155,'13.6 kW / 10000 rpm','14.2 Nm / 8500 rpm','6 số','Phun xăng điện tử',11.0,'2.9 lít/100km','1990 x 720 x 1060 mm',142,815,170,'3 năm hoặc 30000 km','Yamaha Việt Nam',1,36,20),
(131,'2024-01-01 00:00:00','<p>SYM Angela 50 - xe tay ga phổ thông dành cho nữ với thiết kế nhẹ nhàng, gọn gàng, dễ đi trong nội thành, động cơ 50cc ổn định và tiết kiệm.</p>','2024-01-01 00:00:00','SYM Angela 50',11990000,11990000,'SYM-ANGELA-50',1,0,1,32,NULL,'new',2024,0,'SYM','Xe tay ga',0,'4 thì, 1 xi-lanh, làm mát bằng không khí',50,'2.2 kW / 7500 rpm','3.5 Nm / 6000 rpm','Tay ga (CVT)','Chế hòa khí',3.5,'1.4 lít/100km','1700 x 660 x 1055 mm',77,720,120,'1 năm hoặc 10000 km','SYM Việt Nam',0,0,0),
(132,'2024-01-01 00:00:00','<p>SYM Attila 50 - xe tay ga cổ điển với thiết kế sang trọng được yêu thích từ nhiều thế hệ, động cơ ổn định, dễ bảo trì và phù hợp sử dụng hàng ngày.</p>','2024-01-01 00:00:00','SYM Attila 50',12490000,12490000,'SYM-ATTILA-50',1,0,1,32,NULL,'new',2024,0,'SYM','Xe tay ga',0,'4 thì, 1 xi-lanh, làm mát bằng không khí',50,'2.2 kW / 7500 rpm','3.5 Nm / 6000 rpm','Tay ga (CVT)','Chế hòa khí',3.5,'1.4 lít/100km','1700 x 660 x 1055 mm',78,720,120,'1 năm hoặc 10000 km','SYM Việt Nam',0,0,0),
(133,'2024-01-01 00:00:00','<p>SYM Elegant 50 - xe tay ga 50cc phân khúc bình dân với thiết kế đơn giản, gọn nhẹ, dễ bảo trì và giá cả phải chăng, lựa chọn tốt cho học sinh.</p>','2024-01-01 00:00:00','SYM Elegant 50',10490000,10490000,'SYM-ELEGANT-50',1,0,1,32,NULL,'new',2024,0,'SYM','Xe tay ga',0,'4 thì, 1 xi-lanh, làm mát bằng không khí',50,'2.0 kW / 7000 rpm','3.2 Nm / 5500 rpm','Tay ga (CVT)','Chế hòa khí',3.5,'1.4 lít/100km','1690 x 640 x 1040 mm',74,715,120,'1 năm hoặc 10000 km','SYM Việt Nam',0,0,0),
(134,'2024-01-01 00:00:00','<p>SYM Elite 50 - xe tay ga 50cc thế hệ mới với thiết kế hiện đại, động cơ ổn định và nhiều màu sắc để lựa chọn, trang bị hộp số CVT tiện lợi.</p>','2024-01-01 00:00:00','SYM Elite 50',11490000,11490000,'SYM-ELITE-50',1,0,1,32,NULL,'new',2024,0,'SYM','Xe tay ga',0,'4 thì, 1 xi-lanh, làm mát bằng không khí',50,'2.2 kW / 7500 rpm','3.5 Nm / 6000 rpm','Tay ga (CVT)','Chế hòa khí',3.5,'1.4 lít/100km','1700 x 655 x 1050 mm',76,718,120,'1 năm hoặc 10000 km','SYM Việt Nam',0,0,0),
(135,'2024-01-01 00:00:00','<p>SYM Galaxy 50 - xe tay ga 50cc với thiết kế trẻ trung năng động, chất lượng tay ga SYM với giá cả hợp lý phù hợp cho học sinh sinh viên.</p>','2024-01-01 00:00:00','SYM Galaxy 50',12990000,12990000,'SYM-GALAXY-50',1,0,1,32,NULL,'new',2024,0,'SYM','Xe tay ga',0,'4 thì, 1 xi-lanh, làm mát bằng không khí',50,'2.2 kW / 7500 rpm','3.5 Nm / 6000 rpm','Tay ga (CVT)','Chế hòa khí',3.5,'1.4 lít/100km','1710 x 665 x 1060 mm',78,722,122,'1 năm hoặc 10000 km','SYM Việt Nam',0,0,0),
(136,'2024-01-01 00:00:00','<p>SYM Husky Classic 125 - xe số phong cách cổ điển độc đáo trong phân khúc 125cc, động cơ tiết kiệm nhiên liệu và thiết kế retro ấn tượng.</p>','2024-01-01 00:00:00','SYM Husky Classic 125',35000000,35000000,'SYM-HUSKY-CLASSIC-125',1,0,1,31,NULL,'new',2024,0,'SYM','Xe số',1,'4 thì, 1 xi-lanh, làm mát bằng không khí',125,'6.0 kW / 7000 rpm','9.0 Nm / 5500 rpm','5 số','Phun xăng điện tử',12.0,'2.0 lít/100km','2030 x 770 x 1080 mm',128,780,150,'2 năm hoặc 20000 km','SYM Việt Nam',1,36,20),
(137,'2024-01-01 00:00:00','<p>SYM Passing 50 - xe tay ga 50cc phổ thông với giá cả rẻ nhất phân khúc, dễ bảo trì và ổn định, lựa chọn kinh tế cho người đi làm hàng ngày.</p>','2024-01-01 00:00:00','SYM Passing 50',10990000,10990000,'SYM-PASSING-50',1,0,1,32,NULL,'new',2024,0,'SYM','Xe tay ga',0,'4 thì, 1 xi-lanh, làm mát bằng không khí',50,'2.0 kW / 7000 rpm','3.2 Nm / 5500 rpm','Tay ga (CVT)','Chế hòa khí',3.5,'1.4 lít/100km','1680 x 640 x 1040 mm',73,713,118,'1 năm hoặc 10000 km','SYM Việt Nam',0,0,0),
(138,'2024-01-01 00:00:00','<p>SYM Shark 50 - xe tay ga 50cc với thiết kế thể thao ấn tượng, động cơ ổn định và tỷ lệ giá trị tốt nhất trong dòng sản phẩm SYM 50cc.</p>','2024-01-01 00:00:00','SYM Shark 50',12490000,12490000,'SYM-SHARK-50',1,0,1,32,NULL,'new',2024,0,'SYM','Xe tay ga',0,'4 thì, 1 xi-lanh, làm mát bằng không khí',50,'2.2 kW / 7500 rpm','3.5 Nm / 6000 rpm','Tay ga (CVT)','Chế hòa khí',3.5,'1.4 lít/100km','1720 x 660 x 1060 mm',79,720,122,'1 năm hoặc 10000 km','SYM Việt Nam',0,0,0);

ALTER TABLE `product` AUTO_INCREMENT = 200;

-- ============================================================
-- VARIANT
-- ============================================================
INSERT INTO `variant` (`id`,`name`,`color_name`,`color_code`,`stock`,`sold`,`product_id`) VALUES
(1001,'Tiêu Chuẩn','Đỏ đen','#CC0000',50,0,101),
(1002,'Tiêu Chuẩn','Trắng đen','#F5F5F5',40,0,101),
(1003,'Tiêu Chuẩn','Xanh đen','#1A3A6B',30,0,101),
(1004,'Tiêu Chuẩn','Đen mờ','#2B2B2B',30,0,102),
(1005,'Cao Cấp','Trắng ngọc','#E8F5E9',25,0,102),
(1006,'Đặc Biệt','Đỏ đen','#CC0000',20,0,102),
(1007,'Tiêu Chuẩn','Đen nhám','#1C1C1C',25,0,103),
(1008,'Giới Hạn RC','Xanh trắng','#0047AB',15,0,103),
(1009,'Giới Hạn RC','Vàng đen','#FFD700',10,0,103),
(1010,'Tiêu Chuẩn','Hồng trắng','#FFB6C1',30,0,104),
(1011,'Tiêu Chuẩn','Xanh pastel','#B0E0E6',25,0,104),
(1012,'Cao Cấp','Trắng bạc','#F8F8FF',20,0,104),
(1013,'Tiêu Chuẩn','Đen đỏ','#1C1C1C',20,0,105),
(1014,'Tiêu Chuẩn','Trắng xanh','#FFFFFF',15,0,105),
(1015,'Bản Tiêu Chuẩn','Trắng ngọc','#ECEFF1',40,0,106),
(1016,'Bản Cao Cấp','Xanh dương','#1565C0',30,0,106),
(1017,'Bản Cao Cấp','Đen bóng','#212121',25,0,106);

ALTER TABLE `variant` AUTO_INCREMENT = 2000;

INSERT INTO `variant` (`name`,`color_name`,`color_code`,`stock`,`sold`,`product_id`) VALUES
('Tiêu Chuẩn','Đỏ đen','#CC0000',40,0,107),('Tiêu Chuẩn','Trắng đen','#F5F5F5',35,0,107),
('Tiêu Chuẩn','Xanh đen','#1A237E',40,0,108),('Tiêu Chuẩn','Đỏ đen','#B71C1C',35,0,108),
('Tiêu Chuẩn','Đỏ','#CC0000',20,0,109),('Tiêu Chuẩn','Đen','#212121',15,0,109),
('Tiêu Chuẩn','Đỏ đen','#CC0000',45,0,110),('Tiêu Chuẩn','Trắng đen','#F5F5F5',40,0,110),
('Tiêu Chuẩn','Trắng ngọc trai','#ECEFF1',50,0,111),('Tiêu Chuẩn','Đen','#212121',45,0,111),
('Thể Thao','Đỏ đen','#CC0000',35,0,112),('Tiêu Chuẩn','Trắng bạc','#F5F5F5',30,0,112),
('Đặc Biệt','Xanh xám','#546E7A',25,0,113),('Tiêu Chuẩn','Đen nhám','#212121',20,0,113),
('Tiêu Chuẩn','Trắng ngọc','#ECEFF1',25,0,114),('Đặc Biệt','Đen bóng','#212121',20,0,114),
('Tiêu Chuẩn','Trắng','#FFFFFF',20,0,115),('Đặc Biệt','Đỏ đen','#B71C1C',15,0,115),
('Tiêu Chuẩn','Đỏ đen','#CC0000',10,0,116),('Đặc Biệt','Xanh bạc','#78909C',8,0,116),
('Tiêu Chuẩn','Đen đỏ','#212121',30,0,117),('Thể Thao','Xanh đen','#1A237E',25,0,117),
('Tiêu Chuẩn','Đỏ đen','#CC0000',15,0,118),('Tiêu Chuẩn','Đen trắng','#212121',12,0,118),
('Tiêu Chuẩn','Xanh đen','#1A237E',8,0,119),('Tiêu Chuẩn','Đen','#212121',6,0,119),
('Bản Tiêu Chuẩn','Trắng ngọc trai','#ECEFF1',20,0,120),('Bản Cao Cấp','Xanh dương','#1565C0',15,0,120),
('Tiêu Chuẩn','Đỏ metallic','#CC0000',50,0,121),('Tiêu Chuẩn','Xanh đen','#1A237E',45,0,121),
('Tiêu Chuẩn','Đỏ metallic','#CC0000',40,0,122),('Premium','Vàng metallic','#FFD700',30,0,122),
('Tiêu Chuẩn','Đen nhám','#212121',30,0,123),('Đặc Biệt','Đỏ candy','#CC0000',25,0,123),
('Tiêu Chuẩn','Đen metallic','#212121',40,0,124),('Đặc Biệt','Đỏ metallic','#CC0000',35,0,124),
('Tiêu Chuẩn','Đỏ metallic','#CC0000',35,0,125),('Đặc Biệt','Đỏ nhám','#B71C1C',30,0,125),
('Tiêu Chuẩn','Xanh navy','#1A237E',30,0,126),('Giới Hạn','Xám đen','#546E7A',20,0,126),
('Tiêu Chuẩn','Đen','#212121',20,0,127),('Mẫu Mới','Xanh đen','#1A237E',15,0,127),
('Tiêu Chuẩn','Đen','#212121',10,0,128),('Fluo','Vàng xanh','#CDDC39',8,0,128),
('Tiêu Chuẩn','Đen metallic','#212121',15,0,129),('Tiêu Chuẩn','Xám bạc','#78909C',12,0,129),
('60th Anniversary','Trắng xanh','#FFFFFF',10,0,130),('Tiêu Chuẩn','Xanh đua','#1565C0',8,0,130),
('Tiêu Chuẩn','Trắng','#FFFFFF',50,0,131),('Tiêu Chuẩn','Hồng','#F48FB1',45,0,131),
('Tiêu Chuẩn','Trắng bạc','#ECEFF1',45,0,132),('Tiêu Chuẩn','Xanh ngọc','#B2EBF2',40,0,132),
('Tiêu Chuẩn','Trắng','#FFFFFF',50,0,133),('Tiêu Chuẩn','Xanh ngọc','#B2EBF2',45,0,133),
('Tiêu Chuẩn','Trắng','#FFFFFF',45,0,134),('Tiêu Chuẩn','Đỏ','#CC0000',40,0,134),
('Tiêu Chuẩn','Trắng bạc','#ECEFF1',45,0,135),('Tiêu Chuẩn','Xanh ngọc','#B2EBF2',40,0,135),
('Tiêu Chuẩn','Xám đen','#546E7A',20,0,136),('Tiêu Chuẩn','Nâu đen','#4E342E',15,0,136),
('Tiêu Chuẩn','Trắng','#FFFFFF',50,0,137),('Tiêu Chuẩn','Đỏ','#CC0000',45,0,137),
('Tiêu Chuẩn','Xám nhám','#9E9E9E',40,0,138),('Tiêu Chuẩn','Đen','#212121',35,0,138);

-- ============================================================
-- PRODUCT_IMAGE
-- ============================================================
INSERT INTO `product_image` (`id`,`url`,`product_id`) VALUES
(2001,'wave_alpha_1.jpg',101),(2002,'wave_alpha_2.jpg',101),
(2003,'air_blade_1.jpg',102),(2004,'air_blade_2.jpg',102),
(2005,'exciter_155_1.jpg',103),(2006,'exciter_155_2.jpg',103),
(2007,'grande_125_1.jpg',104),(2008,'grande_125_2.jpg',104),
(2009,'raider_150_1.jpg',105),(2010,'raider_150_2.jpg',105),
(2011,'vinfast_evo_1.jpg',106),(2012,'vinfast_evo_2.jpg',106);

ALTER TABLE `product_image` AUTO_INCREMENT = 3000;

INSERT INTO `product_image` (`url`,`product_id`) VALUES
('honda_wave_rsx_110.png',107),('honda_wave_rsx.webp',107),
('honda_future_125.jpeg',108),('honda_wave_alpha_110.webp',108),
('honda_super_cub_c125.png',109),('honda_super_cub_c125.png',109),
('honda_blade_2023.png',110),('honda_blade_2023.png',110),
('honda_vision.webp',111),('honda_vision_classic.png',111),
('honda_vario125.png',112),('honda_vario125.png',112),
('honda_vario160.webp',113),('honda_vario160.webp',113),
('honda_sh_mode_125.png',114),('honda_sh_mode_125.png',114),
('honda_sh160i.png',115),('honda_sh160i.png',115),
('honda_adv350.png',116),('honda_adv350.png',116),
('honda_winner_x.png',117),('honda_winner_x_2024.jpg',117),
('honda_cbr150r.png',118),('honda_cbr150r.png',118),
('honda_cb350_hness.webp',119),('honda_cb350_hness.webp',119),
('honda_cuv_e.webp',120),('honda_icon_e.webp',120),
('yamaha_jupiter_fi.png',121),('yamaha_jupiter_fi_mau_moi.png',121),
('yamaha_jupiter_finn_tieu_chuan.png',122),('yamaha_jupiter_finn_premium.png',122),
('yamaha_nvx155.png',123),('yamaha_nvx155_mau_moi.png',123),
('yamaha_janus_tieu_chuan.png',124),('yamaha_janus_dac_biet.png',124),
('yamaha_freego_tieu_chuan.png',125),('yamaha_freego_s_dac_biet.png',125),
('yamaha_latte_tieu_chuan.png',126),('yamaha_latte_gioi_han.png',126),
('yamaha_mt15.png',127),('yamaha_mt15_mau_moi.png',127),
('yamaha_mt03.png',128),('yamaha_mt03.png',128),
('yamaha_xsr155.png',129),('yamaha_xsr155.png',129),
('yamaha_r15m_60th.png',130),('yamaha_r15m_60th.png',130),
('sym_angela_50.png',131),('sym_angela_50_b.png',131),
('sym_attila_50.png',132),('sym_attila_50.png',132),
('sym_elegant_50.png',133),('sym_elegant_50.png',133),
('sym_elite_50.png',134),('sym_elite_50_b.png',134),
('sym_galaxy_50.png',135),('sym_galaxy_50_b.png',135),
('sym_husky_classic_125.png',136),('sym_husky_classic_125.png',136),
('sym_passing_50.png',137),('sym_passing_50.png',137),
('sym_shark_50.png',138),('sym_shark_50.png',138);

-- ============================================================
-- FOREIGN KEY CONSTRAINTS
-- ============================================================
ALTER TABLE `user_roles`
  ADD CONSTRAINT `FK55itppkw3i07do3h7qoclqd4k` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `FKrhfovtciq1l558cw6udg0h0d3` FOREIGN KEY (`role_id`)  REFERENCES `role` (`id`);
ALTER TABLE `company`
  ADD CONSTRAINT `FKdy4v2yb46hefqicjpyj7b7e4s` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);
ALTER TABLE `social_media`
  ADD CONSTRAINT `FKmm4qios9uovc7d2kj0i30jac1` FOREIGN KEY (`company_id`) REFERENCES `company` (`id`);
ALTER TABLE `policy`
  ADD CONSTRAINT `FKbnl9fs81c4g3twaab0djievh0` FOREIGN KEY (`category_policy_id`) REFERENCES `category_policy` (`category_policy_id`);
ALTER TABLE `policy_image`
  ADD CONSTRAINT `FKlahenqllhml78uy0gmx6ttji0` FOREIGN KEY (`policy_id`) REFERENCES `policy` (`policy_id`);
ALTER TABLE `category`
  ADD CONSTRAINT `FKs2ride9gvilxy2tcuv7witnxc` FOREIGN KEY (`parent_category_id`) REFERENCES `category` (`id`);
ALTER TABLE `banner`
  ADD CONSTRAINT `FK2evybotynuel3qb4r4tkqvjuh` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`);
ALTER TABLE `address`
  ADD CONSTRAINT `FKda8tuywtf0gb6sedwk7la1pgi` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);
ALTER TABLE `product`
  ADD CONSTRAINT `FK9n8if2ou1m5av8vdod3l9qx0x` FOREIGN KEY (`product_author_id`)   REFERENCES `user`     (`id`),
  ADD CONSTRAINT `FKid4vcfgj211k2uqjuex1x7xq0` FOREIGN KEY (`product_category_id`) REFERENCES `category` (`id`),
  ADD CONSTRAINT `FKi10av27oniox6yo7oqvjeim8y` FOREIGN KEY (`sale_id`)              REFERENCES `sales`    (`id`);
ALTER TABLE `color`
  ADD CONSTRAINT `FKsgsuxxoc1h5pskbjpch4id2ec` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`);
ALTER TABLE `size`
  ADD CONSTRAINT `FK8xjuqwpb5xlnn3978a9uhreor` FOREIGN KEY (`color_id`) REFERENCES `color` (`id`);
ALTER TABLE `product_image`
  ADD CONSTRAINT `FK6oo0cvcdtb6qmwsga468uuukk` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`);
ALTER TABLE `variant`
  ADD CONSTRAINT `fk_variant_product` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`) ON DELETE CASCADE;
ALTER TABLE `orders`
  ADD CONSTRAINT `FKel9kyl84ego2otj2accfd8mr7` FOREIGN KEY (`user_id`)    REFERENCES `user`    (`id`),
  ADD CONSTRAINT `FKf5464gxwc32ongdvka2rtvw96` FOREIGN KEY (`address_id`) REFERENCES `address` (`id`);
ALTER TABLE `order_item`
  ADD CONSTRAINT `FKt4dc2r9nbvbujrljv3e23iibt` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`);
ALTER TABLE `notifications`
  ADD CONSTRAINT `FK6og1jgdhfyqm6mk8v6a1qxias` FOREIGN KEY (`order_id`)   REFERENCES `orders`  (`id`),
  ADD CONSTRAINT `FKi82p618hfcc9vjj1tcl8n5hen` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`);
ALTER TABLE `article`
  ADD CONSTRAINT `FKbc2qerk3l47javnl2yvn51uoi` FOREIGN KEY (`user_id`)     REFERENCES `user`     (`id`),
  ADD CONSTRAINT `FKy5kkohbk00g0w88fi05k2hcw`  FOREIGN KEY (`category_id`) REFERENCES `category` (`id`);
ALTER TABLE `article_image`
  ADD CONSTRAINT `FKt3rm1gwoysmll8kpy7lt1vpwc` FOREIGN KEY (`article_id`) REFERENCES `article` (`id`);

SET FOREIGN_KEY_CHECKS = 1;
COMMIT;

-- ============================================================
-- XONG! Database motorbike_shop da san sang.
-- 21 bang | 38 san pham xe may | 3 tai khoan (mat khau: 123456)
-- ============================================================
