"use client";

import React, { useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import AuthForm from '@/components/auth/AuthForm';
import InkSplashCanvas from '@/components/auth/InkSplashCanvas';

export default function LoginPage() {
  // Reveal page content with animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };
  
  // Track clicks for interactive ink splashes
  const handleInteraction = (e: React.MouseEvent<HTMLDivElement>) => {
    // Dispatch a custom event that InkSplashCanvas can listen to
    const event = new CustomEvent('createInkSplash', {
      detail: { x: e.clientX, y: e.clientY }
    });
    document.dispatchEvent(event);
  };

  return (
    <>
      {/* Canvas for animated ink splashes */}
      <InkSplashCanvas />
      
      <div 
        className="min-h-screen w-full bg-gradient-to-br from-white to-gray-100 dark:from-slate-950 dark:to-slate-900 flex items-center justify-center p-4 md:p-6"
        onClick={handleInteraction}
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full max-w-md"
        >
          {/* Back navigation */}
          <motion.div 
            variants={itemVariants}
            className="mb-6"
          >
            <Link 
              href="/" 
              className="inline-flex items-center text-sm text-slate-600 dark:text-slate-400 hover:text-eco-leaf dark:hover:text-eco-leaf transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to home
            </Link>
          </motion.div>

          {/* Auth form component */}
          <motion.div variants={itemVariants}>
            <AuthForm mode="login" />
          </motion.div>
          
          {/* Social logins (placed outside the form card) */}
          <motion.div 
            variants={itemVariants}
            className="mt-6 text-center"
          >
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">By signing in, you agree to our <Link href="/terms" className="text-eco-leaf hover:underline">Terms of Service</Link> and <Link href="/privacy" className="text-eco-leaf hover:underline">Privacy Policy</Link>.</p>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
} 