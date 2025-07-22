import React from 'react';
import styled from 'styled-components';

const ContactContainer = styled.div`
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

const ContactContent = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.space['2xl']};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: column;
  }
`;

const ContactInfo = styled.div`
  flex: 1;
`;

const ContactMethods = styled.div`
  margin-top: ${({ theme }) => theme.space.xl};
`;

const ContactMethod = styled.div`
  margin-bottom: ${({ theme }) => theme.space.lg};
`;

const ContactMethodTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  margin-bottom: ${({ theme }) => theme.space.sm};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.sm};
`;

const ContactMethodIcon = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  color: ${({ theme }) => theme.colors.primary};
`;

const ContactLink = styled.a`
  color: ${({ theme }) => theme.colors.text.primary};
  text-decoration: none;
  transition: color ${({ theme }) => theme.transitions.normal};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.sm};
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const ContactImageContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`;

const ContactImage = styled.div`
  width: 100%;
  max-width: 400px;
  height: 400px;
  background-color: ${({ theme }) => theme.colors.background.code};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ theme }) => theme.fontSizes['5xl']};
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
    z-index: 0;
  }
  
  span {
    position: relative;
    z-index: 1;
  }
`;

const Contact: React.FC = () => {
  return (
    <ContactContainer>
      <PageHeader>
        <Title>Contactez-Moi</Title>
        <Subtitle>
          Je suis toujours ouvert à discuter de nouveaux projets, opportunités ou collaborations.
          N'hésitez pas à me contacter via l'un des canaux ci-dessous.
        </Subtitle>
      </PageHeader>
      
      <ContactContent>
        <ContactInfo>
          <p>
            Que vous ayez une question sur mon travail, que vous souhaitiez discuter d'un projet potentiel,
            ou simplement dire bonjour, je serais ravi d'avoir de vos nouvelles. Je suis actuellement ouvert à
            des opportunités de freelance dans le développement d'agents IA.
          </p>
          
          <ContactMethods>
            <ContactMethod>
              <ContactMethodTitle>
                <ContactMethodIcon>✉️</ContactMethodIcon>
                Courriel
              </ContactMethodTitle>
              <ContactLink href="mailto:contact@alexandrelebegue.com">
                alexandrelebegue12@gmail.com
              </ContactLink>
            </ContactMethod>
            
            <ContactMethod>
              <ContactMethodTitle>
                <ContactMethodIcon>🔗</ContactMethodIcon>
                LinkedIn
              </ContactMethodTitle>
              <ContactLink href="https://www.linkedin.com/in/alexandre-lebegue-6a3718151/" target="_blank" rel="noopener noreferrer">
                linkedin.com/in/alexandrlebegue
              </ContactLink>
            </ContactMethod>
            
            <ContactMethod>
              <ContactMethodTitle>
                <ContactMethodIcon>💻</ContactMethodIcon>
                GitHub
              </ContactMethodTitle>
              <ContactLink href="https://github.com/AlexandrLebegue" target="_blank" rel="noopener noreferrer">
                github.com/AlexandrLebegue
              </ContactLink>
            </ContactMethod>
          </ContactMethods>
          
        </ContactInfo>
        
        <ContactImageContainer>
          <ContactImage>
            <span>📡</span>
          </ContactImage>
        </ContactImageContainer>
      </ContactContent>
    </ContactContainer>
  );
};

export default Contact;