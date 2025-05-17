"use client";

import { motion } from "framer-motion";

const HeroCopy = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="max-w-xl mx-auto lg:mx-0"
    >
      <motion.div variants={item}>
        <h4 className="text-lg md:text-xl text-sky-blue font-medium">
          Welcome to AuaLine
        </h4>
      </motion.div>
      
      <motion.div variants={item}>
        <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-bold text-white font-heading leading-tight">
          Breathe Innovation,{" "}
          <span className="text-solar-yellow">Print Sustainably</span>
        </h1>
      </motion.div>
      
      <motion.div variants={item}>
        <p className="mt-6 text-lg md:text-xl text-white/80 max-w-lg">
          Transforming air pollution into premium eco-friendly ink products.
          Every purchase helps clean our air and reduces your environmental footprint.
        </p>
      </motion.div>
      
      <motion.div variants={item}>
        <div className="mt-6 flex items-center justify-center lg:justify-start space-x-4">
          <div className="flex flex-col items-center">
            <span className="text-3xl font-bold text-solar-yellow">95%</span>
            <span className="text-xs text-white/80">Less CO₂</span>
          </div>
          <div className="h-10 w-px bg-white/20"></div>
          <div className="flex flex-col items-center">
            <span className="text-3xl font-bold text-solar-yellow">120+</span>
            <span className="text-xs text-white/80">Hours Cleaner Air</span>
          </div>
          <div className="h-10 w-px bg-white/20"></div>
          <div className="flex flex-col items-center">
            <span className="text-3xl font-bold text-solar-yellow">10k+</span>
            <span className="text-xs text-white/80">Happy Artists</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default HeroCopy; 