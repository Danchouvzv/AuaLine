"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Droplets, Sparkles, Wind } from 'lucide-react';
import AuthForm from '@/components/auth/AuthForm';
import InkSplashCanvas from '@/components/auth/InkSplashCanvas';

export default function LoginPage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorSize, setCursorSize] = useState(20);
  const [isLoaded, setIsLoaded] = useState(false);

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

  // Floating elements animation
  const floatingElements = Array(15).fill(0).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 30 + 10,
    duration: 15 + Math.random() * 20,
    delay: Math.random() * 5
  }));
  
  // Track mouse for interactive effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    const handleMouseDown = () => {
      setCursorSize(40);
      setTimeout(() => setCursorSize(20), 300);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    
    // Intro animation
    setTimeout(() => setIsLoaded(true), 300);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
    };
  }, []);
  
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
      {/* Custom cursor */}
      <motion.div 
        className="fixed w-6 h-6 rounded-full bg-eco-leaf/30 pointer-events-none z-50 mix-blend-screen hidden md:block"
        animate={{ 
          x: mousePosition.x - cursorSize/2, 
          y: mousePosition.y - cursorSize/2,
          scale: isLoaded ? 1 : 0,
          width: cursorSize,
          height: cursorSize
        }}
        transition={{ type: "spring", mass: 0.1, stiffness: 120, damping: 10 }}
      />
      
      {/* Canvas for animated ink splashes */}
      <InkSplashCanvas />
      
      {/* Floating elements in background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {floatingElements.map((el) => (
          <motion.div
            key={el.id}
            className="absolute opacity-30"
            style={{ left: `${el.x}%`, top: `${el.y}%` }}
            animate={{
              y: [0, -30, 0, 30, 0],
              x: [0, 20, 0, -20, 0],
              rotate: [0, 10, 0, -10, 0],
            }}
            transition={{
              duration: el.duration,
              repeat: Infinity,
              delay: el.delay,
              ease: "easeInOut"
            }}
          >
            {el.id % 3 === 0 ? (
              <Droplets size={el.size} className="text-eco-leaf" />
            ) : el.id % 3 === 1 ? (
              <Sparkles size={el.size} className="text-sky-blue" />
            ) : (
              <Wind size={el.size} className="text-emerald-500" />
            )}
          </motion.div>
        ))}
      </div>
      
      {/* Page intro animation */}
      <AnimatePresence>
        {!isLoaded && (
          <motion.div
            className="fixed inset-0 bg-eco-leaf z-50 flex items-center justify-center"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1.2, opacity: 1 }}
              exit={{ scale: 2, opacity: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Droplets size={80} className="text-white" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <div 
        className="min-h-screen w-full bg-gradient-to-br from-white to-gray-100 dark:from-slate-950 dark:to-slate-900 flex items-center justify-center p-4 md:p-6"
        onClick={handleInteraction}
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full max-w-md relative z-10"
        >
          {/* Back navigation */}
          <motion.div 
            variants={itemVariants}
            className="mb-6"
          >
            <Link 
              href="/" 
              className="inline-flex items-center text-sm text-slate-600 dark:text-slate-400 hover:text-eco-leaf dark:hover:text-eco-leaf transition-colors group"
            >
              <motion.span
                whileHover={{ x: -5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <ArrowLeft className="mr-2 h-4 w-4 group-hover:text-eco-leaf" />
              </motion.span>
              <span>Back to home</span>
            </Link>
          </motion.div>

          {/* Auth form component */}
          <motion.div 
            variants={itemVariants}
            whileHover={{ 
              boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
              y: -5
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <AuthForm mode="login" />
          </motion.div>
          
          {/* Social logins (placed outside the form card) */}
          <motion.div 
            variants={itemVariants}
            className="mt-6 text-center"
          >
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
              By signing in, you agree to our{' '}
              <Link href="/terms" className="text-eco-leaf hover:underline relative inline-block">
                <span className="relative z-10">Terms of Service</span>
                <motion.span 
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-eco-leaf/30"
                  initial={{ width: 0 }}
                  whileHover={{ width: '100%' }}
                  transition={{ duration: 0.2 }}
                />
              </Link>{' '}
              and{' '}
              <Link href="/privacy" className="text-eco-leaf hover:underline relative inline-block">
                <span className="relative z-10">Privacy Policy</span>
                <motion.span 
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-eco-leaf/30"
                  initial={{ width: 0 }}
                  whileHover={{ width: '100%' }}
                  transition={{ duration: 0.2 }}
                />
              </Link>.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
} 