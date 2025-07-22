import { GitHubRepo } from './github';
import { generateProjectSummary } from './openrouter';

export interface AISummaryData {
  summary: string;
  generatedAt: number;
  cached: boolean;
}

export interface ProjectSummaryInput {
  repo: GitHubRepo;
  readmeContent?: string | null;
}

// Simple in-memory cache for AI summaries
const summaryCache = new Map<string, AISummaryData>();

// Cache duration: 24 hours
const CACHE_DURATION = 24 * 60 * 60 * 1000;

/**
 * Check if a cached summary is still valid
 */
const isCacheValid = (cachedData: AISummaryData): boolean => {
  return Date.now() - cachedData.generatedAt < CACHE_DURATION;
};

/**
 * Generate cache key for a project
 */
const getCacheKey = (repoName: string): string => {
  return `ai_summary_${repoName}`;
};

/**
 * Extract technologies from repository topics and language
 */
const extractTechnologies = (repo: GitHubRepo): string[] => {
  const technologies = [...repo.topics];
  
  // Add primary language if not already in topics
  if (repo.language && !technologies.includes(repo.language.toLowerCase())) {
    technologies.push(repo.language);
  }
  
  // Filter out non-technical topics
  const nonTechTopics = ['featured', 'portfolio', 'project', 'personal'];
  return technologies.filter(tech => !nonTechTopics.includes(tech.toLowerCase()));
};

/**
 * Prepare project data for AI summary generation
 */
const prepareProjectData = (input: ProjectSummaryInput) => {
  const { repo, readmeContent } = input;
  
  return {
    name: repo.name,
    description: repo.description || undefined,
    language: repo.language || undefined,
    topics: extractTechnologies(repo),
    readmeContent: readmeContent || undefined,
    stats: {
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      issues: repo.open_issues_count,
    },
  };
};

/**
 * Generate AI summary for a project with caching
 */
export const generateAISummary = async (input: ProjectSummaryInput): Promise<AISummaryData> => {
  const cacheKey = getCacheKey(input.repo.name);
  
  // Check cache first
  const cachedSummary = summaryCache.get(cacheKey);
  if (cachedSummary && isCacheValid(cachedSummary)) {
    return {
      ...cachedSummary,
      cached: true,
    };
  }
  
  try {
    // Prepare data for AI generation
    const projectData = prepareProjectData(input);
    
    // Generate summary using OpenRouter API
    const summary = await generateProjectSummary(projectData);
    
    // Create summary data object
    const summaryData: AISummaryData = {
      summary: summary.trim(),
      generatedAt: Date.now(),
      cached: false,
    };
    
    // Cache the result
    summaryCache.set(cacheKey, summaryData);
    
    return summaryData;
  } catch (error) {
    console.error('Error generating AI summary:', error);
    throw new Error('Failed to generate AI summary');
  }
};

/**
 * Get cached summary if available
 */
export const getCachedSummary = (repoName: string): AISummaryData | null => {
  const cacheKey = getCacheKey(repoName);
  const cachedSummary = summaryCache.get(cacheKey);
  
  if (cachedSummary && isCacheValid(cachedSummary)) {
    return {
      ...cachedSummary,
      cached: true,
    };
  }
  
  return null;
};

/**
 * Clear cache for a specific project
 */
export const clearProjectCache = (repoName: string): void => {
  const cacheKey = getCacheKey(repoName);
  summaryCache.delete(cacheKey);
};

/**
 * Clear all cached summaries
 */
export const clearAllCache = (): void => {
  summaryCache.clear();
};

/**
 * Get cache statistics
 */
export const getCacheStats = () => {
  const totalEntries = summaryCache.size;
  const validEntries = Array.from(summaryCache.values()).filter(isCacheValid).length;
  
  return {
    totalEntries,
    validEntries,
    expiredEntries: totalEntries - validEntries,
  };
};

const aiSummaryService = {
  generateAISummary,
  getCachedSummary,
  clearProjectCache,
  clearAllCache,
  getCacheStats,
};

export default aiSummaryService;