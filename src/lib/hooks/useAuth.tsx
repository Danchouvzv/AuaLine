"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define the User type
export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  role?: string;
  bio?: string;
  location?: string;
  joinDate?: string;
  ecoScore?: number;
  ecoStats?: {
    co2Saved: number;
    airFiltered: number;
    treesEquivalent: number;
  };
}

// Define the Auth context type
interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<User>;
  signUp: (email: string, password: string, displayName: string) => Promise<User>;
  signOut: () => Promise<void>;
  error: string | null;
}

// Create Auth context
const AuthContext = createContext<AuthContextType | null>(null);

// Auth provider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Check if user is logged in on mount
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
        setError('Failed to restore authentication state');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Sign in function with validation
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

      // In a real app, this would be an API call to your backend
      // For now, we'll simulate a successful login if the credentials match our test accounts
      
      // Demo accounts for testing
      const validAccounts = [
        {
          email: 'user@example.com',
          password: 'password123',
          userData: {
            uid: 'user123',
            email: 'user@example.com',
            displayName: 'Eco Artist',
            photoURL: null,
            role: 'user',
            bio: 'Passionate about sustainable art and environmental conservation.',
            location: 'Almaty, Kazakhstan',
            joinDate: '2023-04-15',
            ecoScore: 78,
            ecoStats: {
              co2Saved: 28.5,
              airFiltered: 120,
              treesEquivalent: 3.2
            }
          }
        },
        {
          email: 'admin@aualine.com',
          password: 'admin123',
          userData: {
            uid: 'admin456',
            email: 'admin@aualine.com',
            displayName: 'Admin User',
            photoURL: null,
            role: 'admin',
            location: 'Almaty, Kazakhstan',
            joinDate: '2023-01-10',
            ecoScore: 95,
            ecoStats: {
              co2Saved: 156.2,
              airFiltered: 720,
              treesEquivalent: 12.8
            }
          }
        }
      ];
      
      // Find matching account
      const account = validAccounts.find(acc => acc.email === email && acc.password === password);
      
      if (!account) {
        throw new Error('Invalid email or password');
      }
      
      // Set user in state and localStorage
      setUser(account.userData);
      localStorage.setItem('auth_user', JSON.stringify(account.userData));
      
      return account.userData;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      setError(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Sign up function with validation
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
      
      // In a real app, this would create a new user in your database
      // For demo purposes, we'll create a new user object
      const newUser: User = {
        uid: `user_${Date.now()}`,
        email: email,
        displayName: displayName,
        photoURL: null,
        role: 'user',
        location: 'Almaty, Kazakhstan',
        joinDate: new Date().toISOString().split('T')[0],
        ecoScore: 10,
        ecoStats: {
          co2Saved: 0,
          airFiltered: 0,
          treesEquivalent: 0
        }
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
    setLoading(true);
    
    try {
      // Clear user data
      setUser(null);
      localStorage.removeItem('auth_user');
    } catch (error) {
      console.error('Sign out error:', error);
      setError('Failed to sign out');
    } finally {
      setLoading(false);
    }
  };

  // Create context value
  const contextValue = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
    error
  };

  return (
    <AuthContext.Provider value={contextValue}>
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