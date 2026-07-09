# GitHub Collaborator Repository Tracker

A full-stack web application built with **Spring Boot, React.js, and MySQL** that centralizes and manages **accepted GitHub collaborator repositories** by synchronizing them from the GitHub REST API into a local database. The application eliminates the need to manually track repository collaborations, provides a unified view of all accepted collaborator repositories, and maintains a persistent local record through an on-demand synchronization mechanism.

## Features

* Synchronizes accepted GitHub collaborator repositories using the GitHub REST API
* Stores repository metadata in a local MySQL database for persistent tracking
* Uses GitHub repository IDs to prevent duplicate records during synchronization
* Provides a manual "Sync with GitHub" action for on-demand data updates
* Displays repository information including name, owner, description, repository URL, and first detected timestamp
* Implements a layered architecture using React, Spring Boot, Spring Data JPA, and MySQL for maintainable and scalable code
* Demonstrates integration with third-party REST APIs, data persistence, and full-stack application development best practices
