import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import useGitHubRepos from '../../hooks/useGitHubRepos';

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
  // Filter out non-technology topics if needed
  const nonTechTopics = ['featured', 'portfolio', 'project'];
  return topics.filter(topic => !nonTechTopics.includes(topic));
};

const ProjectsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.xl};
`;

const PageHeader = styled.div`
  margin-bottom: ${({ theme }) => theme.space.xl};
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes['4xl']};
  margin-bottom: ${({ theme }) => theme.space.md};
`;

const Description = styled.p`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  max-width: 800px;
`;

const FiltersContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.space.md};
  margin-bottom: ${({ theme }) => theme.space.xl};
`;

const FilterButton = styled.button<{ $active: boolean }>`
  background-color: ${({ theme, $active }) =>
    $active ? theme.colors.primary : 'transparent'};
  color: ${({ theme, $active }) =>
    $active ? theme.colors.text.primary : theme.colors.text.secondary};
  border: 1px solid ${({ theme, $active }) =>
    $active ? theme.colors.primary : theme.colors.ui.border};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  padding: ${({ theme }) => theme.space.xs} ${({ theme }) => theme.space.md};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.normal};
  
  &:hover {
    background-color: ${({ theme, $active }) =>
      $active ? theme.colors.primary : theme.colors.ui.hover};
    border-color: ${({ theme, $active }) =>
      $active ? theme.colors.primary : theme.colors.primary};
  }
`;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: ${({ theme }) => theme.space.xl};
`;

const ProjectCard = styled.div`
  background-color: ${({ theme }) => theme.colors.background.dark}99;
  border: 1px solid ${({ theme }) => theme.colors.ui.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  overflow: hidden;
  transition: transform ${({ theme }) => theme.transitions.normal},
    box-shadow ${({ theme }) => theme.transitions.normal};
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${({ theme }) => theme.shadows.lg};
  }
`;

const ProjectImage = styled.div`
  height: 180px;
  background-color: ${({ theme }) => theme.colors.background.code};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ theme }) => theme.fontSizes['3xl']};
`;

const ProjectContent = styled.div`
  padding: ${({ theme }) => theme.space.lg};
`;

const ProjectTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  margin-bottom: ${({ theme }) => theme.space.sm};
`;

const ProjectDescription = styled.p`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.fontSizes.md};
  margin-bottom: ${({ theme }) => theme.space.md};
`;

const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.space.xs};
  margin-bottom: ${({ theme }) => theme.space.md};
`;

const TechTag = styled.span`
  background-color: ${({ theme }) => theme.colors.background.code};
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  padding: ${({ theme }) => theme.space.xs} ${({ theme }) => theme.space.sm};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-family: ${({ theme }) => theme.fonts.code};
`;

const ProjectMeta = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.space.md};
  margin-bottom: ${({ theme }) => theme.space.md};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const ProjectLinks = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.space.md};
  margin-top: ${({ theme }) => theme.space.md};
`;

const ProjectLink = styled.a`
  display: inline-flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  gap: ${({ theme }) => theme.space.xs};
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
`;

const Projects: React.FC = () => {
  const [filter, setFilter] = useState<string | null>(null);
  const [showForks, setShowForks] = useState<boolean>(false);
  
  // Fetch GitHub repositories
  const { repos, loading, error } = useGitHubRepos({ excludeForks: !showForks });
  
  // Process repositories to extract technologies from topics
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
  
  // Extract unique technologies for filter buttons
  const allTechnologies = processedRepos.flatMap(project => project.technologies);
  const uniqueTechnologies = [...new Set(allTechnologies)].sort();
  
  // Add languages as additional filter options if they're not already in topics
  const languages = processedRepos
    .map(project => project.language)
    .filter((language): language is string => language !== null && !allTechnologies.includes(language));
  const uniqueLanguages = [...new Set(languages)];
  
  // Combine technologies and languages for filtering
  const allFilterOptions = [...uniqueTechnologies, ...uniqueLanguages];
  
  // Filter projects based on selected technology or language
  const filteredProjects = filter
    ? processedRepos.filter(project =>
        project.technologies.includes(filter) || project.language === filter)
    : processedRepos;
  
  return (
    <ProjectsContainer>
      <PageHeader>
        <Title>Mes Projets</Title>
        <Description>
          Une collection de mes travaux en ingénierie aérospatiale, développement logiciel et science des données.
          Ces projets mettent en valeur mes compétences et mes intérêts pour repousser les frontières technologiques.
        </Description>
      </PageHeader>
      
      <FiltersContainer>
        <div>
          <FilterButton
            $active={filter === null}
            onClick={() => setFilter(null)}
          >
            Tous
          </FilterButton>
          {allFilterOptions.map(option => (
            <FilterButton
              key={option}
              $active={filter === option}
              onClick={() => setFilter(option)}
            >
              {option}
            </FilterButton>
          ))}
        </div>
        
        <div>
          <FilterButton
            $active={showForks}
            onClick={() => setShowForks(!showForks)}
          >
            {showForks ? 'Masquer les Forks' : 'Afficher les Forks'}
          </FilterButton>
        </div>
      </FiltersContainer>
      
      {loading ? (
        <div>
          <p>Chargement des projets...</p>
        </div>
      ) : error ? (
        <div>
          <p>Erreur lors du chargement des projets : {error.message}</p>
          <p>Utilisation des données de remplacement.</p>
        </div>
      ) : filteredProjects.length === 0 ? (
        <div>
          <p>Aucun projet ne correspond à vos critères.</p>
        </div>
      ) : (
        <ProjectsGrid>
          {filteredProjects.map(project => (
            <ProjectCard key={project.id}>
              <ProjectImage>{project.image}</ProjectImage>
              <ProjectContent>
                <ProjectTitle>{project.name}</ProjectTitle>
                <ProjectDescription>{project.description}</ProjectDescription>
                <TechStack>
                  {project.technologies.map(tech => (
                    <TechTag key={tech}>{tech}</TechTag>
                  ))}
                  {project.language && !project.technologies.includes(project.language) && (
                    <TechTag key={project.language}>{project.language}</TechTag>
                  )}
                </TechStack>
                <ProjectMeta>
                  <span>⭐ {project.stars}</span>
                  <span>🍴 {project.forks}</span>
                  <span>🕒 {project.updatedAt.toLocaleDateString()}</span>
                </ProjectMeta>
                <ProjectLinks>
                  <ProjectLink href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                    GitHub <span>↗</span>
                  </ProjectLink>
                  {project.demoUrl && (
                    <ProjectLink href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                      Démo en Direct <span>↗</span>
                    </ProjectLink>
                  )}
                </ProjectLinks>
              </ProjectContent>
            </ProjectCard>
          ))}
        </ProjectsGrid>
      )}
    </ProjectsContainer>
  );
};

export default Projects;