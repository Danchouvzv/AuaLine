"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

// This is a placeholder for the actual Three.js component that would be implemented
// In a full implementation, we would use @react-three/fiber and @react-three/drei
// to render a 3D model of an ink bottle that rotates with mouse movement

const InkBottle3D = () => {
  const [mounted, setMounted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  
  // Mouse tracking for rotation effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Add some springiness to the movement
  const springX = useSpring(mouseX, { stiffness: 100, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 30 });
  
  // Transform the spring values to rotation values (degrees)
  const rotateX = useTransform(springY, [-500, 500], [15, -15]);
  const rotateY = useTransform(springX, [-500, 500], [-15, 15]);
  
  // Handle mouse movement
  useEffect(() => {
    setMounted(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        // Get mouse position relative to the center of the container
        mouseX.set(e.clientX - centerX);
        mouseY.set(e.clientY - centerY);
      }
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mouseX, mouseY]);

  if (!mounted) return null;

  return (
    <div ref={ref} className="w-full h-full flex items-center justify-center">
      <motion.div
        className="relative"
        style={{
          rotateX,
          rotateY,
          transformPerspective: 1000,
        }}
      >
        {/* Placeholder for 3D Model */}
        <div className="relative">
          {/* Ink bottle shape */}
          <div className="w-48 h-64 bg-ink-blue rounded-t-md rounded-b-2xl relative overflow-hidden mx-auto">
            {/* Bottle cap */}
            <div className="w-16 h-10 bg-sky-blue rounded-t-md absolute -top-6 left-1/2 transform -translate-x-1/2"></div>
            
            {/* Ink liquid effect */}
            <div className="w-full h-40 bg-sky-blue absolute bottom-0 left-0 rounded-b-2xl">
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-ink-blue via-sky-blue to-transparent opacity-30"
                animate={{ y: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              />
            </div>
            
            {/* Label */}
            <div className="absolute top-20 left-4 right-4 h-16 bg-white/20 backdrop-blur-sm rounded-md flex items-center justify-center">
              <span className="text-white font-bold">AuaLine</span>
            </div>
            
            {/* Light reflection */}
            <motion.div 
              className="absolute top-5 right-5 w-10 h-40 bg-white/20 rounded-full transform rotate-45 blur-sm"
              animate={{ opacity: [0.1, 0.3, 0.1] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            />
          </div>
          
          {/* Shadow */}
          <div className="w-40 h-8 bg-black/20 rounded-full mx-auto mt-4 blur-md"></div>
          
          {/* Floating particles for air-to-ink effect */}
          <motion.div
            className="absolute w-2 h-2 bg-white/50 rounded-full"
            style={{ left: "10%", top: "-20px" }}
            animate={{ 
              y: [0, 100],
              opacity: [0, 0.8, 0]
            }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute w-1 h-1 bg-white/50 rounded-full"
            style={{ left: "25%", top: "-10px" }}
            animate={{ 
              y: [0, 80],
              opacity: [0, 0.8, 0]
            }}
            transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut", delay: 0.5 }}
          />
          <motion.div
            className="absolute w-1.5 h-1.5 bg-white/50 rounded-full"
            style={{ left: "75%", top: "-15px" }}
            animate={{ 
              y: [0, 90],
              opacity: [0, 0.8, 0]
            }}
            transition={{ repeat: Infinity, duration: 2.7, ease: "easeInOut", delay: 1 }}
          />
        </div>
      </motion.div>
    </div>
  );
};

export default InkBottle3D; 