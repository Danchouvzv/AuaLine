"use client";

import React, { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Users, Lightbulb, Award, TrendingUp, Github } from 'lucide-react';

export default function AboutPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);
  
  return (
    <main className="min-h-screen bg-white dark:bg-ink-blue/95" ref={containerRef}>
      {/* Hero section */}
      <section className="relative h-[60vh] overflow-hidden">
        {/* Background image (could be a real image of Almaty with pollution) */}
        <div className="absolute inset-0 bg-gradient-to-r from-ink-blue/90 via-ink-blue/80 to-ink-blue/90">
          {/* Animated pollution particles */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-gray-500/30"
              style={{
                width: `${Math.random() * 20 + 5}px`,
                height: `${Math.random() * 20 + 5}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, 100, 0],
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
        
        <div className="container mx-auto px-4 h-full flex flex-col justify-center items-center relative z-10 text-center">
          <motion.h1 
            className="text-4xl md:text-6xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            AuaLine <span className="text-eco-leaf">Project</span>
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Turning Almaty's pollution crisis into a creative solution
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <Link 
              href="/impact" 
              className="bg-eco-leaf hover:bg-eco-leaf/90 text-white px-6 py-3 rounded-lg flex items-center font-medium transition-colors"
            >
              See Our Impact
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            
            <Link 
              href="/shop" 
              className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-lg flex items-center font-medium transition-colors"
            >
              Explore Products
            </Link>
          </motion.div>
        </div>
        
        {/* Ink splatter effect at bottom of hero */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path 
              d="M0,70 C180,110 280,0 540,80 C800,160 1260,0 1440,80 L1440,100 L0,100 Z" 
              fill="white" 
              className="dark:fill-ink-blue/95"
            />
          </svg>
        </div>
      </section>
      
      {/* Our story section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-gray-50 dark:bg-ink-blue/50 p-6 md:p-8 rounded-xl mb-12 border-l-4 border-eco-leaf"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-4">The Crisis</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
                In 2025, Almaty topped the global rankings for the most polluted air in the world. This wasn't just a statistic — it was the air we breathed every day. The pollution crisis posed a serious threat to public health, especially for children and the elderly.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                As teenagers growing up in Almaty, we experienced the consequences firsthand: increased respiratory issues, reduced outdoor activities, and a city shrouded in smog for months. We knew something had to be done.
              </p>
            </motion.div>
            
            <div className="flex flex-col md:flex-row gap-8 mb-16">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="flex-1"
              >
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-4">Our Origin Story</h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
                  AuaLine began as a school science project by five teenagers from different schools across Almaty. We were united by a common concern for our city's air quality and a determination to make a difference.
                </p>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
                  What started as a simple experiment to filter air pollution in our school labs transformed into something much bigger. We developed a method to capture carbon particles from the air and transform them into non-toxic, high-quality ink.
                </p>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  With mentorship from local scientists and support from our communities, we refined our process and created AuaLine — a youth-led initiative turning Almaty's air pollution problem into creative opportunities.
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="flex-1 flex items-center justify-center"
              >
                <div className="relative w-full h-80 bg-gradient-to-br from-eco-leaf/30 to-sky-blue/30 rounded-xl overflow-hidden flex items-center justify-center">
                  <span className="text-xl font-bold text-white">Team Photo</span>
                  {/* In a real implementation, this would be an actual image */}
                  {/* <Image 
                    src="/images/about/team-photo.jpg" 
                    alt="AuaLine founding team" 
                    fill 
                    className="object-cover"
                  /> */}
                </div>
              </motion.div>
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-6">Our Technology</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                We developed a two-stage approach to address Almaty's air pollution:
              </p>
              
              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <div className="bg-white dark:bg-ink-blue/30 p-6 rounded-xl shadow-sm">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">Capture Technology</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Our air filtration devices use a proprietary method to trap PM2.5 and PM10 particles — the most harmful components of air pollution. We designed compact units that can be installed on buildings, public spaces, and even vehicles.
                  </p>
                  <div className="relative h-48 bg-gray-100 dark:bg-ink-blue/20 rounded-lg overflow-hidden flex items-center justify-center">
                    <span className="text-lg font-medium text-gray-500 dark:text-gray-400">Filtration Device</span>
                    {/* <Image 
                      src="/images/about/filter-device.jpg" 
                      alt="AuaLine air filtration device" 
                      fill 
                      className="object-cover"
                    /> */}
                  </div>
                </div>
                
                <div className="bg-white dark:bg-ink-blue/30 p-6 rounded-xl shadow-sm">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">Transformation Process</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    The collected carbon particles undergo purification to remove toxins, followed by processing into fine, consistent pigment. This is combined with eco-friendly binders to create high-quality inks for artists, designers, and everyday use.
                  </p>
                  <div className="relative h-48 bg-gray-100 dark:bg-ink-blue/20 rounded-lg overflow-hidden flex items-center justify-center">
                    <span className="text-lg font-medium text-gray-500 dark:text-gray-400">Ink Processing</span>
                    {/* <Image 
                      src="/images/about/ink-processing.jpg" 
                      alt="AuaLine ink processing" 
                      fill 
                      className="object-cover"
                    /> */}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Impact section */}
      <section className="py-20 bg-gray-50 dark:bg-ink-blue/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">Our Impact</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Since our launch in 2025, AuaLine has made significant progress in combating air pollution in Almaty while creating sustainable art supplies.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white dark:bg-ink-blue/50 p-6 rounded-xl shadow-sm text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-eco-leaf/10 text-eco-leaf rounded-full mb-4">
                <Users className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">17,500+</h3>
              <p className="text-gray-600 dark:text-gray-300">Community members engaged</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="bg-white dark:bg-ink-blue/50 p-6 rounded-xl shadow-sm text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-eco-leaf/10 text-eco-leaf rounded-full mb-4">
                <TrendingUp className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">3.5 tons</h3>
              <p className="text-gray-600 dark:text-gray-300">Carbon particles removed from air</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-white dark:bg-ink-blue/50 p-6 rounded-xl shadow-sm text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-eco-leaf/10 text-eco-leaf rounded-full mb-4">
                <Lightbulb className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">45+</h3>
              <p className="text-gray-600 dark:text-gray-300">Schools implementing our technology</p>
            </motion.div>
          </div>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
            className="mt-12 text-center"
          >
            <Link 
              href="/impact" 
              className="inline-flex items-center text-eco-leaf hover:underline font-medium"
            >
              View our detailed impact report
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </section>
      
      {/* Recognition section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">Recognition</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Our innovative approach to combating pollution while promoting sustainable art has received recognition both nationally and internationally.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-white dark:bg-ink-blue/30 p-6 rounded-xl shadow-sm"
            >
              <div className="flex items-start mb-4">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-solar-yellow/10 text-solar-yellow rounded-full mr-4">
                  <Award className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white">Central Asian Youth Innovation Prize</h3>
                  <p className="text-gray-500 dark:text-gray-400">2025</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Awarded to AuaLine for pioneering environmental technology developed by young innovators in the region.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white dark:bg-ink-blue/30 p-6 rounded-xl shadow-sm"
            >
              <div className="flex items-start mb-4">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-solar-yellow/10 text-solar-yellow rounded-full mr-4">
                  <Award className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white">United Nations Sustainability Challenge</h3>
                  <p className="text-gray-500 dark:text-gray-400">2026</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                AuaLine was recognized as one of the top 10 youth-led environmental projects globally.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="bg-white dark:bg-ink-blue/30 p-6 rounded-xl shadow-sm"
            >
              <div className="flex items-start mb-4">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-solar-yellow/10 text-solar-yellow rounded-full mr-4">
                  <Award className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white">Kazakhstan Green Innovation Grant</h3>
                  <p className="text-gray-500 dark:text-gray-400">2025</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Received funding to expand our air filtration network across multiple districts in Almaty.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-white dark:bg-ink-blue/30 p-6 rounded-xl shadow-sm"
            >
              <div className="flex items-start mb-4">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-solar-yellow/10 text-solar-yellow rounded-full mr-4">
                  <Award className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white">Featured in National Geographic</h3>
                  <p className="text-gray-500 dark:text-gray-400">2026</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Our project was featured in a special issue on youth climate innovation and urban environmental solutions.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Team section */}
      <section className="py-20 bg-gray-50 dark:bg-ink-blue/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">Our Team</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              AuaLine was founded by five teenagers from Almaty, united by their concern for the city's air quality and their vision for sustainable solutions.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-5xl mx-auto">
            {/* Team member cards - in a real implementation, these would include actual photos */}
            {["Aizhan", "Damir", "Kamila", "Ruslan", "Leila"].map((name, index) => (
              <motion.div
                key={name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="bg-white dark:bg-ink-blue/50 rounded-xl overflow-hidden shadow-sm"
              >
                <div className="h-48 bg-gradient-to-br from-eco-leaf/30 to-sky-blue/30 flex items-center justify-center">
                  <span className="text-white font-medium">Photo</span>
                  {/* <Image 
                    src={`/images/about/team-${name.toLowerCase()}.jpg`}
                    alt={name}
                    width={200}
                    height={200}
                    className="object-cover w-full h-full"
                  /> */}
                </div>
                <div className="p-4 text-center">
                  <h3 className="font-bold text-gray-800 dark:text-white">{name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Co-founder</p>
                </div>
              </motion.div>
            ))}
          </div>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
            className="mt-12 text-center"
          >
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Today, our team has grown to include over 30 passionate young professionals, scientists, and volunteers working together to expand our impact.
            </p>
          </motion.div>
        </div>
      </section>
      
      {/* Join us CTA */}
      <section className="py-20 bg-gradient-to-r from-ink-blue via-eco-leaf/90 to-sky-blue text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Join Our Movement</h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto mb-8">
              Whether you're in Almaty or anywhere in the world, you can be part of the solution to air pollution while supporting sustainable art.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                href="/shop" 
                className="bg-white text-ink-blue hover:bg-white/90 px-6 py-3 rounded-lg flex items-center font-medium transition-colors"
              >
                Shop Our Products
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              
              <Link 
                href="#" 
                className="bg-white/10 hover:bg-white/20 px-6 py-3 rounded-lg flex items-center font-medium transition-colors"
              >
                Support Our Mission
              </Link>
              
              <Link 
                href="https://github.com/Danchouvzv/AuaLine" 
                className="bg-white/10 hover:bg-white/20 px-6 py-3 rounded-lg flex items-center font-medium transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="mr-2 h-4 w-4" />
                GitHub Repository
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
} 