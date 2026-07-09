package com.example.springboot.DemoWeb.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public class GitRepoDto {
    private Long id;
    private String name;

    @JsonProperty("html_url")
    private String htmlUrl;

    private Owner owner;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getHtmlUrl() { return htmlUrl; }
    public void setHtmlUrl(String htmlUrl) { this.htmlUrl = htmlUrl; }

    public Owner getOwner() { return owner; }
    public void setOwner(Owner owner) { this.owner = owner; }

    // Inner class to handle nested 'owner' object from GitHub JSON
    public static class Owner {
        private String login;

        public String getLogin() { return login; }
        public void setLogin(String login) { this.login = login; }
    }
    
}
