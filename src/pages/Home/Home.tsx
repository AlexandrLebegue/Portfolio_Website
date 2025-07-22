import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import useFeaturedProjects from '../../hooks/useFeaturedProjects';

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.xl};
`;

// Keyframes for animations
const twinkle = keyframes`
  0% { opacity: 0.2; transform: scale(0.8); }
  50% { opacity: 1; transform: scale(1.1); }
  100% { opacity: 0.2; transform: scale(0.8); }
`;

// Star component with random properties
interface StarProps {
  size: number;
  top: number;
  left: number;
  delay: number;
  duration: number;
}

const Star = styled.div<StarProps>`
  position: absolute;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  top: ${props => props.top}%;
  left: ${props => props.left}%;
  background-color: ${({ theme }) => theme.colors.text.accent};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  box-shadow: 0 0 ${props => props.size * 2}px ${props => props.size / 2}px ${({ theme }) => theme.colors.text.accent};
  animation: ${twinkle} ${props => props.duration}s ease-in-out infinite;
  animation-delay: ${props => props.delay}s;
  opacity: 0.2;
  z-index: -1;
`;

// Generate an array of stars with random properties
const generateStars = (count: number) => {
  const stars = [];
  for (let i = 0; i < count; i++) {
    stars.push({
      id: i,
      size: Math.random() * 3 + 1, // Size between 1-4px
      top: Math.random() * 100,    // Position from 0-100%
      left: Math.random() * 100,   // Position from 0-100%
      delay: Math.random() * 5,    // Delay between 0-5s
      duration: Math.random() * 3 + 2, // Duration between 2-5s
    });
  }
  return stars;
};

// Stars background component
const StarBackground = () => {
  const [stars] = useState(() => generateStars(50)); // Generate 50 stars
  
  return (
    <>
      {stars.map(star => (
        <Star
          key={star.id}
          size={star.size}
          top={star.top}
          left={star.left}
          delay={star.delay}
          duration={star.duration}
        />
      ))}
    </>
  );
};

const HeroSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: ${({ theme }) => theme.space['2xl']} 0;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at center, ${({ theme }) => theme.colors.primary}20 0%, transparent 70%);
    z-index: -1;
  }
`;

const Title = styled.h1`
  font-size: clamp(2.5rem, 5vw, ${({ theme }) => theme.fontSizes['5xl']});
  margin-bottom: ${({ theme }) => theme.space.md};
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.text.current} 0%, ${({ theme }) => theme.colors.primary} 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
  animation: fadeIn 1s ease-out;
`;

const Subtitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  color: ${({ theme }) => theme.colors.text.secondary};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  max-width: 600px;
  margin-bottom: ${({ theme }) => theme.space.xl};
  animation: fadeIn 1s ease-out 0.3s forwards;
  opacity: 0;
`;

const CTAButton = styled(Link)`
  display: inline-block;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  padding: ${({ theme }) => theme.space.md} ${({ theme }) => theme.space.xl};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  text-decoration: none;
  transition: background-color ${({ theme }) => theme.transitions.normal},
    transform ${({ theme }) => theme.transitions.normal};
  animation: fadeIn 1s ease-out 0.6s forwards;
  opacity: 0;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
    transform: translateY(-2px);
  }
`;

const FeaturedSection = styled.section`
  margin-top: ${({ theme }) => theme.space['2xl']};
`;

const SectionTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  margin-bottom: ${({ theme }) => theme.space.xl};
  position: relative;
  padding-bottom: ${({ theme }) => theme.space.sm};
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 60px;
    height: 3px;
    background-color: ${({ theme }) => theme.colors.primary};
    border-radius: ${({ theme }) => theme.borderRadius.full};
  }
`;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.space.lg};
`;

const ProjectCard = styled.div`
  background-color: ${({ theme }) => theme.colors.background.current}99;
  border: 1px solid ${({ theme }) => theme.colors.ui.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  overflow: hidden;
  cursor: pointer;
  transition: transform ${({ theme }) => theme.transitions.normal},
    box-shadow ${({ theme }) => theme.transitions.normal};
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${({ theme }) => theme.shadows.lg};
  }
`;

const ProjectImage = styled.div`
  height: 180px;
  background-color: ${({ theme }) => theme.colors.background.current === theme.colors.background.light ? '#f0f0f0' : theme.colors.background.code};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ theme }) => theme.fontSizes['3xl']};

  & > img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
`;

const ProjectContent = styled.div`
  padding: ${({ theme }) => theme.space.lg};
`;

const ProjectTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.lg};
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
  background-color: ${({ theme }) => theme.colors.background.current === theme.colors.background.light ? '#e0e0e0' : theme.colors.background.code};
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  padding: ${({ theme }) => theme.space.xs} ${({ theme }) => theme.space.sm};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-family: ${({ theme }) => theme.fonts.code};
`;

const ProjectLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  gap: ${({ theme }) => theme.space.xs};
  
  &:hover {
    text-decoration: underline;
  }
`;

const AboutSection = styled.section`
  margin-top: ${({ theme }) => theme.space['2xl']};
  display: flex;
  gap: ${({ theme }) => theme.space.xl};
  align-items: center;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: column;
  }
`;

const AboutContent = styled.div`
  flex: 1;
`;

const AboutImageContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    order: -1;
  }
`;

const AboutImage = styled.div`
  width: 300px;
  height: 300px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background-color: ${({ theme }) => theme.colors.background.current === theme.colors.background.light ? '#f0f0f0' : theme.colors.background.code};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ theme }) => theme.fontSizes['4xl']};
  border: 3px solid ${({ theme }) => theme.colors.primary};
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

// Component to handle project image loading with fallback
interface ProjectImageContentProps {
  logoUrl: string;
  fallbackImage: string;
  name: string;
}

const ProjectImageContent: React.FC<ProjectImageContentProps> = ({ logoUrl, fallbackImage, name }) => {
  const [logoLoaded, setLogoLoaded] = useState(false);
  
  useEffect(() => {
    const checkLogo = async () => {
      try {
        const response = await fetch(logoUrl);
        const text = await response.text();
        setLogoLoaded(response.ok && !text.includes("404: Not Found"));
      } catch (error) {
        setLogoLoaded(false);
      }
    };
    
    checkLogo();
  }, [logoUrl]);
  
  return logoLoaded ? (
    <img src={logoUrl} alt={name} />
  ) : (
    <>{fallbackImage}</>
  );
};

const Home: React.FC = () => {
  const navigate = useNavigate();
  
  // Fetch featured projects from GitHub
  const { projects: featuredProjects, loading, error } = useFeaturedProjects();

  // Handle project card click
  const handleProjectClick = (projectName: string) => {
    navigate(`/projects/${projectName}`);
  };
  return (
    <HomeContainer>
      <HeroSection>
        <StarBackground />
        <Title>Alexandre Lebegue</Title>
        <Subtitle>
          Ingénieur logiciel embarqué & Dev-Ops passionné par les technologies qui repoussent les limites humaines
        </Subtitle>
        <CTAButton to="/projects">Voir Mes Projets</CTAButton>
      </HeroSection>
      
      <FeaturedSection>
        <SectionTitle>Projets en Vedette</SectionTitle>
        
        {loading ? (
          <p>Chargement des projets en vedette...</p>
        ) : error ? (
          <p>Erreur lors du chargement des projets. Affichage des données de remplacement.</p>
        ) : (
          <ProjectsGrid>
            {featuredProjects.map(project => (
              <ProjectCard key={project.id} onClick={() => handleProjectClick(project.name)}>
                <ProjectImage>
                  <ProjectImageContent
                    logoUrl={`https://raw.githubusercontent.com/AlexandrLebegue/${project.name}/main/logo.png`}
                    fallbackImage={project.image}
                    name={project.name}
                  />
                </ProjectImage>
                <ProjectContent>
                  <ProjectTitle>{project.name}</ProjectTitle>
                  <ProjectDescription>
                    {project.description}
                  </ProjectDescription>
                  <TechStack>
                    {project.technologies.map(tech => (
                      <TechTag key={tech}>{tech}</TechTag>
                    ))}
                    {project.language && !project.technologies.includes(project.language) && (
                      <TechTag key={project.language}>{project.language}</TechTag>
                    )}
                  </TechStack>
                  <ProjectLink to={`/projects?repo=${project.name}`}>
                    Voir le Projet <span>→</span>
                  </ProjectLink>
                </ProjectContent>
              </ProjectCard>
            ))}
          </ProjectsGrid>
        )}
      </FeaturedSection>
      
      <AboutSection>
        <AboutContent>
          <SectionTitle>À Propos de Moi</SectionTitle>
            <p>
            En tant qu'ingénieur passionné par le développement de technologies de pointe, 
            je m'efforce de repousser les limites du possible. Fort d'une expertise en ingénierie 
            et en développement logiciel, je conçois des solutions innovantes qui intègrent 
            harmonieusement ces deux disciplines.
            </p>
          <br />
          <p>
            Mon travail se concentre sur le développement logiciel, la recherche en IA et l'intégration continue,
            toujours avec un regard tourné vers l'innovation et l'implémentation pratique.
          </p>
          <br />
          <CTAButton to="/about">En Savoir Plus Sur Moi</CTAButton>
        </AboutContent>
        
        <AboutImageContainer>
          <AboutImage>
            <img src={require('../../assets/images/me.JPG')} alt="Alexandre Lebegue" />
          </AboutImage>
        </AboutImageContainer>
      </AboutSection>
    </HomeContainer>
  );
};

export default Home;