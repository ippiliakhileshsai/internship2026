package com.klef.demo.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;

@Configuration
public class SwaggerConfig 
{
    @Bean
    public OpenAPI apiInfo() 
    {
        return new OpenAPI()
                .info( new Info()
                        .title("RemoteHealthCare Backend API")
                        .version("1.0")
                        .description("API documentation for the Spring Boot Remote HealthCare Management System"));
    }
}
