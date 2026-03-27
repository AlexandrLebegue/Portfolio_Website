import {
  LinkedInProfile,
  LinkedInExperience,
  LinkedInEducation,
  LinkedInSkill,
  LinkedInContact,
  LinkedInComprehensiveProfile,
  LinkedInApiResponse,
  LINKEDIN_PROFILE_ID
} from '../types/linkedin';

// Mock data for demonstration purposes
// In a real implementation, this would connect to a backend service
// that handles LinkedIn API authentication and data fetching

const mockProfile: LinkedInProfile = {
  id: LINKEDIN_PROFILE_ID,
  firstName: 'Alexandre',
  lastName: 'Lebegue',
  headline: 'Ingénieur logiciel embarqué | Développeur passionné en technologies IA',
  summary: 'Ingénieur logiciel embarqué animé par une passion profonde pour le développement de technologies de pointe qui repoussent les limites du possible. Mon parcours a été guidé par une fascination pour l\'exploration spatiale et les innovations technologiques.',
  location: 'France',
  profilePicture: '',
  publicProfileUrl: `https://www.linkedin.com/in/${LINKEDIN_PROFILE_ID}`,
  industry: 'Aérospatiale',
  connectionCount: 500,
  followerCount: 150,
};

const mockExperience: LinkedInExperience[] = [
  {
    id: 'exp-1',
    title: 'Ingénieur Logiciel Embarqué',
    companyName: 'Thales Alenia Space',
    companyLogo: '',
    location: 'Toulouse, France',
    startDate: { month: 9, year: 2021 },
    isCurrent: true,
    description: 'Développement de logiciels embarqués pour satellites et systèmes spatiaux. Travail sur des projets critiques nécessitant une haute fiabilité et des performances optimales.',
    employmentType: 'Temps plein',
  },
  {
    id: 'exp-2',
    title: 'Développeur C++',
    companyName: 'Airbus Defence and Space',
    companyLogo: '',
    location: 'Toulouse, France',
    startDate: { month: 2, year: 2020 },
    endDate: { month: 8, year: 2021 },
    isCurrent: false,
    description: 'Développement d\'applications de simulation spatiale et d\'outils de visualisation pour la dynamique des satellites.',
    employmentType: 'Stage',
  },
];

const mockEducation: LinkedInEducation[] = [
  {
    id: 'edu-1',
    schoolName: 'ISAE-SUPAERO',
    degree: 'Diplôme d\'Ingénieur',
    fieldOfStudy: 'Ingénierie Aérospatiale',
    startDate: { month: 9, year: 2018 },
    endDate: { month: 7, year: 2021 },
    description: 'Formation d\'ingénieur en aérospatiale avec spécialisation en systèmes embarqués et intelligence artificielle.',
    activities: 'Club Robotique, Association Étudiante Aérospatiale',
  },
  {
    id: 'edu-2',
    schoolName: 'Université Paul Sabatier',
    degree: 'Master',
    fieldOfStudy: 'Informatique et Intelligence Artificielle',
    startDate: { month: 9, year: 2016 },
    endDate: { month: 6, year: 2018 },
    description: 'Formation approfondie en intelligence artificielle et apprentissage automatique.',
  },
];

const mockSkills: LinkedInSkill[] = [
  {
    id: 'skill-1',
    name: 'C/C++',
    endorsementCount: 25,
    endorsers: [
      { id: 'end-1', firstName: 'Jean', lastName: 'Dupont', profilePicture: '', headline: 'Ingénieur Senior' },
      { id: 'end-2', firstName: 'Marie', lastName: 'Martin', profilePicture: '', headline: 'Chef de Projet' },
    ],
  },
  {
    id: 'skill-2',
    name: 'Python',
    endorsementCount: 30,
    endorsers: [
      { id: 'end-3', firstName: 'Pierre', lastName: 'Durand', profilePicture: '', headline: 'Data Scientist' },
      { id: 'end-4', firstName: 'Sophie', lastName: 'Bernard', profilePicture: '', headline: 'Développeuse IA' },
    ],
  },
  {
    id: 'skill-3',
    name: 'Intelligence Artificielle',
    endorsementCount: 20,
    endorsers: [
      { id: 'end-5', firstName: 'Thomas', lastName: 'Petit', profilePicture: '', headline: 'Chercheur IA' },
    ],
  },
  {
    id: 'skill-4',
    name: 'Systèmes Embarqués',
    endorsementCount: 18,
    endorsers: [],
  },
  {
    id: 'skill-5',
    name: 'Docker',
    endorsementCount: 15,
    endorsers: [],
  },
  {
    id: 'skill-6',
    name: 'Git',
    endorsementCount: 22,
    endorsers: [],
  },
];

const mockContact: LinkedInContact = {
  email: 'alexandre.lebegue@example.com',
  website: 'https://alexandre-lebegue.dev',
  github: 'https://github.com/AlexandrLebegue',
  portfolio: 'https://alexandre-lebegue.dev/portfolio',
};

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Mock authentication function
 */
export const authenticate = async (): Promise<boolean> => {
  await delay(1000); // Simulate authentication delay
  return true; // Always succeed for demo
};

/**
 * Fetch basic profile information
 */
export const fetchLinkedInProfile = async (): Promise<LinkedInApiResponse<LinkedInProfile>> => {
  try {
    await delay(800); // Simulate API delay
    
    return {
      success: true,
      data: mockProfile,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
};

/**
 * Fetch experience information
 */
export const fetchLinkedInExperience = async (): Promise<LinkedInApiResponse<LinkedInExperience[]>> => {
  try {
    await delay(600);
    
    return {
      success: true,
      data: mockExperience,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
};

/**
 * Fetch education information
 */
export const fetchLinkedInEducation = async (): Promise<LinkedInApiResponse<LinkedInEducation[]>> => {
  try {
    await delay(500);
    
    return {
      success: true,
      data: mockEducation,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
};

/**
 * Fetch skills information
 */
export const fetchLinkedInSkills = async (): Promise<LinkedInApiResponse<LinkedInSkill[]>> => {
  try {
    await delay(700);
    
    return {
      success: true,
      data: mockSkills,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
};

/**
 * Fetch comprehensive profile data
 */
export const fetchComprehensiveLinkedInProfile = async (): Promise<LinkedInApiResponse<LinkedInComprehensiveProfile>> => {
  try {
    // Simulate fetching all data
    await delay(1200);
    
    const comprehensiveProfile: LinkedInComprehensiveProfile = {
      profile: mockProfile,
      experience: mockExperience,
      education: mockEducation,
      skills: mockSkills,
      contact: mockContact,
    };

    return {
      success: true,
      data: comprehensiveProfile,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
};

/**
 * Mock logout function
 */
export const logoutLinkedIn = async (): Promise<void> => {
  // Mock logout - no actual action needed
  await delay(200);
};

/**
 * Check if currently authenticated (always true for demo)
 */
export const isLinkedInAuthenticated = (): boolean => {
  return true;
};

// Default export with all methods
const linkedInService = {
  authenticate,
  fetchLinkedInProfile,
  fetchLinkedInExperience,
  fetchLinkedInEducation,
  fetchLinkedInSkills,
  fetchComprehensiveLinkedInProfile,
  logoutLinkedIn,
  isLinkedInAuthenticated,
};

export default linkedInService;