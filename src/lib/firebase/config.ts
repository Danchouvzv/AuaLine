"use client";

// Import the Firebase SDK components we need
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getFunctions } from 'firebase/functions';
import { getAnalytics, isSupported } from 'firebase/analytics';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase (only in client environment)
const app = typeof window !== 'undefined' && !getApps().length ? initializeApp(firebaseConfig) : 
           typeof window !== 'undefined' ? getApp() : null;

// Initialize services (only if app exists)
const db = app ? getFirestore(app) : null;
const auth = app ? getAuth(app) : null;
const storage = app ? getStorage(app) : null;
const functions = app ? getFunctions(app) : null;

// Use local emulators in development - comment out in production
if (process.env.NODE_ENV === 'development' && db) {
  try {
    // Check if we're in a browser environment before attempting to connect
    if (typeof window !== 'undefined') {
      console.log('Using Firestore emulator in development');
      // connectFirestoreEmulator(db, 'localhost', 8080);
    }
  } catch (error) {
    console.error('Error connecting to Firestore emulator:', error);
  }
}

// Initialize Analytics (client-side only)
let analytics = null;

// Make sure analytics is only initialized on the client
if (typeof window !== 'undefined' && app) {
  // Dynamic import for analytics
  const initializeAnalytics = async () => {
    try {
      const analyticsSupported = await isSupported();
      if (analyticsSupported) {
        analytics = getAnalytics(app);
        console.log('Firebase Analytics initialized');
      }
    } catch (error) {
      console.error('Error initializing analytics:', error);
    }
  };
  
  // Call the initialization function
  initializeAnalytics();
}

export { app, db, auth, storage, functions, analytics }; 