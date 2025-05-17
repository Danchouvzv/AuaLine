"use client";

import { useState, useEffect } from 'react';
import { 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut as firebaseSignOut, 
  GoogleAuthProvider, 
  signInWithPopup, 
  updateProfile,
  User
} from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../firebase/config';

interface UserData {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  role: string;
  ecoStats: {
    co2Saved: number;
    airFiltered: number;
    treesEquivalent: number;
  };
  createdAt: any;
  lastLogin: any;
}

interface AuthState {
  user: User | null;
  userData: UserData | null;
  loading: boolean;
  error: string | null;
}

export function useAuth() {
  const [state, setState] = useState<AuthState>({
    user: null,
    userData: null,
    loading: true,
    error: null,
  });

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          // Get the user's additional data from Firestore
          const userDocRef = doc(db, 'users', user.uid);
          const userDoc = await getDoc(userDocRef);
          
          // If user exists in Firestore, get their data
          if (userDoc.exists()) {
            setState({
              user,
              userData: userDoc.data() as UserData,
              loading: false,
              error: null,
            });
          } else {
            // User is authenticated but no Firestore data yet
            setState({
              user,
              userData: null,
              loading: false,
              error: null,
            });
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          setState({
            user,
            userData: null,
            loading: false,
            error: "Failed to fetch user data",
          });
        }
      } else {
        // No user is signed in
        setState({
          user: null,
          userData: null,
          loading: false,
          error: null,
        });
      }
    });

    // Cleanup subscription
    return () => unsubscribe();
  }, []);

  // Sign in with email and password
  const signIn = async (email: string, password: string) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      
      // Update last login timestamp
      const userDocRef = doc(db, 'users', userCredential.user.uid);
      await setDoc(userDocRef, {
        lastLogin: serverTimestamp()
      }, { merge: true });
      
      return userCredential.user;
    } catch (error: any) {
      setState(prev => ({ 
        ...prev, 
        loading: false, 
        error: error.message || "Failed to sign in" 
      }));
      throw error;
    }
  };

  // Sign up with email and password
  const signUp = async (email: string, password: string, displayName: string) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Update profile with display name
      if (auth.currentUser) {
        await updateProfile(auth.currentUser, { displayName });
      }
      
      // Create user document in Firestore
      const userDocRef = doc(db, 'users', userCredential.user.uid);
      await setDoc(userDocRef, {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        displayName,
        photoURL: null,
        role: 'user', // Default role
        ecoStats: {
          co2Saved: 0,
          airFiltered: 0,
          treesEquivalent: 0
        },
        createdAt: serverTimestamp(),
        lastLogin: serverTimestamp()
      });
      
      return userCredential.user;
    } catch (error: any) {
      setState(prev => ({ 
        ...prev, 
        loading: false, 
        error: error.message || "Failed to sign up" 
      }));
      throw error;
    }
  };

  // Sign in with Google
  const signInWithGoogle = async () => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      
      // Check if user document exists
      const userDocRef = doc(db, 'users', userCredential.user.uid);
      const userDoc = await getDoc(userDocRef);
      
      if (!userDoc.exists()) {
        // Create new user document
        await setDoc(userDocRef, {
          uid: userCredential.user.uid,
          email: userCredential.user.email,
          displayName: userCredential.user.displayName,
          photoURL: userCredential.user.photoURL,
          role: 'user', // Default role
          ecoStats: {
            co2Saved: 0,
            airFiltered: 0,
            treesEquivalent: 0
          },
          createdAt: serverTimestamp(),
          lastLogin: serverTimestamp()
        });
      } else {
        // Update last login
        await setDoc(userDocRef, {
          lastLogin: serverTimestamp()
        }, { merge: true });
      }
      
      return userCredential.user;
    } catch (error: any) {
      setState(prev => ({ 
        ...prev, 
        loading: false, 
        error: error.message || "Failed to sign in with Google" 
      }));
      throw error;
    }
  };

  // Sign out
  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
    } catch (error: any) {
      setState(prev => ({ 
        ...prev, 
        error: error.message || "Failed to sign out" 
      }));
      throw error;
    }
  };

  return {
    user: state.user,
    userData: state.userData,
    loading: state.loading,
    error: state.error,
    signIn,
    signUp,
    signInWithGoogle,
    signOut,
  };
} 