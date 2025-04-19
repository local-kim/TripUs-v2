package org.project.tripus;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@MapperScan("org.project.tripus.mapper")
@SpringBootApplication
public class TripUsV2Application {

    public static void main(String[] args) {
        SpringApplication.run(TripUsV2Application.class, args);
    }

}
