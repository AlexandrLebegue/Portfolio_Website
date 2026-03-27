import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchProjectData, GitHubRepo, CommitStats } from '../../services/github';
import CommitChart from '../../components/CommitChart/CommitChart';
import AISummary from '../../components/AISummary/AISummary';
import AnimateIn from '../../components/AnimateIn/AnimateIn';

// Language icons mapping
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

const checkLogoExists = async (url: string): Promise<boolean> => {
  try {
    const response = await fetch(url);
    const text = await response.text();
    return response.ok && !text.includes("404: Not Found");
  } catch { return false; }
};

const findExistingLogoUrl = async (repoName: string): Promise<string | null> => {
  const branches = ['master', 'main'];
  for (const branch of branches) {
    const logoUrl = `https://raw.githubusercontent.com/AlexandrLebegue/${repoName}/${branch}/logo.png`;
    if (await checkLogoExists(logoUrl)) return logoUrl;
  }
  return null;
};

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
    <img src={logoUrl} alt={name} className="w-full h-full object-contain rounded-lg" />
  ) : (
    <>{fallbackImage}</>
  );
};

const ProjectDetail: React.FC = () => {
  const { projectName } = useParams<{ projectName: string }>();
  const navigate = useNavigate();

  const [project, setProject] = useState<GitHubRepo | null>(null);
  const [readmeContent, setReadmeContent] = useState<string | null>(null);
  const [commitStats, setCommitStats] = useState<CommitStats[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!projectName) {
        setError('Nom du projet manquant');
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        setError(null);
        const projectData = await fetchProjectData(projectName);
        setProject(projectData.repo);
        setReadmeContent(projectData.readmeContent);
        setCommitStats(projectData.commitStats);
      } catch (err) {
        console.error('Error fetching project data:', err);
        setError('Erreur lors du chargement du projet');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [projectName]);

  const handleBackClick = () => navigate('/projects');

  if (loading) {
    return (
      <div className="flex flex-col gap-8 max-w-[1200px] mx-auto">
        <p className="text-center py-8 text-gray-500 dark:text-text-secondary-dark">
          Chargement du projet...
        </p>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="flex flex-col gap-8 max-w-[1200px] mx-auto">
        <button
          onClick={handleBackClick}
          className="inline-flex items-center gap-1 bg-transparent border-none text-primary
            text-base cursor-pointer p-2 rounded-md transition-colors duration-200
            hover:bg-ui-hover-light dark:hover:bg-ui-hover"
        >
          ← Retour aux projets
        </button>
        <p className="text-center py-8 text-error">{error || 'Projet non trouvé'}</p>
      </div>
    );
  }

  const technologies = extractTechnologies(project.topics);

  return (
    <div className="flex flex-col gap-8 max-w-[1200px] mx-auto">
      {/* Back Button */}
      <button
        onClick={handleBackClick}
        className="inline-flex items-center gap-1 bg-transparent border-none text-primary
          text-base cursor-pointer p-2 rounded-md transition-colors duration-200
          hover:bg-ui-hover-light dark:hover:bg-ui-hover"
      >
        ← Retour aux projets
      </button>

      {/* Project Header */}
      <div className="flex flex-col md:flex-row gap-6 items-start">
        {/* Image */}
        <AnimateIn type="fadeRight" delay={0}>
          <div className="flex-shrink-0 w-full max-w-[400px] h-[250px] rounded-lg border
            flex items-center justify-center text-4xl
            bg-gray-100 dark:bg-bg-code border-ui-border-light dark:border-ui-border">
            <ProjectImageContent
              repoName={project.name}
              fallbackImage={getLanguageEmoji(project.language)}
              name={project.name}
            />
          </div>
        </AnimateIn>

        {/* Info */}
        <div className="flex-1 flex flex-col gap-4">
          <AnimateIn type="fadeLeft" delay={100}>
            <h1 className="text-3xl m-0">{project.name}</h1>
          </AnimateIn>
          <AnimateIn type="fadeLeft" delay={200}>
            <p className="text-lg leading-relaxed m-0 text-gray-500 dark:text-text-secondary-dark">
              {project.description || 'Aucune description disponible'}
            </p>
          </AnimateIn>

          {(technologies.length > 0 || project.language) && (
            <div className="flex flex-wrap gap-1">
              {technologies.map(tech => (
                <span key={tech} className="tech-tag">{tech}</span>
              ))}
              {project.language && !technologies.includes(project.language) && (
                <span key={project.language} className="tech-tag">{project.language}</span>
              )}
            </div>
          )}

          <div className="flex gap-4 flex-wrap">
            <a
              href={project.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline no-underline"
            >
              GitHub <span>↗</span>
            </a>
            {project.homepage && (
              <a
                href={project.homepage}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline no-underline"
              >
                Démo en Direct <span>↗</span>
              </a>
            )}
          </div>
        </div>
      </div>

      {/* AI Summary */}
      <AISummary repo={project} readmeContent={readmeContent} />

      {/* Stats Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 my-8">
        {[
          { icon: '⭐', value: project.stargazers_count, label: 'Étoiles' },
          { icon: '🍴', value: project.forks_count, label: 'Forks' },
          { icon: '👁️', value: project.watchers_count, label: 'Observateurs' },
          { icon: '🐛', value: project.open_issues_count, label: 'Issues Ouvertes' },
        ].map((stat, index) => (
          <AnimateIn key={stat.label} type="scale" delay={index * 100}>
          <div className="card text-center p-6">
            <div className="text-2xl font-bold text-primary">
              {stat.icon} {stat.value}
            </div>
            <div className="text-sm mt-1 text-gray-500 dark:text-text-secondary-dark">
              {stat.label}
            </div>
          </div>
          </AnimateIn>
        ))}
      </div>

      {/* Commit Chart */}
      {commitStats.length > 0 && (
        <AnimateIn type="fadeUp" delay={200}>
          <div className="card p-8">
            <h2 className="text-xl mb-6">Activité des Commits</h2>
            <CommitChart data={commitStats} />
          </div>
        </AnimateIn>
      )}
    </div>
  );
};

export default ProjectDetail;
