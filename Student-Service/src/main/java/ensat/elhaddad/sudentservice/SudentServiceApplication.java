package ensat.elhaddad.sudentservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@EnableDiscoveryClient
@SpringBootApplication
public class SudentServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(SudentServiceApplication.class, args);
    }

}
