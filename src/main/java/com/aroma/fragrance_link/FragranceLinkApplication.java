package com.aroma.fragrance_link;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@EnableJpaRepositories
@SpringBootApplication
public class FragranceLinkApplication {

    public static void main(String[] args) {
        SpringApplication.run(FragranceLinkApplication.class, args);
    }

}
