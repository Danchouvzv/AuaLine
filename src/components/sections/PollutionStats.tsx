"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, Skull, Factory } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface PollutionStatsProps {
  variant?: 'compact' | 'detailed';
  className?: string;
}

const PollutionStats: React.FC<PollutionStatsProps> = ({ 
  variant = 'compact',
  className = ''
}) => {
  const { t, language } = useLanguage();

  const compactStats = [
    {
      icon: <Users className="h-6 w-6" />,
      value: "99%",
      label: language === 'ru' ? 'населения в опасности' : 
             language === 'en' ? 'population at risk' :
             'халық қауіп-қатерде',
      color: 'text-red-500'
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      value: "79.9",
      label: language === 'ru' ? 'µg/m³ макс. уровень' : 
             language === 'en' ? 'µg/m³ max level' :
             'µg/m³ макс. деңгей',
      color: 'text-orange-500'
    },
    {
      icon: <Skull className="h-6 w-6" />,
      value: "8.1M",
      label: language === 'ru' ? 'смертей в год' : 
             language === 'en' ? 'deaths per year' :
             'жылдық өлім',
      color: 'text-red-600'
    }
  ];

  const detailedStats = [
    {
      icon: <Users className="h-8 w-8" />,
      value: "99%",
      label: language === 'ru' ? 'населения мира' : 
             language === 'en' ? 'of world population' :
             'әлем халқының',
      description: language === 'ru' ? 'превышают норму ВОЗ по PM2.5' : 
                   language === 'en' ? 'exceed WHO PM2.5 standards' :
                   'ДДҰ PM2.5 нормасынан асады',
      color: 'text-red-500',
      bgColor: 'bg-red-50 dark:bg-red-900/20'
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      value: "79.9",
      label: "µg/m³",
      description: language === 'ru' ? 'максимальный уровень (16x выше нормы)' : 
                   language === 'en' ? 'maximum level (16x above normal)' :
                   'максималды деңгей (нормадан 16 есе)',
      color: 'text-orange-500',
      bgColor: 'bg-orange-50 dark:bg-orange-900/20'
    },
    {
      icon: <Skull className="h-8 w-8" />,
      value: "8.1M",
      label: language === 'ru' ? 'смертей' : 
             language === 'en' ? 'deaths' :
             'өлім',
      description: language === 'ru' ? 'ежегодно от загрязнения воздуха' : 
                   language === 'en' ? 'annually from air pollution' :
                   'жыл сайын ауа ластануынан',
      color: 'text-red-600',
      bgColor: 'bg-red-50 dark:bg-red-900/20'
    },
    {
      icon: <Factory className="h-8 w-8" />,
      value: "3.6B",
      label: language === 'ru' ? 'человек' : 
             language === 'en' ? 'people' :
             'адам',
      description: language === 'ru' ? 'подвержены домашнему загрязнению' : 
                   language === 'en' ? 'exposed to household pollution' :
                   'үй ластануына ұшырайды',
      color: 'text-gray-600',
      bgColor: 'bg-gray-50 dark:bg-gray-900/20'
    }
  ];

  const stats = variant === 'compact' ? compactStats : detailedStats;

  if (variant === 'compact') {
    return (
      <div className={`flex items-center justify-center space-x-8 ${className}`}>
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className={`${stat.color} mb-2 flex justify-center`}>
              {stat.icon}
            </div>
            <div className="text-2xl font-bold text-slate-900 dark:text-white">
              {stat.value}
            </div>
            <div className="text-sm text-slate-600 dark:text-slate-400">
              {stat.label}
            </div>
          </motion.div>
        ))}
      </div>
    );
  }

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ${className}`}>
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: true }}
          className={`${stat.bgColor} rounded-xl p-6 text-center`}
        >
          <div className={`${stat.color} mb-4 flex justify-center`}>
            {stat.icon}
          </div>
          <div className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
            {stat.value}
          </div>
          <div className="text-lg font-semibold text-slate-700 dark:text-slate-300 mb-2">
            {stat.label}
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            {stat.description}
          </p>
        </motion.div>
      ))}
    </div>
  );
};

export default PollutionStats; 