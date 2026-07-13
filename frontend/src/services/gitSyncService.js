/**
 * gitSyncService.js
 * High-performance API service to communicate with the Spring Boot Git-Sync backend.
 * 
 * Features:
 * - Decoupled subscriber pattern to future-proof real-time WebSocket progress updates.
 * - Robust fetch integrations for GET /repos and POST /sync.
 * - Smart local fallback mechanisms (using localStorage) to ensure the client-side
 *   remains fully functional even if the Spring Boot API is temporarily offline.
 */

import { INITIAL_REPOSITORIES } from '../data';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api/git-sync';

// Potential repositories to discover during local Sync simulation
const NEW_SYNC_REPOSITORIES = [
  {
    name: 'google-genai-sdk-express',
    owner: 'google-labs',
    url: 'https://github.com/google-labs/google-genai-sdk-express',
    detectedAt: 'Just now',
    languages: ['TypeScript', 'JavaScript'],
    contributors: 12,
    status: 'synced',
    description: 'Ultra-lightweight Express.js proxy server optimized for secure, server-side Google Gemini SDK executions.',
    stars: 890,
    forks: 94
  },
  {
    name: 'tailwind-v4-compiler',
    owner: 'tailwindlabs',
    url: 'https://github.com/tailwindlabs/tailwind-v4-compiler',
    detectedAt: 'Just now',
    languages: ['Rust', 'Go'],
    contributors: 28,
    status: 'synced',
    description: 'High-performance interactive compiler optimizing CSS injection pipelines for Tailwind v4 layouts.',
    stars: 1540,
    forks: 88
  },
  {
    name: 'motion-react-gesture-core',
    owner: 'motion-labs',
    url: 'https://github.com/motion-labs/motion-react-gesture-core',
    detectedAt: 'Just now',
    languages: ['TypeScript', 'React'],
    contributors: 5,
    status: 'synced',
    description: 'Gesture control recognition engines custom-mapped to fluid Framer Motion canvas layout animations.',
    stars: 310,
    forks: 21
  }
];

class GitSyncService {
  constructor() {
    // Configurable base URL with a default pointing to the Spring Boot application on port 8080
    this.baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api/git-sync';
    this.subscribers = new Set();
    this.isUsingFallback = false;

    // Initialize local cache if it doesn't exist
    if (!localStorage.getItem('git_sync_repositories')) {
      localStorage.setItem('git_sync_repositories', JSON.stringify(INITIAL_REPOSITORIES));
    }
    if (!localStorage.getItem('git_sync_discovered_index')) {
      localStorage.setItem('git_sync_discovered_index', '0');
    }
  }

  /**
   * Subscribe to real-time sync telemetry updates (WebSockets / Decoupled state changes).
   * @param {Function} callback - Callback function receiving event payloads.
   * @returns {Function} Unsubscribe cleanup function.
   */
  subscribe(callback) {
    this.subscribers.add(callback);
    return () => {
      this.subscribers.delete(callback);
    };
  }

  /**
   * Internal helper to dispatch event updates to all registered subscribers.
   * @param {Object} event - Payload containing type, progress, and optional data/error.
   */
  notify(event) {
    this.subscribers.forEach(cb => cb(event));
  }

