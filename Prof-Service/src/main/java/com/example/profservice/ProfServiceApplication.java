package com.example.profservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@EnableDiscoveryClient
@SpringBootApplication
public class ProfServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(ProfServiceApplication.class, args);
	}

}
