"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Car, Factory, Flame, Home, Truck, ChefHat, Building2, TreePine } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function PollutionSources() {
  const { language } = useLanguage();

  const sources = [
    {
      icon: Car,
      percentage: 25,
      titleRu: 'Транспорт',
      titleEn: 'Transportation',
      titleKz: 'Көлік',
      descriptionRu: 'Автомобили, грузовики, мотоциклы',
      descriptionEn: 'Cars, trucks, motorcycles',
      descriptionKz: 'Автомобильдер, жүк көліктері, мотоциклдер',
      color: 'bg-red-500'
    },
    {
      icon: Factory,
      percentage: 22,
      titleRu: 'Промышленность',
      titleEn: 'Industry',
      titleKz: 'Өнеркәсіп',
      descriptionRu: 'Заводы, фабрики, производство',
      descriptionEn: 'Factories, manufacturing, production',
      descriptionKz: 'Зауыттар, фабрикалар, өндіріс',
      color: 'bg-orange-500'
    },
    {
      icon: Flame,
      percentage: 20,
      titleRu: 'Сжигание топлива',
      titleEn: 'Fuel Burning',
      titleKz: 'Жанармай өртеу',
      descriptionRu: 'Уголь, нефть, газ для энергии',
      descriptionEn: 'Coal, oil, gas for energy',
      descriptionKz: 'Көмір, мұнай, газ энергия үшін',
      color: 'bg-yellow-500'
    },
    {
      icon: Home,
      percentage: 12,
      titleRu: 'Бытовая деятельность',
      titleEn: 'Household Activities',
      titleKz: 'Тұрмыстық қызмет',
      descriptionRu: 'Отопление, приготовление пищи',
      descriptionEn: 'Heating, cooking, lighting',
      descriptionKz: 'Жылыту, тамақ пісіру, жарықтандыру',
      color: 'bg-blue-500'
    },
    {
      icon: Building2,
      percentage: 8,
      titleRu: 'Строительство',
      titleEn: 'Construction',
      titleKz: 'Құрылыс',
      descriptionRu: 'Пыль от стройплощадок',
      descriptionEn: 'Dust from construction sites',
      descriptionKz: 'Құрылыс алаңдарынан шаң',
      color: 'bg-purple-500'
    },
    {
      icon: ChefHat,
      percentage: 8,
      titleRu: 'Приготовление пищи',
      titleEn: 'Cooking',
      titleKz: 'Тамақ дайындау',
      descriptionRu: 'Сжигание биомассы, дров',
      descriptionEn: 'Biomass burning, wood stoves',
      descriptionKz: 'Биомасса өртеу, ағаш пештері',
      color: 'bg-green-500'
    },
    {
      icon: TreePine,
      percentage: 3,
      titleRu: 'Природные источники',
      titleEn: 'Natural Sources',
      titleKz: 'Табиғи дереккөздер',
      descriptionRu: 'Лесные пожары, пыльные бури',
      descriptionEn: 'Wildfires, dust storms',
      descriptionKz: 'Орман өрттері, шаң дауылдары',
      color: 'bg-teal-500'
    },
    {
      icon: Truck,
      percentage: 2,
      titleRu: 'Прочее',
      titleEn: 'Other',
      titleKz: 'Басқа',
      descriptionRu: 'Сельское хозяйство, отходы',
      descriptionEn: 'Agriculture, waste management',
      descriptionKz: 'Ауыл шаруашылығы, қалдық басқару',
      color: 'bg-gray-500'
    }
  ];

  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-900">
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
              {language === 'ru' ? 'Источники загрязнения PM2.5' :
               language === 'en' ? 'PM2.5 Pollution Sources' :
               'PM2.5 ластану көздері'}
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
              {language === 'ru' ? 'Понимание источников помогает нам создавать более эффективные решения' :
               language === 'en' ? 'Understanding sources helps us create more effective solutions' :
               'Көздерді түсіну бізге тиімді шешімдер жасауға көмектеседі'}
            </p>
          </motion.div>

          {/* Sources Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {sources.map((source, index) => {
              const Icon = source.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-lg ${source.color}`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-slate-900 dark:text-white">
                        {source.percentage}%
                      </div>
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                    {language === 'ru' ? source.titleRu :
                     language === 'en' ? source.titleEn :
                     source.titleKz}
                  </h3>
                  
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {language === 'ru' ? source.descriptionRu :
                     language === 'en' ? source.descriptionEn :
                     source.descriptionKz}
                  </p>
                  
                  {/* Progress bar */}
                  <div className="mt-4 bg-slate-200 dark:bg-slate-700 rounded-full h-2 overflow-hidden">
                    <motion.div
                      className={source.color}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${source.percentage}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Key Facts */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 rounded-xl p-8"
          >
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 text-center">
              {language === 'ru' ? 'Ключевые факты' :
               language === 'en' ? 'Key Facts' :
               'Негізгі фактілер'}
            </h3>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-red-600 dark:text-red-400 mb-2">47%</div>
                <p className="text-slate-700 dark:text-slate-300">
                  {language === 'ru' ? 'от транспорта и промышленности' :
                   language === 'en' ? 'from transport & industry' :
                   'көлік пен өнеркәсіптен'}
                </p>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2">32%</div>
                <p className="text-slate-700 dark:text-slate-300">
                  {language === 'ru' ? 'от сжигания топлива и бытовой деятельности' :
                   language === 'en' ? 'from fuel burning & household activities' :
                   'жанармай өртеу мен тұрмыстық қызметтен'}
                </p>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">21%</div>
                <p className="text-slate-700 dark:text-slate-300">
                  {language === 'ru' ? 'от строительства и других источников' :
                   language === 'en' ? 'from construction & other sources' :
                   'құрылыс пен басқа көздерден'}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center mt-12"
          >
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-6">
              {language === 'ru' ? 'AuaLine улавливает загрязнения от всех этих источников, превращая их в полезные продукты' :
               language === 'en' ? 'AuaLine captures pollution from all these sources, turning it into useful products' :
               'AuaLine осы барлық көздерден ластануды ұстап, оларды пайдалы өнімдерге айналдырады'}
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <motion.a
                href="/pollution-data"
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {language === 'ru' ? 'Подробные данные' :
                 language === 'en' ? 'Detailed Data' :
                 'Толық деректер'}
              </motion.a>
              
              <motion.a
                href="/shop"
                className="bg-eco-leaf hover:bg-eco-leaf/90 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {language === 'ru' ? 'Наши продукты' :
                 language === 'en' ? 'Our Products' :
                 'Біздің өнімдер'}
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 