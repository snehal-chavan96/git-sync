package com.example.springboot.DemoWeb.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.springboot.DemoWeb.entity.RepoEntity;
import com.example.springboot.DemoWeb.service.GitSyncService;

@RestController
@RequestMapping("/api/git-sync")
@CrossOrigin(origins = "http://localhost:5173")
public class GitSyncController {

    private final GitSyncService gitSyncService;

    public GitSyncController(GitSyncService gitSyncService) {
        this.gitSyncService = gitSyncService;
    }

    @PostMapping("/sync")
    public ResponseEntity<String> syncGitRepositories() {

        gitSyncService.syncRepos();

        return ResponseEntity.ok("Git repositories synchronized successfully.");
    } 

    @GetMapping("/repos")
    public ResponseEntity<List<RepoEntity>> getAllSavedRepos() {
        return ResponseEntity.ok(gitSyncService.getAllSavedRepos());
    }

}
