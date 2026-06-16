-- =============================================================
--  MotoShop — Database Schema
--  File : db/01_schema.sql
--  Mục đích : Tạo toàn bộ bảng nếu chưa tồn tại.
--             Chạy file này TRƯỚC file 02_data.sql.
--
--  ⚠️  LƯU Ý QUAN TRỌNG VỀ ENCODING:
--  File này chứa ký tự UTF-8. KHÔNG dùng PowerShell pipe (|)
--  vì PowerShell tự động convert sang mã hóa console (CP437/CP1252)
--  làm hỏng tiếng Việt. Hãy dùng CMD redirect (<) như hướng dẫn bên dưới.
--
--  Cách dùng ĐÚNG:
--    CMD (Windows - khuyên dùng):
--      cmd /c "docker exec -i -e MYSQL_PWD=123456 motorbike-shop-mysql mysql -u root --default-character-set=utf8mb4 motorbike_shop < db\01_schema.sql"
--
--    Linux / macOS:
--      docker exec -i -e MYSQL_PWD=123456 motorbike-shop-mysql mysql -u root --default-character-set=utf8mb4 motorbike_shop < db/01_schema.sql
--
--  Cách dùng SAI (gây lỗi font chữ):
--    ❌ Get-Content .\db\01_schema.sql | docker exec -i ... mysql ...
-- =============================================================

SET FOREIGN_KEY_CHECKS = 0;
SET NAMES utf8mb4;

