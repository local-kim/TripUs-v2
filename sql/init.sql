CREATE TABLE `member`
(
    `id`                      INT          NOT NULL AUTO_INCREMENT,
    `name`                    VARCHAR(255),
    `username`                VARCHAR(255) NOT NULL UNIQUE,
    `password`                VARCHAR(255) NOT NULL,
    `type`                    TINYINT      NOT NULL DEFAULT '1',
    `email`                   VARCHAR(255),
    `tel`                     VARCHAR(255),
    `birthday`                VARCHAR(255),
    `zonecode`                VARCHAR(255),
    `address1`                VARCHAR(255),
    `address2`                VARCHAR(255),
    `isAccountNonexpired`     INT,
    `isAccountNonLocked`      INT,
    `isCredentialsNonExpired` INT,
    `isEnabled`               INT,
    `created_at`              DATETIME              DEFAULT CURRENT_TIMESTAMP,
    `updated_at`              DATETIME              DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`)
);

CREATE TABLE `profile_photo`
(
    `id`         INT NOT NULL AUTO_INCREMENT,
    `member_id`  INT NOT NULL,
    `file_name`  VARCHAR(255),
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`member_id`) REFERENCES `member` (`id`)
);

CREATE TABLE `city`
(
    `id`           INT          NOT NULL AUTO_INCREMENT,
    `name`         VARCHAR(255) NOT NULL,
    `eng_name`     VARCHAR(255) NOT NULL,
    `country`      VARCHAR(255),
    `area_code`    TINYINT      NOT NULL,
    `sigungu_code` TINYINT,
    `file_name`        VARCHAR(255) NOT NULL,
    `x`            VARCHAR(255),
    `y`            VARCHAR(255),
    `cat`          TINYINT      NOT NULL,
    `created_at`   DATETIME DEFAULT CURRENT_TIMESTAMP,
    `updated_at`   DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
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
    `created_at`    DATETIME DEFAULT CURRENT_TIMESTAMP,
    `updated_at`    DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`city_id`) REFERENCES `city` (`id`)
);

CREATE TABLE `trip`
(
    `id`         INT      NOT NULL AUTO_INCREMENT,
    `city_id`    INT      NOT NULL,
    `member_id`  INT      NOT NULL,
    `title`       VARCHAR(255),
    `start_date` DATETIME NOT NULL,
    `end_date`   DATETIME NOT NULL,
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`city_id`) REFERENCES `city` (`id`),
    FOREIGN KEY (`member_id`) REFERENCES `member` (`id`)
);

CREATE TABLE `itinerary`
(
    `id`         INT NOT NULL AUTO_INCREMENT,
    `trip_id`    INT NOT NULL,
    `day`        INT NOT NULL,
    `seq`        INT NOT NULL COMMENT '하루 일정 내 순서',
    `place_id`   INT NOT NULL,
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`trip_id`) REFERENCES `trip` (`id`),
    FOREIGN KEY (`place_id`) REFERENCES `place` (`id`),
    UNIQUE KEY (`trip_id`, `day`, `seq`)
);

CREATE TABLE `review`
(
    `id`         INT          NOT NULL AUTO_INCREMENT,
    `place_id`   INT          NOT NULL,
    `member_id`  INT          NOT NULL,
    `stars`      DOUBLE       NOT NULL,
    `content`    VARCHAR(255) NOT NULL,
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`place_id`) REFERENCES `place` (`id`),
    FOREIGN KEY (`member_id`) REFERENCES `member` (`id`)
);

CREATE TABLE `review_photo`
(
    `id`         INT          NOT NULL AUTO_INCREMENT,
    `review_id`  INT          NOT NULL,
    `file_name`  VARCHAR(255) NOT NULL,
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`review_id`) REFERENCES `review` (`id`)
);

CREATE TABLE `place_like`
(
    `id`         INT NOT NULL AUTO_INCREMENT,
    `place_id`   INT NOT NULL,
    `member_id`  INT NOT NULL,
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`member_id`) REFERENCES `member` (`id`),
    FOREIGN KEY (`place_id`) REFERENCES `place` (`id`),
    UNIQUE KEY (`place_id`, `member_id`)
);

CREATE TABLE `trip_like`
(
    `id`         INT NOT NULL AUTO_INCREMENT,
    `trip_id`    INT NOT NULL,
    `member_id`  INT NOT NULL,
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`trip_id`) REFERENCES `trip` (`id`),
    FOREIGN KEY (`member_id`) REFERENCES `member` (`id`),
    UNIQUE KEY (`trip_id`, `member_id`)
);

CREATE TABLE `weather`
(
    `id`         INT         NOT NULL AUTO_INCREMENT,
    `placename`  VARCHAR(45) NOT NULL,
    `placenum`   VARCHAR(20) NOT NULL,
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`)
);

CREATE TABLE `content_type_id`
(
    `content_type_id` TINYINT      NOT NULL,
    `type`            VARCHAR(255) NOT NULL,
    `created_at`      DATETIME DEFAULT CURRENT_TIMESTAMP,
    `updated_at`      DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
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
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`cat3`)
);
