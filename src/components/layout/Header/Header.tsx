import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../../context/ThemeProvider';
import Navigation from '../Navigation/Navigation';

const Header: React.FC = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <header
      className="fixed top-0 left-0 right-0 z-sticky flex justify-between items-center
        px-4 md:px-8 py-4 shadow-md backdrop-blur-md border-b transition-colors duration-300
        bg-bg-light/90 border-ui-border-light
        dark:bg-bg-dark/90 dark:border-ui-border"
    >
      <Link
        to="/"
        className="font-heading text-xl font-bold no-underline flex items-center gap-2
          text-text-dark dark:text-text-primary-dark
          hover:text-primary transition-colors duration-200"
      >
        <span className="text-primary text-2xl">&#128640;</span>
        <span>Alexandre Lebegue</span>
      </Link>

      <div className="flex items-center gap-4">
        <Navigation />
        <button
          onClick={toggleTheme}
          aria-label="Toggle theme"
          className="bg-transparent border-none text-lg cursor-pointer p-1 rounded-full
            flex items-center justify-center transition-all duration-200
            text-text-dark dark:text-text-primary-dark
            hover:text-primary hover:bg-ui-hover-light dark:hover:bg-ui-hover"
        >
          {isDarkMode ? '☀️' : '🌙'}
        </button>
      </div>
    </header>
  );
};

export default Header;
