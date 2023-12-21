
DROP TABLE IF EXISTS `administrators`;
CREATE TABLE `administrators` (
  `administrator_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `first_name` varchar(20) NOT NULL,
  `last_name` varchar(20) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(20) NOT NULL,
  PRIMARY KEY (`administrator_id`),
  UNIQUE KEY `administrators_email_unique` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;




DROP TABLE IF EXISTS `categories`;
CREATE TABLE `categories` (
  `category_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(15) NOT NULL,
  `category_image_id` bigint NOT NULL,
  PRIMARY KEY (`category_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;



DROP TABLE IF EXISTS `clients`;
CREATE TABLE `clients` (
  `client_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `first_name` varchar(20) NOT NULL,
  `last_name` varchar(20) NOT NULL,
  `email` varchar(20) NOT NULL,
  `password` varchar(20) NOT NULL,
  `city` varchar(10) DEFAULT NULL,
  `street` varchar(10) DEFAULT NULL,
  `building_number` bigint DEFAULT NULL,
  PRIMARY KEY (`client_id`),
  UNIQUE KEY `clients_email_unique` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `images`;
CREATE TABLE `images` (
  `image_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `category_id` bigint NOT NULL,
  `client_id` bigint DEFAULT NULL,
  `src` varchar(255) NOT NULL,
  PRIMARY KEY (`image_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `invoices`;
CREATE TABLE `invoices` (
  `invoice_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `order_id` bigint NOT NULL,
  `amount` decimal(8,2) NOT NULL,
  `payment_method_id` bigint NOT NULL,
  PRIMARY KEY (`invoice_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `orders`;
CREATE TABLE `orders` (
  `order_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `client_id` bigint NOT NULL,
  `order_date` datetime NOT NULL,
  `action_date` datetime NOT NULL,
  `time` varchar(100) NOT NULL,
  `price` decimal(8,2) NOT NULL,
  `remarks` varchar(255) NOT NULL,
  `status` varchar(10) NOT NULL,
  PRIMARY KEY (`order_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;



DROP TABLE IF EXISTS `payment_methods`;
CREATE TABLE `payment_methods` (
  `payment_methods_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` bigint NOT NULL,
  PRIMARY KEY (`payment_methods_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;



DROP TABLE IF EXISTS `payments`;
CREATE TABLE `payments` (
  `payment_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `invoice_id` bigint NOT NULL,
  `payment_method_id` bigint NOT NULL,
  `amount` bigint NOT NULL,
  `cancelled` tinyint DEFAULT NULL,
  PRIMARY KEY (`payment_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `contact_me`;
CREATE TABLE `contact_me` (
  `contact_me_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `phone_number` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `message` varchar(45) NOT NULL,
  `status` tinyint NOT NULL,
  PRIMARY KEY (`contact_me_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;



ALTER TABLE
    `payment_methods` ADD PRIMARY KEY `payment_methods_payment_methods_id_primary`(`payment_methods_id`);
ALTER TABLE
    `orders` ADD CONSTRAINT `orders_client_id_foreign` FOREIGN KEY(`client_id`) REFERENCES `clients`(`client_id`);
ALTER TABLE
    `payments` ADD CONSTRAINT `payments_payment_method_id_foreign` FOREIGN KEY(`payment_method_id`) REFERENCES `payment_methods`(`payment_methods_id`);
ALTER TABLE
    `payments` ADD CONSTRAINT `payments_invoice_id_foreign` FOREIGN KEY(`invoice_id`) REFERENCES `invoices`(`invoice_id`);
ALTER TABLE
    `invoices` ADD CONSTRAINT `invoices_order_id_foreign` FOREIGN KEY(`order_id`) REFERENCES `orders`(`order_id`);
ALTER TABLE
    `images` ADD CONSTRAINT `images_image_id_foreign` FOREIGN KEY(`image_id`) REFERENCES `categories`(`category_id`);