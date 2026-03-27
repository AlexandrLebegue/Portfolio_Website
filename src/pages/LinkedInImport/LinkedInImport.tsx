import React, { useState, useEffect, useCallback } from 'react';
import FileUpload from '../../components/linkedin/FileUpload';
import ProfileHero from '../../components/linkedin/ProfileHero';
import Timeline from '../../components/linkedin/Timeline';
import Education from '../../components/linkedin/Education';
import Skills from '../../components/linkedin/Skills';
import { parseLinkedInZip } from '../../utils/linkedinParser';
import {
  saveLinkedInData,
  loadLinkedInData,
  clearLinkedInData,
  getStoredDataSizeFormatted,
} from '../../services/linkedinStorage';
import {
  LinkedInPortfolioData,
  ParseProgress,
} from '../../types/linkedin-import.types';

const LinkedInImport: React.FC = () => {
  const [portfolioData, setPortfolioData] = useState<LinkedInPortfolioData | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState<ParseProgress | undefined>();
  const [error, setError] = useState<string | null>(null);
  const [enableAI, setEnableAI] = useState(true);

  useEffect(() => {
    const existingData = loadLinkedInData();
    if (existingData) {
      setPortfolioData(existingData);
    }
  }, []);

  const handleFileSelect = useCallback(async (file: File) => {
    setIsProcessing(true);
    setError(null);
    setProgress(undefined);
    try {
      const data = await parseLinkedInZip(file, setProgress);
      await saveLinkedInData(data, enableAI);
      const savedData = loadLinkedInData();
      setPortfolioData(savedData || data);
      setIsProcessing(false);
    } catch (err) {
      console.error('Error parsing LinkedIn data:', err);
      setError(err instanceof Error ? err.message : 'Failed to parse LinkedIn data');
      setIsProcessing(false);
      setProgress(undefined);
    }
  }, [enableAI]);

  const handleClearData = useCallback(() => {
    if (window.confirm('Are you sure you want to clear your imported LinkedIn data? This action cannot be undone.')) {
      clearLinkedInData();
      setPortfolioData(null);
      setError(null);
      setProgress(undefined);
    }
  }, []);

  const handleReImport = useCallback(() => {
    setPortfolioData(null);
    setError(null);
    setProgress(undefined);
  }, []);

  // Show portfolio if data exists
  if (portfolioData && !isProcessing) {
    return (
      <div className="min-h-screen p-8 md:p-6 transition-colors duration-300
        bg-bg-light dark:bg-bg-dark">
        <div className="max-w-[1200px] mx-auto">
          {portfolioData.profile && (
            <ProfileHero
              profile={portfolioData.profile}
              photo={portfolioData.profilePhoto}
              aiSummary={portfolioData.metadata?.aiSummary}
            />
          )}

          <div className="mt-10">
            <Timeline positions={portfolioData.positions} />
            <Education education={portfolioData.education} />
            <Skills skills={portfolioData.skills} />
          </div>

          {/* Action Bar */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 mt-12 p-8
            rounded-lg border shadow-md
            bg-white/5 dark:bg-white/5
            border-ui-border-light dark:border-ui-border">
            <p className="text-sm text-center md:text-left text-gray-500 dark:text-text-secondary-dark">
              📊 Data imported on{' '}
              {new Date(portfolioData.metadata.importDate).toLocaleDateString()} • Size:{' '}
              {getStoredDataSizeFormatted()}
            </p>
            <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
              <button
                onClick={handleReImport}
                className="px-8 py-4 rounded-md text-base font-medium cursor-pointer
                  transition-all duration-200 border-none
                  bg-ui-border-light dark:bg-ui-border text-text-dark
                  hover:bg-primary hover:text-white hover:-translate-y-0.5 hover:shadow-md"
              >
                Import New Data
              </button>
              <button
                onClick={handleClearData}
                className="px-8 py-4 rounded-md text-base font-medium cursor-pointer
                  transition-all duration-200 border-none
                  bg-error text-white
                  hover:bg-red-700 hover:-translate-y-0.5 hover:shadow-md"
              >
                Clear All Data
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show upload view
  return (
    <div className="min-h-screen p-8 md:p-6 transition-colors duration-300
      bg-bg-light dark:bg-bg-dark">
      <div className="max-w-[900px] mx-auto py-10">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-3xl font-bold mb-4
            text-text-dark dark:text-text-primary-dark">
            LinkedIn Portfolio Generator
          </h1>
          <p className="text-lg md:text-base max-w-[600px] mx-auto
            text-gray-500 dark:text-text-secondary-dark">
            Transform your LinkedIn data export into a beautiful, interactive portfolio
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="flex items-start gap-4 p-6 rounded-lg border-2 border-error mb-8
            bg-error/5">
            <div className="text-2xl flex-shrink-0">❌</div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-error mb-1">Import Failed</h3>
              <p className="text-base text-text-dark dark:text-text-primary-dark">{error}</p>
            </div>
            <button
              onClick={() => setError(null)}
              className="bg-transparent border-none text-2xl text-error cursor-pointer p-0 leading-none flex-shrink-0
                hover:opacity-70"
            >
              ×
            </button>
          </div>
        )}

        <FileUpload
          onFileSelect={handleFileSelect}
          progress={progress}
          isProcessing={isProcessing}
          enableAI={enableAI}
          onToggleAI={setEnableAI}
        />

        {/* How To Section */}
        <div className="mt-12 p-8 rounded-lg border shadow-sm
          bg-white/5 dark:bg-white/5
          border-ui-border-light dark:border-ui-border">
          <h3 className="text-xl font-semibold mb-6 text-text-dark dark:text-text-primary-dark">
            How to get your LinkedIn data export:
          </h3>
          <div className="flex flex-col gap-6">
            {[
              'Go to LinkedIn → Click your profile photo → Settings & Privacy',
              'Navigate to Data Privacy → Get a copy of your data',
              'Select "Download larger data archive" and click "Request archive"',
              'Wait for the email from LinkedIn (usually takes 10-15 minutes)',
              'Download the ZIP file and upload it here',
            ].map((step, index) => (
              <div key={index} className="flex gap-4 items-start">
                <div className="flex items-center justify-center w-8 h-8 rounded-full
                  bg-primary text-white text-base font-bold flex-shrink-0">
                  {index + 1}
                </div>
                <p className="text-base leading-relaxed pt-1 text-text-dark dark:text-text-primary-dark">
                  {step}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LinkedInImport;
