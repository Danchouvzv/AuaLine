"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";

const CtaBanner = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address");
      return;
    }
    
    setError("");
    setIsLoading(true);
    
    // Simulate API call to Firebase Function
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      
      // In real implementation, this would be a call to a Firebase Function
      // that adds the email to a newsletter collection and triggers SendGrid
      console.log("Subscribed email:", email);
    }, 1500);
  };

  return (
    <section id="cta-banner" className="py-20 bg-hero-gradient relative overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 z-0">
        <motion.div
          className="absolute -top-10 -right-10 w-64 h-64 bg-sky-blue/20 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.4, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        <motion.div
          className="absolute -bottom-10 -left-10 w-64 h-64 bg-solar-yellow/20 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 1,
          }}
        />
      </div>

      <div className="container mx-auto container-padding relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Join the Air-to-Ink Revolution
            </h2>
            <p className="text-lg text-white/90 mb-8">
              Subscribe to our newsletter for exclusive updates, eco-impact stories, and special offers on sustainable art supplies.
            </p>

            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
                <div className="flex-grow">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    className={`w-full px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-solar-yellow ${
                      error ? "border-coral-red" : "border-transparent"
                    }`}
                    disabled={isLoading}
                  />
                  {error && (
                    <p className="text-coral-red text-sm mt-1 text-left">
                      {error}
                    </p>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`px-6 py-3 bg-solar-yellow text-ink-blue font-medium rounded-md hover:bg-solar-yellow/90 flex items-center justify-center transition-colors ${
                    isLoading ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  {isLoading ? (
                    <span>Subscribing...</span>
                  ) : (
                    <>
                      Subscribe
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </>
                  )}
                </button>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-6 max-w-lg mx-auto"
              >
                <div className="flex items-center justify-center mb-4">
                  <div className="bg-eco-leaf rounded-full p-2">
                    <Check className="h-6 w-6 text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Thank You for Subscribing!
                </h3>
                <p className="text-white/90">
                  Check your inbox for a confirmation email and welcome gift.
                </p>
              </motion.div>
            )}
          </motion.div>

          {/* Privacy Note */}
          <p className="text-sm text-white/70 mt-8">
            By subscribing, you agree to our{" "}
            <a href="/legal/privacy" className="underline hover:text-white">
              Privacy Policy
            </a>
            . We respect your privacy and will never share your information.
          </p>
        </div>
      </div>
    </section>
  );
};

export default CtaBanner; 