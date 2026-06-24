package com.klef.demo.configuration;

import com.klef.demo.entity.User;
import com.klef.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Optional;

@Configuration
public class DefaultDataLoader {

    @Autowired
    private UserRepository userRepository;

    @Bean
    CommandLineRunner initAdminUser() {
        return args -> {
            Optional<User> adminOpt = userRepository.findByEmail("admin");
            if (adminOpt.isEmpty()) {
                User adminUser = new User();
                adminUser.setUsername("admin");
                adminUser.setEmail("admin");
                adminUser.setPassword("admin");
                adminUser.setRole("Admin");
                adminUser.setStatus("Active");
                userRepository.save(adminUser);
                System.out.println("Default Admin user created with credentials: admin / admin");
            }
        };
    }
}
