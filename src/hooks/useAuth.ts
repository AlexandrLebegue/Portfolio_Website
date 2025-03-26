import { useState, useEffect } from 'react';
import { AdminCredentials, AdminUser } from '../types/blog.types';
import authService from '../services/auth';

interface UseAuthResult {
  user: AdminUser | null;
  isLoggedIn: boolean;
  login: (credentials: AdminCredentials) => Promise<void>;
  logout: () => void;
  loading: boolean;
  error: Error | null;
}

/**
 * Hook for handling authentication
 */
export function useAuth(): UseAuthResult {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  
  // Check if user is already logged in on mount
  useEffect(() => {
    const checkAuth = () => {
      const currentUser = authService.getCurrentUser();
      console.log('useAuth - Checking current user:', currentUser);
      setUser(currentUser);
    };
    
    // Check immediately on mount
    checkAuth();
    
    // Set up an interval to check auth state periodically
    const interval = setInterval(checkAuth, 1000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Login function
  const login = async (credentials: AdminCredentials): Promise<void> => {
    console.group('useAuth - login');
    console.log('Login initiated with username:', credentials.username);
    setLoading(true);
    setError(null);
    
    try {
      console.log('Calling authService.login...');
      const loggedInUser = await authService.login(credentials);
      console.log('AuthService login successful, user:', loggedInUser);
      
      setUser(loggedInUser);
      console.log('User state updated successfully');
      
      console.groupEnd();
    } catch (err) {
      console.error('Login failed:', err);
      const error = err instanceof Error ? err : new Error('Failed to login');
      console.error('Error details:', error.message);
      setError(error);
      console.groupEnd();
      throw error;
    } finally {
      setLoading(false);
      console.log('Loading state set to false');
    }
  };
  
  // Logout function
  const logout = (): void => {
    authService.logout();
    setUser(null);
  };
  
  return {
    user,
    isLoggedIn: !!user,
    login,
    logout,
    loading,
    error,
  };
}