-- -------------------------------------------------------------
-- 1. role
-- -------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `role` (
    `id`   BIGINT       NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -------------------------------------------------------------
-- 2. user
-- -------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `user` (
    `id`                 BIGINT       NOT NULL AUTO_INCREMENT,
    `username`           VARCHAR(255) NOT NULL,
    `password`           VARCHAR(255) NOT NULL,
    `email`              VARCHAR(255) NULL,
    `otp`                VARCHAR(255) NULL,
    `otp_generated_time` DATETIME(6)  NULL,
    `first_name`         VARCHAR(255) NULL,
    `last_name`          VARCHAR(255) NULL,
    `phone`              VARCHAR(255) NULL,
    `status`             INT          NOT NULL DEFAULT 0,
    `created_date`       DATETIME(6)  NULL,
    `modified_date`      DATETIME(6)  NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `uk_user_username` (`username`),
    UNIQUE KEY `uk_user_email`    (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -------------------------------------------------------------
-- 3. user_roles  (join table @ManyToMany User ↔ Role)
-- -------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `user_roles` (
    `user_id` BIGINT NOT NULL,
    `role_id` BIGINT NOT NULL,
    PRIMARY KEY (`user_id`, `role_id`),
    CONSTRAINT `fk_ur_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
    CONSTRAINT `fk_ur_role` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -------------------------------------------------------------
-- 4. address
-- -------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `address` (
    `id`             BIGINT       NOT NULL AUTO_INCREMENT,
    `first_name`     VARCHAR(255) NULL,
    `last_name`      VARCHAR(255) NULL,
    `phone`          VARCHAR(255) NULL,
    `address_detail` VARCHAR(255) NULL,
    `province`       VARCHAR(255) NULL,
    `district`       VARCHAR(255) NULL,
    `wards`          VARCHAR(255) NULL,
    `created_date`   DATETIME(6)  NULL,
    `modified_date`  DATETIME(6)  NULL,
    `focus`          INT          NULL DEFAULT 0,
    `status`         INT          NULL DEFAULT 1,
    `user_id`        BIGINT       NULL,
    PRIMARY KEY (`id`),
    CONSTRAINT `fk_address_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- -------------------------------------------------------------
-- 5. category
-- -------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `category` (
    `id`                 BIGINT       NOT NULL AUTO_INCREMENT,
    `title`              VARCHAR(255) NOT NULL,
    `description`        VARCHAR(255) NULL,
    `url_image`          VARCHAR(255) NULL,
    `type`               INT          NULL DEFAULT 0,
    `status`             INT          NOT NULL DEFAULT 1,
    `created_date`       DATETIME(6)  NULL,
    `modified_date`      DATETIME(6)  NULL,
    `parent_category_id` BIGINT       NULL,
    PRIMARY KEY (`id`),
    CONSTRAINT `fk_category_parent` FOREIGN KEY (`parent_category_id`) REFERENCES `category` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -------------------------------------------------------------
-- 6. sales
-- -------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `sales` (
    `id`            BIGINT       NOT NULL AUTO_INCREMENT,
    `name`          VARCHAR(255) NULL,
    `discount`      INT          NULL,
    `start_date`    DATETIME(6)  NULL,
    `end_date`      DATETIME(6)  NULL,
    `is_active`     INT          NULL DEFAULT 0,
    `created_date`  DATETIME(6)  NULL,
    `modified_date` DATETIME(6)  NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -------------------------------------------------------------
-- 7. product
-- -------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `product` (
    `id`                   BIGINT        NOT NULL AUTO_INCREMENT,
    `name`                 VARCHAR(255)  NULL,
    `description`          TEXT          NULL,
    `sku`                  VARCHAR(255)  NULL,
    `vehicle_condition`    VARCHAR(10)   NULL DEFAULT 'new',
    `manufacturing_year`   INT           NULL,
    `mileage`              INT           NULL DEFAULT 0,
    -- Thông số kỹ thuật
    `brand`                VARCHAR(100)  NULL,
    `vehicle_type`         VARCHAR(50)   NULL,
    `engine_type`          VARCHAR(100)  NULL,
    `displacement`         INT           NULL,
    `max_power`            VARCHAR(50)   NULL,
    `max_torque`           VARCHAR(50)   NULL,
    `transmission`         VARCHAR(50)   NULL,
    `fuel_system`          VARCHAR(100)  NULL,
    `fuel_capacity`        DOUBLE        NULL,
    `fuel_consumption`     VARCHAR(50)   NULL,
    `dimensions`           VARCHAR(100)  NULL,
    `weight`               INT           NULL,
    `seat_height`          INT           NULL,
    `ground_clearance`     INT           NULL,
    `warranty_info`        VARCHAR(100)  NULL,
    `origin`               VARCHAR(100)  NULL,
    -- Trả góp
    `installment_supported` BOOLEAN      NULL DEFAULT FALSE,
    `installment_months`    INT          NULL DEFAULT 36,
    `down_payment_percent`  INT          NULL DEFAULT 20,
    -- Trạng thái & giá
    `is_new`               BOOLEAN       NULL DEFAULT FALSE,
    `visited`              INT           NULL DEFAULT 0,
    `price`                INT           NULL DEFAULT 0,
    `sale_price`           INT           NULL DEFAULT 0,
    `status`               INT           NULL DEFAULT 1,
    `created_date`         DATETIME(6)   NULL,
    `modified_date`        DATETIME(6)   NULL,
    -- Khóa ngoại
    `product_author_id`    BIGINT        NULL,
    `product_category_id`  BIGINT        NULL,
    `sale_id`              BIGINT        NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `uk_product_name` (`name`),
    CONSTRAINT `fk_product_author`   FOREIGN KEY (`product_author_id`)   REFERENCES `user`     (`id`),
    CONSTRAINT `fk_product_category` FOREIGN KEY (`product_category_id`) REFERENCES `category` (`id`),
    CONSTRAINT `fk_product_sale`     FOREIGN KEY (`sale_id`)             REFERENCES `sales`    (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -------------------------------------------------------------
-- 8. variant
-- -------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `variant` (
    `id`         BIGINT       NOT NULL AUTO_INCREMENT,
    `name`       VARCHAR(100) NOT NULL,
    `color_name` VARCHAR(100) NULL,
    `color_code` VARCHAR(20)  NULL,
    `stock`      INT          NOT NULL DEFAULT 0,
    `sold`       INT          NOT NULL DEFAULT 0,
    `product_id` BIGINT       NOT NULL,
    PRIMARY KEY (`id`),
    CONSTRAINT `fk_variant_product` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -------------------------------------------------------------
-- 9. product_image
-- -------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `product_image` (
    `id`         BIGINT       NOT NULL AUTO_INCREMENT,
    `url`        VARCHAR(255) NULL,
    `product_id` BIGINT       NULL,
    PRIMARY KEY (`id`),
    CONSTRAINT `fk_product_image_product` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -------------------------------------------------------------
-- 10. banner
-- -------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `banner` (
    `id`            BIGINT       NOT NULL AUTO_INCREMENT,
    `name`          VARCHAR(255) NOT NULL,
    `src`           VARCHAR(255) NULL,
    `status`        INT          NOT NULL DEFAULT 1,
    `created_date`  DATETIME(6)  NULL,
    `modified_date` DATETIME(6)  NULL,
    `category_id`   BIGINT       NULL,
    PRIMARY KEY (`id`),
    CONSTRAINT `fk_banner_category` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -------------------------------------------------------------
-- 11. article
-- -------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `article` (
    `id`            BIGINT       NOT NULL AUTO_INCREMENT,
    `title`         VARCHAR(255) NULL,
    `short_content` TEXT         NULL,
    `content`       TEXT         NULL,
    `author`        VARCHAR(255) NULL,
    `image`         VARCHAR(255) NULL,
    `status`        INT          NULL DEFAULT 1,
    `created_date`  DATETIME(6)  NULL,
    `modified_date` DATETIME(6)  NULL,
    `user_id`       BIGINT       NULL,
    `category_id`   BIGINT       NULL,
    PRIMARY KEY (`id`),
    CONSTRAINT `fk_article_user`     FOREIGN KEY (`user_id`)     REFERENCES `user`     (`id`),
    CONSTRAINT `fk_article_category` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -------------------------------------------------------------
-- 12. article_image
-- -------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `article_image` (
    `id`         INT          NOT NULL AUTO_INCREMENT,
    `url`        VARCHAR(255) NULL,
    `article_id` BIGINT       NULL,
    PRIMARY KEY (`id`),
    CONSTRAINT `fk_article_image_article` FOREIGN KEY (`article_id`) REFERENCES `article` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -------------------------------------------------------------
-- 13. orders
-- -------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `orders` (
    `id`             BIGINT       NOT NULL AUTO_INCREMENT,
    `code_orders`    VARCHAR(255) NULL,
    `user_name_emp`  VARCHAR(255) NULL,
    `full_name`      VARCHAR(255) NULL,
    `phone`          VARCHAR(255) NULL,
    `note`           VARCHAR(255) NULL,
    `shipping_fee`   INT          NULL DEFAULT 0,
    `address_detail` VARCHAR(255) NULL,
    `province`       VARCHAR(255) NULL,
    `district`       VARCHAR(255) NULL,
    `wards`          VARCHAR(255) NULL,
    `type`           INT          NULL DEFAULT 1,
    `is_checkout`    BIT(1)       NULL,
    `payment_method` VARCHAR(255) NULL,
    `status`         INT          NULL DEFAULT 1,
    `ship_date`      DATETIME(6)  NULL,
    `order_date`     DATETIME(6)  NULL,
    `create_date`    DATETIME(6)  NULL,
    `modified_date`  DATETIME(6)  NULL,
    `user_id`        BIGINT       NULL,
    `address_id`     BIGINT       NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `uk_orders_code` (`code_orders`),
    CONSTRAINT `fk_orders_user`    FOREIGN KEY (`user_id`)    REFERENCES `user`    (`id`),
    CONSTRAINT `fk_orders_address` FOREIGN KEY (`address_id`) REFERENCES `address` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -------------------------------------------------------------
-- 14. order_item
-- -------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `order_item` (
    `id`           BIGINT       NOT NULL AUTO_INCREMENT,
    `quantity`     INT          NULL DEFAULT 1,
    `sell_price`   INT          NULL DEFAULT 0,
    `product_name` VARCHAR(255) NULL,
    `value_color`  VARCHAR(255) NULL,
    `value_size`   VARCHAR(255) NULL,
    `variant_id`   BIGINT       NULL,
    `order_id`     BIGINT       NULL,
    PRIMARY KEY (`id`),
    CONSTRAINT `fk_order_item_orders` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -------------------------------------------------------------
-- 15. notifications
-- -------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `notifications` (
    `id`             BIGINT   NOT NULL AUTO_INCREMENT,
    `content`        VARCHAR(255) NULL,
    `is_read`        BIT(1)       NULL,
    `deliver_status` BIT(1)       NULL,
    `type`           INT          NULL DEFAULT 1,
    `order_id`       BIGINT       NULL,
    `product_id`     BIGINT       NULL,
    PRIMARY KEY (`id`),
    CONSTRAINT `fk_notif_orders`  FOREIGN KEY (`order_id`)   REFERENCES `orders`  (`id`),
    CONSTRAINT `fk_notif_product` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -------------------------------------------------------------
-- 16. company
-- -------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `company` (
    `id`            BIGINT       NOT NULL AUTO_INCREMENT,
    `name`          VARCHAR(255) NULL,
    `phone_cskh`    VARCHAR(255) NULL,
    `phone`         VARCHAR(255) NULL,
    `tax_code`      VARCHAR(255) NULL,
    `tax_date`      VARCHAR(255) NULL,
    `tax_location`  VARCHAR(255) NULL,
    `address`       VARCHAR(255) NULL,
    `status`        INT          NULL DEFAULT 1,
    `created_date`  DATETIME(6)  NULL,
    `modified_date` DATETIME(6)  NULL,
    `user_id`       BIGINT       NULL,
    PRIMARY KEY (`id`),
    CONSTRAINT `fk_company_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -------------------------------------------------------------
-- 17. social_media
-- -------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `social_media` (
    `id`         BIGINT       NOT NULL AUTO_INCREMENT,
    `name`       VARCHAR(255) NULL,
    `url`        VARCHAR(255) NULL,
    `company_id` BIGINT       NULL,
    PRIMARY KEY (`id`),
    CONSTRAINT `fk_social_media_company` FOREIGN KEY (`company_id`) REFERENCES `company` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- NOTE: category_policy, policy, policy_image đã bị xóa (không có data, không có API endpoint)

-- -------------------------------------------------------------
-- 21. consult_request
-- -------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `consult_request` (
    `id`           BIGINT        NOT NULL AUTO_INCREMENT,
    `full_name`    VARCHAR(255)  NOT NULL,
    `phone`        VARCHAR(255)  NOT NULL,
    `email`        VARCHAR(255)  NULL,
    `note`         VARCHAR(1000) NULL,
    `product_id`   BIGINT        NULL,
    `product_name` VARCHAR(255)  NULL,
    `status`       INT           NOT NULL DEFAULT 0,
    `staff_note`   VARCHAR(2000) NULL,
    `created_date` DATETIME(6)   NULL,
    `updated_date` DATETIME(6)   NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -------------------------------------------------------------
-- 22. product_comment
-- -------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `product_comment` (
    `id`           BIGINT NOT NULL AUTO_INCREMENT,
    `product_id`   BIGINT NOT NULL,
    `user_id`      BIGINT NOT NULL,
    `rating`       INT    NOT NULL,
    `content`      TEXT   NULL,
    `created_date` DATETIME(6) NULL,
    PRIMARY KEY (`id`),
    CONSTRAINT `fk_comment_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -------------------------------------------------------------
SET FOREIGN_KEY_CHECKS = 1;
-- =============================================================
--  Hoàn tất tạo schema.
--  Bước tiếp theo: chạy db/02_data.sql để import dữ liệu mẫu.
-- =============================================================
