import { useState, useEffect } from 'react';
import { fetchFeaturedRepos, GitHubRepo } from '../services/github';

interface ProcessedProject {
  id: number;
  name: string;
  description: string;
  technologies: string[];
  language: string | null;
  image: string;
  githubUrl: string;
  demoUrl: string | null;
}

interface UseFeaturedProjectsResult {
  projects: ProcessedProject[];
  loading: boolean;
  error: Error | null;
}

// Map of languages to emoji icons
const languageIcons: Record<string, string> = {
  JavaScript: '📜',
  TypeScript: '📘',
  Python: '🐍',
  Java: '☕',
  'C++': '⚙️',
  C: '🔧',
  'C#': '🎮',
  HTML: '🌐',
  CSS: '🎨',
  Ruby: '💎',
  Go: '🐹',
  Rust: '🦀',
  Swift: '🍎',
  Kotlin: '📱',
  PHP: '🐘',
  Shell: '🐚',
  Jupyter: '📊',
  Dockerfile: '🐳',
  MATLAB: '🧮',
  R: '📈',
  // Default icon for other languages
  default: '💻',
};

// Function to get emoji for a language
const getLanguageEmoji = (language: string | null): string => {
  if (!language) return languageIcons.default;
  return languageIcons[language] || languageIcons.default;
};

// Function to extract topics as technologies
const extractTechnologies = (topics: string[]): string[] => {
  // Filter out non-technology topics
  const nonTechTopics = ['featured', 'portfolio', 'project'];
  return topics.filter(topic => !nonTechTopics.includes(topic));
};

/**
 * Custom hook to fetch featured projects from GitHub
 * @returns Object containing featured projects, loading state, and error
 */
const useFeaturedProjects = (): UseFeaturedProjectsResult => {
  const [projects, setProjects] = useState<ProcessedProject[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch featured repositories
        const featuredRepos = await fetchFeaturedRepos();
        
        // Process repositories
        const processedProjects = featuredRepos.map((repo: GitHubRepo) => ({
          id: repo.id,
          name: repo.name,
          description: repo.description || 'No description provided',
          technologies: extractTechnologies(repo.topics),
          language: repo.language,
          image: getLanguageEmoji(repo.language),
          githubUrl: repo.html_url,
          demoUrl: repo.homepage,
        }));
        
        setProjects(processedProjects);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch featured projects'));
        
        // Fallback to placeholder data if there's an error
        setProjects([
          {
            id: 1,
            name: 'Aerospace Simulation',
            description: 'A physics-based simulation of orbital mechanics and spacecraft dynamics.',
            technologies: ['TypeScript', 'Three.js', 'React', 'Physics Engine'],
            language: 'TypeScript',
            image: '🚀',
            githubUrl: 'https://github.com/AlexandrLebegue/aerospace-simulation',
            demoUrl: 'https://aerospace-sim.example.com',
          },
          {
            id: 2,
            name: 'AI Research Platform',
            description: 'A platform for conducting and sharing AI research experiments.',
            technologies: ['Python', 'TensorFlow', 'Flask', 'React'],
            language: 'Python',
            image: '🤖',
            githubUrl: 'https://github.com/AlexandrLebegue/ai-research',
            demoUrl: 'https://ai-research.example.com',
          },
          {
            id: 3,
            name: 'Data Visualization Tool',
            description: 'Interactive data visualization tool for complex datasets.',
            technologies: ['JavaScript', 'D3.js', 'SVG', 'Canvas'],
            language: 'JavaScript',
            image: '📊',
            githubUrl: 'https://github.com/AlexandrLebegue/data-viz',
            demoUrl: 'https://data-viz.example.com',
          },
        ]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProjects();
  }, []);
  
  return { projects, loading, error };
};

export default useFeaturedProjects;