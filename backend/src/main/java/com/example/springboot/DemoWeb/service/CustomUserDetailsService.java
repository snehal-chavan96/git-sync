package com.example.springboot.DemoWeb.service;

import com.example.springboot.DemoWeb.config.SecurityConfig;
import com.example.springboot.DemoWeb.repository.UserRepo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {
    private static final Logger logger = LoggerFactory.getLogger(CustomUserDetailsService.class);

    private final UserRepo userRepo;

    public CustomUserDetailsService(UserRepo userRepo) {
        this.userRepo = userRepo;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        logger.info("Attempting to load user by username: {}", username);
        return userRepo.findByUsername(username)
                .map(user ->{
                    logger.info("User found: {}",username);
                    return user;
                })
                .orElseThrow(()-> {
                   logger.error("User not found: {}",username);
                return new UsernameNotFoundException("User Not Found!");
                });
    }


}
