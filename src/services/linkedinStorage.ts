import {
  LinkedInPortfolioData,
  STORAGE_KEY,
  STORAGE_VERSION,
} from '../types/linkedin-import.types';
import { generateLinkedInAISummary, getCachedLinkedInSummary, clearLinkedInCache } from './aiSummary';

/**
 * Save LinkedIn portfolio data to localStorage with optional AI summary generation
 */
export async function saveLinkedInData(data: LinkedInPortfolioData, enableAI: boolean = true): Promise<void> {
  try {
    // Clone data to avoid mutation
    const dataToSave = { ...data };
    
    // Try to generate AI summary if enabled (non-blocking)
    if (enableAI) {
      try {
        // Check if we already have a valid cached summary
        const cachedSummary = getCachedLinkedInSummary();
        
        if (cachedSummary) {
          // Use cached summary
          dataToSave.metadata = {
            ...dataToSave.metadata,
            aiSummary: cachedSummary.summary,
            aiSummaryGeneratedAt: cachedSummary.generatedAt,
          };
          console.log('Using cached LinkedIn AI summary');
        } else {
          // Generate new summary
          console.log('Generating new LinkedIn AI summary...');
          const summaryData = await generateLinkedInAISummary({ data });
          dataToSave.metadata = {
            ...dataToSave.metadata,
            aiSummary: summaryData.summary,
            aiSummaryGeneratedAt: summaryData.generatedAt,
          };
          console.log('LinkedIn AI summary generated successfully');
        }
      } catch (aiError) {
        // Non-blocking: Log error but continue saving data
        console.warn('Failed to generate AI summary, saving data without summary:', aiError);
        // Ensure metadata exists even without AI summary
        dataToSave.metadata = {
          ...dataToSave.metadata,
          aiSummary: undefined,
          aiSummaryGeneratedAt: undefined,
        };
      }
    } else {
      console.log('AI summary generation disabled by user');
      // Ensure metadata exists even without AI summary
      dataToSave.metadata = {
        ...dataToSave.metadata,
        aiSummary: undefined,
        aiSummaryGeneratedAt: undefined,
      };
    }
    
    // Save to localStorage
    const jsonData = JSON.stringify(dataToSave);
    localStorage.setItem(STORAGE_KEY, jsonData);
  } catch (error) {
    console.error('Error saving LinkedIn data to localStorage:', error);
    throw new Error('Failed to save data. Storage may be full.');
  }
}

/**
 * Load LinkedIn portfolio data from localStorage
 */
export function loadLinkedInData(): LinkedInPortfolioData | null {
  try {
    const jsonData = localStorage.getItem(STORAGE_KEY);
    if (!jsonData) {
      return null;
    }

    const data = JSON.parse(jsonData) as LinkedInPortfolioData;

    // Validate data structure
    if (!data.metadata || data.metadata.version !== STORAGE_VERSION) {
      console.warn('Stored data version mismatch, clearing old data');
      clearLinkedInData();
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error loading LinkedIn data from localStorage:', error);
    clearLinkedInData(); // Clear corrupted data
    return null;
  }
}

/**
 * Clear LinkedIn portfolio data from localStorage
 */
export function clearLinkedInData(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing LinkedIn data from localStorage:', error);
  }
}

/**
 * Check if LinkedIn portfolio data exists in localStorage
 */
export function hasLinkedInData(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY) !== null;
  } catch (error) {
    console.error('Error checking for LinkedIn data in localStorage:', error);
    return false;
  }
}

/**
 * Get the size of stored LinkedIn data in bytes
 */
export function getStoredDataSize(): number {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? new Blob([data]).size : 0;
  } catch (error) {
    console.error('Error getting stored data size:', error);
    return 0;
  }
}

/**
 * Get the size of stored LinkedIn data in human-readable format
 */
export function getStoredDataSizeFormatted(): string {
  const bytes = getStoredDataSize();
  if (bytes === 0) return '0 B';
  
  const k = 1024;
  const sizes = ['B', 'KB', 'MB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return `${Math.round(bytes / Math.pow(k, i) * 100) / 100} ${sizes[i]}`;
}

/**
 * Force regeneration of AI summary on next save
 */
export function forceRegenerateAISummary(): void {
  clearLinkedInCache();
  console.log('AI summary cache cleared. Next upload will generate a new summary.');
}