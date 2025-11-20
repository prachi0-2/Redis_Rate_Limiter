//package dev.simplesolution;
//
//import org.springframework.boot.SpringApplication;
//import org.springframework.boot.autoconfigure.SpringBootApplication;
//
//@SpringBootApplication
//public class SpringBootRedisApplication {
//
//	public static void main(String[] args) {
//		SpringApplication.run(SpringBootRedisApplication.class, args);
//	}
//}

//package dev.simplesolution;
//
//import org.springframework.boot.SpringApplication;
//import org.springframework.boot.autoconfigure.SpringBootApplication;
//
//@SpringBootApplication
//
//public class SpringBootRedisApplication {
//
//	public static void main(String[] args) {
//		SpringApplication.run(SpringBootRedisApplication.class, args);
//	}
//}

package dev.simplesolution;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class SpringBootRedisApplication {

    public static void main(String[] args) {
        SpringApplication.run(SpringBootRedisApplication.class, args);
    }
}

