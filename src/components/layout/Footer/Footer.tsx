import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t py-8 mt-12 transition-colors duration-300
      bg-bg-light border-ui-border-light
      dark:bg-bg-dark dark:border-ui-border">
      <div className="max-w-[1200px] mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 md:text-left text-center">
        {/* Brand Section */}
        <div className="flex flex-col gap-4">
          <h3 className="text-lg mb-4 relative text-text-dark dark:text-text-primary-dark
            after:content-[''] after:absolute after:-bottom-2 after:left-0
            after:w-10 after:h-0.5 after:bg-primary after:rounded-full
            md:after:left-0 max-md:after:left-1/2 max-md:after:-translate-x-1/2">
            Alexandre Lebegue
          </h3>
          <p className="text-text-dark dark:text-text-primary-dark">
            Ingénieur logiciel passionné de nouvelles technologies
          </p>
          <div className="flex gap-4 md:justify-start justify-center">
            <a
              href="https://github.com/AlexandrLebegue"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-xl transition-colors duration-200
                text-gray-500 dark:text-text-secondary-dark hover:text-primary"
            >
              <i>&#xf09b;</i>
            </a>
            <a
              href="https://www.linkedin.com/in/alexandre-lebegue-6a3718151/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-xl transition-colors duration-200
                text-gray-500 dark:text-text-secondary-dark hover:text-primary"
            >
              <i>&#xf08c;</i>
            </a>
          </div>
        </div>

        {/* Navigation Section */}
        <div className="flex flex-col gap-4">
          <h3 className="text-lg mb-4 relative text-text-dark dark:text-text-primary-dark
            after:content-[''] after:absolute after:-bottom-2 after:left-0
            after:w-10 after:h-0.5 after:bg-primary after:rounded-full
            md:after:left-0 max-md:after:left-1/2 max-md:after:-translate-x-1/2">
            Navigation
          </h3>
          <Link to="/" className="text-gray-500 dark:text-text-secondary-dark hover:text-primary transition-colors duration-200 no-underline">
            Accueil
          </Link>
          <Link to="/projects" className="text-gray-500 dark:text-text-secondary-dark hover:text-primary transition-colors duration-200 no-underline">
            Projets
          </Link>
          <Link to="/about" className="text-gray-500 dark:text-text-secondary-dark hover:text-primary transition-colors duration-200 no-underline">
            À propos
          </Link>
          <Link to="/contact" className="text-gray-500 dark:text-text-secondary-dark hover:text-primary transition-colors duration-200 no-underline">
            Contact
          </Link>
        </div>

        {/* Contact Section */}
        <div className="flex flex-col gap-4">
          <h3 className="text-lg mb-4 relative text-text-dark dark:text-text-primary-dark
            after:content-[''] after:absolute after:-bottom-2 after:left-0
            after:w-10 after:h-0.5 after:bg-primary after:rounded-full
            md:after:left-0 max-md:after:left-1/2 max-md:after:-translate-x-1/2">
            Contact
          </h3>
          <a
            href="mailto:alexandrelebegue12@gmail.com"
            className="flex items-center gap-2 no-underline transition-colors duration-200
              text-gray-500 dark:text-text-secondary-dark hover:text-primary
              md:justify-start justify-center"
          >
            <span>&#9993;</span> alexandrelebegue12@gmail.com
          </a>
          <a
            href="https://github.com/AlexandrLebegue"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 no-underline transition-colors duration-200
              text-gray-500 dark:text-text-secondary-dark hover:text-primary
              md:justify-start justify-center"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/alexandre-lebegue-6a3718151/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 no-underline transition-colors duration-200
              text-gray-500 dark:text-text-secondary-dark hover:text-primary
              md:justify-start justify-center"
          >
            LinkedIn
          </a>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center mt-8 pt-4 border-t text-sm
        border-ui-border-light dark:border-ui-border
        text-gray-500 dark:text-text-secondary-dark">
        &copy; {currentYear} Alexandre Lebegue. Tout droit reservé.
      </div>
    </footer>
  );
};

export default Footer;
