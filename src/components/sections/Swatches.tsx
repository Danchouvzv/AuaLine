"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";

// Define the color swatches data
const colorSwatches = [
  {
    name: "Eco-Leaf",
    hex: "#28A745",
    class: "bg-eco-leaf",
    description: "Made from purified carbon extracted from forest air.",
    link: "/colors#eco-leaf"
  },
  {
    name: "Carbon-Black",
    hex: "#2C2C2C",
    class: "bg-carbon-black",
    description: "Our darkest ink, created directly from carbon emissions.",
    link: "/colors#carbon-black"
  },
  {
    name: "Sky-Blue",
    hex: "#4DA8DA",
    class: "bg-sky-blue",
    description: "Inspired by clear skies, filtered from urban pollution.",
    link: "/colors#sky-blue"
  },
  {
    name: "Coral-Red",
    hex: "#FF6F61",
    class: "bg-coral-red",
    description: "Vibrant red pigment from transformed carbon particles.",
    link: "/colors#coral-red"
  },
  {
    name: "Solar-Yellow",
    hex: "#FFD60A",
    class: "bg-solar-yellow",
    description: "Bright yellow representing sun and environmental optimism.",
    link: "/colors#solar-yellow"
  }
];

const Swatches = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section id="swatches" className="section-space bg-gray-50 dark:bg-carbon-black/60">
      <div className="container mx-auto container-padding">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
            Our Color Palette
          </h2>
          <p className="text-lg max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
            Explore our range of sustainable inks, each with unique properties and environmental benefits.
          </p>
        </div>

        {/* Interactive Swatches */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {colorSwatches.map((swatch, index) => (
            <motion.div
              key={swatch.name}
              className="relative flex flex-col items-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.5,
                delay: index * 0.1 
              }}
              onHoverStart={() => setActiveIndex(index)}
              onHoverEnd={() => setActiveIndex(null)}
            >
              {/* Color Circle */}
              <motion.div
                className={`${swatch.class} w-24 h-24 md:w-32 md:h-32 rounded-full shadow-lg cursor-pointer transition-transform`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                layoutId={`swatch-${index}`}
              />
              
              {/* Color Name */}
              <h3 className="mt-4 text-lg font-bold">{swatch.name}</h3>
              <span className="text-sm text-gray-500 dark:text-gray-400">{swatch.hex}</span>
              
              {/* Description on Hover */}
              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    className="absolute -bottom-24 w-64 p-4 bg-white dark:bg-ink-blue/90 rounded-lg shadow-lg z-10"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <p className="text-sm">{swatch.description}</p>
                    <Link
                      href={swatch.link}
                      className="inline-flex items-center mt-2 text-xs text-sky-blue hover:underline"
                    >
                      View Products
                      <ArrowRight className="ml-1 h-3 w-3" />
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* View All Colors Link */}
        <div className="text-center mt-16">
          <Link
            href="/marketing/colors"
            className="inline-flex items-center text-lg font-medium text-ink-blue dark:text-solar-yellow hover:underline"
          >
            Explore All Colors
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Swatches; 