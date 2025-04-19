-- CREATE TABLE `authentication` (
--                                   `authentication_id` int NOT NULL AUTO_INCREMENT,
--                                   `authentication_email` varchar(50) NOT NULL,
--                                   `authentication_key` varchar(100) NOT NULL,
--                                   `created_date` datetime NOT NULL,
--                                   `authentication_enabled` tinyint(1) DEFAULT '0',
--                                   PRIMARY KEY (`authentication_id`),
--                                   UNIQUE KEY `authentication_email_UNIQUE` (`authentication_email`)
-- )
--
-- CREATE TABLE `authority` (
--                              `id` varchar(255) NOT NULL,
--                              `authority_name` varchar(255) NOT NULL,
--                              PRIMARY KEY (`id`,`authority_name`),
--                              CONSTRAINT `authority_fk_id` FOREIGN KEY (`id`) REFERENCES `member` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
-- )

CREATE TABLE `city` (
                        `id` int NOT NULL AUTO_INCREMENT,
                        `name` varchar(255) NOT NULL,
                        `eng_name` varchar(255) NOT NULL,
                        `country` varchar(255) DEFAULT NULL,
                        `area_code` tinyint NOT NULL,
                        `sigungu_code` tinyint DEFAULT NULL,
                        `image` varchar(255) NOT NULL,
                        `x` varchar(255) DEFAULT NULL,
                        `y` varchar(255) DEFAULT NULL,
                        `cat` tinyint NOT NULL,
                        PRIMARY KEY (`id`),
                        UNIQUE KEY `name_UNIQUE` (`name`)
)

