"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Droplets, Wind, Leaf, BarChart3, Users, TrendingUp, Recycle, Calculator, Plus, Minus, Heart, Brain, Baby, Shield, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import RadialProgress from '@/components/impact/RadialProgress';
import { useLanguage } from '@/contexts/LanguageContext';

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
  const { t, language } = useLanguage();
  const [scrollY, setScrollY] = useState(0);
  const [pollutionSaved, setPollutionSaved] = useState(0);
  const [treesEquivalent, setTreesEquivalent] = useState(0);
  const [waterSaved, setWaterSaved] = useState(0);
  const [calculatorInputs, setCalculatorInputs] = useState({
    quantity: 1,
    productType: "ink",
    duration: 6,
    region: "asia"
  });
  const [showResults, setShowResults] = useState(false);
  const [impactData, setImpactData] = useState({
    pollutionCaptured: 0,
    airPurified: 0,
    co2Equivalent: 0,
    waterSaved: 0,
    pollutionRank: 0,
    airRank: 0,
    communityPercentile: 0,
    co2Percentage: 0,
    waterPercentage: 0,
    tradInkAvoided: 0,
    treesPlanted: 0
  });

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.7]);

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

  const calculateImpact = () => {
    // Base values for different product types (pollution captured in kg per unit)
    const productImpacts = {
      "ink": 1.2,       // Base impact for ink bottles
      "markers": 0.85,  // Base impact for markers
      "pens": 0.6,      // Base impact for pens
      "art-sets": 3.2   // Base impact for art sets
    };

    // Regional multipliers (some regions have higher pollution density)
    const regionMultipliers = {
      "asia": 1.25,       // Higher pollution density in Asia Pacific
      "europe": 0.95,     // Moderate pollution in Europe
      "namerica": 1.05,   // Moderate pollution in North America
      "gsouth": 1.15      // Higher pollution in Global South
    };

    // Calculate base pollution captured
    const baseImpact = productImpacts[calculatorInputs.productType as keyof typeof productImpacts] || 1.0;
    const regionMultiplier = regionMultipliers[calculatorInputs.region as keyof typeof regionMultipliers] || 1.0;
    
    // Calculate impact scaled by quantity, duration, and region
    const pollutionCaptured = baseImpact * calculatorInputs.quantity * 
                             (Math.sqrt(calculatorInputs.duration) / 2) * 
                             regionMultiplier;
    
    // Derive other metrics from the pollution captured
    const airPurified = pollutionCaptured * 3.5;           // Each kg of pollution = 3.5 m³ air
    const co2Equivalent = pollutionCaptured * 0.5;         // CO2 equivalent is about half the pollution weight
    const waterSaved = pollutionCaptured * 1200;          // Water saved compared to traditional ink (L)
    const treesPlanted = pollutionCaptured * 0.08;        // Tree equivalent (yearly CO2 absorption)
    
    // Calculate ratings and percentiles
    const pollutionRank = Math.min(25, Math.round(pollutionCaptured * 2)); 
    const airRank = Math.min(30, Math.round(airPurified * 0.8));
    
    // Community percentile is higher for larger purchases and longer usage
    let communityPercentile = 50 - Math.round(calculatorInputs.quantity * 3 + calculatorInputs.duration * 0.5);
    communityPercentile = Math.max(5, Math.min(30, communityPercentile)); // Cap between 5-30%
    
    // Calculate percentages for progress bars
    const co2Percentage = Math.min(100, Math.round(co2Equivalent * 15));
    const waterPercentage = Math.min(100, Math.round(waterSaved / 1000));
    const tradInkAvoided = Math.min(100, 70 + Math.round(pollutionCaptured * 5));
    
    setImpactData({
      pollutionCaptured,
      airPurified,
      co2Equivalent,
      waterSaved,
      pollutionRank,
      airRank,
      communityPercentile,
      co2Percentage,
      waterPercentage,
      tradInkAvoided,
      treesPlanted
    });
    
    setShowResults(true);
  };

  const resetCalculator = () => {
    setCalculatorInputs({
      quantity: 1,
      productType: "ink",
      duration: 6,
      region: "asia"
    });
    setShowResults(false);
  };

  return (
    <div className="relative overflow-x-hidden" ref={containerRef}>
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
            style={{ opacity }}
          >
            {language === 'ru' ? 'Наше воздействие' :
             language === 'en' ? 'Our Impact' :
             'Біздің әсер'}
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl max-w-3xl mx-auto mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {language === 'ru' ? 'Каждая ручка AuaLine представляет часы очищенного воздуха и спасённых жизней' :
             language === 'en' ? 'Every AuaLine pen represents hours of clean air and lives saved' :
             'Әрбір AuaLine қаламы таза ауа сағаттарын және құтқарылған өмірді білдіреді'}
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

      {/* Health Impact Statistics */}
      <section className="py-20 bg-red-50 dark:bg-red-900/10">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                {language === 'ru' ? 'Влияние на здоровье: DALY и смертность' :
                 language === 'en' ? 'Health Impact: DALY and Mortality' :
                 'Денсаулыққа әсері: DALY және өлім'}
              </h2>
              <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
                {language === 'ru' ? 'Каждый микрограмм PM2.5, который мы улавливаем, спасает годы здоровой жизни' :
                 language === 'en' ? 'Every microgram of PM2.5 we capture saves years of healthy life' :
                 'Біз ұстайтын әрбір микрограмм PM2.5 салауатты өмірдің жылдарын сақтайды'}
              </p>
            </motion.div>

            {/* DALY Statistics Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg"
              >
                <div className="flex items-center justify-center mb-4">
                  <Heart className="h-8 w-8 text-red-500" />
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-600 dark:text-red-400 mb-2">37%</div>
                  <div className="text-lg font-semibold text-slate-700 dark:text-slate-300 mb-2">
                    {language === 'ru' ? 'DALY' : language === 'en' ? 'DALY' : 'DALY'}
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {language === 'ru' ? 'Ишемическая болезнь сердца' :
                     language === 'en' ? 'Ischemic heart disease' :
                     'Ишемиялық жүрек ауруы'}
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg"
              >
                <div className="flex items-center justify-center mb-4">
                  <Brain className="h-8 w-8 text-purple-500" />
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">19%</div>
                  <div className="text-lg font-semibold text-slate-700 dark:text-slate-300 mb-2">
                    {language === 'ru' ? 'DALY' : language === 'en' ? 'DALY' : 'DALY'}
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {language === 'ru' ? 'Инсульт' :
                     language === 'en' ? 'Stroke' :
                     'Инсульт'}
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg"
              >
                <div className="flex items-center justify-center mb-4">
                  <Activity className="h-8 w-8 text-blue-500" />
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">18%</div>
                  <div className="text-lg font-semibold text-slate-700 dark:text-slate-300 mb-2">
                    {language === 'ru' ? 'DALY' : language === 'en' ? 'DALY' : 'DALY'}
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {language === 'ru' ? 'ХОБЛ (хроническая обструктивная болезнь лёгких)' :
                     language === 'en' ? 'COPD (chronic obstructive pulmonary disease)' :
                     'ХОБЛ (созылмалы обструктивті өкпе ауруы)'}
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg"
              >
                <div className="flex items-center justify-center mb-4">
                  <Baby className="h-8 w-8 text-yellow-500" />
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-600 dark:text-yellow-400 mb-2">700K</div>
                  <div className="text-lg font-semibold text-slate-700 dark:text-slate-300 mb-2">
                    {language === 'ru' ? 'детей в год' : language === 'en' ? 'children/year' : 'бала/жыл'}
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {language === 'ru' ? 'Дети до 5 лет умирают от загрязнения воздуха' :
                     language === 'en' ? 'Children under 5 die from air pollution' :
                     '5 жасқа дейінгі балалар ауа ластануынан өледі'}
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Regional Health Impact */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-white dark:bg-slate-800 rounded-xl p-8 shadow-lg mb-16"
            >
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 text-center">
                {language === 'ru' ? 'Региональное воздействие на здоровье' :
                 language === 'en' ? 'Regional Health Impact' :
                 'Аймақтық денсаулыққа әсер'}
              </h3>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600 dark:text-red-400 mb-2">2.3M</div>
                  <div className="font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {language === 'ru' ? 'Восточная Азия' : language === 'en' ? 'East Asia' : 'Шығыс Азия'}
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {language === 'ru' ? 'смертей от PM2.5 (2021)' :
                     language === 'en' ? 'deaths from PM2.5 (2021)' :
                     'PM2.5-тен өлім (2021)'}
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600 dark:text-orange-400 mb-2">2.1M</div>
                  <div className="font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {language === 'ru' ? 'Южная Азия' : language === 'en' ? 'South Asia' : 'Оңтүстік Азия'}
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {language === 'ru' ? 'смертей от PM2.5 (2021)' :
                     language === 'en' ? 'deaths from PM2.5 (2021)' :
                     'PM2.5-тен өлім (2021)'}
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-2">16%</div>
                  <div className="font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {language === 'ru' ? 'Центральная Азия' : language === 'en' ? 'Central Asia' : 'Орталық Азия'}
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {language === 'ru' ? 'превышение среднемирового уровня' :
                     language === 'en' ? 'above global average' :
                     'әлемдік орташа деңгейден жоғары'}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Age-specific Impact */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="grid md:grid-cols-2 gap-8"
            >
              <div className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 rounded-xl p-6">
                <Shield className="h-8 w-8 text-red-600 dark:text-red-400 mb-4" />
                <h4 className="text-xl font-bold text-red-800 dark:text-red-300 mb-3">
                  {language === 'ru' ? 'Дети (0-5 лет)' :
                   language === 'en' ? 'Children (0-5 years)' :
                   'Балалар (0-5 жас)'}
                </h4>
                <ul className="space-y-2 text-red-700 dark:text-red-300">
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-sm">
                      {language === 'ru' ? 'Пневмония и респираторные инфекции' :
                       language === 'en' ? 'Pneumonia and respiratory infections' :
                       'Пневмония және тыныс алу инфекциялары'}
                    </span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-sm">
                      {language === 'ru' ? 'Замедленное развитие лёгких' :
                       language === 'en' ? 'Stunted lung development' :
                       'Өкпенің баяу дамуы'}
                    </span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-sm">
                      {language === 'ru' ? 'Увеличенный риск астмы' :
                       language === 'en' ? 'Increased asthma risk' :
                       'Демікпе қаупінің артуы'}
                    </span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl p-6">
                <Users className="h-8 w-8 text-blue-600 dark:text-blue-400 mb-4" />
                <h4 className="text-xl font-bold text-blue-800 dark:text-blue-300 mb-3">
                  {language === 'ru' ? 'Пожилые (65+ лет)' :
                   language === 'en' ? 'Elderly (65+ years)' :
                   'Егде жастағылар (65+ жас)'}
                </h4>
                <ul className="space-y-2 text-blue-700 dark:text-blue-300">
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-sm">
                      {language === 'ru' ? 'Сердечно-сосудистые заболевания' :
                       language === 'en' ? 'Cardiovascular disease' :
                       'Жүрек-қан тамыр аурулары'}
                    </span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-sm">
                      {language === 'ru' ? 'Инсульты и инфаркты' :
                       language === 'en' ? 'Strokes and heart attacks' :
                       'Инсульттар мен жүрек соғысы'}
                    </span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-sm">
                      {language === 'ru' ? 'Преждевременная смерть' :
                       language === 'en' ? 'Premature death' :
                       'Мерзімінен бұрын өлім'}
                    </span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Collective impact section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              {language === 'ru' ? 'Коллективное воздействие' :
               language === 'en' ? 'Collective Impact' :
               'Ұжымдық әсер'}
            </motion.h2>
            
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-gray-50 dark:bg-ink-blue/50 p-6 rounded-xl"
              >
                <Wind className="h-12 w-12 text-eco-leaf mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">2.4M</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {language === 'ru' ? 'литров воздуха очищено' :
                   language === 'en' ? 'liters of air purified' :
                   'литр ауа тазартылды'}
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-gray-50 dark:bg-ink-blue/50 p-6 rounded-xl"
              >
                <Droplets className="h-12 w-12 text-eco-leaf mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">84K</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {language === 'ru' ? 'частиц PM2.5 захвачено' :
                   language === 'en' ? 'PM2.5 particles captured' :
                   'PM2.5 бөлшектері ұсталды'}
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-gray-50 dark:bg-ink-blue/50 p-6 rounded-xl"
              >
                <Recycle className="h-12 w-12 text-eco-leaf mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">125</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {language === 'ru' ? 'литров воды сэкономлено' :
                   language === 'en' ? 'liters of water saved' :
                   'литр су үнемделді'}
                </p>
              </motion.div>
            </div>

            {/* Interactive Impact Dashboard */}
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
                              onChange={(e) => {
                                const val = parseInt(e.target.value);
                                if (val > 0 && val <= 100) {
                                  setCalculatorInputs(prev => ({ ...prev, quantity: val }));
                                }
                              }}
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Product Type</label>
                            <select 
                              className="w-full p-2 border rounded-md dark:bg-slate-800 dark:border-slate-700"
                              onChange={(e) => setCalculatorInputs(prev => ({ ...prev, productType: e.target.value }))}
                            >
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
                            className="w-full accent-eco-leaf"
                            onChange={(e) => setCalculatorInputs(prev => ({ ...prev, duration: parseInt(e.target.value) }))}
                          />
                          <div className="flex justify-between text-xs text-slate-500">
                            <span>1</span>
                            <span>6</span>
                            <span>12</span>
                            <span>18</span>
                            <span>24</span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Your Region</label>
                          <select 
                            className="w-full p-2 border rounded-md dark:bg-slate-800 dark:border-slate-700"
                            onChange={(e) => setCalculatorInputs(prev => ({ ...prev, region: e.target.value }))}
                          >
                            <option value="asia">Asia Pacific</option>
                            <option value="europe">Europe</option>
                            <option value="namerica">North America</option>
                            <option value="gsouth">Global South</option>
                          </select>
                        </div>
                      </form>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" onClick={() => resetCalculator()}>Reset</Button>
                      <Button onClick={() => calculateImpact()}>Calculate Impact</Button>
                    </CardFooter>
                  </Card>
                  
                  {showResults && (
                    <motion.div 
                      className="mt-8 p-6 border rounded-lg bg-white dark:bg-slate-800 shadow-lg"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <h3 className="text-xl font-bold mb-6 text-center">Your Environmental Impact</h3>
                      
                      <div className="grid md:grid-cols-3 gap-6 mb-8">
                        <motion.div 
                          className="text-center"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.2 }}
                        >
                          <div className="relative h-20 w-20 mx-auto mb-3">
                            <BarChart3 className="h-12 w-12 mx-auto text-eco-leaf" />
                            <motion.div 
                              className="absolute -top-1 -right-1 w-6 h-6 bg-amber-400 rounded-full flex items-center justify-center text-xs font-bold"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: 0.6, type: "spring" }}
                            >
                              +{impactData.pollutionRank}
                            </motion.div>
                          </div>
                          <motion.p 
                            className="text-3xl font-bold"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                          >
                            {impactData.pollutionCaptured.toFixed(1)} kg
                          </motion.p>
                          <p className="text-sm text-slate-500 dark:text-slate-400">Pollution captured</p>
                        </motion.div>
                        
                        <motion.div 
                          className="text-center"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.3 }}
                        >
                          <div className="relative h-20 w-20 mx-auto mb-3">
                            <TrendingUp className="h-12 w-12 mx-auto text-eco-leaf" />
                            <motion.div 
                              className="absolute -top-1 -right-1 w-6 h-6 bg-amber-400 rounded-full flex items-center justify-center text-xs font-bold"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: 0.7, type: "spring" }}
                            >
                              +{impactData.airRank}
                            </motion.div>
                          </div>
                          <motion.p 
                            className="text-3xl font-bold"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                          >
                            {impactData.airPurified.toFixed(1)} m³
                          </motion.p>
                          <p className="text-sm text-slate-500 dark:text-slate-400">Air purified</p>
                        </motion.div>
                        
                        <motion.div 
                          className="text-center"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.4 }}
                        >
                          <div className="relative h-20 w-20 mx-auto mb-3">
                            <Users className="h-12 w-12 mx-auto text-eco-leaf" />
                            <motion.div 
                              className="absolute -top-1 -right-1 w-6 h-6 bg-amber-400 rounded-full flex items-center justify-center text-xs font-bold"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: 0.8, type: "spring" }}
                            >
                              🌟
                            </motion.div>
                          </div>
                          <motion.p 
                            className="text-3xl font-bold"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                          >
                            Top {impactData.communityPercentile}%
                          </motion.p>
                          <p className="text-sm text-slate-500 dark:text-slate-400">Of community contributors</p>
                        </motion.div>
                      </div>
                      
                      <motion.div 
                        className="bg-slate-50 dark:bg-slate-700 rounded-lg p-6"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                      >
                        <h4 className="font-medium mb-4">Impact Breakdown</h4>
                        <div className="space-y-4">
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm">CO₂ Equivalent Saved</span>
                              <span className="text-sm font-medium">{impactData.co2Equivalent.toFixed(2)} kg</span>
                            </div>
                            <Progress value={impactData.co2Percentage} className="h-2" />
                          </div>
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm">Water Conservation</span>
                              <span className="text-sm font-medium">{impactData.waterSaved.toFixed(0)} L</span>
                            </div>
                            <Progress value={impactData.waterPercentage} className="h-2" />
                          </div>
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm">Traditional Ink Manufacturing Avoided</span>
                              <span className="text-sm font-medium">{impactData.tradInkAvoided.toFixed(0)}%</span>
                            </div>
                            <Progress value={impactData.tradInkAvoided} className="h-2" />
                          </div>
                        </div>
                      </motion.div>
                      
                      <motion.div 
                        className="mt-6 p-4 bg-emerald-50 dark:bg-emerald-900/30 rounded-lg border border-emerald-100 dark:border-emerald-800"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                      >
                        <div className="flex">
                          <div className="mr-4 flex-shrink-0">
                            <Leaf className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                          </div>
                          <div>
                            <p className="text-sm text-emerald-800 dark:text-emerald-200">
                              By using AuaLine products, you've helped remove air pollution equivalent to
                              planting <span className="font-bold">{impactData.treesPlanted.toFixed(1)} trees</span> for a year!
                              Thank you for being part of our mission for cleaner air.
                            </p>
                          </div>
                        </div>
                      </motion.div>
                      
                      <div className="mt-6 flex justify-center">
                        <Button variant="outline" size="sm" className="mr-2" onClick={() => resetCalculator()}>
                          Recalculate
                        </Button>
                        <Button size="sm" onClick={() => window.print()}>
                          Share Results
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </TabsContent>
              </Tabs>
            </motion.div>
          </div>
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