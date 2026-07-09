package com.example.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "repos")
public class RepoEntity {
    @Id
    private Long id;
    private String name;
    private String owner;
    private String htmlUrl;
    private LocalDateTime detectedAt;

    public Long getId() {return id;}
    public void setId(Long id) {this.id = id;}
    public String getName() {return name;}
    public void setName(String name) {this.name = name;}
    public String getOwner() {return owner;}
    public void setOwner(String owner) {this.owner = owner;}
    public String getHtmlUrl() {return htmlUrl;}
    public void setHtmlUrl(String htmlUrl) {this.htmlUrl = htmlUrl;}
    public LocalDateTime getDetectedAt() {return detectedAt;}
    public void setDetectedAt(LocalDateTime detectedAt) {this.detectedAt = detectedAt;}
}
