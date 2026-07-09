package com.example.springboot.DemoWeb.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import com.example.springboot.DemoWeb.dto.GitRepoDto;
import com.example.springboot.DemoWeb.entity.RepoEntity;
import com.example.springboot.DemoWeb.repository.GitRepoRepository;

@Service
public class GitSyncService {

        @Value("${github.api.token}")
        private String githubToken;

        private final WebClient webClient;
        private final GitRepoRepository gitRepoRepository;

        public GitSyncService(@Qualifier("githubWebClient") WebClient webClient, GitRepoRepository gitRepoRepository) {
            this.webClient = webClient;
            this.gitRepoRepository = gitRepoRepository;
        }

        public void syncRepos(){
            String url = "/user/repos?affiliation=collaborator";

            GitRepoDto[] response = webClient.get()
                    .uri(url)
                    .header("Authorization", "Bearer " + githubToken)
                    .retrieve()
                    .bodyToMono(GitRepoDto[].class)
                    .block();

            if(response != null){
                for(GitRepoDto dto : response){

                    if(!gitRepoRepository.existsById(dto.getId())){
                        // Save each repository to the database
                        RepoEntity newRepo = new RepoEntity();
                        newRepo.setId(dto.getId());
                        newRepo.setName(dto.getName());
                        newRepo.setOwner(dto.getOwner().getLogin());
                        newRepo.setHtmlUrl(dto.getHtmlUrl());
                        newRepo.setDetectedAt(java.time.LocalDateTime.now());
                        gitRepoRepository.save(newRepo);
                    }
                }
            }


        }

        public List<RepoEntity> getAllSavedRepos() {
            return gitRepoRepository.findAll();
        }
        
}
 