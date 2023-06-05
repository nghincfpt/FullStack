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
-- Table structure for table `account`
--

DROP TABLE IF EXISTS `account`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `account` (
  `account_id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(45) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `username` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`account_id`)
) ENGINE=InnoDB AUTO_INCREMENT=133 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account`
--

LOCK TABLES `account` WRITE;
/*!40000 ALTER TABLE `account` DISABLE KEYS */;
INSERT INTO `account` VALUES (1,NULL,'$2a$10$fDi4QOOtrKcJSdbDmVANkOx18aQcYjBNh/4ZoPe9dzg0xtCq/tOeG','namnb6'),(2,NULL,'$2a$10$fDi4QOOtrKcJSdbDmVANkOx18aQcYjBNh/4ZoPe9dzg0xtCq/tOeG','tamphm'),(3,NULL,'$2a$10$fDi4QOOtrKcJSdbDmVANkOx18aQcYjBNh/4ZoPe9dzg0xtCq/tOeG','thienbd'),(4,NULL,'$2a$10$fDi4QOOtrKcJSdbDmVANkOx18aQcYjBNh/4ZoPe9dzg0xtCq/tOeG','nghinc2'),(5,NULL,'$2a$10$fDi4QOOtrKcJSdbDmVANkOx18aQcYjBNh/4ZoPe9dzg0xtCq/tOeG','myvth2'),(6,NULL,'$2a$10$fDi4QOOtrKcJSdbDmVANkOx18aQcYjBNh/4ZoPe9dzg0xtCq/tOeG','huyentn2'),(101,NULL,'$2a$10$fDi4QOOtrKcJSdbDmVANkOx18aQcYjBNh/4ZoPe9dzg0xtCq/tOeG','annv'),(102,NULL,'$2a$10$fDi4QOOtrKcJSdbDmVANkOx18aQcYjBNh/4ZoPe9dzg0xtCq/tOeG','binhtt'),(103,NULL,'$2a$10$fDi4QOOtrKcJSdbDmVANkOx18aQcYjBNh/4ZoPe9dzg0xtCq/tOeG','chienlm'),(104,NULL,'$2a$10$fDi4QOOtrKcJSdbDmVANkOx18aQcYjBNh/4ZoPe9dzg0xtCq/tOeG','dungpt'),(105,NULL,'$2a$10$fDi4QOOtrKcJSdbDmVANkOx18aQcYjBNh/4ZoPe9dzg0xtCq/tOeG','duongtv'),(106,NULL,'$2a$10$fDi4QOOtrKcJSdbDmVANkOx18aQcYjBNh/4ZoPe9dzg0xtCq/tOeG','hant'),(107,NULL,'$2a$10$fDi4QOOtrKcJSdbDmVANkOx18aQcYjBNh/4ZoPe9dzg0xtCq/tOeG','hailv'),(108,NULL,'$2a$10$fDi4QOOtrKcJSdbDmVANkOx18aQcYjBNh/4ZoPe9dzg0xtCq/tOeG','hoatt'),(109,NULL,'$2a$10$fDi4QOOtrKcJSdbDmVANkOx18aQcYjBNh/4ZoPe9dzg0xtCq/tOeG','hungnv'),(110,NULL,'$2a$10$fDi4QOOtrKcJSdbDmVANkOx18aQcYjBNh/4ZoPe9dzg0xtCq/tOeG','huynhlt'),(111,NULL,'$2a$10$fDi4QOOtrKcJSdbDmVANkOx18aQcYjBNh/4ZoPe9dzg0xtCq/tOeG','kientv'),(112,NULL,'$2a$10$fDi4QOOtrKcJSdbDmVANkOx18aQcYjBNh/4ZoPe9dzg0xtCq/tOeG','lannt'),(113,NULL,'$2a$10$fDi4QOOtrKcJSdbDmVANkOx18aQcYjBNh/4ZoPe9dzg0xtCq/tOeG','longlv'),(114,NULL,'$2a$10$fDi4QOOtrKcJSdbDmVANkOx18aQcYjBNh/4ZoPe9dzg0xtCq/tOeG','maitt'),(115,NULL,'$2a$10$fDi4QOOtrKcJSdbDmVANkOx18aQcYjBNh/4ZoPe9dzg0xtCq/tOeG','minhnv'),(116,NULL,'$2a$10$fDi4QOOtrKcJSdbDmVANkOx18aQcYjBNh/4ZoPe9dzg0xtCq/tOeG','ngapt'),(117,NULL,'$2a$10$fDi4QOOtrKcJSdbDmVANkOx18aQcYjBNh/4ZoPe9dzg0xtCq/tOeG','nhantv'),(118,NULL,'$2a$10$fDi4QOOtrKcJSdbDmVANkOx18aQcYjBNh/4ZoPe9dzg0xtCq/tOeG','oanhnt'),(119,NULL,'$2a$10$fDi4QOOtrKcJSdbDmVANkOx18aQcYjBNh/4ZoPe9dzg0xtCq/tOeG','phonglv'),(120,NULL,'$2a$10$fDi4QOOtrKcJSdbDmVANkOx18aQcYjBNh/4ZoPe9dzg0xtCq/tOeG','quynhtt'),(121,NULL,'$2a$10$fDi4QOOtrKcJSdbDmVANkOx18aQcYjBNh/4ZoPe9dzg0xtCq/tOeG','sonnv'),(122,NULL,'$2a$10$fDi4QOOtrKcJSdbDmVANkOx18aQcYjBNh/4ZoPe9dzg0xtCq/tOeG','thanhlt'),(123,NULL,'$2a$10$fDi4QOOtrKcJSdbDmVANkOx18aQcYjBNh/4ZoPe9dzg0xtCq/tOeG','thuantv'),(124,NULL,'$2a$10$fDi4QOOtrKcJSdbDmVANkOx18aQcYjBNh/4ZoPe9dzg0xtCq/tOeG','uyennt'),(125,NULL,'$2a$10$fDi4QOOtrKcJSdbDmVANkOx18aQcYjBNh/4ZoPe9dzg0xtCq/tOeG','vietlv'),(126,NULL,'$2a$10$fDi4QOOtrKcJSdbDmVANkOx18aQcYjBNh/4ZoPe9dzg0xtCq/tOeG','xuantt'),(127,NULL,'$2a$10$fDi4QOOtrKcJSdbDmVANkOx18aQcYjBNh/4ZoPe9dzg0xtCq/tOeG','yennv'),(128,NULL,'$2a$10$fDi4QOOtrKcJSdbDmVANkOx18aQcYjBNh/4ZoPe9dzg0xtCq/tOeG','vanlt'),(129,NULL,'$2a$10$fDi4QOOtrKcJSdbDmVANkOx18aQcYjBNh/4ZoPe9dzg0xtCq/tOeG','anhtv'),(130,NULL,'$2a$10$fDi4QOOtrKcJSdbDmVANkOx18aQcYjBNh/4ZoPe9dzg0xtCq/tOeG','daont'),(131,'TamPHM@fsoft.com.vn','$2a$10$fDi4QOOtrKcJSdbDmVANkOx18aQcYjBNh/4ZoPe9dzg0xtCq/tOeG','tamPHM11'),(132,'','$2a$10$fDi4QOOtrKcJSdbDmVANkOx18aQcYjBNh/4ZoPe9dzg0xtCq/tOeG','HuyenTN');
/*!40000 ALTER TABLE `account` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-06-01 17:08:13
