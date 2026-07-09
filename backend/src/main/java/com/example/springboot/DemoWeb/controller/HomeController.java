package com.example.springboot.DemoWeb.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {
    
    @RequestMapping("/")
    public String greet(){
        System.out.println("This works...");
        return "Welcome to Java!"; 
    }
}
