import React from 'react';
import { LinkedInSkill } from '../../types/linkedin-import.types';

interface SkillsProps {
  skills: LinkedInSkill[];
}

// Keep the full getSkillIcon function
const getSkillIcon = (skillName: string): string => {
  const s = skillName.toLowerCase().trim();
  if (s.includes('javascript') || s.includes('js')) return '🟨';
  if (s.includes('typescript') || s.includes('ts')) return '🔷';
  if (s.includes('python')) return '🐍';
  if (s.includes('java') && !s.includes('javascript')) return '☕';
  if (s.includes('c++') || s.includes('cpp')) return '⚙️';
  if (s.includes('c#') || s.includes('csharp')) return '🎯';
  if (s.includes('go') || s.includes('golang')) return '🐹';
  if (s.includes('rust')) return '🦀';
  if (s.includes('php')) return '🐘';
  if (s.includes('ruby')) return '💎';
  if (s.includes('swift')) return '🐦';
  if (s.includes('kotlin')) return '🎨';
  if (s.includes('scala')) return '🔺';
  if (s.includes('r ') || s.startsWith('r')) return '📊';
  if (s.includes('matlab')) return '📐';
  if (s.includes('shell') || s.includes('bash')) return '🐚';
  if (s.includes('html')) return '🌐';
  if (s.includes('css')) return '🎨';
  if (s.includes('sass') || s.includes('scss')) return '💅';
  if (s.includes('tailwind')) return '🌊';
  if (s.includes('bootstrap')) return '🅱️';
  if (s.includes('react')) return '⚛️';
  if (s.includes('vue')) return '💚';
  if (s.includes('angular')) return '🅰️';
  if (s.includes('svelte')) return '🧡';
  if (s.includes('next')) return '▲';
  if (s.includes('redux')) return '🟣';
  if (s.includes('node')) return '🟢';
  if (s.includes('express')) return '🚂';
  if (s.includes('django')) return '🎸';
  if (s.includes('flask')) return '🧪';
  if (s.includes('fastapi')) return '⚡';
  if (s.includes('spring')) return '🍃';
  if (s.includes('.net') || s.includes('dotnet')) return '🔵';
  if (s.includes('sql') && !s.includes('nosql')) return '🗄️';
  if (s.includes('mongodb') || s.includes('mongo')) return '🍃';
  if (s.includes('redis')) return '🔴';
  if (s.includes('firebase')) return '🔥';
  if (s.includes('aws') || s.includes('amazon web')) return '☁️';
  if (s.includes('azure')) return '🔷';
  if (s.includes('gcp') || s.includes('google cloud')) return '☁️';
  if (s.includes('docker')) return '🐳';
  if (s.includes('kubernetes') || s.includes('k8s')) return '☸️';
  if (s.includes('jenkins')) return '👷';
  if (s.includes('github')) return '🐙';
  if (s.includes('terraform')) return '🏗️';
  if (s.includes('ci/cd') || s.includes('cicd')) return '🔄';
  if (s.includes('jest')) return '🃏';
  if (s.includes('testing') || s.includes('test')) return '✅';
  if (s.includes('machine learning') || s.includes('ml')) return '🤖';
  if (s.includes('artificial intelligence') || s.includes('ai')) return '🧠';
  if (s.includes('deep learning') || s.includes('neural')) return '🧠';
  if (s.includes('data science')) return '📊';
  if (s.includes('tensorflow')) return '🧠';
  if (s.includes('pytorch')) return '🔥';
  if (s.includes('pandas')) return '🐼';
  if (s.includes('figma')) return '🎨';
  if (s.includes('ui/ux') || s.includes('ux') || s.includes('ui')) return '🎨';
  if (s.includes('agile')) return '🔄';
  if (s.includes('scrum')) return '🏉';
  if (s.includes('git') && !s.includes('digital')) return '🔀';
  if (s.includes('security') || s.includes('cybersecurity')) return '🔒';
  if (s.includes('communication')) return '💬';
  if (s.includes('leadership')) return '👑';
  if (s.includes('team')) return '👥';
  if (s.includes('linux')) return '🐧';
  if (s.includes('graphql')) return '◼️';
  if (s.includes('rest') || s.includes('api')) return '🔌';
  if (s.includes('microservices')) return '🔷';
  if (s.includes('excel') || s.includes('spreadsheet')) return '📊';
  if (s.includes('markdown')) return '📝';
  if (s.includes('documentation')) return '📚';
  return '⚡';
};

const Skills: React.FC<SkillsProps> = ({ skills }) => {
  if (skills.length === 0) return null;

  return (
    <div className="w-full my-10">
      <h2 className="text-3xl md:text-2xl font-bold mb-8 flex items-center gap-4
        text-text-dark dark:text-text-primary-dark
        before:content-['⚡'] before:text-2xl">
        Skills & Expertise
      </h2>

      <div className="flex flex-wrap gap-4">
        {skills.map((skill, index) => (
          <div
            key={index}
            className="inline-flex items-center gap-2 px-6 py-2 rounded-full text-sm md:text-xs md:px-4 md:py-1
              font-medium cursor-default border-2 transition-all duration-200
              bg-ui-hover-light dark:bg-ui-hover
              border-ui-border-light dark:border-ui-border
              text-text-dark dark:text-text-primary-dark
              hover:border-primary hover:bg-ui-selection hover:-translate-y-0.5 hover:shadow-sm"
          >
            <span className="text-base">{getSkillIcon(skill.name)}</span>
            <span className="whitespace-nowrap">{skill.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skills;
