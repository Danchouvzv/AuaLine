"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Send, Check } from 'lucide-react';
import InkSplashCanvas from '@/components/auth/InkSplashCanvas';

export default function ResetPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  return (
    <>
      {/* Canvas for animated ink splashes */}
      <InkSplashCanvas />
      
      <div 
        className="min-h-screen w-full bg-gradient-to-tr from-white to-gray-100 dark:from-slate-950 dark:to-slate-900 flex items-center justify-center p-4 md:p-6"
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
              href="/auth/login" 
              className="inline-flex items-center text-sm text-slate-600 dark:text-slate-400 hover:text-eco-leaf dark:hover:text-eco-leaf transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to login
            </Link>
          </motion.div>

          {/* Reset password form */}
          <motion.div 
            variants={itemVariants}
            className="relative min-h-[400px] w-full overflow-hidden rounded-xl bg-white dark:bg-slate-900 p-1"
          >
            {/* Animated background with gradient */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-sky-50 dark:from-slate-900 dark:to-emerald-950 opacity-50"></div>
            </div>
            
            {/* Form content */}
            <div className="relative z-10 p-6 md:p-10">
              {submitted ? (
                <motion.div 
                  className="flex flex-col items-center justify-center h-[300px]"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <motion.div 
                    className="w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center mb-6"
                    initial={{ scale: 0 }}
                    animate={{ scale: [0, 1.2, 1] }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <Check className="h-10 w-10 text-emerald-600 dark:text-emerald-400" />
                  </motion.div>
                  <h2 className="text-2xl font-bold mb-2 text-center">Check your inbox</h2>
                  <p className="text-center text-slate-500 dark:text-slate-400 mb-6">
                    We've sent a password reset link to your email address.
                  </p>
                  <p className="text-center text-sm text-slate-500 dark:text-slate-400">
                    If you don't receive an email within a few minutes, please check your spam folder.
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="flex justify-center mb-6">
                    <motion.div 
                      className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center"
                      initial={{ y: -20 }}
                      animate={{ y: 0 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      <svg 
                        width="32" 
                        height="32" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        xmlns="http://www.w3.org/2000/svg"
                        className="text-eco-leaf"
                      >
                        <path 
                          d="M12 15V17M6 21H18C19.1046 21 20 20.1046 20 19V9C20 7.89543 19.1046 7 18 7H6C4.89543 7 4 7.89543 4 9V19C4 20.1046 4.89543 21 6 21ZM16 7V5C16 3.89543 15.1046 3 14 3H10C8.89543 3 8 3.89543 8 5V7H16Z" 
                          stroke="currentColor" 
                          strokeWidth="2" 
                          strokeLinecap="round" 
                          strokeLinejoin="round"
                        />
                      </svg>
                    </motion.div>
                  </div>

                  <motion.h1 
                    className="text-3xl font-bold text-center mb-2"
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                  >
                    Reset Your Password
                  </motion.h1>
                  
                  <motion.p 
                    className="text-slate-500 dark:text-slate-400 text-center mb-8"
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                  >
                    Enter your email address to receive a password reset link
                  </motion.p>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <motion.div
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      <label className="block text-sm font-medium mb-1.5" htmlFor="email">
                        Email Address
                      </label>
                      <div className="relative">
                        <input
                          type="email"
                          id="email"
                          className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-eco-leaf"
                          placeholder="your@email.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      <button
                        type="submit"
                        className="w-full py-3 px-4 bg-eco-leaf hover:bg-eco-leaf/90 text-white font-medium rounded-lg flex items-center justify-center transition-all duration-300 relative overflow-hidden group"
                        disabled={loading}
                      >
                        <span className="relative z-10 flex items-center">
                          {loading ? (
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                          ) : (
                            <Send className="h-4 w-4 mr-2 transition-transform duration-300 group-hover:translate-x-1" />
                          )}
                          Reset Password
                        </span>
                        <span className="absolute inset-0 h-full w-full scale-0 rounded-lg transition-all duration-300 group-hover:scale-100 group-hover:bg-white/10"></span>
                      </button>
                    </motion.div>
                  </form>
                </motion.div>
              )}
            </div>
          </motion.div>
          
          {/* Additional information */}
          <motion.div 
            variants={itemVariants}
            className="mt-6 text-center"
          >
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Remembered your password? <Link href="/auth/login" className="text-eco-leaf hover:underline font-medium">Back to login</Link>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
} 