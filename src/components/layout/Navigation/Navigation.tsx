import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from '../../../utils/cn';

const navItems = [
  { path: '/', label: 'Accueil' },
  { path: '/projects', label: 'Projets' },
  { path: '/about', label: 'À propos' },
  { path: '/contact', label: 'Contact' },
];

const HamburgerIcon: React.FC<{ isOpen: boolean }> = ({ isOpen }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    {/* Top bar */}
    <line
      x1="3" y1="6" x2="21" y2="6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      className="transition-all duration-300 origin-center"
      style={{
        transform: isOpen ? 'translateY(6px) rotate(45deg)' : 'none',
        transformBox: 'fill-box',
        transformOrigin: 'center',
      }}
    />
    {/* Middle bar */}
    <line
      x1="3" y1="12" x2="21" y2="12"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      className="transition-all duration-300"
      style={{
        opacity: isOpen ? 0 : 1,
        transform: isOpen ? 'translateX(8px)' : 'none',
      }}
    />
    {/* Bottom bar */}
    <line
      x1="3" y1="18" x2="21" y2="18"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      className="transition-all duration-300 origin-center"
      style={{
        transform: isOpen ? 'translateY(-6px) rotate(-45deg)' : 'none',
        transformBox: 'fill-box',
        transformOrigin: 'center',
      }}
    />
  </svg>
);

const Navigation: React.FC = () => {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const toggleMobileNav = () => setIsMobileNavOpen((prev) => !prev);
  const closeMobileNav = () => setIsMobileNavOpen(false);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isMobileNavOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileNavOpen]);

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

      {/* Hamburger Button (mobile only) */}
      <button
        onClick={toggleMobileNav}
        aria-label={isMobileNavOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
        aria-expanded={isMobileNavOpen}
        aria-controls="mobile-nav-panel"
        className={cn(
          'flex md:hidden items-center justify-center',
          'w-10 h-10 rounded-md border transition-all duration-200',
          'cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary',
          isMobileNavOpen
            ? 'text-primary bg-ui-hover-light dark:bg-ui-hover border-primary'
            : 'text-text-dark dark:text-text-primary-dark bg-transparent border-ui-border-light dark:border-ui-border',
          'hover:text-primary hover:bg-ui-hover-light dark:hover:bg-ui-hover hover:border-primary'
        )}
      >
        <HamburgerIcon isOpen={isMobileNavOpen} />
      </button>

      {/* Backdrop */}
      <div
        className={cn(
          'fixed inset-0 z-modal transition-all duration-300 md:hidden',
          isMobileNavOpen
            ? 'opacity-100 pointer-events-auto bg-black/60 backdrop-blur-sm'
            : 'opacity-0 pointer-events-none'
        )}
        onClick={closeMobileNav}
        aria-hidden="true"
      />

      {/* Mobile Nav Panel */}
      <div
        id="mobile-nav-panel"
        role="dialog"
        aria-modal="true"
        aria-label="Menu de navigation"
        className={cn(
          'fixed top-0 right-0 h-full w-4/5 max-w-[300px] z-[1301] md:hidden',
          'flex flex-col shadow-2xl border-l transition-transform duration-300 ease-in-out',
          'bg-bg-light border-ui-border-light',
          'dark:bg-bg-dark dark:border-ui-border',
          isMobileNavOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        {/* Panel header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-ui-border-light dark:border-ui-border">
          <span className="text-base font-semibold text-text-dark dark:text-text-primary-dark tracking-wide">
            Navigation
          </span>
          <button
            onClick={closeMobileNav}
            aria-label="Fermer le menu"
            className={cn(
              'flex items-center justify-center w-8 h-8 rounded-md',
              'text-text-dark dark:text-text-primary-dark',
              'hover:text-primary hover:bg-ui-hover-light dark:hover:bg-ui-hover',
              'transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary'
            )}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <line x1="1" y1="1" x2="17" y2="17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <line x1="17" y1="1" x2="1" y2="17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex-1 overflow-y-auto py-4 px-4">
          <ul className="list-none m-0 p-0 flex flex-col gap-1">
            {navItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  end={item.path === '/'}
                  onClick={closeMobileNav}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center w-full px-4 py-3 rounded-lg',
                      'text-base font-medium no-underline',
                      'transition-all duration-200',
                      isActive
                        ? 'text-primary bg-ui-hover-light dark:bg-ui-hover font-semibold border-l-2 border-primary pl-3'
                        : 'text-text-dark dark:text-text-primary-dark hover:text-primary hover:bg-ui-hover-light dark:hover:bg-ui-hover'
                    )
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Navigation;
