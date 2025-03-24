import axios from 'axios';

// Define types for GitHub API responses
export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string;
  fork: boolean;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  homepage: string | null;
  size: number;
  stargazers_count: number;
  watchers_count: number;
  language: string | null;
  forks_count: number;
  archived: boolean;
  disabled: boolean;
  open_issues_count: number;
  license: {
    key: string;
    name: string;
    url: string;
  } | null;
  topics: string[];
  visibility: string;
  default_branch: string;
}

export interface GitHubUser {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
  name: string;
  company: string | null;
  blog: string;
  location: string | null;
  email: string | null;
  bio: string | null;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
}

// GitHub API base URL
const GITHUB_API_BASE_URL = 'https://api.github.com';

// GitHub username
const GITHUB_USERNAME = 'AlexandrLebegue';

// Create axios instance with common configuration
const githubApi = axios.create({
  baseURL: GITHUB_API_BASE_URL,
  headers: {
    'Accept': 'application/vnd.github.v3+json',
  },
});

/**
 * Fetch user information from GitHub
 */
export const fetchGitHubUser = async (): Promise<GitHubUser> => {
  try {
    const response = await githubApi.get<GitHubUser>(`/users/${GITHUB_USERNAME}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching GitHub user:', error);
    throw error;
  }
};

/**
 * Fetch repositories from GitHub
 * @param {boolean} excludeForks - Whether to exclude forked repositories
 */
export const fetchGitHubRepos = async (excludeForks: boolean = true): Promise<GitHubRepo[]> => {
  try {
    // Fetch all repositories for the user
    const response = await githubApi.get<GitHubRepo[]>(`/users/${GITHUB_USERNAME}/repos`, {
      params: {
        sort: 'updated',
        direction: 'desc',
        per_page: 100, // Maximum allowed per page
      },
    });

    // Filter out forks if requested
    let repos = response.data;
    if (excludeForks) {
      repos = repos.filter(repo => !repo.fork);
    }

    return repos;
  } catch (error) {
    console.error('Error fetching GitHub repositories:', error);
    throw error;
  }
};

/**
 * Fetch a specific repository by name
 * @param {string} repoName - The name of the repository
 */
export const fetchGitHubRepo = async (repoName: string): Promise<GitHubRepo> => {
  try {
    const response = await githubApi.get<GitHubRepo>(`/repos/${GITHUB_USERNAME}/${repoName}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching GitHub repository ${repoName}:`, error);
    throw error;
  }
};

/**
 * Fetch repositories with specific topics
 * @param {string[]} topics - Array of topics to filter by
 * @param {boolean} excludeForks - Whether to exclude forked repositories
 */
export const fetchGitHubReposByTopics = async (
  topics: string[],
  excludeForks: boolean = true
): Promise<GitHubRepo[]> => {
  try {
    const allRepos = await fetchGitHubRepos(excludeForks);
    
    // Filter repositories by topics
    return allRepos.filter(repo => {
      // Check if the repository has at least one of the specified topics
      return topics.some(topic => repo.topics.includes(topic));
    });
  } catch (error) {
    console.error('Error fetching GitHub repositories by topics:', error);
    throw error;
  }
};

/**
 * Fetch featured repositories (those with the 'featured' topic)
 */
export const fetchFeaturedRepos = async (): Promise<GitHubRepo[]> => {
  return fetchGitHubReposByTopics(['featured']);
};

export default {
  fetchGitHubUser,
  fetchGitHubRepos,
  fetchGitHubRepo,
  fetchGitHubReposByTopics,
  fetchFeaturedRepos,
};