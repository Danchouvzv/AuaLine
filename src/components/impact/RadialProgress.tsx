"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface RadialProgressProps {
  percentage: number;
}

const RadialProgress = ({ percentage }: RadialProgressProps) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Calculate the circle properties
  const size = 200;
  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const dash = (percentage * circumference) / 100;

  // Animation variants
  const variants = {
    hidden: {
      strokeDashoffset: circumference,
    },
    visible: {
      strokeDashoffset: circumference - dash,
      transition: {
        duration: 1.5,
        ease: "easeInOut",
      },
    },
  };

  // Only render the SVG on the client to prevent hydration issues
  if (!isClient) {
    return <div className="w-48 h-48"></div>;
  }

  return (
    <div className="relative">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#e6e6e6"
          strokeWidth={strokeWidth}
        />
        
        {/* Progress circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="url(#circleGradient)"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={circumference}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          variants={variants}
          initial="hidden"
          animate="visible"
        />
        
        {/* Gradient definition */}
        <defs>
          <linearGradient id="circleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#28A745" /> {/* eco-leaf */}
            <stop offset="100%" stopColor="#4DA8DA" /> {/* sky-blue */}
          </linearGradient>
        </defs>
      </svg>
      
      {/* Centered text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-4xl font-bold text-ink-blue dark:text-white">
          {percentage}%
        </span>
        <span className="text-sm text-gray-500 dark:text-gray-300">
          Eco Impact
        </span>
      </div>
      
      {/* Liquid effect - bubbles */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute w-2 h-2 rounded-full bg-sky-blue/40"
          style={{ bottom: "30%", left: "30%" }}
          animate={{
            y: [-10, -50],
            opacity: [0, 1, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 2,
            repeatType: "loop",
          }}
        />
        <motion.div
          className="absolute w-3 h-3 rounded-full bg-eco-leaf/40"
          style={{ bottom: "20%", right: "40%" }}
          animate={{
            y: [-15, -70],
            opacity: [0, 1, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 3,
            delay: 0.5,
            repeatType: "loop",
          }}
        />
        <motion.div
          className="absolute w-1.5 h-1.5 rounded-full bg-sky-blue/40"
          style={{ bottom: "15%", left: "45%" }}
          animate={{
            y: [-5, -40],
            opacity: [0, 1, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 2.5,
            delay: 1,
            repeatType: "loop",
          }}
        />
      </div>
    </div>
  );
};

export default RadialProgress; 