SET NAMES utf8mb4;

-- DDL
CREATE TABLE `user`
(
    `id`                      INT          NOT NULL AUTO_INCREMENT,
    `name`                    VARCHAR(255),
    `username`                VARCHAR(255) NOT NULL UNIQUE,
    `password`                VARCHAR(255) NOT NULL,
    `type`                    TINYINT      NOT NULL DEFAULT '1',
    `email`                   VARCHAR(255),
    `tel`                     VARCHAR(255),
    `birthday`         DATE,
    `zonecode`                VARCHAR(255),
    `address1`                VARCHAR(255),
    `address2`                VARCHAR(255),
    `profile_file_url` VARCHAR(255),
    `created_at`       TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at`       TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`)
);

CREATE TABLE `city`
(
    `id`           INT          NOT NULL AUTO_INCREMENT,
    `name`         VARCHAR(255) NOT NULL,
    `eng_name`     VARCHAR(255) NOT NULL,
    `country`      VARCHAR(255),
    `area_code`    TINYINT      NOT NULL,
    `sigungu_code` TINYINT,
    `file_name`  VARCHAR(255) NOT NULL,
    `x`            VARCHAR(255),
    `y`            VARCHAR(255),
    `cat`          TINYINT      NOT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`)
);

CREATE TABLE `place`
(
    `id`            INT          NOT NULL AUTO_INCREMENT,
    `city_id`       INT          NOT NULL,
    `contentid`     VARCHAR(255) NOT NULL UNIQUE COMMENT 'API의 장소 ID',
    `contenttypeid` VARCHAR(45)  NOT NULL,
    `title`         VARCHAR(255) NOT NULL,
    `cat3`          VARCHAR(255) NOT NULL,
    `addr1`         VARCHAR(255),
    `addr2`         VARCHAR(255),
    `firstimage`    VARCHAR(255),
    `mapx`          VARCHAR(255),
    `mapy`          VARCHAR(255),
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`city_id`) REFERENCES `city` (`id`)
);

CREATE TABLE `trip`
(
    `id`         INT  NOT NULL AUTO_INCREMENT,
    `city_id`    INT  NOT NULL,
    `user_id` INT NOT NULL,
    `title`      VARCHAR(255),
    `start_date` DATE NOT NULL,
    `end_date`   DATE NOT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`city_id`) REFERENCES `city` (`id`),
    FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
);

CREATE TABLE `itinerary`
(
    `id`         INT NOT NULL AUTO_INCREMENT,
    `trip_id`    INT NOT NULL,
    `day`        INT NOT NULL,
    `seq`        INT NOT NULL,
    `place_id`   INT NOT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`trip_id`) REFERENCES `trip` (`id`),
    FOREIGN KEY (`place_id`) REFERENCES `place` (`id`),
    UNIQUE KEY (`trip_id`, `day`, `seq`)
);

CREATE TABLE `review`
(
    `id`         INT          NOT NULL AUTO_INCREMENT,
    `place_id`   INT          NOT NULL,
    `user_id` INT NOT NULL,
    `stars`      DOUBLE       NOT NULL,
    `content`    VARCHAR(255) NOT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`place_id`) REFERENCES `place` (`id`),
    FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
);

CREATE TABLE `review_photo`
(
    `id`         INT          NOT NULL AUTO_INCREMENT,
    `review_id`  INT          NOT NULL,
    `file_url`   VARCHAR(255) NOT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`review_id`) REFERENCES `review` (`id`)
);

CREATE TABLE `place_like`
(
    `id`         INT NOT NULL AUTO_INCREMENT,
    `place_id`   INT NOT NULL,
    `user_id` INT NOT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
    FOREIGN KEY (`place_id`) REFERENCES `place` (`id`),
    UNIQUE KEY (`place_id`, `user_id`)
);

CREATE TABLE `trip_like`
(
    `id`         INT NOT NULL AUTO_INCREMENT,
    `trip_id`    INT NOT NULL,
    `user_id` INT NOT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`trip_id`) REFERENCES `trip` (`id`),
    FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
    UNIQUE KEY (`trip_id`, `user_id`)
);

-- CREATE TABLE `weather`
-- (
--     `id`         INT         NOT NULL AUTO_INCREMENT,
--     `placename`  VARCHAR(45) NOT NULL,
--     `placenum`   VARCHAR(20) NOT NULL,
--     `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
--     PRIMARY KEY (`id`)
-- );

CREATE TABLE `content_type_id`
(
    `content_type_id` TINYINT      NOT NULL,
    `type`            VARCHAR(255) NOT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`content_type_id`)
);

CREATE TABLE `service_type_code`
(
    `cat3`       VARCHAR(45) NOT NULL,
    `type`       INT,
    `cat1`       VARCHAR(45),
    `cat1_name`  VARCHAR(45),
    `cat2`       VARCHAR(45),
    `cat2_name`  VARCHAR(45),
    `cat3_name`  VARCHAR(45),
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`cat3`)
);

-- DML
INSERT INTO `city` (id, name, eng_name, country, area_code, sigungu_code, file_name, x, y, cat)
VALUES (101, '춘천', 'Chuncheon', '대한민국', 32, 13, 'chuncheon.jpg', '127.733917', '37.885693', 3),
       (105, '강릉', 'Gangneung', '대한민국', 32, 1, 'gangneung.jpg', '128.8760574', '37.751853', 2),
       (108, '서울', 'Seoul', '대한민국', 1, NULL, 'seoul.jpg', '126.9784147', '37.5666805', 1),
       (115, '울릉도', 'Ulleung', '대한민국', 35, 17, 'ulleung.jpg', '130.8571536', '37.5063677', 2),
       (119, '수원', 'Suwon', '대한민국', 31, 13, 'suwon.jpg', '127.0286009', '37.2635727', 1),
       (133, '대전', 'Daegeon', '대한민국', 3, NULL, 'daejeon.jpg', '127.3845475', '36.3504119', 1),
       (136, '안동', 'Andong', '대한민국', 35, 11, 'andong.jpeg', '128.722687', '36.571424', 3),
       (140, '군산', 'Gunsan', '대한민국', 37, 2, 'gunsan.jpeg', '126.7366293', '35.9676772', 3),
       (146, '전주', 'Jeonju', '대한민국', 37, 12, 'jeonju.jpg', '127.1526312', '35.8147105', 1),
       (159, '부산', 'Busan', '대한민국', 6, NULL, 'busan.jpg', '129.0756416', '35.1795543', 2),
       (168, '여수', 'Yeosu', '대한민국', 38, 13, 'yeosu.jpg', '127.6622221', '34.7603737', 2),
       (184, '제주도', 'Jeju', '대한민국', 39, NULL, 'jeju.jpg', '126.5567418', '33.3827759', 2),
       (201, '인천', 'Incheon', '대한민국', 2, NULL, 'incheon.jpg', '126.705278', '37.456111', 2),
       (221, '제천', 'Jecheon', '대한민국', 33, 7, 'jecheon.jpg', '128.18161', '37.142803', 1),
       (247, '남원', 'Namwon', '대한민국', 37, 4, 'namwon.jpg', '127.415314', '35.431582', 3),
       (283, '경주', 'Gyeongju', '대한민국', 35, 2, 'gyeongju.jpg', '129.217882', '35.844426', 3);