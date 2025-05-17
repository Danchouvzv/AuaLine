"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Droplets, Wind, Leaf, BarChart3, Users, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import RadialProgress from '@/components/impact/RadialProgress';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const ImpactPage = () => {
  const [scrollY, setScrollY] = useState(0);
  const [pollutionSaved, setPollutionSaved] = useState(0);
  const [treesEquivalent, setTreesEquivalent] = useState(0);
  const [waterSaved, setWaterSaved] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);

    // Animate stats when page loads
    const timer = setTimeout(() => {
      const pollutionInterval = setInterval(() => {
        setPollutionSaved(prev => {
          if (prev < 2500) return prev + 25;
          clearInterval(pollutionInterval);
          return 2500;
        });
      }, 30);

      const treesInterval = setInterval(() => {
        setTreesEquivalent(prev => {
          if (prev < 175) return prev + 1;
          clearInterval(treesInterval);
          return 175;
        });
      }, 40);

      const waterInterval = setInterval(() => {
        setWaterSaved(prev => {
          if (prev < 45000) return prev + 500;
          clearInterval(waterInterval);
          return 45000;
        });
      }, 20);
    }, 500);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, []);

  const parallaxOffset = scrollY * 0.4;

  return (
    <div className="relative overflow-x-hidden">
      {/* Hero Section with Parallax */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-emerald-800 to-emerald-950 text-white">
        <div 
          className="absolute inset-0 z-0 opacity-30"
          style={{ 
            backgroundImage: "url('/images/pollution-particles.png')", 
            backgroundSize: 'cover',
            transform: `translateY(${parallaxOffset}px)`
          }}
        />
        <div className="container relative z-10 mx-auto px-4 text-center">
          <motion.h1 
            className="text-5xl md:text-7xl font-bold mb-6"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Our Environmental <span className="text-amber-400">Impact</span>
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl max-w-3xl mx-auto mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Every product we create helps clean our air and transforms pollution into something beautiful.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-black">
              Calculate Your Impact <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Impact Statistics */}
      <section className="py-16 bg-gradient-to-b from-white to-slate-50 dark:from-slate-950 dark:to-slate-900">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              Our Collective Impact
            </motion.h2>
            <motion.p 
              className="text-lg text-slate-600 dark:text-slate-300"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              Through our air-to-ink technology, we've made a measurable difference to our environment.
              Here's how our community is changing the world:
            </motion.p>
          </div>

          <motion.div 
            className="grid md:grid-cols-3 gap-8 md:gap-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeIn} className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8 text-center transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
              <div className="mb-4 mx-auto w-16 h-16 flex items-center justify-center bg-emerald-100 dark:bg-emerald-900 rounded-full">
                <Wind className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Air Purified</h3>
              <p className="text-4xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">{pollutionSaved.toLocaleString()}</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">cubic meters of pollution captured</p>
            </motion.div>

            <motion.div variants={fadeIn} className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8 text-center transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
              <div className="mb-4 mx-auto w-16 h-16 flex items-center justify-center bg-emerald-100 dark:bg-emerald-900 rounded-full">
                <Leaf className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Tree Equivalent</h3>
              <p className="text-4xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">{treesEquivalent.toLocaleString()}</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">equivalent trees planted</p>
            </motion.div>

            <motion.div variants={fadeIn} className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8 text-center transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
              <div className="mb-4 mx-auto w-16 h-16 flex items-center justify-center bg-emerald-100 dark:bg-emerald-900 rounded-full">
                <Droplets className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Water Saved</h3>
              <p className="text-4xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">{waterSaved.toLocaleString()}</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">liters compared to traditional ink</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Interactive Impact Dashboard */}
      <section className="py-16 bg-slate-100 dark:bg-slate-800">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-3xl mx-auto text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Impact Dashboard</h2>
            <p className="text-lg text-slate-600 dark:text-slate-300">
              Explore our environmental metrics and see how our community is making a difference.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <Tabs defaultValue="global" className="max-w-5xl mx-auto">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="global">Global Impact</TabsTrigger>
                <TabsTrigger value="regional">Regional Breakdown</TabsTrigger>
                <TabsTrigger value="personal">Personal Calculator</TabsTrigger>
              </TabsList>
              
              <TabsContent value="global" className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-lg">
                <div className="grid md:grid-cols-2 gap-8">
                  <Card>
                    <CardHeader>
                      <CardTitle>Carbon Reduction Timeline</CardTitle>
                      <CardDescription>Monthly pollution capture in kilograms</CardDescription>
                    </CardHeader>
                    <CardContent className="h-64 flex items-center justify-center">
                      <div className="w-full h-full bg-slate-100 dark:bg-slate-800 rounded-lg p-4 flex items-center justify-center">
                        <p className="text-slate-500 dark:text-slate-400">Chart visualization would go here</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Progress Toward Goals</CardTitle>
                      <CardDescription>Annual targets and achievements</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div>
                          <div className="flex justify-between mb-2">
                            <span className="text-sm font-medium">Air Purification Goal</span>
                            <span className="text-sm font-medium">75%</span>
                          </div>
                          <Progress value={75} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between mb-2">
                            <span className="text-sm font-medium">Carbon Offset Target</span>
                            <span className="text-sm font-medium">63%</span>
                          </div>
                          <Progress value={63} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between mb-2">
                            <span className="text-sm font-medium">Sustainable Production</span>
                            <span className="text-sm font-medium">89%</span>
                          </div>
                          <Progress value={89} className="h-2" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="grid md:grid-cols-3 gap-6 mt-8">
                  <div className="flex flex-col items-center">
                    <h4 className="font-medium text-center mb-4">Total CO₂ Reduced</h4>
                    <RadialProgress percentage={68} />
                    <p className="mt-4 text-sm text-center text-slate-500 dark:text-slate-400">
                      68% of our 2024 target achieved
                    </p>
                  </div>
                  <div className="flex flex-col items-center">
                    <h4 className="font-medium text-center mb-4">Community Growth</h4>
                    <RadialProgress percentage={82} />
                    <p className="mt-4 text-sm text-center text-slate-500 dark:text-slate-400">
                      82% increase in active community members
                    </p>
                  </div>
                  <div className="flex flex-col items-center">
                    <h4 className="font-medium text-center mb-4">Water Conservation</h4>
                    <RadialProgress percentage={91} />
                    <p className="mt-4 text-sm text-center text-slate-500 dark:text-slate-400">
                      91% reduction in water usage vs. traditional methods
                    </p>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="regional" className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-lg">
                <div className="h-96 bg-slate-100 dark:bg-slate-800 rounded-lg mb-6 flex items-center justify-center">
                  <p className="text-slate-500 dark:text-slate-400">Interactive map visualization would go here</p>
                </div>
                <div className="grid md:grid-cols-4 gap-4">
                  <Card>
                    <CardHeader className="p-4">
                      <CardTitle className="text-base">Asia Pacific</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <p className="text-2xl font-bold">845 kg</p>
                      <p className="text-sm text-slate-500 dark:text-slate-400">Pollution captured</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="p-4">
                      <CardTitle className="text-base">Europe</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <p className="text-2xl font-bold">763 kg</p>
                      <p className="text-sm text-slate-500 dark:text-slate-400">Pollution captured</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="p-4">
                      <CardTitle className="text-base">North America</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <p className="text-2xl font-bold">592 kg</p>
                      <p className="text-sm text-slate-500 dark:text-slate-400">Pollution captured</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="p-4">
                      <CardTitle className="text-base">Global South</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <p className="text-2xl font-bold">301 kg</p>
                      <p className="text-sm text-slate-500 dark:text-slate-400">Pollution captured</p>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="personal" className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-lg">
                <Card>
                  <CardHeader>
                    <CardTitle>Calculate Your Personal Impact</CardTitle>
                    <CardDescription>
                      See how your purchases have contributed to a cleaner planet
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Number of Products Purchased</label>
                          <input
                            type="number"
                            className="w-full p-2 border rounded-md dark:bg-slate-800 dark:border-slate-700"
                            placeholder="Enter number of products"
                            min="1"
                            defaultValue="1"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Product Type</label>
                          <select className="w-full p-2 border rounded-md dark:bg-slate-800 dark:border-slate-700">
                            <option value="ink">Ink Bottles</option>
                            <option value="markers">Markers</option>
                            <option value="pens">Pens</option>
                            <option value="art-sets">Art Sets</option>
                          </select>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Usage Duration (months)</label>
                        <input
                          type="range"
                          min="1"
                          max="24"
                          defaultValue="6"
                          className="w-full"
                        />
                        <div className="flex justify-between text-xs text-slate-500">
                          <span>1</span>
                          <span>6</span>
                          <span>12</span>
                          <span>18</span>
                          <span>24</span>
                        </div>
                      </div>
                    </form>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline">Reset</Button>
                    <Button>Calculate Impact</Button>
                  </CardFooter>
                </Card>
                
                <div className="mt-8 p-6 border border-dashed rounded-lg border-slate-300 dark:border-slate-700">
                  <h3 className="text-xl font-bold mb-4 text-center">Your Environmental Impact</h3>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <BarChart3 className="h-8 w-8 mx-auto mb-2 text-emerald-600 dark:text-emerald-400" />
                      <p className="text-2xl font-bold">3.5 kg</p>
                      <p className="text-sm text-slate-500 dark:text-slate-400">Pollution captured</p>
                    </div>
                    <div className="text-center">
                      <TrendingUp className="h-8 w-8 mx-auto mb-2 text-emerald-600 dark:text-emerald-400" />
                      <p className="text-2xl font-bold">12.4 m³</p>
                      <p className="text-sm text-slate-500 dark:text-slate-400">Air purified</p>
                    </div>
                    <div className="text-center">
                      <Users className="h-8 w-8 mx-auto mb-2 text-emerald-600 dark:text-emerald-400" />
                      <p className="text-2xl font-bold">Top 15%</p>
                      <p className="text-sm text-slate-500 dark:text-slate-400">Of community contributors</p>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </section>

      {/* Our Process Section */}
      <section className="py-16 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-3xl mx-auto text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">How We Transform Pollution</h2>
            <p className="text-lg text-slate-600 dark:text-slate-300">
              Our innovative process captures air pollution and transforms it into beautiful, sustainable ink products.
            </p>
          </motion.div>

          <motion.div 
            className="relative max-w-4xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-emerald-200 dark:bg-emerald-800"></div>
            
            {/* Step 1 */}
            <motion.div variants={fadeIn} className="relative mb-16">
              <div className="flex items-center justify-center mb-4">
                <div className="absolute z-10 w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold">1</div>
              </div>
              <div className="md:w-5/12 ml-auto bg-slate-50 dark:bg-slate-800 p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-2">Pollution Capture</h3>
                <p className="text-slate-600 dark:text-slate-300">
                  Our specialized devices capture particulate matter (PM2.5) from urban air pollution, 
                  harvesting carbon that would otherwise enter our lungs.
                </p>
              </div>
            </motion.div>
            
            {/* Step 2 */}
            <motion.div variants={fadeIn} className="relative mb-16">
              <div className="flex items-center justify-center mb-4">
                <div className="absolute z-10 w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold">2</div>
              </div>
              <div className="md:w-5/12 mr-auto bg-slate-50 dark:bg-slate-800 p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-2">Purification Process</h3>
                <p className="text-slate-600 dark:text-slate-300">
                  The captured carbon undergoes a series of environmentally-friendly treatments to remove
                  impurities and toxins, preparing it for transformation.
                </p>
              </div>
            </motion.div>
            
            {/* Step 3 */}
            <motion.div variants={fadeIn} className="relative mb-16">
              <div className="flex items-center justify-center mb-4">
                <div className="absolute z-10 w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold">3</div>
              </div>
              <div className="md:w-5/12 ml-auto bg-slate-50 dark:bg-slate-800 p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-2">Ink Formulation</h3>
                <p className="text-slate-600 dark:text-slate-300">
                  The purified carbon is combined with eco-friendly binders and additives to create
                  premium ink with excellent flow and stability characteristics.
                </p>
              </div>
            </motion.div>
            
            {/* Step 4 */}
            <motion.div variants={fadeIn} className="relative">
              <div className="flex items-center justify-center mb-4">
                <div className="absolute z-10 w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold">4</div>
              </div>
              <div className="md:w-5/12 mr-auto bg-slate-50 dark:bg-slate-800 p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-2">Sustainable Packaging</h3>
                <p className="text-slate-600 dark:text-slate-300">
                  Our finished products are packaged in recycled and biodegradable materials,
                  completing our commitment to sustainability throughout the entire lifecycle.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-emerald-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Join Our Mission</h2>
            <p className="text-xl max-w-3xl mx-auto mb-8">
              Every purchase you make contributes to cleaner air and a healthier planet.
              Be part of the solution with AuaLine.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-black">
                Shop Products
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Learn More
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ImpactPage; 