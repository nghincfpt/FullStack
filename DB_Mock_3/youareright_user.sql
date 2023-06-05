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
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `user_id` varchar(10) NOT NULL,
  `address` varchar(100) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `date_of_birth` date DEFAULT NULL,
  `full_name` varchar(45) DEFAULT NULL,
  `gender` varchar(10) DEFAULT NULL,
  `phone_number` varchar(11) DEFAULT NULL,
  `status` varchar(30) DEFAULT NULL,
  `account_id` int DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  KEY `FKc3b4xfbq6rbkkrddsdum8t5f0` (`account_id`),
  CONSTRAINT `FKc3b4xfbq6rbkkrddsdum8t5f0` FOREIGN KEY (`account_id`) REFERENCES `account` (`account_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('USR002','111 Lê Hồng Phong, Hải Châu, Đà Nẵng','https://sohanews.sohacdn.com/2017/photo-1-1512916425338.jpg','2000-07-19','Phạm Hữu Minh Tâm','Nam','0987654321','1',2),('USR003','023 Trần Đại Nghĩa, Ngũ Hành Sơn, Đà Nẵng','https://sohanews.sohacdn.com/2017/photo-1-1512916425338.jpg','2001-09-09','Bùi Đức Thiện','Nam','0123456789','1',3),('USR004','444 Lê Duẫn, Hải Châu, Đà Nẵng','https://sohanews.sohacdn.com/2017/photo-1-1512916425338.jpg','1999-01-01','Nguyễn Công Nghị','Nam','0989876671','1',4),('USR006','12 Nguyễn Tất Thành, Thanh Khê, Đà Nẵng','https://sohanews.sohacdn.com/2017/photo-1-1512916425338.jpg','2002-09-10','Trương Ngọc Huyền','Nữ','0123456788','1',6),('USR101','123 Nguyễn Văn Linh, Cẩm Lệ, Đà Nẵng','https://sohanews.sohacdn.com/2017/photo-1-1512916425338.jpg','1997-09-14','Nguyễn Văn An','Nam','0901234567','1',101),('USR102','456 Trần Phú, Hoà Khánh, Đà Nẵng','https://sohanews.sohacdn.com/2017/photo-1-1512916425338.jpg','2003-05-06','Trần Thị Bình','Nữ','0769876543','1',102),('USR103','371 Nguyễn Tri Phương, Sơn Trà, Đà Nẵng','https://sohanews.sohacdn.com/2017/photo-1-1512916425338.jpg','1997-06-16','Lê Minh Chiến','Nam','0827890123','1',103),('USR104','348 Lê Duẩn, Sơn Trà, Đà Nẵng','https://sohanews.sohacdn.com/2017/photo-1-1512916425338.jpg','1992-04-17','Phạm Thị Dung','Nữ','0353456789','1',104),('USR105','325 Trần Hưng Đạo, Sơn Trà, Đà Nẵng','https://sohanews.sohacdn.com/2017/photo-1-1512916425338.jpg','1987-09-29','Trần Văn Dương','Nam','0902345678','0',105),('USR106','302 Hải Châu, Sơn Trà, Đà Nẵng','https://sohanews.sohacdn.com/2017/photo-1-1512916425338.jpg','1984-11-02','Nguyễn Thị Hà','Nữ','0768901234','1',106),('USR107','279 Hồ Nghinh, Sơn Trà, Đà Nẵng','https://sohanews.sohacdn.com/2017/photo-1-1512916425338.jpg','2002-06-14','Lê Văn Hải','Nam','0828765432','1',107),('USR108','59 Hàn Thuyên, Cẩm Lệ, Đà Nẵng','https://sohanews.sohacdn.com/2017/photo-1-1512916425338.jpg','1995-02-28','Trần Thị Hoa','Nữ','0354567890','1',108),('USR109','82 Trưng Nữ Vương, Ngũ Hành Sơn, Đà Nẵng','https://sohanews.sohacdn.com/2017/photo-1-1512916425338.jpg','1988-07-13','Nguyễn Văn Hùng','Nam','0907654321','1',109),('USR110','123 Hoàng Anh, Hoà Khánh, Đà Nẵng','https://sohanews.sohacdn.com/2017/photo-1-1512916425338.jpg','1990-12-05','Lê Thị Huỳnh','Nữ','0760123456','1',110),('USR111','123 Đường Võ Nguyên Giáp, Ngũ Hành Sơn, Đà Nẵng','https://sohanews.sohacdn.com/2017/photo-1-1512916425338.jpg','1998-03-21','Trần Văn Kiên','Nam','0987654321','1',111),('USR112','456 Đường Võ Nguyên Giáp, Sơn Trà, Đà Nẵng','https://sohanews.sohacdn.com/2017/photo-1-1512916425338.jpg','1996-05-30','Nguyễn Thị Lan','Nữ','0123456789','1',112),('USR113','789 Đường Phạm Văn Đồng, Sơn Trà, Đà Nẵng','https://sohanews.sohacdn.com/2017/photo-1-1512916425338.jpg','1981-12-11','Lê Văn Long','Nam','0123123456','1',113),('USR114','456 Đường Nguyễn Hữu Thọ, Cẩm Lệ, Đà Nẵng','https://sohanews.sohacdn.com/2017/photo-1-1512916425338.jpg','1993-07-24','Trần Thị Mai','Nữ','0981234567','1',114),('USR115','36 Đường Phan Châu Trinh, Cẩm Lệ, Đà Nẵng','https://sohanews.sohacdn.com/2017/photo-1-1512916425338.jpg','1989-04-04','Nguyễn Văn Minh','Nam','0987654312','1',115),('USR116','123 Đường Nguyễn Văn Linh, Hoà Khánh, Đà Nẵng','https://sohanews.sohacdn.com/2017/photo-1-1512916425338.jpg','2000-09-16','Phạm Thị Nga','Nữ','0987654312','1',116),('USR117','10 Đường Hòa Khánh, Hoà Khánh, Đà Nẵng','https://sohanews.sohacdn.com/2017/photo-1-1512916425338.jpg','1985-08-28','Trần Văn Nhân','Nam','0912345123','0',117),('USR118','108 Đường Đống Đa, Hoà Khánh, Đà Nẵng','https://sohanews.sohacdn.com/2017/photo-1-1512916425338.jpg','1991-03-12','Nguyễn Thị Oanh','Nữ','0981234321','0',118),('USR119','23 Đường Hoàng Diệu, Cẩm Lệ, Đà Nẵng','https://sohanews.sohacdn.com/2017/photo-1-1512916425338.jpg','1999-01-06','Lê Văn Phong','Nam','0912312356','1',119),('USR120','95 Đường Nguyễn Hồng Đào, Cẩm Lệ, Đà Nẵng','https://sohanews.sohacdn.com/2017/photo-1-1512916425338.jpg','1997-11-20','Trần Thị Quỳnh','Nữ','0981234567','1',120),('USR121','279 Hồ Nghinh, Sơn Trà, Đà Nẵng','https://sohanews.sohacdn.com/2017/photo-1-1512916425338.jpg','1982-06-02','Nguyễn Văn Sơn','Nam','0534327238','1',121),('USR122','371 Nguyễn Tri Phương, Sơn Trà, Đà Nẵng','https://sohanews.sohacdn.com/2017/photo-1-1512916425338.jpg','1984-02-15','Lê Thị Thanh','Nữ','0976253423','1',122),('USR123','223 Phạm Văn Đồng, Sơn Trà, Đà Nẵng','https://sohanews.sohacdn.com/2017/photo-1-1512916425338.jpg','2003-10-26','Trần Văn Thuận','Nam','0987434332','1',123),('USR124','59 Hàn Thuyên, Hoà Khánh, Đà Nẵng','https://sohanews.sohacdn.com/2017/photo-1-1512916425338.jpg','1994-09-07','Nguyễn Thị Uyên','Nữ','0923423422','1',124),('USR125','108 Đường Ngô Quyền, Ngũ Hành Sơn, Đà Nẵng','https://sohanews.sohacdn.com/2017/photo-1-1512916425338.jpg','1987-01-22','Lê Văn Việt','Nam','0534532742','1',125),('USR126','36 Đường Võ Văn Kiệt, Sơn Trà, Đà Nẵng','https://sohanews.sohacdn.com/2017/photo-1-1512916425338.jpg','2002-12-04','Trần Thị Xuân','Nữ','0546537262','1',126),('USR127','10 Đường Nguyễn Tất Thành, Sơn Trà, Đà Nẵng','https://sohanews.sohacdn.com/2017/photo-1-1512916425338.jpg','1980-07-31','Nguyễn Văn Yên','Nam','0746726372','1',127),('USR128','36 Đường Phan Châu Trinh, Cẩm Lệ, Đà Nẵng','https://sohanews.sohacdn.com/2017/photo-1-1512916425338.jpg','1992-03-09','Lê Thị Vân','Nữ','0763463622',NULL,128),('USR129','789 Đường Lê Đại Hành, Cẩm Lệ, Đà Nẵng','https://sohanews.sohacdn.com/2017/photo-1-1512916425338.jpg','1996-06-23','Trần Văn Ánh','Nam','0764762322','1',129),('USR130','23 Đường Hòa Hải, Sơn Trà, Đà Nẵng','https://sohanews.sohacdn.com/2017/photo-1-1512916425338.jpg','1990-10-03','Nguyễn Thị Đào','Nữ','0556772224','1',130),('USR131',NULL,NULL,NULL,'Phạm hữu minh tâm',NULL,'0896462083','1',131);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
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
