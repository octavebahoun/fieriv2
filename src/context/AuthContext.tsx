import React, { createContext, useContext, useState, useEffect } from 'react';
import { Member } from '../types';
import * as authApi from '../api/auth';

interface AuthContextType {
  member: Member | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  loginMember: (credentials: any) => Promise<any>;
  registerMember: (userData: any) => Promise<any>;
  logoutMember: () => void;
  refreshMember: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [member, setMember] = useState<Member | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Initialize Auth state
  useEffect(() => {
    const initAuth = async () => {
      const savedToken = localStorage.getItem('fieri_token');
      if (savedToken) {
        setToken(savedToken);
        try {
          const profile = await authApi.fetchMe();
          setMember(profile);
        } catch (error) {
          console.error("Erreur lors de la récupération du profil", error);
          // Token matches expired or invalid
          localStorage.removeItem('fieri_token');
          setToken(null);
          setMember(null);
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const loginMember = async (credentials: any) => {
    setLoading(true);
    try {
      const data = await authApi.login(credentials);
      // Supposons que l'API renvoie { token, member } ou { accessToken, user } etc.
      // On s'adapte aux deux
      const receivedToken = data.token || data.accessToken || data.jwt;
      const receivedMember = data.member || data.user || data;

      if (receivedToken) {
        localStorage.setItem('fieri_token', receivedToken);
        setToken(receivedToken);
        
        // Fetch to ensure we get the full /me format
        try {
          const fullProfile = await authApi.fetchMe();
          setMember(fullProfile);
        } catch {
          setMember(receivedMember);
        }
      } else {
        throw new Error("Token non reçu de l'API");
      }
      return data;
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const registerMember = async (userData: any) => {
    setLoading(true);
    try {
      const data = await authApi.register(userData);
      // Certain API de register connectent l'utilisateur automatiquement
      const receivedToken = data.token || data.accessToken;
      const receivedMember = data.member || data.user;

      if (receivedToken) {
        localStorage.setItem('fieri_token', receivedToken);
        setToken(receivedToken);
        setMember(receivedMember || null);
      }
      return data;
    } catch (error) {
      console.error("Registration failed:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logoutMember = () => {
    localStorage.removeItem('fieri_token');
    setToken(null);
    setMember(null);
  };

  const refreshMember = async () => {
    if (token) {
      try {
        const profile = await authApi.fetchMe();
        setMember(profile);
      } catch (error) {
        console.error("Failed to refresh profile", error);
      }
    }
  };

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider value={{
      member,
      token,
      isAuthenticated,
      loading,
      loginMember,
      registerMember,
      logoutMember,
      refreshMember
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
