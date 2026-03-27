import JSZip from 'jszip';
import Papa from 'papaparse';
import {
  LinkedInPortfolioData,
  LinkedInProfile,
  LinkedInPosition,
  LinkedInEducation,
  LinkedInSkill,
  ProfileCSVRow,
  PositionCSVRow,
  EducationCSVRow,
  SkillCSVRow,
  ParseProgress,
  ParseError,
  STORAGE_VERSION,
} from '../types/linkedin-import.types';

/**
 * Parse a LinkedIn data export ZIP file and extract portfolio data
 */
export async function parseLinkedInZip(
  file: File,
  onProgress?: (progress: ParseProgress) => void
): Promise<LinkedInPortfolioData> {
  try {
    // Stage 1: Extract ZIP
    onProgress?.({
      stage: 'extracting',
      message: 'Extracting ZIP file...',
      progress: 10,
    });

    const zip = await JSZip.loadAsync(file);

    // Stage 2: Parse CSVs
    onProgress?.({
      stage: 'parsing',
      message: 'Parsing CSV files...',
      progress: 30,
    });

    const [profile, positions, education, skills, profilePhoto] = await Promise.all([
      parseProfile(zip),
      parsePositions(zip),
      parseEducation(zip),
      parseSkills(zip),
      extractProfilePhoto(zip),
    ]);

    // Stage 3: Process and validate data
    onProgress?.({
      stage: 'processing',
      message: 'Processing data...',
      progress: 80,
    });

    const portfolioData: LinkedInPortfolioData = {
      profile,
      positions,
      education,
      skills,
      profilePhoto,
      metadata: {
        importDate: new Date().toISOString(),
        version: STORAGE_VERSION,
      },
    };

    // Validate required data
    if (!profile) {
      throw {
        type: 'validation',
        message: 'Profile data is required',
        details: 'Profile.csv file is missing or invalid',
      } as ParseError;
    }

    onProgress?.({
      stage: 'complete',
      message: 'Import complete!',
      progress: 100,
    });

    return portfolioData;
  } catch (error) {
    const parseError: ParseError = {
      type: 'zip',
      message: 'Failed to parse LinkedIn export',
      details: error instanceof Error ? error.message : String(error),
    };

    onProgress?.({
      stage: 'error',
      message: parseError.message,
      progress: 0,
    });

    throw parseError;
  }
}

/**
 * Parse Profile.csv from ZIP
 */
async function parseProfile(zip: JSZip): Promise<LinkedInProfile | null> {
  try {
    const profileFile = zip.file('Profile.csv');
    if (!profileFile) {
      throw new Error('Profile.csv not found in ZIP');
    }

    const content = await profileFile.async('text');
    const result = Papa.parse<ProfileCSVRow>(content, {
      header: true,
      skipEmptyLines: true,
    });

    if (result.errors.length > 0) {
      console.warn('Profile CSV parsing errors:', result.errors);
    }

    const row = result.data[0];
    if (!row) {
      return null;
    }

    return {
      firstName: row['First Name'] || '',
      lastName: row['Last Name'] || '',
      maidenName: row['Maiden Name'],
      address: row['Address'],
      birthDate: row['Birth Date'],
      headline: row['Headline'] || '',
      summary: row['Summary'],
      industry: row['Industry'],
      zipCode: row['Zip Code'],
      geoLocation: row['Geo Location'],
      twitterHandles: row['Twitter Handles'],
      websites: row['Websites'],
      instantMessengers: row['Instant Messengers'],
    };
  } catch (error) {
    console.error('Error parsing Profile.csv:', error);
    return null;
  }
}

/**
 * Parse Positions.csv from ZIP
 */
async function parsePositions(zip: JSZip): Promise<LinkedInPosition[]> {
  try {
    const positionsFile = zip.file('Positions.csv');
    if (!positionsFile) {
      return [];
    }

    const content = await positionsFile.async('text');
    const result = Papa.parse<PositionCSVRow>(content, {
      header: true,
      skipEmptyLines: true,
    });

    return result.data.map((row) => {
      const isCurrent = !row['Finished On'] || row['Finished On'].trim() === '';
      return {
        companyName: row['Company Name'] || '',
        title: row['Title'] || '',
        description: row['Description'],
        location: row['Location'],
        startedOn: row['Started On'] || '',
        finishedOn: row['Finished On'],
        isCurrent,
        duration: calculateDuration(row['Started On'], row['Finished On']),
      };
    });
  } catch (error) {
    console.error('Error parsing Positions.csv:', error);
    return [];
  }
}

/**
 * Parse Education.csv from ZIP
 */
