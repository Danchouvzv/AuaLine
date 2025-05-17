"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

// Timeline data
const timelineEvents = [
  {
    year: 2019,
    title: "Founding",
    description: "AuaLine was born out of MIT's Environmental Solutions Lab",
  },
  {
    year: 2020,
    title: "First Prototype",
    description: "Developed our first air filtration-to-ink conversion technology",
  },
  {
    year: 2021,
    title: "Commercial Launch",
    description: "Launched our first line of Carbon Black inks to the public",
  },
  {
    year: 2022,
    title: "Expanded Colors",
    description: "Introduced our full spectrum of sustainable ink colors",
  },
  {
    year: 2023,
    title: "Global Expansion",
    description: "Opened filtration centers in 5 major cities worldwide",
  },
];

const AboutPreview = () => {
  return (
    <section id="about-preview" className="section-space bg-white dark:bg-carbon-black">
      <div className="container mx-auto container-padding">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Company Info */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-6">
              Our Journey to Transform
              <span className="text-eco-leaf block mt-1">Air into Art</span>
            </h2>
            
            <p className="text-lg mb-8">
              AuaLine began with a simple question: Could air pollution become a resource rather than a problem? Our team of engineers and artists collaborated to develop a technology that captures carbon emissions and transforms them into premium, eco-friendly inks.
            </p>
            
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4">Our Mission</h3>
              <p>
                To revolutionize the art supply industry by creating sustainable products that actively reduce environmental pollution, while inspiring creators to contribute to ecological solutions through their artistic choices.
              </p>
            </div>
            
            <Link
              href="/marketing/about"
              className="inline-flex items-center text-lg font-medium text-ink-blue dark:text-solar-yellow hover:underline"
            >
              Learn More About Us
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
          
          {/* Right: Timeline */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative border-l-2 border-eco-leaf pl-8 py-2 ml-6">
              {timelineEvents.map((event, index) => (
                <motion.div
                  key={event.year}
                  className="mb-12 last:mb-0 relative"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ 
                    duration: 0.4,
                    delay: index * 0.1
                  }}
                >
                  {/* Year Circle */}
                  <div className="absolute -left-14 flex items-center justify-center w-10 h-10 rounded-full bg-eco-leaf text-white font-bold">
                    {event.year}
                  </div>
                  
                  {/* Content */}
                  <div>
                    <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {event.description}
                    </p>
                  </div>
                </motion.div>
              ))}
              
              {/* Future point */}
              <motion.div
                className="relative"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.4,
                  delay: timelineEvents.length * 0.1
                }}
              >
                <div className="absolute -left-14 flex items-center justify-center w-10 h-10 rounded-full bg-solar-yellow text-ink-blue font-bold">
                  2025
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">The Future</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Join us on our mission to remove 100 tons of carbon from urban air
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutPreview; 