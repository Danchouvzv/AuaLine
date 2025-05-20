"use client";

import { useState, useEffect, createContext, useContext, ReactNode } from 'react';

// Define the User type
export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}

// Define the auth context type
export interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  signIn: (email: string, password: string) => Promise<User>;
  signUp: (email: string, password: string, displayName: string) => Promise<User>;
  signOut: () => Promise<void>;
}

// Create the auth context
export const AuthContext = createContext<AuthContextType | null>(null);

// Auth provider component
interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Check if user is logged in
  useEffect(() => {
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
    setLoading(true);
    setError(null);
    
    try {
      // Basic validation
      if (!email || !email.includes('@')) {
        throw new Error('Please enter a valid email address');
      }
      
      if (!password || password.length < 6) {
        throw new Error('Password must be at least 6 characters');
      }

      // For demo purposes - would connect to real authentication in production
      // Simply create a user object based on the provided email
      const newUser: User = {
        uid: `user_${Date.now()}`,
        email: email,
        displayName: email.split('@')[0],
        photoURL: null
      };
      
      // Set user in state and localStorage
      setUser(newUser);
      localStorage.setItem('auth_user', JSON.stringify(newUser));
      
      return newUser;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      setError(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Sign up function
  const signUp = async (email: string, password: string, displayName: string): Promise<User> => {
    setLoading(true);
    setError(null);
    
    try {
      // Basic validation
      if (!email || !email.includes('@')) {
        throw new Error('Please enter a valid email address');
      }
      
      if (!password || password.length < 6) {
        throw new Error('Password must be at least 6 characters');
      }
      
      if (!displayName || displayName.length < 2) {
        throw new Error('Display name must be at least 2 characters');
      }
      
      // For demo purposes - would connect to real authentication in production
      const newUser: User = {
        uid: `user_${Date.now()}`,
        email: email,
        displayName: displayName,
        photoURL: null
      };
      
      // Set user in state and localStorage
      setUser(newUser);
      localStorage.setItem('auth_user', JSON.stringify(newUser));
      
      return newUser;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      setError(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Sign out function
  const signOut = async (): Promise<void> => {
    try {
      // Clear user data
      setUser(null);
      localStorage.removeItem('auth_user');
    } catch (error) {
      console.error('Sign out error:', error);
      setError('Failed to sign out');
    }
  };

  const value = {
    user,
    loading,
    error,
    signIn,
    signUp,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Custom hook to use auth
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 