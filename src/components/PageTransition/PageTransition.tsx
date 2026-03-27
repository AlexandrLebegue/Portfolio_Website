import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { cn } from '../../utils/cn';

interface PageTransitionProps {
  children: React.ReactNode;
}

const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(false);
  const [displayChildren, setDisplayChildren] = useState(children);
  const prevLocationRef = useRef(location.pathname);

  useEffect(() => {
    // If route changed, trigger exit then enter animation
    if (location.pathname !== prevLocationRef.current) {
      setIsVisible(false);

      const timeout = setTimeout(() => {
        // Scroll to top on page change
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setDisplayChildren(children);
        prevLocationRef.current = location.pathname;
        // Trigger enter animation after a frame
        requestAnimationFrame(() => {
          setIsVisible(true);
        });
      }, 100); // Exit animation duration

      return () => clearTimeout(timeout);
    } else {
      // Initial mount
      setDisplayChildren(children);
      requestAnimationFrame(() => {
        setIsVisible(true);
      });
    }
  }, [location.pathname, children]);

  return (
    <div
      className={cn(
        'transition-all duration-100 ease-out',
        isVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-0'
      )}
    >
      {displayChildren}
    </div>
  );
};

export default PageTransition;
