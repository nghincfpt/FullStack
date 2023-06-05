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
-- Table structure for table `booking`
--

DROP TABLE IF EXISTS `booking`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `booking` (
  `booking_id` varchar(10) NOT NULL,
  `booking_date` date DEFAULT NULL,
  `is_delete` int DEFAULT '0',
  `user_id` varchar(10) DEFAULT NULL,
  `note` text,
  `branch_id` varchar(10) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`booking_id`),
  KEY `FKkgseyy7t56x7lkjgu3wah5s3t` (`user_id`),
  KEY `FKougbnvjcp9cv15dhu86gqyjim` (`branch_id`),
  CONSTRAINT `FKkgseyy7t56x7lkjgu3wah5s3t` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `FKougbnvjcp9cv15dhu86gqyjim` FOREIGN KEY (`branch_id`) REFERENCES `branch` (`branch_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `booking`
--

LOCK TABLES `booking` WRITE;
/*!40000 ALTER TABLE `booking` DISABLE KEYS */;
INSERT INTO `booking` VALUES ('BKG001','2023-05-31',1,'USR131','cc 10h thị hoa','BRA001','Phạm hữu minh tâm'),('BKG002','2023-05-31',1,'USR131','hihi','BRA001','Phạm hữu minh tâm'),('BKG003','2023-06-01',1,'USR131','hihi','BRA002','Phạm hữu minh tâm'),('BKG004','2023-06-01',1,'USR131',NULL,'BRA003','Phạm hữu minh tâm'),('BKG005','2023-06-01',1,'USR131',NULL,'BRA003','Phạm hữu minh tâm'),('BKG006','2023-06-02',1,'USR131',NULL,'BRA002','Phạm hữu minh tâm'),('BKG007','2023-06-03',1,'USR006',NULL,'BRA001','Trương Ngọc Huyền'),('BKG008','2023-06-01',0,'USR131',NULL,'BRA003','Phạm hữu minh tâm'),('BKG009','2023-06-03',0,'USR131',NULL,'BRA002','Phạm hữu minh tâm'),('BKG010','2023-06-01',0,'USR131',NULL,'BRA003','Phạm hữu minh tâm'),('BKG011','2023-06-02',0,'USR131',NULL,'BRA001','Phạm hữu minh tâm'),('BKG012','2023-06-02',0,'USR006',NULL,'BRA003','Trương Ngọc Huyền'),('BKG013','2023-06-03',0,'USR006',NULL,'BRA001','Huyền'),('BKG014','2023-06-03',0,'USR131',NULL,'BRA002','Phạm hữu minh tâm'),('BKG015','2023-06-01',0,'USR131',NULL,'BRA002','Phạm hữu minh tâm'),('BKG016','2023-06-02',0,'USR131','aaaaaaaaaaaaa','BRA001','Phạm hữu minh tâm'),('BKG017','2023-06-03',0,'USR131',NULL,'BRA001','Phạm hữu minh tâm'),('BKG018','2023-06-02',0,'USR131','Nammmmmmm','BRA001','Phạm hữu minh tâm');
/*!40000 ALTER TABLE `booking` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-06-01 17:08:15
