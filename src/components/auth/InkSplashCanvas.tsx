"use client";

import React, { useRef, useEffect } from 'react';

interface InkSplashCanvasProps {
  className?: string;
}

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
  opacity: number;
  shrink: number;
}

const InkSplashCanvas: React.FC<InkSplashCanvasProps> = ({ className = "" }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const animationFrame = useRef<number | null>(null);

  const colors = [
    '#28A745', // eco-leaf
    '#4DA8DA', // sky-blue
    '#1D3A29', // ink-blue
    '#28A745', // eco-leaf (repeated for more frequency)
  ];
  
  // Initialize canvas and start animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    // Create initial splash
    createInkSplash(canvas.width / 2, canvas.height / 2, 10);
    
    // Handle click events via custom event
    const handleSplashEvent = (e: Event) => {
      const splashEvent = e as CustomEvent;
      if (splashEvent.detail && typeof splashEvent.detail.x === 'number' && typeof splashEvent.detail.y === 'number') {
        createInkSplash(splashEvent.detail.x, splashEvent.detail.y, 8 + Math.random() * 5);
      }
    };
    
    // Listen for custom event triggered by parent components
    document.addEventListener('createInkSplash', handleSplashEvent);
    
    // Animate
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.current.forEach((particle, index) => {
        // Update particle position
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Gravity effect
        particle.speedY += 0.03;
        
        // Shrink the particle
        particle.size *= particle.shrink;
        particle.opacity -= 0.005;
        
        // Draw the particle
        ctx.globalAlpha = Math.max(0, particle.opacity);
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Remove small or invisible particles
        if (particle.size <= 0.3 || particle.opacity <= 0) {
          particles.current.splice(index, 1);
        }
      });
      
      // Randomly create new splashes
      if (Math.random() < 0.03 && particles.current.length < 200) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        createInkSplash(x, y, 3 + Math.random() * 3);
      }
      
      animationFrame.current = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('createInkSplash', handleSplashEvent);
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
      particles.current = [];
    };
  }, []);
  
  // Creates an ink splash effect at given coordinates
  const createInkSplash = (x: number, y: number, particleCount: number) => {
    for (let i = 0; i < particleCount; i++) {
      const size = 3 + Math.random() * 15;
      const angle = Math.random() * Math.PI * 2;
      const speed = 0.5 + Math.random() * 2;
      
      particles.current.push({
        x,
        y,
        size,
        speedX: Math.cos(angle) * speed,
        speedY: Math.sin(angle) * speed - 1, // Initial upward bias
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: 0.6 + Math.random() * 0.4,
        shrink: 0.95 + Math.random() * 0.03
      });
    }
    
    // Add few larger, slower-moving particles
    if (Math.random() < 0.5) {
      const bigSize = 10 + Math.random() * 20;
      particles.current.push({
        x,
        y,
        size: bigSize,
        speedX: (Math.random() - 0.5) * 1.5,
        speedY: (Math.random() - 0.5) * 1.5,
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: 0.2 + Math.random() * 0.3,
        shrink: 0.97 + Math.random() * 0.02
      });
    }
  };
  
  return (
    <canvas 
      ref={canvasRef} 
      className={`fixed inset-0 z-0 pointer-events-none ${className}`}
    />
  );
};

export default InkSplashCanvas; 