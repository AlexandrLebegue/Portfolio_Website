import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { fetchProjectData, GitHubRepo, CommitStats } from '../../services/github';
import CommitChart from '../../components/CommitChart/CommitChart';
import AISummary from '../../components/AISummary/AISummary';

const ProjectDetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.xl};
  max-width: 1200px;
  margin: 0 auto;
`;

const BackButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.xs};
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.fontSizes.md};
  cursor: pointer;
  padding: ${({ theme }) => theme.space.sm};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  transition: background-color ${({ theme }) => theme.transitions.normal};
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.ui.hover};
  }
`;

const ProjectHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.lg};
  
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: row;
    align-items: flex-start;
  }
`;

const ProjectImageContainer = styled.div`
  flex-shrink: 0;
  width: 100%;
  max-width: 400px;
  height: 250px;
  background-color: ${({ theme }) => theme.colors.background.current === theme.colors.background.light ? '#f0f0f0' : theme.colors.background.code};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ theme }) => theme.fontSizes['4xl']};
  border: 1px solid ${({ theme }) => theme.colors.ui.border};
  
  & > img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    border-radius: ${({ theme }) => theme.borderRadius.lg};
  }
`;

const ProjectInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.md};
`;

const ProjectTitle = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes['3xl']};
  margin: 0;
`;

const ProjectDescription = styled.p`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  line-height: 1.6;
  margin: 0;
`;

const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.space.xs};
`;

const TechTag = styled.span`
  background-color: ${({ theme }) => theme.colors.background.current === theme.colors.background.light ? '#e0e0e0' : theme.colors.background.code};
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  padding: ${({ theme }) => theme.space.xs} ${({ theme }) => theme.space.sm};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-family: ${({ theme }) => theme.fonts.code};
`;

const ProjectLinks = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.space.md};
  flex-wrap: wrap;
`;

const ProjectLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.xs};
  color: ${({ theme }) => theme.colors.primary};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  text-decoration: none;
  padding: ${({ theme }) => theme.space.sm} ${({ theme }) => theme.space.md};
  border: 1px solid ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  transition: all ${({ theme }) => theme.transitions.normal};
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.text.current};
  }
`;

const StatsSection = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${({ theme }) => theme.space.lg};
  margin: ${({ theme }) => theme.space.xl} 0;
`;

const StatCard = styled.div`
  background-color: ${({ theme }) => theme.colors.background.current}99;
  border: 1px solid ${({ theme }) => theme.colors.ui.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.space.lg};
  text-align: center;
`;

const StatValue = styled.div`
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.primary};
`;

const StatLabel = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-top: ${({ theme }) => theme.space.xs};
`;

const ChartSection = styled.div`
  background-color: ${({ theme }) => theme.colors.background.current}99;
  border: 1px solid ${({ theme }) => theme.colors.ui.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.space.xl};
`;

const ChartTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  margin-bottom: ${({ theme }) => theme.space.lg};
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.space.xl};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const ErrorMessage = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.space.xl};
  color: #ef4444;
`;

// Language icons mapping (same as Projects page)
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
  default: '💻',
};

const getLanguageEmoji = (language: string | null): string => {
  if (!language) return languageIcons.default;
  return languageIcons[language] || languageIcons.default;
};

// Function to extract topics as technologies
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
    if (exists) {
      return logoUrl;
    }
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
    <img src={logoUrl} alt={name} />
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

        // Fetch comprehensive project data including README
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

  const handleBackClick = () => {
    navigate('/projects');
  };

  if (loading) {
    return (
      <ProjectDetailContainer>
        <LoadingMessage>Chargement du projet...</LoadingMessage>
      </ProjectDetailContainer>
    );
  }

  if (error || !project) {
    return (
      <ProjectDetailContainer>
        <BackButton onClick={handleBackClick}>
          ← Retour aux projets
        </BackButton>
        <ErrorMessage>{error || 'Projet non trouvé'}</ErrorMessage>
      </ProjectDetailContainer>
    );
  }

  const technologies = extractTechnologies(project.topics);

  return (
    <ProjectDetailContainer>
      <BackButton onClick={handleBackClick}>
        ← Retour aux projets
      </BackButton>

      <ProjectHeader>
        <ProjectImageContainer>
          <ProjectImageContent
            repoName={project.name}
            fallbackImage={getLanguageEmoji(project.language)}
            name={project.name}
          />
        </ProjectImageContainer>
        
        <ProjectInfo>
          <ProjectTitle>{project.name}</ProjectTitle>
          <ProjectDescription>
            {project.description || 'Aucune description disponible'}
          </ProjectDescription>
          
          {(technologies.length > 0 || project.language) && (
            <TechStack>
              {technologies.map(tech => (
                <TechTag key={tech}>{tech}</TechTag>
              ))}
              {project.language && !technologies.includes(project.language) && (
                <TechTag key={project.language}>{project.language}</TechTag>
              )}
            </TechStack>
          )}
          
          <ProjectLinks>
            <ProjectLink href={project.html_url} target="_blank" rel="noopener noreferrer">
              GitHub <span>↗</span>
            </ProjectLink>
            {project.homepage && (
              <ProjectLink href={project.homepage} target="_blank" rel="noopener noreferrer">
                Démo en Direct <span>↗</span>
              </ProjectLink>
            )}
          </ProjectLinks>
        </ProjectInfo>
      </ProjectHeader>

      {/* AI Summary Section */}
      <AISummary repo={project} readmeContent={readmeContent} />

      <StatsSection>
        <StatCard>
          <StatValue>⭐ {project.stargazers_count}</StatValue>
          <StatLabel>Étoiles</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue>🍴 {project.forks_count}</StatValue>
          <StatLabel>Forks</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue>👁️ {project.watchers_count}</StatValue>
          <StatLabel>Observateurs</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue>🐛 {project.open_issues_count}</StatValue>
          <StatLabel>Issues Ouvertes</StatLabel>
        </StatCard>
      </StatsSection>

      {commitStats.length > 0 && (
        <ChartSection>
          <ChartTitle>Activité des Commits</ChartTitle>
          <CommitChart data={commitStats} />
        </ChartSection>
      )}
    </ProjectDetailContainer>
  );
};

export default ProjectDetail;