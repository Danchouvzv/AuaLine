"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import AuthForm from '@/components/auth/AuthForm';

export default function SignupPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    // Intro animation delay
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  // Benefits list items
  const benefits = [
    "Access to exclusive sustainable products",
    "Track your environmental impact",
    "Join a community of eco-conscious artists",
    "Early access to new releases"
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left side - Authentication form */}
      <div className="w-full md:w-1/2 bg-white dark:bg-slate-900 flex flex-col items-center justify-center p-6 md:p-12 order-2 md:order-1">
        <div className="w-full max-w-md">
          {/* Back navigation */}
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Link 
              href="/" 
              className="inline-flex items-center text-sm text-slate-600 dark:text-slate-400 hover:text-eco-leaf dark:hover:text-eco-leaf transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              <span>Back to home</span>
            </Link>
          </motion.div>

          {/* Auth form component */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
            transition={{ duration: 0.6 }}
          >
            <AuthForm mode="signup" />
          </motion.div>
          
          {/* Terms and policy */}
          <motion.div 
            className="mt-8 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: isLoaded ? 1 : 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <p className="text-xs text-slate-500 dark:text-slate-400">
              By creating an account, you agree to our{' '}
              <Link href="/terms" className="text-eco-leaf hover:underline">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link href="/privacy" className="text-eco-leaf hover:underline">
                Privacy Policy
              </Link>.
            </p>
          </motion.div>
        </div>
      </div>
      
      {/* Right side - Benefits and illustration */}
      <div className="md:w-1/2 bg-gradient-to-br from-sky-blue to-eco-leaf hidden md:flex flex-col relative overflow-hidden order-1 md:order-2">
        {/* Abstract shapes background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-[20%] right-[15%] w-64 h-64 rounded-full bg-white opacity-20"></div>
          <div className="absolute bottom-[30%] left-[10%] w-40 h-40 rounded-full bg-white opacity-10"></div>
          <div className="absolute top-[60%] right-[5%] w-32 h-32 rounded-full bg-white opacity-10"></div>
        </div>
        
        <div className="relative z-10 flex flex-col items-center justify-center px-8 py-16 h-full text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-8"
          >
            <Image 
              src="/images/logo-white.png" 
              alt="AuaLine Logo" 
              width={140} 
              height={50}
              className="mx-auto"
            />
          </motion.div>
          
          <motion.h1 
            className="text-3xl md:text-4xl font-bold mb-6 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Join the Movement
          </motion.h1>
          
          <motion.p 
            className="text-xl text-white/90 text-center max-w-md mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            Create an account today and become part of our sustainability mission.
          </motion.p>
          
          <motion.div
            className="w-full max-w-sm mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <h3 className="text-xl font-semibold mb-4 text-white/90">Member Benefits</h3>
            <ul className="space-y-3">
              {benefits.map((benefit, index) => (
                <motion.li 
                  key={index}
                  className="flex items-center text-white/90"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
                >
                  <CheckCircle className="h-5 w-5 mr-2 text-white" />
                  <span>{benefit}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
          
          <motion.div
            className="relative w-full max-w-sm h-48"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 1.6 }}
          >
            <Image
              src="/images/signup-illustration.png"
              alt="Illustration"
              fill
              style={{ objectFit: 'contain' }}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
} 