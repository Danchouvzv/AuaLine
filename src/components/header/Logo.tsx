"use client";

import { motion } from "framer-motion";

const Logo = () => {
  return (
    <motion.div
      className="flex items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* SVG Logo */}
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="mr-2"
      >
        <motion.path
          d="M20 5C11.716 5 5 11.716 5 20C5 28.284 11.716 35 20 35C28.284 35 35 28.284 35 20C35 11.716 28.284 5 20 5Z"
          fill="url(#gradient)"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <motion.path
          d="M15 20C15 22.761 17.239 25 20 25C22.761 25 25 22.761 25 20C25 17.239 22.761 15 20 15"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        />
        <motion.path
          d="M10 17C10 17 13 13 20 13"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ delay: 1, duration: 0.75 }}
        />
        <defs>
          <linearGradient
            id="gradient"
            x1="5"
            y1="5"
            x2="35"
            y2="35"
            gradientUnits="userSpaceOnUse"
          >
            <stop className="dark:stop-opacity-0" stopColor="#0D1B2A" />
            <stop offset="0.5" stopColor="#4DA8DA" />
            <stop offset="1" stopColor="#FFD60A" />
          </linearGradient>
        </defs>
      </svg>
      <div className="flex flex-col">
        <span className="text-xl font-bold text-ink-blue dark:text-solar-yellow">
          AuaLine
        </span>
        <span className="text-xs text-sky-blue dark:text-soft-lilac">
          Air-to-Ink
        </span>
      </div>
    </motion.div>
  );
};

export default Logo; 