CREATE TABLE `member` (
                          `id` int NOT NULL AUTO_INCREMENT,
                          `name` varchar(255) DEFAULT NULL,
                          `id` varchar(255) NOT NULL,
                          `password` varchar(255) DEFAULT NULL,
                          `type` tinyint NOT NULL DEFAULT '1',
                          `email` varchar(255) DEFAULT NULL,
                          `tel` varchar(255) DEFAULT NULL,
                          `birthday` varchar(255) DEFAULT NULL,
                          `zonecode` varchar(255) DEFAULT NULL,
                          `address1` varchar(255) DEFAULT NULL,
                          `address2` varchar(255) DEFAULT NULL,
                          `registered_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
                          `isAccountNonexpired` int DEFAULT NULL,
                          `isAccountNonLocked` int DEFAULT NULL,
                          `isCredentialsNonExpired` int DEFAULT NULL,
                          `isEnabled` int DEFAULT NULL,
                          PRIMARY KEY (`id`),
                          UNIQUE KEY `id_UNIQUE` (`id`)
)

CREATE TABLE `trip` (
                        `id` int NOT NULL AUTO_INCREMENT,
                        `name` varchar(255) DEFAULT NULL,
                        `member_id` int DEFAULT NULL,
                        `city_id` int DEFAULT NULL,
                        `start_date` datetime NOT NULL,
                        `end_date` datetime NOT NULL,
                        `days` int DEFAULT NULL,
                        PRIMARY KEY (`id`),
                        KEY `city_id` (`city_id`),
                        KEY `trip_ibfk_1` (`member_id`),
                        CONSTRAINT `trip_ibfk_1` FOREIGN KEY (`member_id`) REFERENCES `member` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
                        CONSTRAINT `trip_ibfk_2` FOREIGN KEY (`city_id`) REFERENCES `city` (`id`)
)

CREATE TABLE `place` (
                         `city_id` int NOT NULL,
                         `contentid` varchar(255) NOT NULL,
                         `contenttypeid` varchar(45) NOT NULL,
                         `title` varchar(255) NOT NULL,
                         `cat3` varchar(255) NOT NULL,
                         `addr1` varchar(255) DEFAULT NULL,
                         `addr2` varchar(255) DEFAULT NULL,
                         `firstimage` varchar(255) DEFAULT NULL,
                         `mapx` varchar(255) DEFAULT NULL,
                         `mapy` varchar(255) DEFAULT NULL,
                         PRIMARY KEY (`contentid`),
                         KEY `place_fk_city_id` (`city_id`),
                         CONSTRAINT `place_fk_city_id` FOREIGN KEY (`city_id`) REFERENCES `city` (`id`)
)

CREATE TABLE `content_type_id` (
                                   `content_type_id` tinyint NOT NULL,
                                   `type` varchar(255) NOT NULL,
                                   PRIMARY KEY (`content_type_id`)
)

CREATE TABLE `itinerary` (
                             `trip_id` int NOT NULL,
                             `day` int NOT NULL,
                             `order` int NOT NULL,
                             `place_id` varchar(255) NOT NULL,
                             PRIMARY KEY (`trip_id`,`day`,`order`),
                             KEY `itinerary_fk_place_id` (`place_id`),
                             CONSTRAINT `itinerary_fk_place_id` FOREIGN KEY (`place_id`) REFERENCES `place` (`contentid`) ON DELETE CASCADE ON UPDATE CASCADE,
                             CONSTRAINT `itinerary_ibfk_1` FOREIGN KEY (`trip_id`) REFERENCES `trip` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
)

CREATE TABLE `like` (
                        `member_id` int NOT NULL,
                        `place_id` varchar(255) NOT NULL,
                        `check` tinyint(1) NOT NULL DEFAULT '1',
                        PRIMARY KEY (`member_id`,`place_id`),
                        CONSTRAINT `like_ibfk_1` FOREIGN KEY (`member_id`) REFERENCES `member` (`id`)
)

CREATE TABLE `plan_like` (
                             `trip_id` int NOT NULL,
                             `member_id` int NOT NULL,
                             PRIMARY KEY (`trip_id`,`member_id`),
                             KEY `plan_like_fk_member_id_idx` (`member_id`),
                             CONSTRAINT `plan_like_fk_member_id` FOREIGN KEY (`member_id`) REFERENCES `member` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
                             CONSTRAINT `plan_like_fk_trip_id` FOREIGN KEY (`trip_id`) REFERENCES `trip` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
)

CREATE TABLE `profile_photo` (
                                 `id` int NOT NULL AUTO_INCREMENT,
                                 `member_id` int DEFAULT NULL,
                                 `file_name` varchar(255) DEFAULT NULL,
                                 PRIMARY KEY (`id`),
                                 KEY `profile_photo_ibfk_1` (`member_id`),
                                 CONSTRAINT `profile_photo_ibfk_1` FOREIGN KEY (`member_id`) REFERENCES `member` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
)

CREATE TABLE `review` (
                          `id` int NOT NULL AUTO_INCREMENT,
                          `place_id` varchar(255) DEFAULT NULL,
                          `member_id` int DEFAULT NULL,
                          `stars` double DEFAULT NULL,
                          `content` varchar(255) DEFAULT NULL,
                          `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
                          PRIMARY KEY (`id`),
                          KEY `member_id` (`member_id`),
                          CONSTRAINT `review_ibfk_2` FOREIGN KEY (`member_id`) REFERENCES `member` (`id`)
)

CREATE TABLE `review_photo` (
                                `id` int NOT NULL AUTO_INCREMENT,
                                `review_id` int DEFAULT NULL,
                                `file_name` varchar(255) DEFAULT NULL,
                                PRIMARY KEY (`id`),
                                KEY `review_photo_ibfk_1` (`review_id`),
                                CONSTRAINT `review_photo_ibfk_1` FOREIGN KEY (`review_id`) REFERENCES `review` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
)

CREATE TABLE `service_type_code` (
                                     `type` int DEFAULT NULL,
                                     `cat1` varchar(45) DEFAULT NULL,
                                     `cat1_name` varchar(45) DEFAULT NULL,
                                     `cat2` varchar(45) DEFAULT NULL,
                                     `cat2_name` varchar(45) DEFAULT NULL,
                                     `cat3` varchar(45) NOT NULL,
                                     `cat3_name` varchar(45) DEFAULT NULL,
                                     PRIMARY KEY (`cat3`)
)

CREATE TABLE `weather` (
                           `id` int NOT NULL AUTO_INCREMENT,
                           `placename` varchar(45) NOT NULL,
                           `placenum` varchar(20) NOT NULL,
                           PRIMARY KEY (`id`),
                           UNIQUE KEY `id_UNIQUE` (`id`)
)