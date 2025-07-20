import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const FooterContainer = styled.footer`
  background-color: ${({ theme }) => theme.colors.background.current};
  border-top: 1px solid ${({ theme }) => theme.colors.ui.border};
  padding: ${({ theme }) => theme.space.xl} 0;
  margin-top: ${({ theme }) => theme.space['3xl']};
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.space.md};
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${({ theme }) => theme.space.xl};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.md};
`;

const FooterHeading = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.text.current};
  margin-bottom: ${({ theme }) => theme.space.md};
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 0;
    width: 40px;
    height: 2px;
    background-color: ${({ theme }) => theme.colors.primary};
    border-radius: ${({ theme }) => theme.borderRadius.full};
    
    @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
      left: 50%;
      transform: translateX(-50%);
    }
  }
`;

const FooterLink = styled(Link)`
  color: ${({ theme }) => theme.colors.text.secondary};
  text-decoration: none;
  transition: color ${({ theme }) => theme.transitions.normal};
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const ExternalLink = styled.a`
  color: ${({ theme }) => theme.colors.text.secondary};
  text-decoration: none;
  transition: color ${({ theme }) => theme.transitions.normal};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.xs};
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    justify-content: center;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.space.md};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    justify-content: center;
  }
`;

const SocialLink = styled.a`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.fontSizes.xl};
  transition: color ${({ theme }) => theme.transitions.normal};
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const Copyright = styled.div`
  text-align: center;
  margin-top: ${({ theme }) => theme.space.xl};
  padding-top: ${({ theme }) => theme.space.md};
  border-top: 1px solid ${({ theme }) => theme.colors.ui.border};
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <FooterHeading>Alexandre Lebegue</FooterHeading>
          <p>Ingénieur logiciel passionné de nouvelles technologies</p>
          <SocialLinks>
            <SocialLink href="https://github.com/AlexandrLebegue" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <i>&#xf09b;</i> {/* GitHub icon (using a placeholder) */}
            </SocialLink>
            <SocialLink href="https://www.linkedin.com/in/alexandre-lebegue-6a3718151/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <i>&#xf08c;</i> {/* LinkedIn icon (using a placeholder) */}
            </SocialLink>
          </SocialLinks>
        </FooterSection>
        
        <FooterSection>
          <FooterHeading>Navigation</FooterHeading>
          <FooterLink to="/">Accueil</FooterLink>
          <FooterLink to="/projects">Projets</FooterLink>
          <FooterLink to="/cv">CV</FooterLink>
          <FooterLink to="/about">About</FooterLink>
          <FooterLink to="/blog">Blog</FooterLink>
          <FooterLink to="/contact">Contact</FooterLink>
        </FooterSection>
        
        <FooterSection>
          <FooterHeading>Contact</FooterHeading>
          <ExternalLink href="mailto:alexandrelebegue12@gmail.com">
            <span>&#9993;</span> {/* Email icon */}
            alexandrelebegue12@gmail.com         
           </ExternalLink>
          <ExternalLink href="https://github.com/AlexandrLebegue" target="_blank" rel="noopener noreferrer">
           
            GitHub
          </ExternalLink>
          <ExternalLink href="https://www.linkedin.com/in/alexandre-lebegue-6a3718151/" target="_blank" rel="noopener noreferrer">
            LinkedIn
          </ExternalLink>
        </FooterSection>
      </FooterContent>
      
      <Copyright>
        &copy; {currentYear} Alexandre Lebegue. Tout droit reservé.
      </Copyright>
    </FooterContainer>
  );
};

export default Footer;