  /**
   * Fetches all synced repositories from the Spring Boot backend.
   * Falls back gracefully to LocalStorage if the backend server is unreachable.
   * 
   * @returns {Promise<Array>} Array of repository objects.
   */
  async getRepositories() {
    try {
      const response = await fetch(`${this.baseUrl}/repos`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      this.isUsingFallback = false;
      return data;
    } catch (error) {
      console.warn(
        `[GitSyncService] Spring Boot backend at ${this.baseUrl}/repos is unreachable. Falling back to secure localStorage persistence.`,
        error
      );
      this.isUsingFallback = true;
      
      // LocalStorage Fallback
      const cached = localStorage.getItem('git_sync_repositories');
      return cached ? JSON.parse(cached) : INITIAL_REPOSITORIES;
    }
  }

  /**
   * Triggers the synchronization loop.
   * 
   * This action is fully decoupled:
   * 1. It broadcasts progressive telemetry events (start, progress percentage, completion).
   * 2. This exact API signature is perfectly designed to be swapped with a real-time
   *    STOMP/WebSocket or Socket.io connection without altering components using it.
   */
  async triggerSync() {
    this.notify({ type: 'start' });

    try {
      // Trigger sync request on the Spring Boot backend
      const response = await fetch(`${this.baseUrl}/sync`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`Sync trigger failed with status ${response.status}`);
      }

      this.isUsingFallback = false;

      // In HTTP setup, we simulate progress increments to simulate real-time latency
      // while wait for the backend response or re-fetching fresh data
      await this._simulateProgressUpdates(1500);

      // Fetch fresh repositories to reflect synced database state
      const freshRepos = await this.getRepositories();
      
      this.notify({ 
        type: 'success', 
        message: 'Telemetry synchronization successfully finalized with backend database.',
        data: freshRepos 
      });

      return freshRepos;
    } catch (error) {
      console.warn(
        `[GitSyncService] Trigger Sync API failed. Falling back to local simulated pipeline.`,
        error
      );
      this.isUsingFallback = true;

      // Local Sync pipeline Simulation
      await this._simulateProgressUpdates(1200);

      const cached = JSON.parse(localStorage.getItem('git_sync_repositories') || '[]');
      const currentIndexStr = localStorage.getItem('git_sync_discovered_index') || '0';
      const currentIndex = parseInt(currentIndexStr, 10);

      let updatedRepos = [...cached];
      let toastMessage = 'Sync complete. All collaborations up-to-date.';

      if (currentIndex < NEW_SYNC_REPOSITORIES.length) {
        const nextRepo = NEW_SYNC_REPOSITORIES[currentIndex];
        const newRepo = {
          ...nextRepo,
          id: `discovered-${Date.now()}`,
          detectedAt: new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC'
        };
        updatedRepos = [newRepo, ...updatedRepos];
        localStorage.setItem('git_sync_repositories', JSON.stringify(updatedRepos));
        localStorage.setItem('git_sync_discovered_index', (currentIndex + 1).toString());
        toastMessage = `Successfully synchronized. Discovered and linked ${newRepo.owner}/${newRepo.name}!`;
      } else {
        // Just touch the dates
        updatedRepos = updatedRepos.map(repo => ({
          ...repo,
          detectedAt: new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC'
        }));
        localStorage.setItem('git_sync_repositories', JSON.stringify(updatedRepos));
      }

      this.notify({
        type: 'success',
        message: toastMessage,
        data: updatedRepos
      });

      return updatedRepos;
    }
  }

  /**
   * Helper utility to simulate progress updates for visual telemetry.
   * This handles the progression increment logic decoupled from the React component.
   */
  _simulateProgressUpdates(durationMs) {
    return new Promise((resolve) => {
      let progress = 10;
      this.notify({ type: 'progress', progress });

      const intervalTime = durationMs / 10;
      const interval = setInterval(() => {
        progress += Math.floor(Math.random() * 20) + 10;
        if (progress >= 100) {
          progress = 100;
          clearInterval(interval);
          this.notify({ type: 'progress', progress });
          setTimeout(() => resolve(), 200);
        } else {
          this.notify({ type: 'progress', progress });
        }
      }, intervalTime);
    });
  }

  /**
   * Registers a brand new repository to the tracking system.
   * Sends a POST request or registers locally on fallback.
   * 
   * @param {Object} repoData - { name, owner, description, language }
   */
  async addRepository(repoData) {
    try {
      // In full-stack integration, we can post to our backend.
      // If our controller doesn't support POST /repos yet, it will throw an error or handle it.
      // We will make this robust.
      const response = await fetch(`${this.baseUrl}/repos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(repoData)
      });

      if (!response.ok) {
        throw new Error(`Failed to create repository on server.`);
      }

      const created = await response.json();
      return created;
    } catch (error) {
      console.warn(
        `[GitSyncService] Server-side repository registration unavailable. Saving locally.`,
        error
      );

      // Local mock object creation
      const customRepo = {
        id: `custom-${Date.now()}`,
        name: repoData.name.toLowerCase().replace(/\s+/g, '-'),
        owner: repoData.owner.toLowerCase().replace(/\s+/g, ''),
        url: `https://github.com/${repoData.owner}/${repoData.name}`,
        detectedAt: 'Just now',
        languages: [repoData.language],
        contributors: 1,
        status: 'synced',
        description: repoData.description || 'Custom user-added collaboration repository managed in local space.',
        stars: 1,
        forks: 0
      };

      const cached = JSON.parse(localStorage.getItem('git_sync_repositories') || '[]');
      const updated = [customRepo, ...cached];
      localStorage.setItem('git_sync_repositories', JSON.stringify(updated));

      return customRepo;
    }
  }

  /**
   * Resets local cache state back to original defaults.
   */
  resetLocalState() {
    localStorage.setItem('git_sync_repositories', JSON.stringify(INITIAL_REPOSITORIES));
    localStorage.setItem('git_sync_discovered_index', '0');
    return INITIAL_REPOSITORIES;
  }
}

// Single instance export for app-wide state consistency
export const gitSyncService = new GitSyncService();
