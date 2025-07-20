import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

// Navigation links
const navItems = [
  { path: '/', label: 'Accueil' },
  { path: '/projects', label: 'Projets' },
  { path: '/about', label: 'À propos' },
  { path: '/contact', label: 'Contact' },
];

const Nav = styled.nav`
  display: flex;
  align-items: center;
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`;

const NavList = styled.ul`
  display: flex;
  gap: ${({ theme }) => theme.space.lg};
  list-style: none;
  margin: 0;
  padding: 0;
`;

const NavItem = styled.li`
  position: relative;
`;

const NavLinkStyled = styled(NavLink)`
  color: ${({ theme }) => theme.colors.text.secondary};
  text-decoration: none;
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  padding: ${({ theme }) => theme.space.xs} ${({ theme }) => theme.space.sm};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  transition: color ${({ theme }) => theme.transitions.normal},
    background-color ${({ theme }) => theme.transitions.normal};

  &:hover {
    color: ${({ theme }) => theme.colors.text.primary};
    background-color: ${({ theme }) => theme.colors.ui.hover};
  }

  &.active {
    color: ${({ theme }) => theme.colors.primary};
    font-weight: ${({ theme }) => theme.fontWeights.semibold};

    &::after {
      content: '';
      position: absolute;
      bottom: -4px;
      left: 0;
      width: 100%;
      height: 2px;
      background-color: ${({ theme }) => theme.colors.primary};
      border-radius: ${({ theme }) => theme.borderRadius.full};
    }
  }
`;

// Mobile navigation components
const MobileNavButton = styled.button`
  display: none;
  background: none;

  border: none;
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${({ theme }) => theme.fontSizes.xl};
  cursor: pointer;
  padding: ${({ theme }) => theme.space.xs};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  transition: color ${({ theme }) => theme.transitions.normal},
    background-color ${({ theme }) => theme.transitions.normal};


  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    background-color: ${({ theme }) => theme.colors.ui.hover};

  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const MobileNavOverlay = styled.div<{ $isOpen: boolean }>`
  display: ${({ $isOpen }) => ($isOpen ? 'block' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);

  z-index: ${({ theme }) => theme.zIndices.modal};
  backdrop-filter: blur(4px);
`;

const MobileNavPanel = styled.div<{ $isOpen: boolean }>`
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  right: 0;
  width: 75%;
  max-width: 300px;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.background.current};

  z-index: ${({ theme }) => theme.zIndices.modal + 1};
  padding: ${({ theme }) => theme.space.xl};
  transform: translateX(${({ $isOpen }) => ($isOpen ? '0' : '100%')});
  transition: transform ${({ theme }) => theme.transitions.normal};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  border-left: 1px solid ${({ theme }) => theme.colors.ui.border};
`;

const MobileNavHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.space.xl};
`;

const MobileNavCloseButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${({ theme }) => theme.fontSizes.xl};
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

const MobileNavList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.lg};
  // background-color: rgba(53, 52, 53, 0.86);

`;

const MobileNavItem = styled.li``;

const MobileNavLink = styled(NavLink)`
  color: ${({ theme }) => theme.colors.text.primary};
  text-decoration: none;
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  padding: ${({ theme }) => theme.space.sm} ${({ theme }) => theme.space.md};
  display: block;
  background-color: ${({ theme }) => theme.colors.background.code};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  transition: color ${({ theme }) => theme.transitions.normal},
    background-color ${({ theme }) => theme.transitions.normal};

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    background-color: ${({ theme }) => theme.colors.ui.hover};
  }

  &.active {
    color: ${({ theme }) => theme.colors.primary};
    font-weight: ${({ theme }) => theme.fontWeights.semibold};
    background-color: ${({ theme }) => theme.colors.ui};
  }
`;

const Navigation: React.FC = () => {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const toggleMobileNav = () => {
    setIsMobileNavOpen(!isMobileNavOpen);
  };

  const closeMobileNav = () => {
    setIsMobileNavOpen(false);
  };

  return (
    <>
      {/* Desktop Navigation */}
      <Nav>
        <NavList>
          {navItems.map((item) => (
            <NavItem key={item.path}>
              <NavLinkStyled to={item.path} end={item.path === '/'}>
                {item.label}
              </NavLinkStyled>
            </NavItem>
          ))}
        </NavList>
      </Nav>

      {/* Mobile Navigation Button */}
      <MobileNavButton onClick={toggleMobileNav} aria-label="Open navigation menu">
        ☰
      </MobileNavButton>

      {/* Mobile Navigation Panel */}
      <MobileNavOverlay $isOpen={isMobileNavOpen} onClick={closeMobileNav} />
      <MobileNavPanel $isOpen={isMobileNavOpen}>
        <MobileNavHeader>
          <h2>Menu</h2>
          <MobileNavCloseButton onClick={closeMobileNav} aria-label="Fermer le menu de navigation">
            ✕
          </MobileNavCloseButton>
        </MobileNavHeader>
        <MobileNavList>
          {navItems.map((item) => (
            <MobileNavItem key={item.path}>
              <MobileNavLink 
                to={item.path} 
                end={item.path === '/'} 
                onClick={closeMobileNav}
              >
                {item.label}
              </MobileNavLink>
            </MobileNavItem>
          ))}
        </MobileNavList>
      </MobileNavPanel>
    </>
  );
};

export default Navigation;