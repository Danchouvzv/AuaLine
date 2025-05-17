"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

// Mock data - would come from Firebase in real implementation
const testimonials = [
  {
    id: 1,
    name: "David Wilson",
    role: "Professional Artist",
    content:
      "The quality of AuaLine's Carbon Black ink is exceptional. Knowing that I'm using sustainable products that help clean our air gives me even more satisfaction with my artwork.",
    rating: 5,
    avatar: "/images/testimonials/avatar1.jpg", // Placeholder
  },
  {
    id: 2,
    name: "Sarah Johnson",
    role: "Design Studio Owner",
    content:
      "We've switched all our studio supplies to AuaLine. Our clients love the story behind the inks, and we've seen no compromise in quality. The eco-impact calculator is a great tool for showing our studio's contribution.",
    rating: 5,
    avatar: "/images/testimonials/avatar2.jpg", // Placeholder
  },
  {
    id: 3,
    name: "Michael Chen",
    role: "Architecture Firm",
    content:
      "The Sky Blue and Eco-Leaf colors have become staples in our design presentations. The pigment is rich and consistent, and the environmental benefits align perfectly with our firm's sustainability goals.",
    rating: 4,
    avatar: "/images/testimonials/avatar3.jpg", // Placeholder
  },
  {
    id: 4,
    name: "Emily Rodriguez",
    role: "Art Teacher",
    content:
      "I've introduced AuaLine inks to my high school art classes as part of our sustainability curriculum. The students are inspired by the technology and the impact they can make through their art supplies choices.",
    rating: 5,
    avatar: "/images/testimonials/avatar4.jpg", // Placeholder
  },
];

// Partner logos
const partners = [
  { name: "Adobe", logo: "/images/partners/adobe.svg" },
  { name: "Wacom", logo: "/images/partners/wacom.svg" },
  { name: "Art Institute", logo: "/images/partners/art-institute.svg" },
  { name: "Green Design", logo: "/images/partners/green-design.svg" },
  { name: "EcoArt Foundation", logo: "/images/partners/eco-art.svg" },
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-rotate testimonials
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      goToNext();
    }, 5000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [currentIndex]);

  const pauseAutoRotation = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  const resumeAutoRotation = () => {
    intervalRef.current = setInterval(() => {
      goToNext();
    }, 5000);
  };

  const goToPrevious = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
    setTimeout(() => setIsAnimating(false), 500);
  };

  const goToNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
    setTimeout(() => setIsAnimating(false), 500);
  };

  return (
    <section
      id="testimonials"
      className="section-space bg-gray-50 dark:bg-carbon-black/60"
    >
      <div className="container mx-auto container-padding">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
            What Our Customers Say
          </h2>
          <p className="text-lg max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
            Join thousands of artists and designers who have made the switch to
            sustainable inks
          </p>
        </div>

        {/* Testimonials Slider */}
        <div
          className="relative mx-auto max-w-4xl"
          onMouseEnter={pauseAutoRotation}
          onMouseLeave={resumeAutoRotation}
        >
          <div className="overflow-hidden">
            <motion.div
              className="flex"
              initial={{ x: 0 }}
              animate={{ x: `-${currentIndex * 100}%` }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="min-w-full px-4"
                >
                  <div className="bg-white dark:bg-ink-blue/20 rounded-lg p-8 shadow-lg">
                    {/* Rating Stars */}
                    <div className="flex mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${
                            i < testimonial.rating
                              ? "text-solar-yellow fill-solar-yellow"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>

                    {/* Testimonial Content */}
                    <blockquote className="text-lg italic mb-6">
                      "{testimonial.content}"
                    </blockquote>

                    {/* Author Info */}
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden">
                          {/* Avatar placeholder */}
                          <div className="w-full h-full flex items-center justify-center text-lg font-bold text-gray-500">
                            {testimonial.name.charAt(0)}
                          </div>
                        </div>
                      </div>
                      <div className="ml-4">
                        <p className="font-bold">{testimonial.name}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={goToPrevious}
            className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-5 sm:-translate-x-10 bg-white dark:bg-ink-blue/80 rounded-full p-2 shadow-md hover:bg-gray-100 dark:hover:bg-ink-blue transition-colors"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={goToNext}
            className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-5 sm:translate-x-10 bg-white dark:bg-ink-blue/80 rounded-full p-2 shadow-md hover:bg-gray-100 dark:hover:bg-ink-blue transition-colors"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentIndex(index);
                  pauseAutoRotation();
                  setTimeout(resumeAutoRotation, 1000);
                }}
                className={`w-2.5 h-2.5 rounded-full transition-colors ${
                  currentIndex === index
                    ? "bg-ink-blue dark:bg-solar-yellow"
                    : "bg-gray-300 dark:bg-gray-600"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Trusted By Logos */}
        <div className="mt-24">
          <h3 className="text-center text-lg font-medium text-gray-500 dark:text-gray-400 mb-8">
            Trusted By
          </h3>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            {partners.map((partner) => (
              <div
                key={partner.name}
                className="grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
              >
                {/* Logo placeholder */}
                <div className="h-12 w-32 bg-gray-200 dark:bg-gray-700 rounded flex items-center justify-center">
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                    {partner.name}
                  </span>
                </div>
                
                {/* In a real implementation, we would use next/image */}
                {/* <Image
                  src={partner.logo}
                  alt={partner.name}
                  width={128}
                  height={48}
                  className="h-12 w-auto object-contain"
                /> */}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;