package com.messlink.node_service;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class NodeServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(NodeServiceApplication.class, args);
	}

}
