import React from 'react';
import styled from 'styled-components';

const AboutContainer = styled.div`
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

const Subtitle = styled.p`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  max-width: 800px;
`;

const Section = styled.section`
  margin-bottom: ${({ theme }) => theme.space['2xl']};
`;

const SectionTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  margin-bottom: ${({ theme }) => theme.space.lg};
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

const ProfileSection = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.space.xl};
  margin-bottom: ${({ theme }) => theme.space.xl};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: column;
  }
`;

const ProfileContent = styled.div`
  flex: 2;
`;

const ProfileImageContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    order: -1;
    margin-bottom: ${({ theme }) => theme.space.lg};
  }
`;

const ProfileImage = styled.div`
  width: 300px;
  height: 300px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background-color: ${({ theme }) => theme.colors.background.code};
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

const Paragraph = styled.p`
  margin-bottom: ${({ theme }) => theme.space.md};
  line-height: ${({ theme }) => theme.lineHeights.loose};
`;

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: ${({ theme }) => theme.space.lg};
`;

const SkillCategory = styled.div`
  background-color: ${({ theme }) => theme.colors.background.dark}99;
  border: 1px solid ${({ theme }) => theme.colors.ui.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.space.lg};
`;

const SkillCategoryTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  margin-bottom: ${({ theme }) => theme.space.md};
  color: ${({ theme }) => theme.colors.primary};
`;

const SkillList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const SkillItem = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.space.sm};
  
  &:before {
    content: '▹';
    color: ${({ theme }) => theme.colors.primary};
    margin-right: ${({ theme }) => theme.space.sm};
  }
`;

const InterestsList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: ${({ theme }) => theme.space.lg};
`;

const InterestItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const InterestIcon = styled.div`
  font-size: ${({ theme }) => theme.fontSizes['3xl']};
  margin-bottom: ${({ theme }) => theme.space.sm};
`;

const InterestTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.md};
  margin-bottom: ${({ theme }) => theme.space.xs};
`;

const InterestDescription = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const About: React.FC = () => {
  return (
    <AboutContainer>
      <PageHeader>
        <Title>À Propos de Moi</Title>
        <Subtitle>
          Ingénieur logiciel embarqué mais surtout développeur passionné en technologies IA 
        </Subtitle>
      </PageHeader>
      
      <Section>
        <ProfileSection>
          <ProfileContent>
            <SectionTitle>Mon Parcours</SectionTitle>
            <Paragraph>
              Je suis Alexandre Lebegue, un ingénieur logiciel embarqué animé par une passion profonde pour le développement de technologies
              de pointe qui repoussent les limites du possible. Mon parcours a été guidé par une fascination pour l'exploration spatiale
              et les innovations technologiques. Cette passion m'a conduit à poursuivre des études en ingénierie logicielle, où j'ai découvert
              la joie de créer et de partager mes connaissances avec les autres. Chaque projet est pour moi une opportunité de contribuer
              à un l'avenir et de laisser une marque dans le monde.
            </Paragraph>
            <Paragraph>
              Tout au long de ma carrière, j'ai eu l'opportunité de combiner mes compétences techniques avec ma créativité sur divers projets. 
              En commençant par le développement d'un simulateur de voûte céleste, j'ai découvert la puissance du C++ (et la joie des fuites mémoires ...). Ma contribution à la création de viseurs d'étoiles 
              m'a enseigné le développement dans des environnements contraints en C. 
              Participer au lancement de l'usine logicielle pour l'intégration continue m'a offert une vue d'ensemble sur le cycle de développement.
              Actuellement, je travaille sur l'utilisation des LLMs pour l'aide au développement, afin de continuer à développer mes compétences.
            </Paragraph>
            <Paragraph>
              Je crois que l'intersection entre l'ingénierie aérospatiale et le développement logiciel
              offre d'énormes opportunités d'innovation. Qu'il s'agisse de développer des outils de simulation
              pour la dynamique spatiale, de créer des systèmes de contrôle, ou
              de construire des plateformes de visualisation de données complexes,
              je suis toujours enthousiaste à l'idée de relever de nouveaux défis.
            </Paragraph>
          </ProfileContent>
          
          <ProfileImageContainer>
            <ProfileImage>
              <img src={require('../../assets/images/me.JPG')} alt="Alexandre Lebegue" />
            </ProfileImage>
          </ProfileImageContainer>
        </ProfileSection>
      </Section>
      
      <Section>
        <SectionTitle>Compétences & Expertise</SectionTitle>
        <SkillsGrid>         
          <SkillCategory>
            <SkillCategoryTitle>Développement Logiciel</SkillCategoryTitle>
            <SkillList>
              <SkillItem>Python</SkillItem>
              <SkillItem>C/C++ 11</SkillItem>
              <SkillItem>Cmake / GCC / MSVC</SkillItem>
            </SkillList>
          </SkillCategory>
          
          <SkillCategory>
            <SkillCategoryTitle>Intelligence Artificielle</SkillCategoryTitle>
            <SkillList>
              <SkillItem>Développement d'agents avec outils</SkillItem>
              <SkillItem>Apprentissage Automatique</SkillItem>
              <SkillItem>Apprentissage par renforcement</SkillItem>
              <SkillItem>Visualisation de Données</SkillItem>
            </SkillList>
          </SkillCategory>
          
          <SkillCategory>
            <SkillCategoryTitle>Outils & Technologies</SkillCategoryTitle>
            <SkillList>
              <SkillItem>Git & SVN</SkillItem>
              <SkillItem>Github & Tuleap</SkillItem>
              <SkillItem>Jenkins & Github Workflow</SkillItem>
              <SkillItem>Docker</SkillItem>
              <SkillItem>Pipelines CI/CD</SkillItem>
              <SkillItem>Google Cloud (en cours 🚸)</SkillItem>
            </SkillList>
          </SkillCategory>
        </SkillsGrid>
      </Section>
      
      <Section>
        <SectionTitle>Intérêts & Passions</SectionTitle>
        <InterestsList>
          <InterestItem>
            <InterestIcon>🚀</InterestIcon>
            <InterestTitle>Exploration Spatiale</InterestTitle>
            <InterestDescription>
              Fasciné par les défis et les possibilités de l'exploration au-delà de la Terre
            </InterestDescription>
          </InterestItem>
          
          <InterestItem>
            <InterestIcon>🤖</InterestIcon>
            <InterestTitle>Intelligence Artificielle</InterestTitle>
            <InterestDescription>
              Explorer le potentiel de l'IA pour résoudre des problèmes et aider au développement
            </InterestDescription>
          </InterestItem>
          
          <InterestItem>
            <InterestIcon>📊</InterestIcon>
            <InterestTitle>Visualisation de Données</InterestTitle>
            <InterestDescription>
              Créer des moyens intuitifs de comprendre et d'interagir avec des données complexes
            </InterestDescription>
          </InterestItem>
          
            <InterestItem>
            <InterestIcon>🚙</InterestIcon>
            <InterestTitle>Exploration terrestre</InterestTitle>
            <InterestDescription>
              Rencontrer de nouvelles personnes, cultures et lieux. 
            </InterestDescription>
            </InterestItem>

        </InterestsList>
      </Section>
    </AboutContainer>
  );
};

export default About;