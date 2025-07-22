import React, { useState, useEffect, useCallback, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { GitHubRepo } from '../../services/github';
import { generateAISummary, getCachedSummary, AISummaryData } from '../../services/aiSummary';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const pulse = keyframes`
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
`;

const AISummaryContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.background.current === theme.colors.background.light
    ? 'rgba(248, 249, 250, 0.8)'
    : 'rgba(18, 18, 18, 0.8)'};
  border: 1px solid ${({ theme }) => theme.colors.ui.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.space.xl};
  margin: ${({ theme }) => theme.space.lg} 0;
  animation: ${fadeIn} 0.3s ease-out;
  backdrop-filter: blur(10px);
`;

const SummaryHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.sm};
  margin-bottom: ${({ theme }) => theme.space.md};
`;

const SummaryTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  margin: 0;
  color: ${({ theme }) => theme.colors.text.current};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.xs};
`;

const AIBadge = styled.span`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  padding: ${({ theme }) => theme.space.xs} ${({ theme }) => theme.space.sm};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);
`;

const CachedBadge = styled.span`
  background-color: ${({ theme }) => theme.colors.background.current === theme.colors.background.light
    ? 'rgba(224, 224, 224, 0.8)'
    : 'rgba(30, 30, 30, 0.8)'};
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  padding: ${({ theme }) => theme.space.xs} ${({ theme }) => theme.space.sm};
  border-radius: ${({ theme }) => theme.borderRadius.full};
`;

const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  font-style: italic;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
`;

const LoadingDots = styled.span`
  animation: ${pulse} 1.5s ease-in-out infinite;
  font-size: ${({ theme }) => theme.fontSizes.lg};
`;

const SummaryContent = styled.p`
  color: ${({ theme }) => theme.colors.text.current};
  font-size: ${({ theme }) => theme.fontSizes.md};
  line-height: 1.6;
  margin: 0;
  font-weight: ${({ theme }) => theme.fontWeights.regular};
`;

const ErrorMessage = styled.div`
  color: ${({ theme }) => theme.colors.status.error};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-style: italic;
  padding: ${({ theme }) => theme.space.sm};
  background-color: ${({ theme }) => theme.colors.background.current === theme.colors.background.light
    ? 'rgba(248, 113, 113, 0.1)'
    : 'rgba(239, 68, 68, 0.1)'};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border-left: 3px solid ${({ theme }) => theme.colors.status.error};
`;

const RetryButton = styled.button`
  background: none;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  padding: ${({ theme }) => theme.space.xs} ${({ theme }) => theme.space.sm};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  cursor: pointer;
  margin-top: ${({ theme }) => theme.space.sm};
  transition: all ${({ theme }) => theme.transitions.normal};
  font-weight: ${({ theme }) => theme.fontWeights.medium};

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.background.current === theme.colors.background.light
      ? theme.colors.text.light
      : theme.colors.text.primary};
    transform: translateY(-1px);
    box-shadow: ${({ theme }) => theme.colors.background.current === theme.colors.background.light
      ? '0 2px 8px rgba(0, 0, 0, 0.15)'
      : '0 2px 8px rgba(0, 0, 0, 0.3)'};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

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
    // Prevent duplicate calls
    if (isGeneratingRef.current) {
      return;
    }

    try {
      isGeneratingRef.current = true;
      setLoading(true);
      setError(null);

      // Check cache first
      const cached = getCachedSummary(repo.name);
      if (cached) {
        setSummaryData(cached);
        setLoading(false);
        return;
      }

      // Generate new summary
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
    // Check for cached summary on mount
    const cached = getCachedSummary(repo.name);
    if (cached) {
      setSummaryData(cached);
    } else if (!isGeneratingRef.current) {
      // Auto-generate summary if not cached and not already generating
      generateSummary();
    }
  }, [repo.name, generateSummary]);

  const handleRetry = () => {
    isGeneratingRef.current = false; // Reset the flag
    generateSummary();
  };

  return (
    <AISummaryContainer className={className}>
      <SummaryHeader>
        <SummaryTitle>
          <span>🎯</span>
          Résumé IA du Projet
        </SummaryTitle>
        <AIBadge>✨ IA Générée</AIBadge>
        {summaryData?.cached && <CachedBadge>📦 En Cache</CachedBadge>}
      </SummaryHeader>

      {loading && (
        <LoadingContainer>
          <span>🤖</span>
          <span>Génération du résumé avec l'IA en cours</span>
          <LoadingDots>✨</LoadingDots>
        </LoadingContainer>
      )}

      {error && (
        <div>
          <ErrorMessage>{error}</ErrorMessage>
          <RetryButton onClick={handleRetry} disabled={loading}>
            🔄 Réessayer
          </RetryButton>
        </div>
      )}

      {summaryData && !loading && !error && (
        <SummaryContent>{summaryData.summary}</SummaryContent>
      )}
    </AISummaryContainer>
  );
};

export default AISummary;