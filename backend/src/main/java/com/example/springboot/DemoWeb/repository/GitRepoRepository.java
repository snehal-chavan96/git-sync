package com.example.springboot.DemoWeb.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.springboot.DemoWeb.entity.RepoEntity;

@Repository
public interface GitRepoRepository extends JpaRepository<RepoEntity, Long> {
    
}
