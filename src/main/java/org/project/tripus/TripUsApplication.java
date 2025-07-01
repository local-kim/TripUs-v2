package org.project.tripus;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@EnableAsync
@SpringBootApplication
public class TripUsApplication {

    public static void main(String[] args) {
        SpringApplication.run(TripUsApplication.class, args);
    }

}
