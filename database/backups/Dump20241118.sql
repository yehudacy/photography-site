CREATE DATABASE  IF NOT EXISTS `photography_site` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `photography_site`;
-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: photography_site
-- ------------------------------------------------------
-- Server version	8.0.36

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `administrators`
--

DROP TABLE IF EXISTS `administrators`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `administrators` (
  `administrator_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `first_name` varchar(20) NOT NULL,
  `last_name` varchar(20) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(20) NOT NULL,
  `city` varchar(10) DEFAULT NULL,
  `street` varchar(10) DEFAULT NULL,
  `building_number` bigint DEFAULT NULL,
  PRIMARY KEY (`administrator_id`),
  UNIQUE KEY `administrators_email_unique` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `administrators`
--

LOCK TABLES `administrators` WRITE;
/*!40000 ALTER TABLE `administrators` DISABLE KEYS */;
INSERT INTO `administrators` VALUES (1,'Yehuda','cywiak','yc0527183008@gmail.com','demoyc@123456',NULL,NULL,NULL);
/*!40000 ALTER TABLE `administrators` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `category_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `category_image_id` bigint NOT NULL,
  PRIMARY KEY (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Product',41),(2,'new_born',52),(3,'hats',72),(4,'coffee',70),(5,'honey',56),(6,'View',67),(7,'Mushrooms',58),(8,'fern',59),(44,'Architecture and interior design',61);
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `clients`
--

DROP TABLE IF EXISTS `clients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clients` (
  `client_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `first_name` varchar(20) NOT NULL,
  `last_name` varchar(20) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `city` varchar(20) DEFAULT NULL,
  `street` varchar(20) DEFAULT NULL,
  `building_number` bigint DEFAULT NULL,
  PRIMARY KEY (`client_id`),
  UNIQUE KEY `clients_email_unique` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clients`
--

LOCK TABLES `clients` WRITE;
/*!40000 ALTER TABLE `clients` DISABLE KEYS */;
INSERT INTO `clients` VALUES (1,'ester','cywiak','ecy4959@gmail.com','demoecy@123456','Bnei brak','beeri',17),(3,'David','Whatever','da@gmail.com','Demoda@123456','Jerusalem','GivatMoshe',9),(5,'Some','Name','sn@gmail.com','Semosn@123456',NULL,NULL,NULL),(11,'Some1','Name1','sn1@gmail.com','Semosn1@123456',NULL,NULL,NULL),(12,'erty','uytr','sdf@gmail.com','demo@123456',NULL,NULL,NULL),(13,'dfszr','Whatever','frfdsdsdd','Sjdsfkg@mhxvfjkvhlx',NULL,NULL,NULL),(14,'tretdrte','rwresfed','dsfddsfdd','Dhfhdh@jhdh',NULL,NULL,NULL),(15,'dfg','dfgj','vnccvh','Wssdd@cdxvf',NULL,NULL,NULL),(16,'bdxhth','hfxhgbc','fdgfg@mvcfj,','Yuio@1234',NULL,NULL,NULL),(17,'asdfg','bcgbcbc','hvfkjdh','vEbvnbdbvfb',NULL,NULL,NULL);
/*!40000 ALTER TABLE `clients` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contact_me`
--

DROP TABLE IF EXISTS `contact_me`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contact_me` (
  `contact_me_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `phone_number` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `message` varchar(45) NOT NULL,
  `status` tinyint NOT NULL,
  PRIMARY KEY (`contact_me_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contact_me`
--

LOCK TABLES `contact_me` WRITE;
/*!40000 ALTER TABLE `contact_me` DISABLE KEYS */;
INSERT INTO `contact_me` VALUES (1,'ester','0583204959','ecy4959@gmail.com','I want to talk to you now!',0),(7,'Moshe','0538762345','m2345@gmail.com','Please call me back!',0),(8,'David','0549874567','d4567@gmail.com','Iwant a special packge  please contact me.',0);
/*!40000 ALTER TABLE `contact_me` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `images`
--

DROP TABLE IF EXISTS `images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `images` (
  `image_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `category_id` bigint NOT NULL,
  `client_id` bigint DEFAULT NULL,
  `src` varchar(255) NOT NULL,
  `cloud_public_id` varchar(255) NOT NULL,
  PRIMARY KEY (`image_id`)
) ENGINE=InnoDB AUTO_INCREMENT=75 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `images`
--

LOCK TABLES `images` WRITE;
/*!40000 ALTER TABLE `images` DISABLE KEYS */;
INSERT INTO `images` VALUES (2,10,1,'https://res.cloudinary.com/dzjsaikk1/image/upload/v1724766511/6ecgn98m0chg4ibScreenshot%202024-08-18%20152215.png.png',''),(3,4,1,'https://res.cloudinary.com/dzjsaikk1/image/upload/v1728298544/6ecg6z0m1ywbv60Screenshot%20bug.png.png',''),(4,4,NULL,'https://res.cloudinary.com/dzjsaikk1/image/upload/v1730128802/6ecg8nkm2t60lroScreenshot%20bug.png.png',''),(5,6,NULL,'https://res.cloudinary.com/dzjsaikk1/image/upload/v1730218248/6ecgca8m2un9ro1Screenshot%20befor%20bug.png.png',''),(7,7,NULL,'https://res.cloudinary.com/dzjsaikk1/image/upload/v1730239227/6ecg6lkm2uzrea8Screenshot%202024-06-10%20183337.png.png',''),(13,26,NULL,'https://res.cloudinary.com/dzjsaikk1/image/upload/v1730300268/6ecgazom2w03r97Screenshot%202024-08-09%20at%2012.52.17.png.png',''),(14,27,NULL,'https://res.cloudinary.com/dzjsaikk1/image/upload/v1730300370/6ecg8a0m2w05xufScreenshot%202024-08-09%20at%2012.52.17.png.png',''),(16,29,NULL,'https://res.cloudinary.com/dzjsaikk1/image/upload/v1730300877/6ecgcx0m2w0gspmflow%20chart%20Pwiz%20items%20to%20sprint.png.png',''),(17,30,NULL,'https://res.cloudinary.com/dzjsaikk1/image/upload/v1730301040/6ecg14cm2w0kab9flow%20chart%20Pwiz%20items%20to%20sprint.png.png',''),(18,31,NULL,'https://res.cloudinary.com/dzjsaikk1/image/upload/v1730301080/6ecg14cm2w0l5niflow%20chart%20Pwiz%20items%20to%20sprint.png.png',''),(19,32,NULL,'https://res.cloudinary.com/dzjsaikk1/image/upload/v1730301088/6ecg14cm2w0lbdtflow%20chart%20Pwiz%20items%20to%20sprint.png.png',''),(20,33,NULL,'https://res.cloudinary.com/dzjsaikk1/image/upload/v1730301809/6ecg14cm2w10s92Screenshot%202024-09-10%20135604.png.png',''),(21,34,NULL,'https://res.cloudinary.com/dzjsaikk1/image/upload/v1730301856/6ecg14cm2w11rt2flow%20chart%20Pwiz%20items%20to%20sprint.png.png',''),(22,35,NULL,'https://res.cloudinary.com/dzjsaikk1/image/upload/v1730301898/6ecg14cm2w12ofbflow%20chart%20Pwiz%20items%20to%20sprint.png.png',''),(23,36,NULL,'https://res.cloudinary.com/dzjsaikk1/image/upload/v1730302005/6ecg14cm2w14zuuScreenshot%202024-08-09%20at%2012.52.17.png.png',''),(24,37,NULL,'https://res.cloudinary.com/dzjsaikk1/image/upload/v1730302078/6ecg14cm2w16j7bsequence2.png.png',''),(25,38,NULL,'https://res.cloudinary.com/dzjsaikk1/image/upload/v1730302177/6ecg14gm2w18obiScreenshot%202024-08-26%20175826.png.png',''),(26,39,NULL,'https://res.cloudinary.com/dzjsaikk1/image/upload/v1730302579/6ecg14gm2w1habfScreenshot%202024-08-26%20175826.png.png',''),(27,40,NULL,'https://res.cloudinary.com/dzjsaikk1/image/upload/v1730302957/6ecg14gm2w1pedqScreenshot%202024-09-10%20135604.png.png',''),(28,41,NULL,'https://res.cloudinary.com/dzjsaikk1/image/upload/v1730303032/6ecg14gm2w1qznrERD.drawio.png.png',''),(40,1,NULL,'https://res.cloudinary.com/dzjsaikk1/image/upload/v1730389000/6ecgdscm2xgxlazScreenshot%202024-08-09%20at%2012.52.17.png.png',''),(41,1,NULL,'https://res.cloudinary.com/dzjsaikk1/image/upload/v1730389068/6ecgby0m2xgz1jzsequence2.png.png',''),(42,41,NULL,'https://res.cloudinary.com/dzjsaikk1/image/upload/v1730303032/6ecg14gm2w1qznrERD.drawio.png.png',''),(43,10,NULL,'https://res.cloudinary.com/dzjsaikk1/image/upload/v1724766511/6ecgn98m0chg4ibScreenshot%202024-08-18%20152215.png.png',''),(44,10,NULL,'https://res.cloudinary.com/dzjsaikk1/image/upload/v1730391223/6ecgdkkm2xi98hoScreenshot%202024-08-26%20175826.png.png',''),(45,9,NULL,'https://res.cloudinary.com/dzjsaikk1/image/upload/v1730239227/6ecg6lkm2uzrea8Screenshot%202024-06-10%20183337.png.png',''),(46,42,NULL,'https://res.cloudinary.com/dzjsaikk1/image/upload/v1730808476/6ecg4kwm34eofnaScreenshot%202024-09-10%20135604.png.png',''),(47,42,NULL,'https://res.cloudinary.com/dzjsaikk1/image/upload/v1730808493/6ecg4kwm34eosm8flow%20chart%20Pwiz%20items%20to%20sprint.png.png',''),(48,43,NULL,'https://res.cloudinary.com/dzjsaikk1/image/upload/v1730808865/6ecgchom34ewrs5197355_tumb_800X480.jpg.jpg',''),(49,43,NULL,'https://res.cloudinary.com/dzjsaikk1/image/upload/v1730808895/6ecgchom34exf8r197362_tumb_800X480.jpg.jpg',''),(50,1,NULL,'https://res.cloudinary.com/dzjsaikk1/image/upload/v1730808978/6ecgchom34ez74t197327_tumb_800X480.jpg.jpg',''),(51,2,NULL,'https://res.cloudinary.com/dzjsaikk1/image/upload/v1730812365/6ecgep8m34gzsaz197327_tumb_800X480.jpg.jpg',''),(52,2,NULL,'https://res.cloudinary.com/dzjsaikk1/image/upload/v1731497321/6ecgep8m3fssrdhpic%201.webp.webp',''),(53,3,NULL,'https://res.cloudinary.com/dzjsaikk1/image/upload/v1731497354/6ecgep8m3fstgrjpic%202.webp.webp',''),(54,4,NULL,'https://res.cloudinary.com/dzjsaikk1/image/upload/v1731497370/6ecgep8m3fstt7spic%203.webp.webp',''),(55,3,NULL,'https://res.cloudinary.com/dzjsaikk1/image/upload/v1731497381/6ecgep8m3fsu1k8pic%202.webp.webp',''),(56,5,NULL,'https://res.cloudinary.com/dzjsaikk1/image/upload/v1731497400/6ecgep8m3fsughipic%205.webp.webp',''),(57,6,NULL,'https://res.cloudinary.com/dzjsaikk1/image/upload/v1731497412/6ecgep8m3fsupnspic%206.webp.webp',''),(58,7,NULL,'https://res.cloudinary.com/dzjsaikk1/image/upload/v1731497467/6ecgep8m3fsvvhxpic%207.webp.webp',''),(59,8,NULL,'https://res.cloudinary.com/dzjsaikk1/image/upload/v1731497494/6ecgep8m3fswgu8pic%206.webp.webp',''),(60,44,NULL,'https://res.cloudinary.com/dzjsaikk1/image/upload/v1731498118/6ecgep8m3ft9txcpic%2011.jpg.jpg',''),(61,44,NULL,'https://res.cloudinary.com/dzjsaikk1/image/upload/v1731498159/6ecgep8m3ftapvopic%2012.jpg.jpg',''),(62,44,NULL,'https://res.cloudinary.com/dzjsaikk1/image/upload/v1731498177/6ecgep8m3ftb47bpic%2013.jpg.jpg',''),(63,44,NULL,'https://res.cloudinary.com/dzjsaikk1/image/upload/v1731498177/6ecgep8m3ftb47bpic%2013.jpg.jpg',''),(64,6,NULL,'https://res.cloudinary.com/dzjsaikk1/image/upload/v1731497412/6ecgep8m3fsupnspic%206.webp.webp',''),(66,1,NULL,'https://res.cloudinary.com/dzjsaikk1/image/upload/v1731498734/6ecgep8m3ftn1d3pic14.jpg.jpg',''),(68,7,NULL,'https://res.cloudinary.com/dzjsaikk1/image/upload/v1731789363/15sdpy7vcm3kmnuwfIMG_6335%20%281%29.JPG.jpg',''),(69,4,NULL,'https://res.cloudinary.com/dzjsaikk1/image/upload/v1731789640/15sdpyvwm3kmtvvzIMG_0311.JPG.jpg',''),(71,3,NULL,'https://res.cloudinary.com/dzjsaikk1/image/upload/v1731792242/15sdpyb3om3kodn46IMG_0313.jpg','');
/*!40000 ALTER TABLE `images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `invoices`
--

DROP TABLE IF EXISTS `invoices`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `invoices` (
  `invoice_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `order_id` bigint NOT NULL,
  `amount` decimal(8,2) NOT NULL,
  `payment_method_id` bigint NOT NULL,
  PRIMARY KEY (`invoice_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `invoices`
--

LOCK TABLES `invoices` WRITE;
/*!40000 ALTER TABLE `invoices` DISABLE KEYS */;
/*!40000 ALTER TABLE `invoices` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `non_paid_orders`
--

DROP TABLE IF EXISTS `non_paid_orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `non_paid_orders` (
  `order_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `client_id` bigint NOT NULL,
  `order_date` datetime NOT NULL,
  `action_date` datetime NOT NULL,
  `time` varchar(100) NOT NULL,
  `price` decimal(8,2) NOT NULL,
  `currency` enum('USD','ILS') NOT NULL DEFAULT 'ILS',
  `remarks` varchar(255) NOT NULL,
  `status` varchar(10) NOT NULL,
  PRIMARY KEY (`order_id`)
) ENGINE=InnoDB AUTO_INCREMENT=68 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `non_paid_orders`
--

LOCK TABLES `non_paid_orders` WRITE;
/*!40000 ALTER TABLE `non_paid_orders` DISABLE KEYS */;
INSERT INTO `non_paid_orders` VALUES (1,3,'2023-12-20 00:00:00','2024-10-20 00:00:00','12:54',1650.00,'ILS','some remarks2','waiting'),(3,1,'2024-09-17 00:00:00','2024-09-17 00:00:00','2024-09-17T02:07:00.000Z',1000.00,'ILS','fykl','waiting'),(4,1,'2024-09-17 00:00:00','2024-09-17 00:00:00','2024-09-17T02:07:00.000Z',1000.00,'ILS','fykl','waiting'),(5,1,'2024-09-17 00:00:00','2024-09-17 00:00:00','2024-09-17T02:07:00.000Z',1000.00,'ILS','fykl','waiting'),(6,1,'2024-09-17 00:00:00','2024-09-17 00:00:00','2024-09-17T01:06:00.000Z',1000.00,'ILS','fkhv,jb.nk,','waiting'),(7,1,'2024-09-17 00:00:00','2024-09-17 00:00:00','2024-09-17T03:06:00.000Z',1000.00,'ILS','tjglhjhj','waiting'),(8,1,'2024-09-17 00:00:00','2024-09-17 00:00:00','2024-09-17T02:07:00.000Z',1000.00,'ILS','ckh,hbin,k','waiting'),(9,1,'2024-09-17 00:00:00','2024-09-17 00:00:00','2024-09-17T00:06:00.000Z',1000.00,'ILS','שגעזכילמ','waiting'),(10,1,'2024-09-18 00:00:00','2024-09-18 00:00:00','2024-09-18T02:06:00.000Z',1000.00,'ILS','cjvmbm','waiting'),(11,1,'2024-09-18 00:00:00','2024-09-18 00:00:00','2024-09-18T02:03:00.000Z',1000.00,'ILS','bffsjcj','waiting'),(12,1,'2024-09-18 00:00:00','2024-09-18 00:00:00','2024-09-18T03:06:00.000Z',1000.00,'ILS','fdjd','waiting'),(13,1,'2024-09-18 00:00:00','2024-09-18 00:00:00','2024-09-18T02:06:00.000Z',1000.00,'ILS','fxhjhkjlk/','waiting'),(14,1,'2024-09-18 00:00:00','2024-09-18 00:00:00','2024-09-18T03:08:00.000Z',1000.00,'ILS','jk.n,jmhn','waiting'),(15,1,'2024-09-18 00:00:00','2024-09-18 00:00:00','2024-09-18T03:57:00.000Z',1000.00,'ILS','dshdrystraesd','waiting'),(16,1,'2024-09-18 00:00:00','2024-09-18 00:00:00','2024-09-18T01:08:00.000Z',1000.00,'ILS','jf,hvmnfcgvm','waiting'),(17,1,'2024-09-18 00:00:00','2024-09-18 00:00:00','2024-09-18T04:07:00.000Z',1000.00,'ILS','khlkj;\'\\','waiting'),(18,1,'2024-09-18 00:00:00','2024-09-18 00:00:00','2024-09-18T03:04:00.000Z',1000.00,'ILS','zdgjxhgkcjv','waiting'),(19,1,'2024-09-18 00:00:00','2024-09-18 00:00:00','2024-09-18T00:45:00.000Z',1000.00,'ILS','sdfghjm','waiting'),(20,1,'2024-09-18 00:00:00','2024-09-18 00:00:00','2024-09-18T02:06:00.000Z',1000.00,'ILS','zxcvbn','waiting'),(21,1,'2024-09-18 00:00:00','2024-09-18 00:00:00','2024-09-18T01:06:00.000Z',1000.00,'ILS','fbx','waiting'),(22,1,'2024-09-18 00:00:00','2024-09-18 00:00:00','2024-09-18T01:45:00.000Z',1000.00,'ILS','dtxfhng','waiting'),(23,1,'2024-09-18 00:00:00','2024-09-18 00:00:00','2024-09-18T01:56:00.000Z',1000.00,'ILS','sdfghj','waiting'),(24,1,'2024-09-18 00:00:00','2024-09-18 00:00:00','2024-09-18T01:56:00.000Z',1000.00,'ILS','asdfghj','waiting'),(25,1,'2024-09-18 00:00:00','2024-09-18 00:00:00','2024-09-18T00:45:00.000Z',1000.00,'ILS','xcvbnm','waiting'),(26,1,'2024-09-18 00:00:00','2024-09-18 00:00:00','2024-09-18T00:06:00.000Z',1000.00,'ILS','ghjk','waiting'),(27,1,'2024-09-18 00:00:00','2024-09-18 00:00:00','2024-09-18T00:45:00.000Z',1000.00,'ILS','sdfgh','waiting'),(28,1,'2024-09-18 00:00:00','2024-09-18 00:00:00','2024-09-18T00:06:00.000Z',1000.00,'ILS','sdfghk.','waiting'),(29,1,'2024-09-18 00:00:00','2024-09-18 00:00:00','2024-09-18T00:45:00.000Z',1000.00,'ILS','sdfg','waiting'),(30,1,'2024-09-19 00:00:00','2024-09-19 00:00:00','2024-09-19T02:06:00.000Z',1000.00,'ILS','sdfnm,','waiting'),(31,1,'2024-09-19 00:00:00','2024-09-19 00:00:00','2024-09-19T00:45:00.000Z',1000.00,'ILS','dfghg','waiting'),(60,3,'2023-12-20 00:00:00','2024-08-20 00:00:00','12:54',4000.00,'ILS','some remarks  8','waiting'),(63,1,'2024-09-30 00:00:00','2024-09-30 00:00:00','2024-09-30T00:45:00.000Z',1500.00,'USD','asdfghnm','waiting');
/*!40000 ALTER TABLE `non_paid_orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `order_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `client_id` bigint NOT NULL,
  `order_date` datetime NOT NULL,
  `action_date` datetime NOT NULL,
  `time` varchar(100) NOT NULL,
  `price` decimal(8,2) NOT NULL,
  `currency` enum('USD','ILS') DEFAULT 'ILS',
  `remarks` varchar(255) NOT NULL,
  `status` varchar(10) NOT NULL,
  PRIMARY KEY (`order_id`)
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (4,3,'2023-12-20 00:00:00','2024-08-20 00:00:00','12:54',1650.00,'ILS','some remarks2','waiting'),(38,3,'2023-12-20 00:00:00','2024-08-20 00:00:00','12:54',5000.00,'ILS','some remarks  8','waiting'),(43,1,'2024-11-13 00:00:00','2024-11-13 00:00:00','2024-11-13T15:00:00.000Z',600.00,'USD','first order','waiting'),(44,1,'2024-11-13 00:00:00','2024-11-18 00:00:00','2024-11-13T16:00:00.000Z',400.00,'USD','second order','waiting'),(45,1,'2024-11-17 00:00:00','2024-11-17 00:00:00','2024-11-17T04:04:00.000Z',400.00,'USD','nbjgfbhl','waiting');
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `packages`
--

DROP TABLE IF EXISTS `packages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `packages` (
  `package_id` bigint NOT NULL AUTO_INCREMENT,
  `title` varchar(100) NOT NULL,
  `price` bigint NOT NULL,
  `details` varchar(255) NOT NULL,
  `button_variant` enum('outlined','contained') NOT NULL,
  `currency` enum('USD','ILS') NOT NULL DEFAULT 'ILS',
  PRIMARY KEY (`package_id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `packages`
--

LOCK TABLES `packages` WRITE;
/*!40000 ALTER TABLE `packages` DISABLE KEYS */;
INSERT INTO `packages` VALUES (6,'Basic',400,'1-hour session, 10 edited photos, Online gallery, Digital download','contained','USD'),(7,'Standard',600,'2-hour session, 20 edited photos, Online gallery, Print rights,','contained','USD'),(8,'Premium',1100,'2-hour session, 25 edited photos, Online gallery, Print rights,','contained','USD'),(9,'Gold',1500,'4-hour session, 30 edited photos, Online gallery, Collage included,','contained','USD'),(10,'Platinum',2000,' Full-day coverage, 45 edited photos, Online gallery, Custom album,','contained','USD');
/*!40000 ALTER TABLE `packages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payment_methods`
--

DROP TABLE IF EXISTS `payment_methods`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payment_methods` (
  `payment_methods_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` bigint NOT NULL,
  PRIMARY KEY (`payment_methods_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payment_methods`
--

LOCK TABLES `payment_methods` WRITE;
/*!40000 ALTER TABLE `payment_methods` DISABLE KEYS */;
/*!40000 ALTER TABLE `payment_methods` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payments`
--

DROP TABLE IF EXISTS `payments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payments` (
  `payment_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `invoice_id` bigint NOT NULL,
  `payment_method_id` bigint NOT NULL,
  `amount` bigint NOT NULL,
  `cancelled` tinyint DEFAULT NULL,
  PRIMARY KEY (`payment_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payments`
--

LOCK TABLES `payments` WRITE;
/*!40000 ALTER TABLE `payments` DISABLE KEYS */;
/*!40000 ALTER TABLE `payments` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-11-18  1:31:07
