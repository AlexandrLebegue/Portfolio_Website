import React, { useEffect, useRef, useState } from 'react';
import { cn } from '../../utils/cn';

type AnimationType = 'fadeUp' | 'fadeDown' | 'fadeLeft' | 'fadeRight' | 'fade' | 'scale';

interface AnimateInProps {
  children: React.ReactNode;
  type?: AnimationType;
  delay?: number;
  duration?: number;
  className?: string;
  threshold?: number;
}

const animationClasses: Record<AnimationType, { hidden: string; visible: string }> = {
  fadeUp: {
    hidden: 'opacity-0 translate-y-8',
    visible: 'opacity-100 translate-y-0',
  },
  fadeDown: {
    hidden: 'opacity-0 -translate-y-8',
    visible: 'opacity-100 translate-y-0',
  },
  fadeLeft: {
    hidden: 'opacity-0 translate-x-8',
    visible: 'opacity-100 translate-x-0',
  },
  fadeRight: {
    hidden: 'opacity-0 -translate-x-8',
    visible: 'opacity-100 translate-x-0',
  },
  fade: {
    hidden: 'opacity-0',
    visible: 'opacity-100',
  },
  scale: {
    hidden: 'opacity-0 scale-95',
    visible: 'opacity-100 scale-100',
  },
};

const AnimateIn: React.FC<AnimateInProps> = ({
  children,
  type = 'fadeUp',
  delay = 0,
  duration = 600,
  className,
  threshold = 0.1,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(element);
        }
      },
      { threshold, rootMargin: '0px 0px -50px 0px' }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [threshold]);

  const anim = animationClasses[type];

  return (
    <div
      ref={ref}
      className={cn(
        'transition-all ease-out',
        isVisible ? anim.visible : anim.hidden,
        className
      )}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
};

// Convenience component for staggered children
interface StaggerProps {
  children: React.ReactNode;
  staggerDelay?: number;
  type?: AnimationType;
  duration?: number;
  className?: string;
}

export const Stagger: React.FC<StaggerProps> = ({
  children,
  staggerDelay = 100,
  type = 'fadeUp',
  duration = 600,
  className,
}) => {
  return (
    <div className={className}>
      {React.Children.map(children, (child, index) => (
        <AnimateIn type={type} delay={index * staggerDelay} duration={duration}>
          {child}
        </AnimateIn>
      ))}
    </div>
  );
};

export default AnimateIn;
