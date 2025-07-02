"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Wind, Filter, Droplet } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import PollutionStats from "./PollutionStats";

const WhatWeDo = () => {
  const { t, language } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });

  const features = [
    {
      title: language === 'ru' ? "Захват воздуха" : 
             language === 'en' ? "Capture Air" :
             "Ауаны ұстау",
      description: language === 'ru' ? "Наша запатентованная технология захватывает вредные частицы PM2.5 и углеродные выбросы из городской среды." : 
                   language === 'en' ? "Our proprietary technology captures harmful PM2.5 particles and carbon emissions from urban environments." :
                   "Біздің патенттелген технологиямыз қалалық ортадан зиянды PM2.5 бөлшектері мен көміртек шығарындыларын ұстайды.",
      icon: Wind,
      stat: "1.2",
      statLabel: language === 'ru' ? "тонн воздуха фильтруется ежемесячно" : 
                 language === 'en' ? "tons of air filtered monthly" :
                 "тонн ауа айына сүзіледі",
      color: "bg-sky-blue",
    },
    {
      title: language === 'ru' ? "Фильтрация PM2.5" : 
             language === 'en' ? "Filter PM2.5" :
             "PM2.5 сүзу",
      description: language === 'ru' ? "Мы извлекаем и очищаем захваченный углерод, превращая экологическое загрязнение в полезные материалы." : 
                   language === 'en' ? "We extract and purify the captured carbon, transforming environmental pollution into usable materials." :
                   "Біз ұсталған көміртекті алып, тазартамыз, экологиялық ластануды пайдалы материалдарға айналдырамыз.",
      icon: Filter,
      stat: "99.7%",
      statLabel: language === 'ru' ? "степень фильтрации частиц" : 
                 language === 'en' ? "particle filtration rate" :
                 "бөлшектерді сүзу дәрежесі",
      color: "bg-solar-yellow",
    },
    {
      title: language === 'ru' ? "Создание чернил" : 
             language === 'en' ? "Create Ink" :
             "Сия жасау",
      description: language === 'ru' ? "Обработанный углерод превращается в премиальные, экологически чистые чернила с яркими, долговечными цветами." : 
                   language === 'en' ? "The processed carbon is converted into premium, eco-friendly ink with vibrant, long-lasting colors." :
                   "Өңделген көміртек жарқын, ұзақ мерзімді түстері бар премиум, экологиялық таза сияға айналады.",
      icon: Droplet,
      stat: "5x",
      statLabel: language === 'ru' ? "меньше углеродный след" : 
                 language === 'en' ? "lower carbon footprint" :
                 "аз көміртек ізі",
      color: "bg-eco-leaf",
    },
  ];
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };
  
  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <section id="what-we-do" className="section-space bg-white dark:bg-carbon-black">
      <div className="container mx-auto container-padding">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
              {t('what-we-do.title')}
            </h2>
            <p className="text-lg max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
              {t('what-we-do.subtitle')}
            </p>
          </motion.div>
        </div>

        {/* Pollution Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <div className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-8">
            <h3 className="text-xl font-semibold text-center mb-8 text-slate-900 dark:text-white">
              {language === 'ru' ? 'Проблема, которую мы решаем' : 
               language === 'en' ? 'The Problem We Solve' :
               'Біз шешетін мәселе'}
            </h3>
            <PollutionStats variant="compact" />
          </div>
        </motion.div>

        <motion.div
          ref={ref}
          variants={container}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={item}
              transition={{ duration: 0.5 }}
              className="bg-gray-50 dark:bg-ink-blue/30 rounded-lg p-8 shadow-lg relative overflow-hidden group"
            >
              {/* Card content */}
              <div className="relative z-10">
                {/* Icon */}
                <div className={`p-3 ${feature.color} rounded-lg inline-block mb-4`}>
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                
                {/* Title */}
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                
                {/* Description */}
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {feature.description}
                </p>
                
                {/* Stat */}
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-2xl font-bold text-ink-blue dark:text-solar-yellow">
                    {feature.stat}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {feature.statLabel}
                  </p>
                </div>
              </div>
              
              {/* Background decoration */}
              <div className="absolute -right-10 -bottom-10 w-40 h-40 rounded-full bg-gray-200 dark:bg-gray-800/50 opacity-30 transition-transform duration-500 group-hover:scale-150"></div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhatWeDo; 