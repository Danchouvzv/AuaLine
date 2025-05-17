"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

// Define the User type
export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}

// Define the Auth context type
interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<User>;
  signUp: (email: string, password: string, displayName: string) => Promise<User>;
  signOut: () => Promise<void>;
}

// Create Auth context
const AuthContext = createContext<AuthContextType | null>(null);

// Mock user data for demo purposes
const MOCK_USER: User = {
  uid: 'user123',
  email: 'user@example.com',
  displayName: 'Demo User',
  photoURL: null
};

// Auth provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Check if user is logged in
  useEffect(() => {
    // In a real app, this would check with Firebase or another auth provider
    const checkAuth = async () => {
      try {
        // Only run on client side
        if (typeof window !== 'undefined') {
          const savedUser = localStorage.getItem('auth_user');
          if (savedUser) {
            setUser(JSON.parse(savedUser));
          }
        }
      } catch (error) {
        console.error('Auth error:', error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Sign in function
  const signIn = async (email: string, password: string): Promise<User> => {
    // This would validate with real backend in production
    setLoading(true);
    
    try {
      // Mock successful login
      // In real app, would authenticate against Firebase, Auth0, etc.
      const user = { ...MOCK_USER, email };
      setUser(user);
      localStorage.setItem('auth_user', JSON.stringify(user));
      return user;
    } finally {
      setLoading(false);
    }
  };

  // Sign up function
  const signUp = async (email: string, password: string, displayName: string): Promise<User> => {
    setLoading(true);
    
    try {
      // Mock successful registration
      const user = { ...MOCK_USER, email, displayName };
      setUser(user);
      localStorage.setItem('auth_user', JSON.stringify(user));
      return user;
    } finally {
      setLoading(false);
    }
  };

  // Sign out function
  const signOut = async (): Promise<void> => {
    setLoading(true);
    
    try {
      // Clear user data
      setUser(null);
      localStorage.removeItem('auth_user');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 