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
`;

const Paragraph = styled.p`
  margin-bottom: ${({ theme }) => theme.space.md};
  line-height: ${({ theme }) => theme.lineHeights.loose};
`;

const SkillsSection = styled.div``;

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

const InterestsSection = styled.div``;

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
              Je suis Alexandre Lebegue, un ingénieur aérospatial passionné par le développement de technologies
              de pointe qui repoussent les limites du possible. Mon parcours a commencé par une
              fascination pour l'exploration spatiale et l'aviation, ce qui m'a conduit à poursuivre des études
              en ingénierie aérospatiale.
            </Paragraph>
            <Paragraph>
              Tout au long de ma carrière, j'ai travaillé sur divers projets allant des systèmes spatiaux
              aux drones autonomes. Ma formation d'ingénieur, combinée à mes compétences en développement logiciel,
              me permet de faire le pont entre ces disciplines et de créer des solutions innovantes
              à des problèmes complexes.
            </Paragraph>
            <Paragraph>
              Je crois que l'intersection entre l'ingénierie aérospatiale et le développement logiciel
              offre d'énormes opportunités d'innovation. Qu'il s'agisse de développer des outils de simulation
              pour la dynamique spatiale, de créer des systèmes de contrôle pour véhicules autonomes, ou
              de construire des plateformes de visualisation de données pour des ensembles de données complexes,
              je suis toujours enthousiaste à l'idée de relever de nouveaux défis.
            </Paragraph>
          </ProfileContent>
          
          <ProfileImageContainer>
            <ProfileImage>👨‍🚀</ProfileImage>
          </ProfileImageContainer>
        </ProfileSection>
      </Section>
      
      <Section>
        <SectionTitle>Compétences & Expertise</SectionTitle>
        <SkillsGrid>
          <SkillCategory>
            <SkillCategoryTitle>Ingénierie Aérospatiale</SkillCategoryTitle>
            <SkillList>
              <SkillItem>Mécanique Orbitale</SkillItem>
              <SkillItem>Systèmes Spatiaux</SkillItem>
              <SkillItem>Dynamique de Vol</SkillItem>
              <SkillItem>Systèmes de Contrôle</SkillItem>
              <SkillItem>Systèmes de Propulsion</SkillItem>
            </SkillList>
          </SkillCategory>
          
          <SkillCategory>
            <SkillCategoryTitle>Développement Logiciel</SkillCategoryTitle>
            <SkillList>
              <SkillItem>React & TypeScript</SkillItem>
              <SkillItem>Python</SkillItem>
              <SkillItem>C++</SkillItem>
              <SkillItem>MATLAB</SkillItem>
              <SkillItem>Développement Full Stack</SkillItem>
            </SkillList>
          </SkillCategory>
          
          <SkillCategory>
            <SkillCategoryTitle>Science des Données</SkillCategoryTitle>
            <SkillList>
              <SkillItem>Apprentissage Automatique</SkillItem>
              <SkillItem>Visualisation de Données</SkillItem>
              <SkillItem>Analyse Statistique</SkillItem>
              <SkillItem>Vision par Ordinateur</SkillItem>
              <SkillItem>Traitement du Signal</SkillItem>
            </SkillList>
          </SkillCategory>
          
          <SkillCategory>
            <SkillCategoryTitle>Outils & Technologies</SkillCategoryTitle>
            <SkillList>
              <SkillItem>Git & GitHub</SkillItem>
              <SkillItem>Docker</SkillItem>
              <SkillItem>Pipelines CI/CD</SkillItem>
              <SkillItem>Plateformes Cloud</SkillItem>
              <SkillItem>Outils de Simulation</SkillItem>
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
              Explorer le potentiel de l'IA pour résoudre des problèmes d'ingénierie complexes
            </InterestDescription>
          </InterestItem>
          
          <InterestItem>
            <InterestIcon>🛸</InterestIcon>
            <InterestTitle>Systèmes Autonomes</InterestTitle>
            <InterestDescription>
              Développer des systèmes capables de fonctionner de manière indépendante dans des environnements difficiles
            </InterestDescription>
          </InterestItem>
          
          <InterestItem>
            <InterestIcon>📊</InterestIcon>
            <InterestTitle>Visualisation de Données</InterestTitle>
            <InterestDescription>
              Créer des moyens intuitifs de comprendre et d'interagir avec des données complexes
            </InterestDescription>
          </InterestItem>
        </InterestsList>
      </Section>
    </AboutContainer>
  );
};

export default About;