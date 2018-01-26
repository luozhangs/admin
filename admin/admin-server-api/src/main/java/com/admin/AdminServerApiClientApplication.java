package com.admin;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.netflix.feign.EnableFeignClients;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.ImportResource;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableDiscoveryClient
@EnableFeignClients("com.admin")
@EnableScheduling
@EnableAsync
@ImportResource("classpath:spring-cache.xml")
@Configuration
public class AdminServerApiClientApplication {
    public static void main(String[] args) {
        SpringApplication.run(AdminServerApiClientApplication.class,args);
    }
}
