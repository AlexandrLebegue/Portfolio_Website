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
      setError('Impossible de générer le résumé IA. Réessayer ?');
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
    <div className={cn('card p-6 md:p-8', className)}>
      {/* En-tete : libelle mono « plan technique » + tag IA / cache (sans emoji) */}
      <div className="mb-5 flex flex-wrap items-center gap-3">
        <span className="kicker">{'// RÉSUMÉ IA'}</span>
        <span className="tech-tag">IA</span>
        {summaryData?.cached && <span className="tech-tag">Cache</span>}
      </div>

      {/* Chargement : pas d'emoji, simple voyant qui pulse + texte sobre */}
      {loading && (
        <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.16em] text-muted">
          <span aria-hidden="true" className="inline-block h-2 w-2 animate-pulse-slow bg-ink" />
          Génération du résumé en cours
        </div>
      )}

      {/* Erreur */}
      {error && (
        <div>
          <div className="border-l-2 border-error bg-error/5 p-3 text-sm text-error">
            {error}
          </div>
          <button
            onClick={handleRetry}
            disabled={loading}
            className="btn-outline mt-3 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Réessayer
          </button>
        </div>
      )}

      {/* Contenu du résumé */}
      {summaryData && !loading && !error && (
        <p className="m-0 text-base leading-relaxed text-ink dark:text-text-primary-dark">
          {summaryData.summary}
        </p>
      )}
    </div>
  );
};

export default AISummary;
