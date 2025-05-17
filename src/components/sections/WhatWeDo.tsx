"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Wind, Filter, Droplet } from "lucide-react";

const features = [
  {
    title: "Capture Air",
    description: "Our proprietary technology captures harmful PM2.5 particles and carbon emissions from urban environments.",
    icon: Wind,
    stat: "1.2 tons",
    statLabel: "of air filtered monthly",
    color: "bg-sky-blue",
  },
  {
    title: "Filter PM2.5",
    description: "We extract and purify the captured carbon, transforming environmental pollution into usable materials.",
    icon: Filter,
    stat: "99.7%",
    statLabel: "particle filtration rate",
    color: "bg-solar-yellow",
  },
  {
    title: "Create Ink",
    description: "The processed carbon is converted into premium, eco-friendly ink with vibrant, long-lasting colors.",
    icon: Droplet,
    stat: "5x",
    statLabel: "lower carbon footprint",
    color: "bg-eco-leaf",
  },
];

const WhatWeDo = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };
  
  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <section id="what-we-do" className="section-space bg-white dark:bg-carbon-black">
      <div className="container mx-auto container-padding">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
              What We Do
            </h2>
            <p className="text-lg max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
              From harmful air pollution to sustainable ink products - our three-step process.
            </p>
          </motion.div>
        </div>

        <motion.div
          ref={ref}
          variants={container}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={item}
              transition={{ duration: 0.5 }}
              className="bg-gray-50 dark:bg-ink-blue/30 rounded-lg p-8 shadow-lg relative overflow-hidden group"
            >
              {/* Card content */}
              <div className="relative z-10">
                {/* Icon */}
                <div className={`p-3 ${feature.color} rounded-lg inline-block mb-4`}>
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                
                {/* Title */}
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                
                {/* Description */}
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {feature.description}
                </p>
                
                {/* Stat */}
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-2xl font-bold text-ink-blue dark:text-solar-yellow">
                    {feature.stat}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {feature.statLabel}
                  </p>
                </div>
              </div>
              
              {/* Background decoration */}
              <div className="absolute -right-10 -bottom-10 w-40 h-40 rounded-full bg-gray-200 dark:bg-gray-800/50 opacity-30 transition-transform duration-500 group-hover:scale-150"></div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhatWeDo; 