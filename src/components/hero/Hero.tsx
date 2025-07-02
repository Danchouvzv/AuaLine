"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import InkBottle3D from "./InkBottle3D";
import HeroCopy from "./HeroCopy";
import { useLanguage } from "@/contexts/LanguageContext";

const Hero = () => {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Parallax effect based on scroll
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 500], [0, 150]);
  const textY = useTransform(scrollY, [0, 500], [0, -50]);
  
  return (
    <section 
      id="hero" 
      ref={containerRef}
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background with parallax */}
      <motion.div 
        className="absolute inset-0 z-0 bg-hero-gradient"
        style={{ y: bgY }}
      >
        {/* Cloud-like shapes */}
        <div className="absolute bottom-[40%] left-[10%] w-64 h-32 bg-white/10 rounded-full blur-2xl" />
        <div className="absolute top-[30%] right-[15%] w-72 h-36 bg-white/10 rounded-full blur-2xl" />
        <div className="absolute top-[60%] left-[30%] w-48 h-24 bg-white/10 rounded-full blur-2xl" />
      </motion.div>
      
      <div className="container mx-auto z-10 container-padding">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text content */}
          <motion.div 
            style={{ y: textY }}
            className="text-center lg:text-left"
          >
            <HeroCopy />
            
            {/* CTA Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                href="/shop"
                className="inline-flex items-center justify-center px-6 py-3 text-base font-medium rounded-md text-ink-blue bg-solar-yellow hover:bg-solar-yellow/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-solar-yellow shadow-lg transform transition hover:-translate-y-0.5"
              >
                {t('hero.cta-shop')}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                href="/marketing/impact"
                className="inline-flex items-center justify-center px-6 py-3 text-base font-medium rounded-md border-2 border-sky-blue text-sky-blue bg-transparent hover:bg-sky-blue/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-blue"
              >
                {t('hero.cta-learn')}
              </Link>
            </div>
          </motion.div>
          
          {/* Right: 3D Bottle */}
          <div className="hidden lg:block relative h-[500px]">
            <InkBottle3D />
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      >
        <div className="h-14 w-8 rounded-full border-2 border-white/30 flex justify-center pt-2">
          <motion.div
            className="h-2 w-2 rounded-full bg-white"
            animate={{ y: [0, 4, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero; 