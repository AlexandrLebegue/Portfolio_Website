import React, { useState, useCallback, useRef } from 'react';
import { cn } from '../../utils/cn';
import { ParseProgress } from '../../types/linkedin-import.types';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  progress?: ParseProgress;
  isProcessing: boolean;
  enableAI: boolean;
  onToggleAI: (enabled: boolean) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileSelect, progress, isProcessing, enableAI, onToggleAI }) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault(); e.stopPropagation(); setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault(); e.stopPropagation(); setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault(); e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault(); e.stopPropagation(); setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (file.name.endsWith('.zip')) {
        onFileSelect(file);
      } else {
        alert('Please upload a ZIP file containing your LinkedIn data export.');
      }
    }
  }, [onFileSelect]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (file.name.endsWith('.zip')) {
        onFileSelect(file);
      } else {
        alert('Please upload a ZIP file containing your LinkedIn data export.');
      }
    }
  }, [onFileSelect]);

  const handleClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  return (
    <div className="w-full max-w-[800px] mx-auto">
      {/* Upload Area */}
      <div
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={!isProcessing ? handleClick : undefined}
        className={cn(
          'border-[3px] border-dashed rounded-lg p-12 text-center transition-all duration-200',
          isDragging
            ? 'border-primary bg-ui-hover-light dark:bg-ui-hover'
            : 'border-ui-border-light dark:border-ui-border',
          !isProcessing && 'cursor-pointer hover:border-primary hover:bg-ui-hover-light dark:hover:bg-ui-hover',
          isProcessing && 'cursor-default'
        )}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".zip"
          onChange={handleFileInput}
          disabled={isProcessing}
          className="hidden"
        />

        {!isProcessing ? (
          <>
            <div className="text-[4rem] mb-6">📦</div>
            <h2 className="text-2xl font-semibold mb-4 text-text-dark dark:text-text-primary-dark">
              {isDragging ? 'Drop your LinkedIn export here' : 'Upload LinkedIn Data Export'}
            </h2>
            <p className="text-base mb-8 text-gray-500 dark:text-text-secondary-dark">
              Drag and drop your LinkedIn export ZIP file here, or click to browse
            </p>
            <button className="bg-primary text-white border-none rounded-md px-8 py-4
              text-base font-medium cursor-pointer transition-all duration-200
              hover:bg-secondary hover:-translate-y-0.5 hover:shadow-md active:translate-y-0">
              Browse Files
            </button>
            <p className="text-sm italic mt-8 text-gray-500 dark:text-text-secondary-dark">
              To export your LinkedIn data: LinkedIn → Settings & Privacy → Data Privacy → Get a copy of your data
            </p>
          </>
        ) : (
          <div className="p-8">
            <h3 className="text-xl font-medium mb-6 text-text-dark dark:text-text-primary-dark">
              {progress?.message || 'Processing...'}
            </h3>
            <div className="w-full h-2 rounded-full overflow-hidden mb-4
              bg-ui-border-light dark:bg-ui-border">
              <div
                className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-200"
                style={{ width: `${progress?.progress || 0}%` }}
              />
            </div>
            <p className="text-lg font-semibold text-primary mb-2">
              {progress?.progress || 0}%
            </p>
            <p className="text-base text-gray-500 dark:text-text-secondary-dark">
              {getStageEmoji(progress?.stage)} {getStageText(progress?.stage)}
            </p>
          </div>
        )}
      </div>

      {/* Info Section */}
      <div className="mt-10 p-8 rounded-lg border
        bg-white/5 dark:bg-white/5 border-ui-border-light dark:border-ui-border">
        <h3 className="text-xl font-semibold mb-6 text-text-dark dark:text-text-primary-dark">
          What data will be imported?
        </h3>

        <div className="flex flex-col gap-6">
          {[
            { icon: '👤', label: 'Profile Information', desc: 'Name, headline, summary, location, and profile photo' },
            { icon: '💼', label: 'Work Experience', desc: 'Job positions, companies, dates, and descriptions' },
            { icon: '🎓', label: 'Education', desc: 'Schools, degrees, dates, and activities' },
            { icon: '⚡', label: 'Skills', desc: 'Your professional skills and expertise' },
            { icon: '✨', label: 'AI-Generated Summary', desc: 'Automatically create a professional first-person summary' },
          ].map(item => (
            <div key={item.label} className="flex gap-4 items-start">
              <div className="text-[2rem] flex-shrink-0">{item.icon}</div>
              <div className="flex-1">
                <h4 className="text-base font-semibold mb-1 text-text-dark dark:text-text-primary-dark">
                  {item.label}
                </h4>
                <p className="text-sm text-gray-500 dark:text-text-secondary-dark">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* AI Toggle */}
        <div className="mt-8 p-6 rounded-md border-2 border-primary
          bg-ui-hover-light dark:bg-ui-hover">
          <label className="flex gap-4 cursor-pointer items-start">
            <input
              type="checkbox"
              checked={enableAI}
              onChange={(e) => onToggleAI(e.target.checked)}
              disabled={isProcessing}
              className="w-5 h-5 cursor-pointer mt-0.5 flex-shrink-0 disabled:cursor-not-allowed disabled:opacity-50"
            />
            <div className="flex-1">
              <div className="text-base font-semibold mb-1 text-text-dark dark:text-text-primary-dark">
                ✨ Generate AI Summary
              </div>
              <div className="text-sm text-gray-500 dark:text-text-secondary-dark">
                Automatically create a professional summary from your LinkedIn data using AI
              </div>
            </div>
          </label>
        </div>

        {/* Privacy Note */}
        <div className="mt-8 p-4 rounded-md border-l-4 border-l-primary text-sm
          bg-ui-hover-light dark:bg-ui-hover text-text-dark dark:text-text-primary-dark">
          🔒 All data is processed locally in your browser. Nothing is sent to any server.
        </div>
      </div>
    </div>
  );
};

// Helper functions
function getStageEmoji(stage?: string): string {
  switch (stage) {
    case 'extracting': return '📂';
    case 'parsing': return '📄';
    case 'processing': return '⚙️';
    case 'complete': return '✅';
    case 'error': return '❌';
    default: return '⏳';
  }
}

function getStageText(stage?: string): string {
  switch (stage) {
    case 'extracting': return 'Extracting files from ZIP...';
    case 'parsing': return 'Parsing CSV files...';
    case 'processing': return 'Processing your data...';
    case 'complete': return 'Import complete!';
    case 'error': return 'Error occurred';
    default: return 'Please wait...';
  }
}

export default FileUpload;
