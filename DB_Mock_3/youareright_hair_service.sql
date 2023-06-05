-- MySQL dump 10.13  Distrib 8.0.29, for Win64 (x86_64)
--
-- Host: localhost    Database: youareright
-- ------------------------------------------------------
-- Server version	8.0.29

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
-- Table structure for table `hair_service`
--

DROP TABLE IF EXISTS `hair_service`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hair_service` (
  `service_id` varchar(10) NOT NULL,
  `description` text,
  `is_delete` int DEFAULT '0',
  `name` varchar(255) DEFAULT NULL,
  `price` float NOT NULL,
  `type` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`service_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hair_service`
--

LOCK TABLES `hair_service` WRITE;
/*!40000 ALTER TABLE `hair_service` DISABLE KEYS */;
INSERT INTO `hair_service` VALUES ('SER001','Combo “đặc sản” của YouareRight, bạn sẽ cùng chúng tôi trải nghiệm chuyến hành trình tỏa sáng đầy thú vị - nơi mỗi người đàn ông không chỉ cắt tóc mà còn tìm thấy nhiều hơn như thế',0,'Cắt gội 10 bước, chỉ phục vụ 15 khách/ngày',120000,'1'),('SER002','Stylist Master trực tiếp cắt & 35 phút gội cùng 5 dịch vụ chăm sóc đỉnh nhất',0,'Combo Cắt Stylist Master & Gội VIP',330000,'1'),('SER003','Combo cắt gội chuyên nghiệp, chỉ phục vụ 15 khách/ngày',0,'Combo cắt gội chuyên nghiệp, chỉ phục vụ 15 khách/ngày',250000,'1'),('SER004','Gội thư giãn Nâng cấp các động tác massage mới, gấp đôi thời gian cũ',0,'Combo Gội nâng cấp thư giãn và sấy vuốt tạo kiểu',50000,'1'),('SER005','Thư giãn, thú vị, tinh chất vàng',0,'Gội đầu bấm huyệt đầu',150000,'1'),('SER006','Loại bỏ mụn đầu đen ,sợi bã nhờn',0,'Combo Spa chăm sóc da đánh bay mụn cám',259000,'2'),('SER007','Tẩy da chết trắng mịn - Đắp mặt nạ lạnh',0,'Chăm sóc da cấp thiết UltraWhite',50000,'2'),('SER008','Combo lột mụn đầu đen full face - sạch mịn da',0,'Kèm tẩy da chết và đắp mặt nạ',85000,'2'),('SER009','\"GIẢI CỨU\" da nứt nẻ, bong tróc MÙA HANH KHÔ với Dưỡng da DABO 7IN1 tới từ Hàn Quốc dành riêng cho làn da anh',0,'Trải nghiệm dưỡng da 7in1',20000,'2'),('SER010','Dưỡng chất vi lượng giúp da đầu khô thoáng, tan gàu',0,'Detox da đầu - massage mặt nạ lạnh sảng khoái',150000,'2'),('SER011','Default',0,'Skinner default',0,'2'),('SER012','Mang lại cho bạn 1 phong cách khác, chuẩn men và thanh lịch hơnn',0,'Combo Cắt + Gội Vip 2',200000,'1'),('SER013','Dùng những sản phẩm dược liệu, giúp mang lại làn da khỏe từ sâu bên trong..',0,'Chăm sóc da nhạy cảm từ sâu bên trong',200000,'2'),('SER014','Stylist nhiều năm kinh nghiệm tư vấn và cắt.',1,'Cắt + Gội Vip 1',180000,'1'),('SER015','Dưỡng da, tẩy da chết cho da',1,'Detox da',130000,'2'),('SER016','Lộ trình chăm sóc da hiệu quả sau 30 ngày sử dụng. Đem đến làn da sáng và khỏe',1,'Bí kíp cấp ẩm cho da',160000,'2');
/*!40000 ALTER TABLE `hair_service` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-06-01 17:08:14
