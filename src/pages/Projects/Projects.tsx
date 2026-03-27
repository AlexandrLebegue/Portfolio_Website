import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { cn } from '../../utils/cn';
import useGitHubRepos from '../../hooks/useGitHubRepos';
import AnimateIn from '../../components/AnimateIn/AnimateIn';

// Map of languages to emoji icons
const languageIcons: Record<string, string> = {
  JavaScript: '📜', TypeScript: '📘', Python: '🐍', Java: '☕',
  'C++': '⚙️', C: '🔧', 'C#': '🎮', HTML: '🌐', CSS: '🎨',
  Ruby: '💎', Go: '🐹', Rust: '🦀', Swift: '🍎', Kotlin: '📱',
  PHP: '🐘', Shell: '🐚', Jupyter: '📊', Dockerfile: '🐳',
  MATLAB: '🧮', R: '📈', default: '💻',
};

const getLanguageEmoji = (language: string | null): string => {
  if (!language) return languageIcons.default;
  return languageIcons[language] || languageIcons.default;
};

const extractTechnologies = (topics: string[]): string[] => {
  const nonTechTopics = ['featured', 'portfolio', 'project'];
  return topics.filter(topic => !nonTechTopics.includes(topic));
};

// Function to check if a logo exists at a given URL
const checkLogoExists = async (url: string): Promise<boolean> => {
  try {
    const response = await fetch(url);
    const text = await response.text();
    return response.ok && !text.includes("404: Not Found");
  } catch (error) {
    return false;
  }
};

// Function to find the first existing logo URL from multiple branches
const findExistingLogoUrl = async (repoName: string): Promise<string | null> => {
  const branches = ['master', 'main'];
  for (const branch of branches) {
    const logoUrl = `https://raw.githubusercontent.com/AlexandrLebegue/${repoName}/${branch}/logo.png`;
    const exists = await checkLogoExists(logoUrl);
    if (exists) return logoUrl;
  }
  return null;
};

// Component to handle project image loading with fallback
interface ProjectImageContentProps {
  repoName: string;
  fallbackImage: string;
  name: string;
}

const ProjectImageContent: React.FC<ProjectImageContentProps> = ({ repoName, fallbackImage, name }) => {
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [logoLoaded, setLogoLoaded] = useState(false);

  useEffect(() => {
    const findLogo = async () => {
      const existingLogoUrl = await findExistingLogoUrl(repoName);
      setLogoUrl(existingLogoUrl);
      setLogoLoaded(!!existingLogoUrl);
    };
    findLogo();
  }, [repoName]);

  return logoLoaded && logoUrl ? (
    <img src={logoUrl} alt={name} className="w-full h-full object-contain" />
  ) : (
    <>{fallbackImage}</>
  );
};

