import React, { useState, useEffect, useCallback, useRef } from 'react';
import { cn } from '../../utils/cn';
import { GitHubRepo } from '../../services/github';
import { generateAISummary, getCachedSummary, AISummaryData } from '../../services/aiSummary';

interface AISummaryProps {
  repo: GitHubRepo;
  readmeContent?: string | null;
  className?: string;
}

const AISummary: React.FC<AISummaryProps> = ({ repo, readmeContent, className }) => {
  const [summaryData, setSummaryData] = useState<AISummaryData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isGeneratingRef = useRef(false);

  const generateSummary = useCallback(async () => {
    if (isGeneratingRef.current) return;

    try {
      isGeneratingRef.current = true;
      setLoading(true);
      setError(null);

      const cached = getCachedSummary(repo.name);
      if (cached) {
        setSummaryData(cached);
        setLoading(false);
        return;
      }

      const result = await generateAISummary({ repo, readmeContent });
      setSummaryData(result);
    } catch (err) {
      console.error('Error generating AI summary:', err);
      setError('Oups ! Impossible de générer le résumé IA. Réessayons ? 🤔');
    } finally {
      setLoading(false);
      isGeneratingRef.current = false;
    }
  }, [repo, readmeContent]);

  useEffect(() => {
    const cached = getCachedSummary(repo.name);
    if (cached) {
      setSummaryData(cached);
    } else if (!isGeneratingRef.current) {
      generateSummary();
    }
  }, [repo.name, generateSummary]);

  const handleRetry = () => {
    isGeneratingRef.current = false;
    generateSummary();
  };

  return (
    <div
      className={cn(
        'border rounded-lg p-8 my-6 backdrop-blur-sm animate-fade-in-up',
        'bg-bg-light/80 border-ui-border-light',
        'dark:bg-bg-dark/80 dark:border-ui-border',
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-4 flex-wrap">
        <h3 className="text-lg font-semibold m-0 flex items-center gap-1
          text-text-dark dark:text-text-primary-dark">
          <span>🎯</span>
          Résumé IA du Projet
        </h3>
        <span className="bg-gradient-ai text-white text-xs font-medium px-2 py-1 rounded-full
          uppercase tracking-wider shadow-[0_2px_8px_rgba(102,126,234,0.3)]">
          ✨ IA Générée
        </span>
        {summaryData?.cached && (
          <span className="text-xs font-medium px-2 py-1 rounded-full
            bg-gray-200/80 dark:bg-bg-code/80
            text-gray-500 dark:text-text-secondary-dark">
            📦 En Cache
          </span>
        )}
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex items-center gap-2 italic font-medium
          text-gray-500 dark:text-text-secondary-dark">
          <span>🤖</span>
          <span>Génération du résumé avec l'IA en cours</span>
          <span className="animate-pulse-slow text-lg">✨</span>
        </div>
      )}

      {/* Error */}
      {error && (
        <div>
          <div className="text-sm italic p-2 rounded-md border-l-[3px] border-l-error
            text-error bg-red-500/10">
            {error}
          </div>
          <button
            onClick={handleRetry}
            disabled={loading}
            className="bg-transparent border border-primary text-primary text-sm px-2 py-1
              rounded-md cursor-pointer mt-2 font-medium transition-all duration-200
              hover:bg-primary hover:text-white hover:-translate-y-0.5 hover:shadow-md
              disabled:opacity-50 disabled:cursor-not-allowed"
          >
            🔄 Réessayer
          </button>
        </div>
      )}

      {/* Summary Content */}
      {summaryData && !loading && !error && (
        <p className="text-base leading-relaxed m-0 font-normal
          text-text-dark dark:text-text-primary-dark">
          {summaryData.summary}
        </p>
      )}
    </div>
  );
};

export default AISummary;
