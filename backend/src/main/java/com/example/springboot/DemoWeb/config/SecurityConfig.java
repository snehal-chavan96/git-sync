package com.example.springboot.DemoWeb.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.HeadersConfigurer;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private static final Logger logger = LoggerFactory.getLogger(SecurityConfig.class);

//    @Value("${app.security.username}")
//    private String uname;
//
//    @Value("${app.security.password}")
//    private String pswd;

    /*
    @Bean
    public UserDetailsService userDetailsService(){

        logger.info("Username from properties: {}",uname);
        logger.info("Password from properties: {}",pswd);
        UserDetails user = User.builder()
            .username(uname)
            .password(pswd)
            .build();

        return new InMemoryUserDetailsManager(user);
    }
    */

    @Bean
    public PasswordEncoder passwordEncoder(){return new BCryptPasswordEncoder();
    }
/*
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception{
        http
                .csrf(csrf-> csrf
                        .ignoringRequestMatchers("/h2-console/**")
                )
                .headers(headers->headers
                        .frameOptions(frame->frame.disable())
                )
                .authorizeHttpRequests(auth -> auth
                                .requestMatchers("/error","/h2-console/**").permitAll()
                .requestMatchers("/admin").hasRole("ADMIN")
                .requestMatchers("/").hasAnyRole("TEACHER","ADMIN")
                .anyRequest().authenticated()
                )
        .formLogin(withDefaults())
                .rememberMe(remember-> remember
                        .key("my-secret-key")
                        .tokenValiditySeconds(86400)
                );


return http.build();
    }
* */

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http
                .csrf(csrf -> csrf.disable())
                .headers(headers -> headers.frameOptions(HeadersConfigurer.FrameOptionsConfig::disable))
                .authorizeHttpRequests(auth -> auth
                        .anyRequest().permitAll()
                );

        return http.build();
    }
}
