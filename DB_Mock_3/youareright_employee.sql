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
-- Table structure for table `employee`
--

DROP TABLE IF EXISTS `employee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employee` (
  `emp_id` varchar(10) NOT NULL,
  `is_delete` int DEFAULT '0',
  `type` varchar(255) DEFAULT NULL,
  `branch_id` varchar(10) DEFAULT NULL,
  `user_id` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`emp_id`),
  KEY `FKcvhlsx8tao1rxt7mpxrot61jt` (`branch_id`),
  KEY `FK6lk0xml9r7okjdq0onka4ytju` (`user_id`),
  CONSTRAINT `FK6lk0xml9r7okjdq0onka4ytju` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `FKcvhlsx8tao1rxt7mpxrot61jt` FOREIGN KEY (`branch_id`) REFERENCES `branch` (`branch_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee`
--

LOCK TABLES `employee` WRITE;
/*!40000 ALTER TABLE `employee` DISABLE KEYS */;
INSERT INTO `employee` VALUES ('EMP101',0,'3','BRA002','USR101'),('EMP102',0,'3','BRA001','USR102'),('EMP103',0,'3','BRA001','USR103'),('EMP104',0,'2','BRA001','USR104'),('EMP105',0,'2','BRA001','USR105'),('EMP106',0,'1','BRA001','USR106'),('EMP107',0,'1','BRA001','USR107'),('EMP108',0,'1','BRA001','USR108'),('EMP109',0,'2','BRA001','USR109'),('EMP110',0,'1','BRA001','USR110'),('EMP111',0,'1','BRA002','USR111'),('EMP112',0,'1','BRA002','USR112'),('EMP113',0,'2','BRA002','USR113'),('EMP114',0,'2','BRA002','USR114'),('EMP115',0,'1','BRA002','USR115'),('EMP116',0,'1','BRA002','USR116'),('EMP117',0,'2','BRA002','USR117'),('EMP118',0,'3','BRA002','USR118'),('EMP119',0,'2','BRA002','USR119'),('EMP120',0,'1','BRA002','USR120'),('EMP121',0,'1','BRA003','USR121'),('EMP122',0,'3','BRA003','USR122'),('EMP123',0,'1','BRA003','USR123'),('EMP124',0,'1','BRA003','USR124'),('EMP125',0,'1','BRA003','USR125'),('EMP126',0,'2','BRA003','USR126'),('EMP127',0,'2','BRA003','USR127'),('EMP128',0,'2','BRA003','USR128'),('EMP129',0,'1','BRA003','USR129'),('EMP130',0,'3','BRA003','USR130');
/*!40000 ALTER TABLE `employee` ENABLE KEYS */;
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
