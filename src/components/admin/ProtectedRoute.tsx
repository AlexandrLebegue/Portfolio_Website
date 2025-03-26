import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

/**
 * A wrapper component that protects routes by checking if the user is authenticated
 * If not authenticated, redirects to the login page with the original destination in state
 */
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isLoggedIn } = useAuth();
  const location = useLocation();
  
  console.log('ProtectedRoute - isLoggedIn:', isLoggedIn);
  console.log('ProtectedRoute - current location:', location.pathname);
  
  if (!isLoggedIn) {
    console.log('ProtectedRoute - Not logged in, redirecting to login page');
    // Redirect to login page, but save the current location they were trying to access
    return <Navigate to="/admin/login" state={{ from: location.pathname }} replace />;
  }
  
  console.log('ProtectedRoute - User is logged in, rendering children');
  return <>{children}</>;
};

export default ProtectedRoute;