import { useState, useEffect, useCallback } from 'react';
import {
  LinkedInComprehensiveProfile,
  LinkedInProfileState,
  LinkedInProfile,
  LinkedInExperience,
  LinkedInEducation,
  LinkedInSkill,
  LinkedInContact,
} from '../types/linkedin';
import linkedInService from '../services/linkedin';

/**
 * Custom hook for managing LinkedIn profile data
 */
export const useLinkedInProfile = () => {
  const [state, setState] = useState<LinkedInProfileState>({
    profile: null,
    loading: false,
    error: null,
    lastFetched: null,
  });

  /**
   * Fetch comprehensive LinkedIn profile data
   */
  const fetchProfile = useCallback(async (forceRefresh = false) => {
    // Don't fetch if already loading
    if (state.loading) {
      return;
    }

    // Don't fetch if we have recent data and not forcing refresh
    if (!forceRefresh && state.profile && state.lastFetched) {
      const timeSinceLastFetch = Date.now() - state.lastFetched.getTime();
      const fiveMinutes = 5 * 60 * 1000;
      if (timeSinceLastFetch < fiveMinutes) {
        return;
      }
    }

    setState(prev => ({
      ...prev,
      loading: true,
      error: null,
    }));

    try {
      const response = await linkedInService.fetchComprehensiveLinkedInProfile();
      
      if (response.success && response.data) {
        setState(prev => ({
          ...prev,
          profile: response.data!,
          loading: false,
          error: null,
          lastFetched: new Date(),
        }));
      } else {
        setState(prev => ({
          ...prev,
          loading: false,
          error: response.error || 'Failed to fetch LinkedIn profile',
        }));
      }
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      }));
    }
  }, [state.loading, state.profile, state.lastFetched]);

  /**
   * Fetch only basic profile information
   */
  const fetchBasicProfile = useCallback(async () => {
    setState(prev => ({
      ...prev,
      loading: true,
      error: null,
    }));

    try {
      const response = await linkedInService.fetchLinkedInProfile();
      
      if (response.success && response.data) {
        setState(prev => ({
          ...prev,
          profile: prev.profile ? {
            ...prev.profile,
            profile: response.data!,
          } : {
            profile: response.data!,
            experience: [],
            education: [],
            skills: [],
            contact: {} as LinkedInContact,
          },
          loading: false,
          error: null,
          lastFetched: new Date(),
        }));
      } else {
        setState(prev => ({
          ...prev,
          loading: false,
          error: response.error || 'Failed to fetch basic LinkedIn profile',
        }));
      }
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      }));
    }
  }, []);

  /**
   * Clear profile data and error state
   */
  const clearProfile = useCallback(() => {
    setState({
      profile: null,
      loading: false,
      error: null,
      lastFetched: null,
    });
  }, []);

  /**
   * Retry fetching profile data
   */
  const retry = useCallback(() => {
    fetchProfile(true);
  }, [fetchProfile]);

  /**
   * Check if profile data is stale (older than 5 minutes)
   */
  const isStale = useCallback(() => {
    if (!state.lastFetched) return true;
    const timeSinceLastFetch = Date.now() - state.lastFetched.getTime();
    const fiveMinutes = 5 * 60 * 1000;
    return timeSinceLastFetch > fiveMinutes;
  }, [state.lastFetched]);

  /**
   * Get profile sections with loading states
   */
  const getProfileSections = useCallback(() => {
    return {
      profile: {
        data: state.profile?.profile || null,
        loading: state.loading,
        error: state.error,
      },
      experience: {
        data: state.profile?.experience || [],
        loading: state.loading,
        error: state.error,
      },
      education: {
        data: state.profile?.education || [],
        loading: state.loading,
        error: state.error,
      },
      skills: {
        data: state.profile?.skills || [],
        loading: state.loading,
        error: state.error,
      },
      contact: {
        data: state.profile?.contact || null,
        loading: state.loading,
        error: state.error,
      },
    };
  }, [state]);

  // Auto-fetch profile data on mount
  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  return {
    // State
    profile: state.profile,
    loading: state.loading,
    error: state.error,
    lastFetched: state.lastFetched,
    
    // Actions
    fetchProfile,
    fetchBasicProfile,
    clearProfile,
    retry,
    
    // Utilities
    isStale,
    getProfileSections,
    
    // Computed values
    hasProfile: !!state.profile,
    hasError: !!state.error,
    isEmpty: !state.profile && !state.loading && !state.error,
  };
};

/**
 * Hook for managing individual LinkedIn profile sections
 */
export const useLinkedInSection = <T>(
  sectionName: keyof LinkedInComprehensiveProfile,
  fetchFunction: () => Promise<{ success: boolean; data?: T; error?: string }>
) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [lastFetched, setLastFetched] = useState<Date | null>(null);

  const fetchSection = useCallback(async (forceRefresh = false) => {
    if (loading) return;

    // Don't fetch if we have recent data and not forcing refresh
    if (!forceRefresh && data && lastFetched) {
      const timeSinceLastFetch = Date.now() - lastFetched.getTime();
      const fiveMinutes = 5 * 60 * 1000;
      if (timeSinceLastFetch < fiveMinutes) {
        return;
      }
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetchFunction();
      
      if (response.success && response.data) {
        setData(response.data);
        setError(null);
        setLastFetched(new Date());
      } else {
        setError(response.error || `Failed to fetch ${sectionName}`);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
    } finally {
      setLoading(false);
    }
  }, [loading, data, lastFetched, fetchFunction, sectionName]);

  const clearSection = useCallback(() => {
    setData(null);
    setError(null);
    setLastFetched(null);
  }, []);

  const retry = useCallback(() => {
    fetchSection(true);
  }, [fetchSection]);

  useEffect(() => {
    fetchSection();
  }, [fetchSection]);

  return {
    data,
    loading,
    error,
    lastFetched,
    fetchSection,
    clearSection,
    retry,
    hasData: !!data,
    hasError: !!error,
    isEmpty: !data && !loading && !error,
  };
};

/**
 * Specialized hooks for individual sections
 */
export const useLinkedInExperience = () => {
  return useLinkedInSection<LinkedInExperience[]>(
    'experience',
    linkedInService.fetchLinkedInExperience
  );
};

export const useLinkedInEducation = () => {
  return useLinkedInSection<LinkedInEducation[]>(
    'education',
    linkedInService.fetchLinkedInEducation
  );
};

export const useLinkedInSkills = () => {
  return useLinkedInSection<LinkedInSkill[]>(
    'skills',
    linkedInService.fetchLinkedInSkills
  );
};

export const useLinkedInBasicProfile = () => {
  return useLinkedInSection<LinkedInProfile>(
    'profile',
    linkedInService.fetchLinkedInProfile
  );
};

export default useLinkedInProfile;