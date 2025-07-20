import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useTheme } from '../../../context/ThemeProvider';
import Navigation from '../Navigation/Navigation';

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: ${({ theme }) => theme.colors.background.current};
  padding: ${({ theme }) => theme.space.md} ${({ theme }) => theme.space.xl};
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: ${({ theme }) => theme.zIndices.sticky};
  box-shadow: ${({ theme }) => theme.shadows.md};
  transition: background-color ${({ theme }) => theme.transitions.normal};
  backdrop-filter: blur(8px);
  border-bottom: 1px solid ${({ theme }) => theme.colors.ui.border};
`;

const Logo = styled(Link)`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.text.current};
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.sm};

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const LogoIcon = styled.span`
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.md};
`;

const ThemeToggle = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.text.current};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  cursor: pointer;
  padding: ${({ theme }) => theme.space.xs};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color ${({ theme }) => theme.transitions.normal},
    background-color ${({ theme }) => theme.transitions.normal};

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    background-color: ${({ theme }) => theme.colors.ui.hover};
  }
`;

const Header: React.FC = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <HeaderContainer>
      <Logo to="/">
        <LogoIcon>&#128640;</LogoIcon> {/* Rocket emoji */}
        <span>Alexandre Lebegue</span>
      </Logo>
      
      <RightSection>
        <Navigation />
        <ThemeToggle onClick={toggleTheme} aria-label="Toggle theme">
          {isDarkMode ? '☀️' : '🌙'} {/* Sun/moon emoji for theme toggle */}
        </ThemeToggle>
      </RightSection>
    </HeaderContainer>
  );
};

export default Header;