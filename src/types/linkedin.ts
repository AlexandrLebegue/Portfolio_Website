// LinkedIn Profile Data Types

export interface LinkedInProfile {
  id: string;
  firstName: string;
  lastName: string;
  headline: string;
  summary: string;
  location: string;
  profilePicture: string;
  publicProfileUrl: string;
  industry: string;
  connectionCount: number;
  followerCount: number;
}

export interface LinkedInExperience {
  id: string;
  title: string;
  companyName: string;
  companyLogo?: string;
  companyUrl?: string;
  location?: string;
  startDate: {
    month: number;
    year: number;
  };
  endDate?: {
    month: number;
    year: number;
  };
  isCurrent: boolean;
  description?: string;
  duration?: string;
  employmentType?: string;
}

export interface LinkedInEducation {
  id: string;
  schoolName: string;
  schoolLogo?: string;
  schoolUrl?: string;
  degree?: string;
  fieldOfStudy?: string;
  startDate?: {
    month: number;
    year: number;
  };
  endDate?: {
    month: number;
    year: number;
  };
  grade?: string;
  description?: string;
  activities?: string;
}

export interface LinkedInSkill {
  id: string;
  name: string;
  endorsementCount: number;
  endorsers?: LinkedInEndorser[];
}

export interface LinkedInEndorser {
  id: string;
  firstName: string;
  lastName: string;
  profilePicture?: string;
  headline?: string;
}

export interface LinkedInContact {
  email?: string;
  phone?: string;
  website?: string;
  twitter?: string;
  github?: string;
  portfolio?: string;
}

export interface LinkedInCertification {
  id: string;
  name: string;
  authority: string;
  licenseNumber?: string;
  url?: string;
  startDate?: {
    month: number;
    year: number;
  };
  endDate?: {
    month: number;
    year: number;
  };
  doesNotExpire?: boolean;
}

export interface LinkedInLanguage {
  id: string;
  name: string;
  proficiency: 'ELEMENTARY' | 'LIMITED_WORKING' | 'PROFESSIONAL_WORKING' | 'FULL_PROFESSIONAL' | 'NATIVE_OR_BILINGUAL';
}

export interface LinkedInProject {
  id: string;
  title: string;
  description?: string;
  url?: string;
  startDate?: {
    month: number;
    year: number;
  };
  endDate?: {
    month: number;
    year: number;
  };
  isCurrent?: boolean;
  associatedWith?: string;
}

export interface LinkedInPublication {
  id: string;
  title: string;
  publisher: string;
  publishedDate?: {
    month: number;
    year: number;
  };
  description?: string;
  url?: string;
  authors?: string[];
}

export interface LinkedInVolunteerExperience {
  id: string;
  role: string;
  organization: string;
  cause?: string;
  startDate?: {
    month: number;
    year: number;
  };
  endDate?: {
    month: number;
    year: number;
  };
  isCurrent?: boolean;
  description?: string;
}

export interface LinkedInHonor {
  id: string;
  title: string;
  issuer: string;
  issueDate?: {
    month: number;
    year: number;
  };
  description?: string;
}

export interface LinkedInComprehensiveProfile {
  profile: LinkedInProfile;
  experience: LinkedInExperience[];
  education: LinkedInEducation[];
  skills: LinkedInSkill[];
  contact: LinkedInContact;
  certifications?: LinkedInCertification[];
  languages?: LinkedInLanguage[];
  projects?: LinkedInProject[];
  publications?: LinkedInPublication[];
  volunteerExperience?: LinkedInVolunteerExperience[];
  honors?: LinkedInHonor[];
}

// API Response Types
export interface LinkedInApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Loading and Error States
export interface LinkedInProfileState {
  profile: LinkedInComprehensiveProfile | null;
  loading: boolean;
  error: string | null;
  lastFetched: Date | null;
}

// Utility Types
export type LinkedInProfileSection = 
  | 'profile'
  | 'experience'
  | 'education'
  | 'skills'
  | 'contact'
  | 'certifications'
  | 'languages'
  | 'projects'
  | 'publications'
  | 'volunteerExperience'
  | 'honors';

export interface LinkedInSectionState {
  loading: boolean;
  error: string | null;
  data: any;
}

// Date formatting utilities
export interface FormattedDate {
  month: string;
  year: string;
  full: string;
}

// Profile URL types
export const LINKEDIN_PROFILE_ID = 'alexandre-lebegue-6a3718151';