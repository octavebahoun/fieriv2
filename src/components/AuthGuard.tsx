import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface AuthGuardProps {
  children: React.ReactNode;
}

export const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen bg-bg-primary flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-2 border-cyan border-t-transparent rounded-full animate-spin"></div>
          <span className="font-mono text-xs text-cyan tracking-widest">// SYNCHRONISATION_SECURE...</span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    // Redirect to login page but keep track of previous page
    return <Navigate to="/members" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default AuthGuard;
