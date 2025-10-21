package org.example.customerservice;

import org.example.customerservice.entities.Customer;
import org.example.customerservice.repositories.CustomerRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.stream.Stream;

@SpringBootApplication
public class CustomerServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(CustomerServiceApplication.class, args);
    }

    @Bean
    CommandLineRunner commandLineRunner(CustomerRepository repository) {
        return args -> {
            Stream.of("Hakim", "Jeremy", "Jessica", "Jane", "John", "Jacob", "Joshua", "Jason", "Jeremy").forEach(name -> {
                repository.save(Customer.builder().name(name).email(name + "@example.com").build());
            });
        };
    }

}
