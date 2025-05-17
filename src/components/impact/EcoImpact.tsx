"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Download, Share2 } from "lucide-react";
import Link from "next/link";
import RadialProgress from "./RadialProgress";

const EcoImpact = () => {
  const [inkBottles, setInkBottles] = useState(5);
  const [showResults, setShowResults] = useState(false);

  // Calculate impact stats based on number of bottles
  // These would come from actual calculations or database in real implementation
  const stats = {
    co2Saved: (inkBottles * 1.2).toFixed(1), // kg of CO2
    airFiltered: (inkBottles * 24).toFixed(0), // hours of clean air
    treesEquivalent: Math.max(1, Math.floor(inkBottles / 10)),
    progressPercentage: Math.min(100, inkBottles * 4),
  };

  const handleCalculate = () => {
    setShowResults(true);
  };

  return (
    <section id="eco-impact" className="section-space bg-gray-50 dark:bg-carbon-black/60">
      <div className="container mx-auto container-padding">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Calculator Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
              Calculate Your{" "}
              <span className="text-eco-leaf">Environmental Impact</span>
            </h2>
            <p className="text-lg mb-8">
              Discover how switching to AuaLine inks can reduce your carbon
              footprint and help purify the air.
            </p>

            <div className="bg-white dark:bg-ink-blue/30 p-8 rounded-lg shadow-lg">
              <label className="block text-lg font-medium mb-2">
                How many ink bottles do you use monthly?
              </label>
              
              <input
                type="range"
                min="1"
                max="25"
                value={inkBottles}
                onChange={(e) => setInkBottles(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-eco-leaf mb-4"
              />
              
              <div className="flex justify-between mb-6">
                <span>1</span>
                <span className="font-bold text-lg">{inkBottles}</span>
                <span>25</span>
              </div>

              <button
                onClick={handleCalculate}
                className="w-full py-3 bg-eco-leaf hover:bg-eco-leaf/90 text-white font-medium rounded-md transition-colors"
              >
                Calculate Impact
              </button>
            </div>
          </motion.div>

          {/* Right: Results Visualization */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={`${
              showResults ? "opacity-100" : "opacity-50"
            } transition-opacity duration-500`}
          >
            {/* Radial Progress */}
            <div className="flex justify-center mb-8">
              <RadialProgress percentage={stats.progressPercentage} />
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="bg-white dark:bg-ink-blue/30 p-4 rounded-lg text-center">
                <p className="text-2xl font-bold text-eco-leaf">
                  {stats.co2Saved}kg
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  CO₂ Reduced
                </p>
              </div>
              <div className="bg-white dark:bg-ink-blue/30 p-4 rounded-lg text-center">
                <p className="text-2xl font-bold text-sky-blue">
                  {stats.airFiltered}h
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Air Filtered
                </p>
              </div>
              <div className="bg-white dark:bg-ink-blue/30 p-4 rounded-lg text-center">
                <p className="text-2xl font-bold text-solar-yellow">
                  {stats.treesEquivalent}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Trees Equivalent
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="flex-1 py-3 px-4 border border-gray-300 dark:border-gray-700 rounded-md flex items-center justify-center gap-2 hover:bg-gray-100 dark:hover:bg-ink-blue/20 transition-colors">
                <Download className="h-5 w-5" />
                <span>Export PDF</span>
              </button>
              <button className="flex-1 py-3 px-4 border border-gray-300 dark:border-gray-700 rounded-md flex items-center justify-center gap-2 hover:bg-gray-100 dark:hover:bg-ink-blue/20 transition-colors">
                <Share2 className="h-5 w-5" />
                <span>Share Results</span>
              </button>
            </div>

            {/* Full Calculator Link */}
            <div className="mt-8 text-center">
              <Link
                href="/marketing/impact"
                className="inline-flex items-center text-sky-blue hover:underline"
              >
                Try our full impact calculator
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default EcoImpact; 