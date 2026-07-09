package com.example.springboot.DemoWeb.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.springboot.DemoWeb.entity.Product;

@Repository
public interface ProductRepo extends JpaRepository<Product,Integer>{

//    @Query("SELECT p from Product p WHERE "+
//    "LOWER(p.name) LIKE LOWER(CONCAT('%'', :keyword, '%')) OR "+
//    "LOWER(p.description) LIKE LOWER(CONCAT('%'', :keyword, '%')) OR "+
//    "LOWER(p.brand) LIKE LOWER(CONCAT('%'', :keyword, '%')) OR "+
//    "LOWER(p.category) LIKE LOWER(CONCAT('%'', :keyword, '%'))")
//    List<Product> searchProducts(String keyword);


}
