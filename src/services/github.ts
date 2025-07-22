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

export interface GitHubCommit {
  sha: string;
  commit: {
    author: {
      name: string;
      email: string;
      date: string;
    };
    committer: {
      name: string;
      email: string;
      date: string;
    };
    message: string;
  };
  author: {
    login: string;
    avatar_url: string;
  } | null;
  html_url: string;
}

export interface CommitStats {
  date: string;
  count: number;
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
    ...(process.env.REACT_APP_GITHUB_TOKEN && {
      'Authorization': `token ${process.env.REACT_APP_GITHUB_TOKEN}`
    }),
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
 * Fetch featured repositories
 * First tries to get repos with the 'featured' topic,
 * if none are found, returns the 3 most recently updated non-fork repos
 */
export const fetchFeaturedRepos = async (): Promise<GitHubRepo[]> => {
  // First try to get repos with the 'featured' topic
  const featuredRepos = await fetchGitHubReposByTopics(['featured']);
  
  // If we found featured repos, return them
  if (featuredRepos.length > 0) {
    return featuredRepos;
  }
  
  // Otherwise, get all non-fork repos
  const allRepos = await fetchGitHubRepos(true);
  
  // Sort by updated_at (most recent first) and take the first 3
  return allRepos
    .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
    .slice(0, 3);
};

/**
 * Fetch commit history for a specific repository
 * @param {string} repoName - The name of the repository
 * @param {number} perPage - Number of commits to fetch (default: 100)
 */
export const fetchGitHubCommits = async (repoName: string, perPage: number = 100): Promise<GitHubCommit[]> => {
  try {
    const response = await githubApi.get<GitHubCommit[]>(`/repos/${GITHUB_USERNAME}/${repoName}/commits`, {
      params: {
        per_page: Math.min(perPage, 100), // GitHub API limit is 100 per page
        page: 1,
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching commits for ${repoName}:`, error);
    throw error;
  }
};

/**
 * Process commit data to create time-series data for charts
 * @param {GitHubCommit[]} commits - Array of commits
 * @returns {CommitStats[]} - Array of commit statistics grouped by date
 */
export const processCommitStats = (commits: GitHubCommit[]): CommitStats[] => {
  // Group commits by date
  const commitsByDate: Record<string, number> = {};
  
  commits.forEach(commit => {
    const date = new Date(commit.commit.author.date).toISOString().split('T')[0]; // YYYY-MM-DD format
    commitsByDate[date] = (commitsByDate[date] || 0) + 1;
  });
  
  // Convert to array and sort by date
  return Object.entries(commitsByDate)
    .map(([date, count]) => ({ date, count }))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
};

/**
 * Fetch commit statistics for a repository
 * @param {string} repoName - The name of the repository
 */
export const fetchCommitStats = async (repoName: string): Promise<CommitStats[]> => {
  try {
    const commits = await fetchGitHubCommits(repoName);
    return processCommitStats(commits);
  } catch (error) {
    console.error(`Error fetching commit stats for ${repoName}:`, error);
    throw error;
  }
};

/**
 * Fetch README content for a specific repository
 * @param {string} repoName - The name of the repository
 * @param {string} branch - The branch to fetch from (default: 'main')
 */
export const fetchGitHubReadme = async (repoName: string, branch: string = 'main'): Promise<string | null> => {
  try {
    // Try to fetch README.md from the specified branch
    const response = await githubApi.get(`/repos/${GITHUB_USERNAME}/${repoName}/contents/README.md`, {
      params: {
        ref: branch,
      },
    });

    // GitHub API returns base64 encoded content
    if (response.data && response.data.content) {
      const content = atob(response.data.content.replace(/\s/g, ''));
      return content;
    }

    return null;
  } catch (error) {
    // If main branch fails, try master branch
    if (branch === 'main') {
      try {
        return await fetchGitHubReadme(repoName, 'master');
      } catch (masterError) {
        console.log(`No README found for ${repoName} in main or master branch`);
        return null;
      }
    }
    
    console.log(`No README found for ${repoName} in ${branch} branch`);
    return null;
  }
};

/**
 * Fetch comprehensive project data including README content
 * @param {string} repoName - The name of the repository
 */
export const fetchProjectData = async (repoName: string): Promise<{
  repo: GitHubRepo;
  readmeContent: string | null;
  commitStats: CommitStats[];
}> => {
  try {
    // Fetch all data in parallel for better performance
    const [repo, readmeContent, commitStats] = await Promise.all([
      fetchGitHubRepo(repoName),
      fetchGitHubReadme(repoName),
      fetchCommitStats(repoName).catch(() => []) // Don't fail if commits can't be fetched
    ]);

    return {
      repo,
      readmeContent,
      commitStats,
    };
  } catch (error) {
    console.error(`Error fetching comprehensive project data for ${repoName}:`, error);
    throw error;
  }
};

const githubService = {
  fetchGitHubUser,
  fetchGitHubRepos,
  fetchGitHubRepo,
  fetchGitHubReposByTopics,
  fetchFeaturedRepos,
  fetchGitHubCommits,
  fetchCommitStats,
  fetchGitHubReadme,
  fetchProjectData,
  processCommitStats,
};

export default githubService;