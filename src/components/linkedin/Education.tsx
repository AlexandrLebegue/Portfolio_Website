import React from 'react';
import { LinkedInEducation } from '../../types/linkedin-import.types';

interface EducationProps {
  education: LinkedInEducation[];
}

const Education: React.FC<EducationProps> = ({ education }) => {
  if (education.length === 0) return null;

  const sortedEducation = [...education].sort((a, b) => {
    const dateA = a.endDate ? new Date(a.endDate) : new Date();
    const dateB = b.endDate ? new Date(b.endDate) : new Date();
    return dateB.getTime() - dateA.getTime();
  });

  return (
    <div className="w-full my-10">
      <h2 className="text-3xl md:text-2xl font-bold mb-8 flex items-center gap-4
        text-text-dark dark:text-text-primary-dark
        before:content-['🎓'] before:text-2xl">
        Education
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {sortedEducation.map((edu, index) => (
          <div
            key={index}
            className="rounded-lg p-8 shadow-sm border-l-4 border-l-primary border border-ui-border-light dark:border-ui-border
              transition-all duration-200 hover:shadow-md hover:-translate-y-1
              bg-white/5 dark:bg-white/5"
          >
            {/* Card Header */}
            <div className="flex items-start gap-4 mb-6">
              <div className="text-[2.5rem] flex-shrink-0">🎓</div>
              <div className="flex-1">
                <h3 className="text-xl md:text-lg font-semibold leading-tight mb-1
                  text-text-dark dark:text-text-primary-dark">
                  {edu.schoolName}
                </h3>
                {edu.degreeName && (
                  <h4 className="text-base font-medium text-primary leading-normal">
                    {edu.degreeName}
                  </h4>
                )}
              </div>
            </div>

            {/* Date Range */}
            {(edu.startDate || edu.endDate) && (
              <div className="flex items-center gap-1 text-sm mb-4 p-2 w-fit rounded-md
                text-gray-500 dark:text-text-secondary-dark
                bg-ui-hover-light dark:bg-ui-hover">
                📅 {edu.startDate || 'N/A'} - {edu.endDate || 'N/A'}
              </div>
            )}

            {/* Activities */}
            {edu.activities && (
              <div className="mt-4 pt-4 border-t border-ui-border-light dark:border-ui-border">
                <div className="text-sm font-semibold mb-1 text-text-dark dark:text-text-primary-dark">
                  Activities:
                </div>
                <p className="text-sm leading-normal text-gray-500 dark:text-text-secondary-dark">
                  {edu.activities}
                </p>
              </div>
            )}

            {/* Notes */}
            {edu.notes && (
              <p className="text-sm leading-relaxed mt-4 p-4 rounded-md italic
                text-gray-500 dark:text-text-secondary-dark
                bg-black/[0.02] dark:bg-white/[0.02]">
                {edu.notes}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Education;
