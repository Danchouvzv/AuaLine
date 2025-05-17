"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Home, Search, Droplets } from 'lucide-react';

const NotFound = () => {
  const [dropsVisible, setDropsVisible] = useState(Array(20).fill(false));
  
  useEffect(() => {
    // Make drops appear one by one
    dropsVisible.forEach((_, index) => {
      setTimeout(() => {
        setDropsVisible(prev => {
          const newState = [...prev];
          newState[index] = true;
          return newState;
        });
      }, 100 * index);
    });
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2,
        delay: 0.3
      }
    }
  };
  
  const childVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };
  
  const numberVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 10
      }
    }
  };
  
  const generateDrops = () => {
    return Array(20).fill(0).map((_, index) => {
      const size = Math.random() * 30 + 10;
      const left = Math.random() * 100;
      const animationDuration = Math.random() * 3 + 2;
      const delay = Math.random() * 2;
      
      return (
        <motion.div
          key={index}
          className="absolute drop-shadow-lg"
          style={{
            left: `${left}%`,
            top: `-${size}px`,
            width: `${size}px`,
            height: `${size * 1.5}px`,
            opacity: dropsVisible[index] ? 1 : 0,
          }}
          animate={{
            y: ['0vh', '120vh'],
            opacity: [1, 0],
          }}
          transition={{
            duration: animationDuration,
            delay: delay,
            repeat: Infinity,
            ease: "easeIn"
          }}
        >
          <svg viewBox="0 0 30 42" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path 
              d="M15 3C16.8333 6.33333 25 18.4 25 26C25 33.6 20.5 40 15 40C9.5 40 5 33.6 5 26C5 18.4 13.1667 6.33333 15 3Z" 
              fill="url(#paint0_linear)" 
              stroke="#3B9563" 
              strokeWidth="2"
            />
            <defs>
              <linearGradient id="paint0_linear" x1="15" y1="3" x2="15" y2="40" gradientUnits="userSpaceOnUse">
                <stop stopColor="#4DA8DA" />
                <stop offset="1" stopColor="#3B9563" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>
      );
    });
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-white to-slate-50 dark:from-slate-950 dark:to-slate-900 flex flex-col items-center justify-center">
      {/* Animated background */}
      {generateDrops()}
      
      {/* Content */}
      <motion.div
        className="container z-10 mx-auto px-4 text-center py-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* 404 Ink Spill */}
        <div className="relative mx-auto w-fit mb-12">
          <motion.div 
            className="text-[12rem] md:text-[16rem] font-bold leading-none tracking-tighter flex items-center justify-center relative overflow-visible"
            variants={numberVariants}
          >
            <span className="text-emerald-600">4</span>
            <div className="relative">
              <span className="text-emerald-600">0</span>
              <Droplets className="absolute -top-10 -right-4 h-16 w-16 text-emerald-400 animate-bounce" />
            </div>
            <span className="text-emerald-600">4</span>
            
            {/* Ink spill SVG under the numbers */}
            <svg 
              className="absolute -bottom-16 -z-10 w-[120%] max-w-none"
              viewBox="0 0 400 150" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20,75 C60,30 120,10 200,75 C280,140 340,120 380,75"
                stroke="none"
                fill="#3B9563"
                fillOpacity="0.2"
              />
              <path
                d="M40,85 C80,40 140,20 200,85 C260,150 320,130 360,85"
                stroke="none"
                fill="#3B9563"
                fillOpacity="0.3"
              />
              <path
                d="M60,95 C100,50 160,30 200,95 C240,160 300,140 340,95"
                stroke="none"
                fill="#3B9563"
                fillOpacity="0.4"
              />
            </svg>
          </motion.div>
        </div>
        
        <motion.h1 
          className="text-4xl md:text-5xl font-bold mb-4 text-slate-800 dark:text-white"
          variants={childVariants}
        >
          Page Not Found
        </motion.h1>
        
        <motion.p 
          className="text-xl mb-8 max-w-2xl mx-auto text-slate-600 dark:text-slate-300"
          variants={childVariants}
        >
          Looks like this page has evaporated like our ink's water content.
          Don't worry - unlike air pollution, this mistake can be fixed!
        </motion.p>
        
        <motion.div 
          className="flex flex-col sm:flex-row gap-4 justify-center"
          variants={childVariants}
        >
          <Link href="/">
            <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700">
              <Home className="mr-2 h-5 w-5" />
              Return Home
            </Button>
          </Link>
          
          <Link href="/products">
            <Button size="lg" variant="outline">
              <Search className="mr-2 h-5 w-5" />
              Browse Products
            </Button>
          </Link>
        </motion.div>
        
        <motion.div
          className="mt-16 text-sm text-slate-500 dark:text-slate-400"
          variants={childVariants}
        >
          <p>
            Want to report this issue? <a href="mailto:support@aualine.com" className="text-emerald-600 hover:underline">Contact Support</a>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default NotFound; 