async function parseEducation(zip: JSZip): Promise<LinkedInEducation[]> {
  try {
    const educationFile = zip.file('Education.csv');
    if (!educationFile) {
      return [];
    }

    const content = await educationFile.async('text');
    const result = Papa.parse<EducationCSVRow>(content, {
      header: true,
      skipEmptyLines: true,
    });

    return result.data.map((row) => ({
      schoolName: row['School Name'] || '',
      startDate: row['Start Date'],
      endDate: row['End Date'],
      notes: row['Notes'],
      degreeName: row['Degree Name'],
      activities: row['Activities'],
    }));
  } catch (error) {
    console.error('Error parsing Education.csv:', error);
    return [];
  }
}

/**
 * Parse Skills.csv from ZIP
 */
async function parseSkills(zip: JSZip): Promise<LinkedInSkill[]> {
  try {
    const skillsFile = zip.file('Skills.csv');
    if (!skillsFile) {
      return [];
    }

    const content = await skillsFile.async('text');
    const result = Papa.parse<SkillCSVRow>(content, {
      header: true,
      skipEmptyLines: true,
    });

    return result.data
      .map((row) => ({
        name: row['Name'] || '',
      }))
      .filter((skill) => skill.name.trim() !== '');
  } catch (error) {
    console.error('Error parsing Skills.csv:', error);
    return [];
  }
}

/**
 * Extract profile photo from Rich_Media or look for common image files
 */
async function extractProfilePhoto(zip: JSZip): Promise<string | undefined> {
  try {
    // Look for profile photo - LinkedIn exports sometimes include it in different formats
    const possiblePhotoNames = [
      'Profile.jpg',
      'Profile.png',
      'profile.jpg',
      'profile.png',
      'Photo.jpg',
      'Photo.png',
    ];

    for (const photoName of possiblePhotoNames) {
      const photoFile = zip.file(photoName);
      if (photoFile) {
        const blob = await photoFile.async('blob');
        return await blobToBase64(blob);
      }
    }

    // If no direct photo file, try to find it in the root
    const files = Object.keys(zip.files);
    const imageFile = files.find(
      (name) =>
        (name.toLowerCase().endsWith('.jpg') || name.toLowerCase().endsWith('.png')) &&
        !name.includes('/')
    );

    if (imageFile) {
      const file = zip.file(imageFile);
      if (file) {
        const blob = await file.async('blob');
        return await blobToBase64(blob);
      }
    }

    return undefined;
  } catch (error) {
    console.error('Error extracting profile photo:', error);
    return undefined;
  }
}

/**
 * Convert Blob to base64 data URL
 */
function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject(new Error('Failed to convert blob to base64'));
      }
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

/**
 * Calculate duration between two dates in a human-readable format
 */
function calculateDuration(startDate?: string, endDate?: string): string {
  if (!startDate) {
    return '';
  }

  try {
    const start = parseLinkedInDate(startDate);
    const end = endDate ? parseLinkedInDate(endDate) : new Date();

    const months = differenceInMonths(start, end);
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;

    if (years === 0) {
      return `${months} month${months !== 1 ? 's' : ''}`;
    } else if (remainingMonths === 0) {
      return `${years} year${years !== 1 ? 's' : ''}`;
    } else {
      return `${years} year${years !== 1 ? 's' : ''} ${remainingMonths} month${
        remainingMonths !== 1 ? 's' : ''
      }`;
    }
  } catch (error) {
    console.error('Error calculating duration:', error);
    return '';
  }
}

/**
 * Parse LinkedIn date format (e.g., "Jun 2020" or "2020")
 */
function parseLinkedInDate(dateStr: string): Date {
  const trimmed = dateStr.trim();
  
  // Handle "MMM YYYY" format
  if (trimmed.match(/^[A-Za-z]{3}\s\d{4}$/)) {
    return new Date(trimmed);
  }
  
  // Handle "YYYY" format
  if (trimmed.match(/^\d{4}$/)) {
    return new Date(`Jan ${trimmed}`);
  }
  
  // Try to parse as-is
  const date = new Date(trimmed);
  if (isNaN(date.getTime())) {
    throw new Error(`Invalid date format: ${dateStr}`);
  }
  
  return date;
}

/**
 * Calculate difference in months between two dates
 */
function differenceInMonths(startDate: Date, endDate: Date): number {
  const yearDiff = endDate.getFullYear() - startDate.getFullYear();
  const monthDiff = endDate.getMonth() - startDate.getMonth();
  return yearDiff * 12 + monthDiff;
}

/**
 * Sanitize text to prevent XSS attacks
 */
export function sanitizeText(text: string): string {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}