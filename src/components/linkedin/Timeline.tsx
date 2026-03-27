import React from 'react';
import { cn } from '../../utils/cn';
import { LinkedInPosition } from '../../types/linkedin-import.types';

interface TimelineProps {
  positions: LinkedInPosition[];
}

const Timeline: React.FC<TimelineProps> = ({ positions }) => {
  const sortedPositions = [...positions].sort((a, b) => {
    const dateA = new Date(a.startedOn || '');
    const dateB = new Date(b.startedOn || '');
    return dateB.getTime() - dateA.getTime();
  });

  if (sortedPositions.length === 0) return null;

  return (
    <div className="w-full my-10">
      <h2 className="text-3xl md:text-2xl font-bold mb-8 flex items-center gap-4
        text-text-dark dark:text-text-primary-dark
        before:content-['💼'] before:text-2xl">
        Professional Experience
      </h2>

      <div className="relative pl-8 md:pl-6">
        {sortedPositions.map((position, index) => (
          <div key={index} className={cn('relative', index < sortedPositions.length - 1 ? 'pb-10' : 'pb-0')}>
            {/* Timeline Dot */}
            <div className="absolute -left-8 md:-left-6 top-2 w-4 h-4 md:w-3 md:h-3 rounded-full
              bg-primary border-[3px] shadow-md z-[2]
              border-bg-light dark:border-bg-dark" />

            {/* Timeline Line */}
            {index < sortedPositions.length - 1 && (
              <div className="absolute -left-8 md:-left-6 top-6 -bottom-10 w-0.5
                bg-ui-border-light dark:bg-ui-border"
                style={{ transform: 'translateX(7px)' }} />
            )}

            {/* Timeline Content Card */}
            <div className="rounded-lg p-8 md:p-6 shadow-sm border transition-all duration-200
              bg-white/5 dark:bg-white/5
              border-ui-border-light dark:border-ui-border
              hover:shadow-md hover:-translate-y-0.5">
              {/* Position Header */}
              <div className="flex flex-col md:flex-row justify-between items-start gap-4 md:gap-6 mb-4">
                <div className="flex-1">
                  <h3 className="text-xl md:text-lg font-semibold mb-1
                    text-text-dark dark:text-text-primary-dark">
                    {position.title}
                  </h3>
                  <h4 className="text-lg md:text-base font-medium text-primary">
                    {position.companyName}
                  </h4>
                </div>

                {/* Date Badge */}
                <div className={cn(
                  'flex flex-col md:items-end items-start gap-1 px-4 py-2 rounded-md border-l-[3px]',
                  position.isCurrent
                    ? 'bg-ui-hover-light dark:bg-ui-hover border-l-primary'
                    : 'bg-gray-500/10 border-l-ui-border-light dark:border-l-ui-border'
                )}>
                  {position.isCurrent && (
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary uppercase tracking-wider">
                      <span className="inline-block w-2 h-2 rounded-full bg-success animate-pulse-slow" />
                      Current
                    </span>
                  )}
                  <span className="text-sm font-medium text-text-dark dark:text-text-primary-dark">
                    {position.startedOn} - {position.finishedOn || 'Present'}
                  </span>
                  {position.duration && (
                    <span className="text-xs text-gray-500 dark:text-text-secondary-dark">
                      ({position.duration})
                    </span>
                  )}
                </div>
              </div>

              {/* Location */}
              {position.location && (
                <div className="flex items-center gap-1 text-sm mb-4
                  text-gray-500 dark:text-text-secondary-dark">
                  <span className="text-base">📍</span>
                  {position.location}
                </div>
              )}

              {/* Description */}
              {position.description && (
                <p className="text-base md:text-sm leading-relaxed whitespace-pre-wrap
                  text-text-dark dark:text-text-primary-dark">
                  {position.description}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
