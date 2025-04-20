package org.project.tripus;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@MapperScan("org.project.tripus.mapper")
@SpringBootApplication
public class TripUsApplication {

    public static void main(String[] args) {
        SpringApplication.run(TripUsApplication.class, args);
    }

}
