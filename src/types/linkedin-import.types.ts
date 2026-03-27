// TypeScript types for LinkedIn Data Import

export interface LinkedInProfile {
  firstName: string;
  lastName: string;
  maidenName?: string;
  address?: string;
  birthDate?: string;
  headline: string;
  summary?: string;
  industry?: string;
  zipCode?: string;
  geoLocation?: string;
  twitterHandles?: string;
  websites?: string;
  instantMessengers?: string;
}

export interface LinkedInPosition {
  companyName: string;
  title: string;
  description?: string;
  location?: string;
  startedOn: string;
  finishedOn?: string;
  // Computed fields
  duration?: string;
  isCurrent?: boolean;
}

export interface LinkedInEducation {
  schoolName: string;
  startDate?: string;
  endDate?: string;
  notes?: string;
  degreeName?: string;
  activities?: string;
}

export interface LinkedInSkill {
  name: string;
}

export interface LinkedInPortfolioData {
  profile: LinkedInProfile | null;
  positions: LinkedInPosition[];
  education: LinkedInEducation[];
  skills: LinkedInSkill[];
  profilePhoto?: string; // base64 data URL
  metadata: {
    importDate: string;
    version: string;
    aiSummary?: string; // AI-generated professional summary
    aiSummaryGeneratedAt?: number; // Timestamp for cache validation
  };
}

export interface ParseProgress {
  stage: 'extracting' | 'parsing' | 'processing' | 'complete' | 'error';
  message: string;
  progress: number; // 0-100
}

export interface ParseError {
  type: 'zip' | 'csv' | 'missing_file' | 'validation';
  message: string;
  details?: string;
}

// CSV Row types matching LinkedIn export structure
export interface ProfileCSVRow {
  'First Name': string;
  'Last Name': string;
  'Maiden Name'?: string;
  'Address'?: string;
  'Birth Date'?: string;
  'Headline': string;
  'Summary'?: string;
  'Industry'?: string;
  'Zip Code'?: string;
  'Geo Location'?: string;
  'Twitter Handles'?: string;
  'Websites'?: string;
  'Instant Messengers'?: string;
}

export interface PositionCSVRow {
  'Company Name': string;
  'Title': string;
  'Description'?: string;
  'Location'?: string;
  'Started On': string;
  'Finished On'?: string;
}

export interface EducationCSVRow {
  'School Name': string;
  'Start Date'?: string;
  'End Date'?: string;
  'Notes'?: string;
  'Degree Name'?: string;
  'Activities'?: string;
}

export interface SkillCSVRow {
  'Name': string;
}

export interface RichMediaCSVRow {
  'File Name'?: string;
  'Url'?: string;
  'Type'?: string;
}

// Storage keys
export const STORAGE_KEY = 'linkedin-portfolio-data';
export const STORAGE_VERSION = '1.0.0';