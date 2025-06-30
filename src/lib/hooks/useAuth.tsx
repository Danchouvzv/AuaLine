"use client";

import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut as firebaseSignOut, 
  onAuthStateChanged 
} from 'firebase/auth';
import { auth } from '../firebase/config';

// Define the User type
export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}

// Define the context type
export interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  signIn: (email: string, password: string) => Promise<User>;
  signUp: (email: string, password: string, displayName: string) => Promise<User>;
  signOut: () => Promise<void>;
}

// Create the context
export const AuthContext = createContext<AuthContextType | null>(null);

// Create a mock user for development
export const MOCK_USER: User = {
  uid: 'mock-user-123',
  email: 'user@example.com',
  displayName: 'Demo User',
  photoURL: null,
};

// AuthProvider props
interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Check if user is logged in
  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;

    // Check if auth is initialized
    if (!auth) {
      console.warn('Firebase Auth is not initialized');
      setLoading(false);
      // Use mock user for development
      setUser(MOCK_USER);
      return;
    }

    // Set up auth state observer
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setLoading(true);
      if (firebaseUser) {
        // User is signed in
        const userData: User = {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
          photoURL: firebaseUser.photoURL,
        };
        setUser(userData);
      } else {
        // User is signed out
        setUser(null);
      }
      setLoading(false);
    });

    // Cleanup function
    return () => unsubscribe();
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

      // Check if auth is initialized
      if (!auth) {
        console.warn('Firebase Auth is not initialized, using mock user');
        setUser(MOCK_USER);
        return MOCK_USER;
      }

      // Sign in with Firebase
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;
      
      const userData: User = {
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        displayName: firebaseUser.displayName,
        photoURL: firebaseUser.photoURL,
      };
      
      setUser(userData);
      return userData;
    } catch (error: any) {
      const errorMessage = error.message || 'An unknown error occurred';
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
      
      // Check if auth is initialized
      if (!auth) {
        console.warn('Firebase Auth is not initialized, using mock user');
        // Create a mock user with the provided details
        const mockUser: User = {
          uid: `mock-user-${Date.now()}`,
          email: email,
          displayName: displayName,
          photoURL: null,
        };
        setUser(mockUser);
        return mockUser;
      }
      
      // Create user with Firebase
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;
      
      // TODO: Update user profile with displayName
      // await updateProfile(firebaseUser, { displayName });
      
      const userData: User = {
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        displayName: displayName, // Use provided display name
        photoURL: null,
      };
      
      setUser(userData);
      return userData;
    } catch (error: any) {
      const errorMessage = error.message || 'An unknown error occurred';
      setError(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Sign out function
  const signOut = async (): Promise<void> => {
    try {
      if (!auth) {
        console.warn('Firebase Auth is not initialized');
        setUser(null);
        return;
      }
      await firebaseSignOut(auth);
      setUser(null);
    } catch (error: any) {
      console.error('Sign out error:', error);
      setError('Failed to sign out');
      throw error;
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

// Custom hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 