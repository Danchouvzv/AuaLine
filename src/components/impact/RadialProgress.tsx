"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface RadialProgressProps {
  value: number;
  size?: number;
  strokeWidth?: number;
  bgColor?: string;
  progressColor?: string;
  textColor?: string;
  showValue?: boolean;
}

const RadialProgress = ({
  value,
  size = 100,
  strokeWidth = 8,
  bgColor = 'rgba(229, 231, 235, 0.3)',
  progressColor = '#3B9563',
  textColor = '#3B9563',
  showValue = true,
}: RadialProgressProps) => {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    // Animate the progress value
    setProgress(value);
  }, [value]);
  
  // Calculate the radius and circumference
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  
  // Calculate the stroke-dashoffset
  const offset = circumference - (progress / 100) * circumference;
  
  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      {/* Background circle */}
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="absolute"
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={bgColor}
          strokeWidth={strokeWidth}
        />
      </svg>
      
      {/* Progress circle */}
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="absolute"
      >
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={progressColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          style={{ transformOrigin: 'center', transform: 'rotate(-90deg)' }}
        />
      </svg>
      
      {/* Value text */}
      {showValue && (
        <motion.span
          className="absolute text-center font-bold"
          style={{ color: textColor, fontSize: size / 4 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          {Math.round(progress)}%
        </motion.span>
      )}
    </div>
  );
};

export default RadialProgress; 