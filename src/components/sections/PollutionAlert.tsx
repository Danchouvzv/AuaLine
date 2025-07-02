"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { AlertTriangle, Globe, ArrowRight, Heart, Activity } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const PollutionAlert = () => {
  const { t } = useLanguage();
  
  const stats = [
    {
      icon: <Globe className="h-8 w-8 text-red-500" />,
      value: "99%",
      label: t('pollution.stat1-label'),
      description: t('pollution.stat1-desc')
    },
    {
      icon: <Heart className="h-8 w-8 text-orange-500" />,
      value: "79.9",
      label: t('pollution.stat2-label'),
      description: t('pollution.stat2-desc')
    },
    {
      icon: <Activity className="h-8 w-8 text-blue-500" />,
      value: "700,000",
      label: t('pollution.stat3-label'),
      description: t('pollution.stat3-desc')
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/10 dark:to-orange-900/10">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center mb-4">
            <AlertTriangle className="h-12 w-12 text-red-500 mr-3" />
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
              {t('pollution.title')}
            </h2>
          </div>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            {t('pollution.subtitle')}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center justify-center mb-4">
                {stat.icon}
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-lg font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  {stat.label}
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {stat.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-red-500 to-orange-500 rounded-xl p-8 text-white text-center"
        >
          <h3 className="text-2xl font-bold mb-4">
            {t('pollution.cta-title')}
          </h3>
          <p className="text-lg mb-6 opacity-90">
            {t('pollution.cta-desc')}
          </p>
          <Link 
            href="/pollution-data"
            className="inline-flex items-center bg-white text-red-600 px-8 py-3 rounded-lg font-semibold hover:bg-slate-100 transition-colors"
          >
            {t('pollution.cta-button')}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-8 text-center"
        >
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            <strong>AuaLine</strong> {t('pollution.solution-text')}
          </p>
          <Link 
            href="/shop"
            className="inline-flex items-center text-eco-leaf hover:text-eco-leaf/80 font-semibold transition-colors"
          >
            {t('pollution.solution-cta')}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default PollutionAlert; 