const Projects: React.FC = () => {
  const [filter, setFilter] = useState<string | null>(null);
  const [showForks, setShowForks] = useState<boolean>(false);
  const navigate = useNavigate();

  const { repos, loading, error } = useGitHubRepos({ excludeForks: !showForks });

  const processedRepos = repos.map(repo => ({
    id: repo.id,
    name: repo.name,
    description: repo.description || 'No description provided',
    technologies: extractTechnologies(repo.topics),
    language: repo.language,
    image: getLanguageEmoji(repo.language),
    githubUrl: repo.html_url,
    demoUrl: repo.homepage,
    stars: repo.stargazers_count,
    forks: repo.forks_count,
    updatedAt: new Date(repo.updated_at),
  }));

  const allTechnologies = processedRepos.flatMap(project => project.technologies);
  const uniqueTechnologies = [...new Set(allTechnologies)].sort();
  const languages = processedRepos
    .map(project => project.language)
    .filter((language): language is string => language !== null && !allTechnologies.includes(language));
  const uniqueLanguages = [...new Set(languages)];
  const allFilterOptions = [...uniqueTechnologies, ...uniqueLanguages];

  const filteredProjects = filter
    ? processedRepos.filter(project =>
        project.technologies.includes(filter) || project.language === filter)
    : processedRepos;

  const handleProjectClick = (projectName: string) => {
    navigate(`/projects/${projectName}`);
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Page Header */}
      <div className="mb-8">
        <AnimateIn type="fadeDown" delay={0}>
          <h1 className="text-4xl mb-4">Mes Projets</h1>
        </AnimateIn>
        <AnimateIn type="fadeUp" delay={100}>
          <p className="text-lg max-w-[800px] text-gray-500 dark:text-text-secondary-dark">
            Une collection de mes travaux en ingénierie aérospatiale, développement logiciel et science des données.
            Ces projets mettent en valeur mes compétences et mes intérêts pour repousser les frontières technologiques.
          </p>
        </AnimateIn>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-8">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilter(null)}
            className={cn(
              'rounded-full px-4 py-1 text-sm cursor-pointer border transition-all duration-200',
              filter === null
                ? 'bg-primary text-white border-primary'
                : 'bg-transparent border-ui-border-light dark:border-ui-border text-gray-500 dark:text-text-secondary-dark hover:bg-ui-hover-light dark:hover:bg-ui-hover hover:border-primary'
            )}
          >
            Tous
          </button>
          {allFilterOptions.map(option => (
            <button
              key={option}
              onClick={() => setFilter(option)}
              className={cn(
                'rounded-full px-4 py-1 text-sm cursor-pointer border transition-all duration-200',
                filter === option
                  ? 'bg-primary text-white border-primary'
                  : 'bg-transparent border-ui-border-light dark:border-ui-border text-gray-500 dark:text-text-secondary-dark hover:bg-ui-hover-light dark:hover:bg-ui-hover hover:border-primary'
              )}
            >
              {option}
            </button>
          ))}
        </div>

        <div>
          <button
            onClick={() => setShowForks(!showForks)}
            className={cn(
              'rounded-full px-4 py-1 text-sm cursor-pointer border transition-all duration-200',
              showForks
                ? 'bg-primary text-white border-primary'
                : 'bg-transparent border-ui-border-light dark:border-ui-border text-gray-500 dark:text-text-secondary-dark hover:bg-ui-hover-light dark:hover:bg-ui-hover hover:border-primary'
            )}
          >
            {showForks ? 'Masquer les Forks' : 'Afficher les Forks'}
          </button>
        </div>
      </div>

      {/* Projects Grid */}
      {loading ? (
        <p className="text-gray-500 dark:text-text-secondary-dark">Chargement des projets...</p>
      ) : error ? (
        <div>
          <p className="text-error">Erreur lors du chargement des projets : {error.message}</p>
          <p className="text-gray-500 dark:text-text-secondary-dark">Utilisation des données de remplacement.</p>
        </div>
      ) : filteredProjects.length === 0 ? (
        <p className="text-gray-500 dark:text-text-secondary-dark">Aucun projet ne correspond à vos critères.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <AnimateIn key={project.id} type="fadeUp" delay={Math.min(index * 80, 500)}>
            <div
              onClick={() => handleProjectClick(project.name)}
              className="card cursor-pointer overflow-hidden group"
            >
              {/* Project Image */}
              <div className="h-[180px] flex items-center justify-center text-3xl
                bg-gray-100 dark:bg-bg-code">
                <ProjectImageContent
                  repoName={project.name}
                  fallbackImage={project.image}
                  name={project.name}
                />
              </div>

              {/* Project Content */}
              <div className="p-6">
                <h3 className="text-xl mb-2">{project.name}</h3>
                <p className="text-base mb-4 text-gray-500 dark:text-text-secondary-dark">
                  {project.description}
                </p>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {project.technologies.map(tech => (
                    <span key={tech} className="tech-tag">{tech}</span>
                  ))}
                  {project.language && !project.technologies.includes(project.language) && (
                    <span key={project.language} className="tech-tag">{project.language}</span>
                  )}
                </div>

                {/* Meta */}
                <div className="flex gap-4 mb-4 text-sm text-gray-500 dark:text-text-secondary-dark">
                  <span>⭐ {project.stars}</span>
                  <span>🍴 {project.forks}</span>
                  <span>🕒 {project.updatedAt.toLocaleDateString()}</span>
                </div>

                {/* Links */}
                <div className="flex gap-4 mt-4">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={e => e.stopPropagation()}
                    className="inline-flex items-center gap-1 text-primary font-medium no-underline hover:underline"
                  >
                    GitHub <span>↗</span>
                  </a>
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={e => e.stopPropagation()}
                      className="inline-flex items-center gap-1 text-primary font-medium no-underline hover:underline"
                    >
                      Démo en Direct <span>↗</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
            </AnimateIn>
          ))}
        </div>
      )}
    </div>
  );
};

export default Projects;
