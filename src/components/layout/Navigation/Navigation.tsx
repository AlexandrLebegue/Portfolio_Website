import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from '../../../utils/cn';

// Navigation links
const navItems = [
  { path: '/', label: 'Accueil' },
  { path: '/projects', label: 'Projets' },
  { path: '/about', label: 'À propos' },
  { path: '/contact', label: 'Contact' },
];

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
      <nav className="hidden md:flex items-center">
        <ul className="flex gap-6 list-none m-0 p-0">
          {navItems.map((item) => (
            <li key={item.path} className="relative">
              <NavLink
                to={item.path}
                end={item.path === '/'}
                className={({ isActive }) =>
                  cn(
                    'no-underline text-base font-medium px-2 py-1 rounded-md',
                    'transition-all duration-200',
                    'text-gray-500 dark:text-text-secondary-dark',
                    'hover:text-text-dark hover:bg-ui-hover-light',
                    'dark:hover:text-text-primary-dark dark:hover:bg-ui-hover',
                    isActive && [
                      'text-primary dark:text-primary font-semibold',
                      'after:content-[""] after:absolute after:-bottom-1 after:left-0',
                      'after:w-full after:h-0.5 after:bg-primary after:rounded-full',
                    ]
                  )
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Mobile Navigation Button */}
      <button
        onClick={toggleMobileNav}
        aria-label="Open navigation menu"
        className="flex md:hidden items-center justify-center
          bg-transparent border-none text-xl cursor-pointer p-1 rounded-md
          text-text-dark dark:text-text-primary-dark
          transition-all duration-200
          hover:text-primary hover:bg-ui-hover-light dark:hover:bg-ui-hover"
      >
        ☰
      </button>

      {/* Mobile Navigation Overlay */}
      <div
        className={cn(
          'fixed inset-0 z-modal backdrop-blur-sm transition-opacity duration-300',
          isMobileNavOpen
            ? 'opacity-100 pointer-events-auto bg-black/70'
            : 'opacity-0 pointer-events-none'
        )}
        onClick={closeMobileNav}
      />

      {/* Mobile Navigation Panel */}
      <div
        className={cn(
          'fixed top-0 right-0 w-3/4 max-w-[320px] h-full z-[1301]',
          'flex flex-col p-8 shadow-xl border-l transition-transform duration-300',
          'bg-bg-light border-ui-border-light',
          'dark:bg-bg-dark dark:border-ui-border',
          isMobileNavOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        {/* Mobile Nav Header */}
        <div className="flex justify-between items-center mb-8 pb-4 border-b border-ui-border-light dark:border-ui-border">
          <h2 className="text-xl font-semibold m-0 text-text-dark dark:text-text-primary-dark">
            Menu
          </h2>
          <button
            onClick={closeMobileNav}
            aria-label="Fermer le menu de navigation"
            className="bg-transparent border-none text-xl cursor-pointer p-1 rounded-full
              flex items-center justify-center transition-all duration-200
              text-text-dark dark:text-text-primary-dark
              hover:text-primary hover:bg-ui-hover-light dark:hover:bg-ui-hover"
          >
            ✕
          </button>
        </div>

        {/* Mobile Nav Links */}
        <ul className="list-none m-0 p-0 flex flex-col gap-2">
          {navItems.map((item) => (
            <li key={item.path} className="w-full">
              <NavLink
                to={item.path}
                end={item.path === '/'}
                onClick={closeMobileNav}
                className={({ isActive }) =>
                  cn(
                    'no-underline text-lg font-medium flex items-center w-full',
                    'px-6 py-4 rounded-md border transition-all duration-200 relative',
                    'bg-bg-code-light border-ui-border-light',
                    'dark:bg-bg-code dark:border-ui-border',
                    'text-text-dark dark:text-text-primary-dark',
                    'hover:text-primary hover:bg-ui-hover-light hover:border-primary',
                    'hover:-translate-y-0.5 hover:shadow-md',
                    'dark:hover:bg-ui-hover dark:hover:border-primary',
                    isActive && [
                      'text-primary font-semibold bg-ui-hover-light dark:bg-ui-hover',
                      'border-primary shadow-sm',
                      'before:content-[""] before:absolute before:left-0 before:top-0',
                      'before:bottom-0 before:w-1 before:bg-primary before:rounded-l',
                    ]
                  )
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Navigation;
