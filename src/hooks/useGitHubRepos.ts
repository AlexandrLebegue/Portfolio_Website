import { useState, useEffect, useCallback } from 'react';
import { fetchGitHubRepos, fetchFeaturedRepos, GitHubRepo } from '../services/github';

interface UseGitHubReposOptions {
  featured?: boolean;
  excludeForks?: boolean;
}

interface UseGitHubReposResult {
  repos: GitHubRepo[];
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

/**
 * Custom hook to fetch GitHub repositories
 * @param options - Options for fetching repositories
 * @returns Object containing repositories, loading state, error, and refetch function
 */
const useGitHubRepos = (options: UseGitHubReposOptions = {}): UseGitHubReposResult => {
  const { featured = false, excludeForks = true } = options;
  
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  
  const fetchRepos = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const data = featured
        ? await fetchFeaturedRepos()
        : await fetchGitHubRepos(excludeForks);
      
      setRepos(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch repositories'));
    } finally {
      setLoading(false);
    }
  }, [featured, excludeForks]);
  
  useEffect(() => {
    fetchRepos();
  }, [fetchRepos]);
  
  return { repos, loading, error, refetch: fetchRepos };
};

export default useGitHubRepos;