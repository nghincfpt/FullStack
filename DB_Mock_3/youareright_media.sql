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
-- Table structure for table `media`
--

DROP TABLE IF EXISTS `media`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `media` (
  `id` int NOT NULL AUTO_INCREMENT,
  `url` varchar(255) DEFAULT NULL,
  `branch_id` varchar(10) DEFAULT NULL,
  `service_id` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKtk3jhy32crpl8khasjif1e8jm` (`branch_id`),
  KEY `FK5pu5shquqat55tk8up9hh2oni` (`service_id`),
  CONSTRAINT `FK5pu5shquqat55tk8up9hh2oni` FOREIGN KEY (`service_id`) REFERENCES `hair_service` (`service_id`),
  CONSTRAINT `FKtk3jhy32crpl8khasjif1e8jm` FOREIGN KEY (`branch_id`) REFERENCES `branch` (`branch_id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `media`
--

LOCK TABLES `media` WRITE;
/*!40000 ALTER TABLE `media` DISABLE KEYS */;
INSERT INTO `media` VALUES (1,'https://firebasestorage.googleapis.com/v0/b/mockproduct-c343f.appspot.com/o/images%2Faf8fd128-3ff2-4447-8eb1-c0ab51a23560cat-toc-nam-dep-ha-noi-10.jpg?alt=media&token=627b8972-4165-425d-948d-9e03d8ec7ddc',NULL,'SER001'),(2,'https://firebasestorage.googleapis.com/v0/b/mockproduct-c343f.appspot.com/o/images%2Fc79e7ead-b652-4211-9549-27fa0b76d9ecbi-quyet-de-tho-tao-kieu-toc-nam-thanh-cong-la-gi-2.jpg?alt=media&token=749961ef-79b4-41f0-9dc1-5b96c1a3be73',NULL,'SER002'),(3,'https://media.istockphoto.com/id/640274128/vi/anh/th%E1%BB%A3-c%E1%BA%AFt-t%C3%B3c-s%E1%BB%AD-d%E1%BB%A5ng-k%C3%A9o-v%C3%A0-l%C6%B0%E1%BB%A3c.jpg?s=612x612&w=0&k=20&c=o82ARZnhqPdFAqU6WOWLnnP-Z7dGi22crXtevsOguAU=',NULL,'SER003'),(4,'https://firebasestorage.googleapis.com/v0/b/mockproduct-c343f.appspot.com/o/images%2F4b7bcd1a-9ff8-4193-8455-9b3bdab2e337screenshot_1.png?alt=media&token=d4868939-2177-4d0a-aebe-220f249ae078',NULL,'SER004'),(5,'https://firebasestorage.googleapis.com/v0/b/mockproduct-c343f.appspot.com/o/images%2F8922c5a6-cb29-498f-8733-55b01972b78bvnf-danh-thue-dich-vu-cat-toc-giat-la.jpg?alt=media&token=86d73a15-773a-420d-b42a-10faa3f47782',NULL,'SER005'),(6,'https://firebasestorage.googleapis.com/v0/b/mockproduct-c343f.appspot.com/o/images%2F51f0e81d-9f67-4545-9c99-8b8a235d211bda2.jpg?alt=media&token=438bf896-1eef-421d-bec1-6a9859e68c2d',NULL,'SER006'),(7,'https://firebasestorage.googleapis.com/v0/b/mockproduct-c343f.appspot.com/o/images%2F157fbcf5-a2ed-4cf2-8e19-96ee27f16910da4.png?alt=media&token=82637ee2-3ade-4726-91f7-90e751258227',NULL,'SER007'),(8,'https://firebasestorage.googleapis.com/v0/b/mockproduct-c343f.appspot.com/o/images%2F33e6d0b2-c6e3-49bd-bc9f-bf469c180923da3.jpg?alt=media&token=e3a9d72a-9e95-4731-9221-e98bf51cc968',NULL,'SER008'),(9,'https://firebasestorage.googleapis.com/v0/b/mockproduct-c343f.appspot.com/o/images%2F50e265c5-3f34-40fa-a47b-00c56e3138d1da5.jpg?alt=media&token=4d2546c9-9c19-42c5-8284-a940219470ed',NULL,'SER009'),(10,'https://firebasestorage.googleapis.com/v0/b/mockproduct-c343f.appspot.com/o/images%2F75504037-0ffd-47dc-ba29-24e7268730c4cham-soc-da-mat-cho-nam-qc-quy-trinh-2.jpg?alt=media&token=717ad843-8ef7-4df7-abe8-b85562256758',NULL,'SER010'),(11,'https://firebasestorage.googleapis.com/v0/b/mockproduct-c343f.appspot.com/o/images%2F2a6af37b-031c-482b-985f-50be529bdbeaTamPHM_PhamHuuMinhTam.png?alt=media&token=78593736-70d3-49b4-8ee6-00fc9ac09dc2','BRA004',NULL),(12,'https://firebasestorage.googleapis.com/v0/b/mockproduct-c343f.appspot.com/o/images%2Fbf340a28-5b5a-4856-875d-8091820add4bcat-toc-nam-bien-hoa-3-min.jpg?alt=media&token=bfed2be9-7dc1-4ece-942a-0f5d6350a74c',NULL,'SER012'),(13,'https://firebasestorage.googleapis.com/v0/b/mockproduct-c343f.appspot.com/o/images%2Fc79e7ead-b652-4211-9549-27fa0b76d9ecbi-quyet-de-tho-tao-kieu-toc-nam-thanh-cong-la-gi-2.jpg?alt=media&token=749961ef-79b4-41f0-9dc1-5b96c1a3be73',NULL,'SER012'),(14,'https://firebasestorage.googleapis.com/v0/b/mockproduct-c343f.appspot.com/o/images%2Faf8fd128-3ff2-4447-8eb1-c0ab51a23560cat-toc-nam-dep-ha-noi-10.jpg?alt=media&token=627b8972-4165-425d-948d-9e03d8ec7ddc',NULL,'SER012'),(15,'https://firebasestorage.googleapis.com/v0/b/mockproduct-c343f.appspot.com/o/images%2Fdb43c1d7-8125-459c-909d-73cf8680f046spa-cham-soc-da-mat-cho-nam-5.jpg?alt=media&token=5b1638e4-3394-4271-b983-5eee8cdb5505',NULL,'SER013'),(16,'https://firebasestorage.googleapis.com/v0/b/mockproduct-c343f.appspot.com/o/images%2F8922c5a6-cb29-498f-8733-55b01972b78bvnf-danh-thue-dich-vu-cat-toc-giat-la.jpg?alt=media&token=86d73a15-773a-420d-b42a-10faa3f47782',NULL,'SER014'),(17,'https://firebasestorage.googleapis.com/v0/b/mockproduct-c343f.appspot.com/o/images%2F51f0e81d-9f67-4545-9c99-8b8a235d211bda2.jpg?alt=media&token=438bf896-1eef-421d-bec1-6a9859e68c2d',NULL,'SER015'),(18,'https://firebasestorage.googleapis.com/v0/b/mockproduct-c343f.appspot.com/o/images%2F33e6d0b2-c6e3-49bd-bc9f-bf469c180923da3.jpg?alt=media&token=e3a9d72a-9e95-4731-9221-e98bf51cc968',NULL,'SER015'),(19,'https://firebasestorage.googleapis.com/v0/b/mockproduct-c343f.appspot.com/o/images%2F157fbcf5-a2ed-4cf2-8e19-96ee27f16910da4.png?alt=media&token=82637ee2-3ade-4726-91f7-90e751258227',NULL,'SER015'),(20,'https://firebasestorage.googleapis.com/v0/b/mockproduct-c343f.appspot.com/o/images%2F0efe4f47-7eb4-477f-a1a6-0a25b878fe25anh1.jpg?alt=media&token=8db62f9d-dedd-4083-b78c-d518abd951f4',NULL,'SER015'),(21,'https://firebasestorage.googleapis.com/v0/b/mockproduct-c343f.appspot.com/o/images%2F4b7bcd1a-9ff8-4193-8455-9b3bdab2e337screenshot_1.png?alt=media&token=d4868939-2177-4d0a-aebe-220f249ae078',NULL,'SER015'),(22,'https://firebasestorage.googleapis.com/v0/b/mockproduct-c343f.appspot.com/o/images%2Fc1683ca0-9abc-4fc4-9ac6-3025f7f08fc0spa-cham-soc-da-mat-cho-nam-5.jpg?alt=media&token=4e6d10d7-195c-4a1c-9f23-14ce45572caa',NULL,'SER015'),(23,'https://firebasestorage.googleapis.com/v0/b/mockproduct-c343f.appspot.com/o/images%2F50e265c5-3f34-40fa-a47b-00c56e3138d1da5.jpg?alt=media&token=4d2546c9-9c19-42c5-8284-a940219470ed',NULL,'SER016'),(24,'https://firebasestorage.googleapis.com/v0/b/mockproduct-c343f.appspot.com/o/images%2F75504037-0ffd-47dc-ba29-24e7268730c4cham-soc-da-mat-cho-nam-qc-quy-trinh-2.jpg?alt=media&token=717ad843-8ef7-4df7-abe8-b85562256758',NULL,'SER016');
/*!40000 ALTER TABLE `media` ENABLE KEYS */;
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
