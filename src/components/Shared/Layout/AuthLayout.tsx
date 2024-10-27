'use client'

import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { loginUser } from '@/services/api/endpoints';

interface User {
  id: string;
  username: string;
  email: string;
  // Add any other user properties you need
}

export interface Business {
    id: string;
    fullBusinessName: string;
    businessType: string;
    address: {
      street: string;
      city: string;
      state: string;
      country: string;
      postalCode: string;
    };
    numberOfEmployees: number;
    taxIdNumber: string;
    shopLogo: string | null; 
    taxationDocuments: string | null; 
    nationalIdCard: string | null; 
    contactInfo: {
      phone: string;
      email: string;
      website?: string;
    };
    legalStructure: string;
    yearEstablished: number;
    industryCategory: string;
    annualRevenue?: number;
    businessDescription: string;
    createdAt: Date;
    updatedAt: Date;
  }

interface AuthLayoutContextType {
  isAuthenticated: boolean;
  user: User | null;
  business: Business | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
}

const AuthLayoutContext = createContext<AuthLayoutContextType | undefined>(undefined);

export const useAuthLayout = () => {
  const context = useContext(AuthLayoutContext);
  if (context === undefined) {
    throw new Error('useAuthLayout must be used within an AuthLayoutProvider');
  }
  return context;
};

interface AuthLayoutProps {
  children: ReactNode;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [business, setBusiness] = useState<Business | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Check for existing authentication (e.g., from localStorage or cookies)
    const checkAuth = () => {
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        setIsAuthenticated(true);
        setToken(storedToken);
        const storedUser = localStorage.getItem('user');
        const storedBusiness = localStorage.getItem('business');
        if (storedUser) setUser(JSON.parse(storedUser));
        if (storedBusiness) setBusiness(JSON.parse(storedBusiness));
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await loginUser({ email, password });
      if (response.data && response.data.user && response.data.token) {
        setIsAuthenticated(true);
        setUser(response.data.user);
        setBusiness(response.data.business);
        setToken(response.data.token);
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        localStorage.setItem('business', JSON.stringify(response.data.business));
      } else {
        throw new Error('Login failed: Invalid response format');
      }
    } catch (error) {
      console.error('Login error:', error);
      throw new Error('Login failed');
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    setBusiness(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('business');
    router.push('/auth/login');
  };

  const updateUser = (userData: Partial<User>) => {
    setUser(prevUser => {
      if (prevUser) {
        const updatedUser = { ...prevUser, ...userData };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        return updatedUser;
      }
      return null;
    });
  };

  const value = {
    isAuthenticated,
    user,
    business,
    token,
    login,
    logout,
    updateUser,
  };

  return <AuthLayoutContext.Provider value={value}>{children}</AuthLayoutContext.Provider>;
};

export default AuthLayout;
