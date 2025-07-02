"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, AlertTriangle, Globe, Heart, Activity, Baby, Brain } from 'lucide-react';
import Link from 'next/link';

export default function PollutionDataPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link 
            href="/" 
            className="inline-flex items-center text-sm text-slate-600 dark:text-slate-400 hover:text-eco-leaf dark:hover:text-eco-leaf transition-colors mb-6"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            <span>Вернуться на главную</span>
          </Link>
          
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
              Данные о загрязнении воздуха PM2.5
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
              Глобальная статистика загрязнения воздуха мелкодисперсными частицами и их влияние на здоровье человека
            </p>
          </div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {/* Alert Banner */}
          <motion.div 
            variants={itemVariants}
            className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6"
          >
            <div className="flex items-start">
              <AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-400 mr-3 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-semibold text-red-800 dark:text-red-300 mb-2">
                  Критическая ситуация
                </h3>
                <p className="text-red-700 dark:text-red-400">
                  99% населения мира живет в условиях превышения безопасной нормы ВОЗ по PM2.5 (5 µg/m³)
                </p>
              </div>
            </div>
          </motion.div>

          {/* Section 1: Scale of PM2.5 Pollution */}
          <motion.div variants={itemVariants} className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8">
            <div className="flex items-center mb-6">
              <Globe className="h-8 w-8 text-eco-leaf mr-3" />
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                1. Масштабы загрязнения PM2.5
              </h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="bg-slate-50 dark:bg-slate-700 rounded-lg p-4">
                  <h4 className="font-semibold text-slate-900 dark:text-white mb-2">
                    Процент населения мира в опасности
                  </h4>
                  <p className="text-3xl font-bold text-red-600 dark:text-red-400">99%</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    превышают норму ВОЗ (5 µg/m³)
                  </p>
                </div>
                
                <div className="bg-slate-50 dark:bg-slate-700 rounded-lg p-4">
                  <h4 className="font-semibold text-slate-900 dark:text-white mb-2">
                    Пример значения PM2.5
                  </h4>
                  <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">79.9 µg/m³</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    в 15.98 раза выше нормы
                  </p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="bg-slate-50 dark:bg-slate-700 rounded-lg p-4">
                  <h4 className="font-semibold text-slate-900 dark:text-white mb-2">
                    Поглощение пыли за 1 час на улице
                  </h4>
                  <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">≈ 1.2 мг</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    эквивалент одной сигареты
                  </p>
                </div>
                
                <div className="bg-slate-50 dark:bg-slate-700 rounded-lg p-4">
                  <h4 className="font-semibold text-slate-900 dark:text-white mb-2">
                    Страны в пределах нормы (IQAir)
                  </h4>
                  <p className="text-2xl font-bold text-green-600 dark:text-green-400">7–10 из 134</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Австралия, Новая Зеландия, Эстония, Финляндия
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Section 2: Most Polluted Countries */}
          <motion.div variants={itemVariants} className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
              2. Самые загрязнённые страны (2023)
            </h2>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-700">
                    <th className="text-left py-3 px-4 font-semibold text-slate-900 dark:text-white">Страна</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-900 dark:text-white">PM2.5 (µg/m³)</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-900 dark:text-white">Превышение нормы</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-slate-100 dark:border-slate-700">
                    <td className="py-3 px-4 text-slate-900 dark:text-white">Бангладеш</td>
                    <td className="py-3 px-4 text-red-600 dark:text-red-400 font-bold">79.9</td>
                    <td className="py-3 px-4 text-red-600 dark:text-red-400">≈ 16×</td>
                  </tr>
                  <tr className="border-b border-slate-100 dark:border-slate-700">
                    <td className="py-3 px-4 text-slate-900 dark:text-white">Пакистан</td>
                    <td className="py-3 px-4 text-red-600 dark:text-red-400 font-bold">73.7</td>
                    <td className="py-3 px-4 text-red-600 dark:text-red-400">≈ 15×</td>
                  </tr>
                  <tr className="border-b border-slate-100 dark:border-slate-700">
                    <td className="py-3 px-4 text-slate-900 dark:text-white">Индия</td>
                    <td className="py-3 px-4 text-orange-600 dark:text-orange-400 font-bold">54.4</td>
                    <td className="py-3 px-4 text-orange-600 dark:text-orange-400">&gt;10×</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Section 3: Regional Differences */}
          <motion.div variants={itemVariants} className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
              3. Региональные различия
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4">
                <h4 className="font-semibold text-red-800 dark:text-red-300 mb-2">Азия</h4>
                <p className="text-sm text-red-700 dark:text-red-400">
                  83 из 100 самых загрязнённых городов (в Индии)
                </p>
              </div>
              
              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                <h4 className="font-semibold text-green-800 dark:text-green-300 mb-2">Океания</h4>
                <p className="text-sm text-green-700 dark:text-green-400">
                  все города соответствуют норме
                </p>
              </div>
              
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">Европа</h4>
                <p className="text-sm text-blue-700 dark:text-blue-400">
                  54% городов < 10 µg/m³; 36 из 43 стран улучшили показатели
                </p>
              </div>
              
              <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4">
                <h4 className="font-semibold text-yellow-800 dark:text-yellow-300 mb-2">Америка</h4>
                <p className="text-sm text-yellow-700 dark:text-yellow-400">
                  рост из-за пожаров: США — с 8.9 до 9.1 µg/m³
                </p>
              </div>
            </div>
            
            <div className="mt-6 bg-slate-50 dark:bg-slate-700 rounded-lg p-4">
              <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Африка</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                мониторинг есть в 24 из 54 стран; очень фрагментирован
              </p>
            </div>
          </motion.div>

          {/* Section 4: Impact of "Safe" Levels */}
          <motion.div variants={itemVariants} className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8">
            <div className="flex items-center mb-6">
              <Heart className="h-8 w-8 text-red-500 mr-3" />
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                4. Влияние даже «безопасных» уровней
              </h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-6">
                <h4 className="font-semibold text-red-800 dark:text-red-300 mb-2">
                  +25 µg/m³
                </h4>
                <p className="text-red-700 dark:text-red-400">
                  +48% риск смерти от сердечно-сосудистых заболеваний
                </p>
              </div>
              
              <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-6">
                <h4 className="font-semibold text-orange-800 dark:text-orange-300 mb-2">
                  +10.5 µg/m³
                </h4>
                <p className="text-orange-700 dark:text-orange-400">
                  +2.8 мм рт. ст. к систолическому давлению
                </p>
              </div>
            </div>
          </motion.div>

          {/* Section 5: PM2.5 Related Diseases */}
          <motion.div variants={itemVariants} className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8">
            <div className="flex items-center mb-6">
              <Activity className="h-8 w-8 text-blue-500 mr-3" />
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                5. Болезни, связанные с PM2.5
              </h2>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-6">
                <Heart className="h-6 w-6 text-red-600 dark:text-red-400 mb-3" />
                <h4 className="font-semibold text-red-800 dark:text-red-300 mb-2">
                  Кардиозаболевания
                </h4>
                <p className="text-sm text-red-700 dark:text-red-400">
                  инфаркты, инсульты, гипертензия
                </p>
              </div>
              
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
                <Activity className="h-6 w-6 text-blue-600 dark:text-blue-400 mb-3" />
                <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">
                  ХОБЛ и инфекции
                </h4>
                <p className="text-sm text-blue-700 dark:text-blue-400">
                  48% ХОБЛ, пневмонии у детей/пожилых
                </p>
              </div>
              
              <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-6">
                <div className="w-6 h-6 bg-purple-600 dark:bg-purple-400 rounded mb-3"></div>
                <h4 className="font-semibold text-purple-800 dark:text-purple-300 mb-2">
                  Рак лёгких
                </h4>
                <p className="text-sm text-purple-700 dark:text-purple-400">
                  29% смертей связаны с загрязнением
                </p>
              </div>
              
              <div className="bg-pink-50 dark:bg-pink-900/20 rounded-lg p-6">
                <Baby className="h-6 w-6 text-pink-600 dark:text-pink-400 mb-3" />
                <h4 className="font-semibold text-pink-800 dark:text-pink-300 mb-2">
                  Дородные осложнения
                </h4>
                <p className="text-sm text-pink-700 dark:text-pink-400">
                  34% случаев — низкий вес и преждевременные роды
                </p>
              </div>
              
              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6">
                <div className="w-6 h-6 bg-green-600 dark:bg-green-400 rounded mb-3"></div>
                <h4 className="font-semibold text-green-800 dark:text-green-300 mb-2">
                  Диабет
                </h4>
                <p className="text-sm text-green-700 dark:text-green-400">
                  +10 µg/m³ → +10% риск (особенно в Азии)
                </p>
              </div>
              
              <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-6">
                <Baby className="h-6 w-6 text-yellow-600 dark:text-yellow-400 mb-3" />
                <h4 className="font-semibold text-yellow-800 dark:text-yellow-300 mb-2">
                  Детская смертность
                </h4>
                <p className="text-sm text-yellow-700 dark:text-yellow-400">
                  700 000 детей до 5 лет (2021)
                </p>
              </div>
              
              <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-lg p-6">
                <Activity className="h-6 w-6 text-indigo-600 dark:text-indigo-400 mb-3" />
                <h4 className="font-semibold text-indigo-800 dark:text-indigo-300 mb-2">
                  Астма у детей в Европе
                </h4>
                <p className="text-sm text-indigo-700 dark:text-indigo-400">
                  33% случаев из-за PM2.5
                </p>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                <Brain className="h-6 w-6 text-gray-600 dark:text-gray-400 mb-3" />
                <h4 className="font-semibold text-gray-800 dark:text-gray-300 mb-2">
                  Неврология
                </h4>
                <p className="text-sm text-gray-700 dark:text-gray-400">
                  Альцгеймер, когнитивные нарушения
                </p>
              </div>
            </div>
          </motion.div>

          {/* Section 6: Health Losses - DALY and Mortality */}
          <motion.div variants={itemVariants} className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8">
            <div className="flex items-center mb-6">
              <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center mr-3">
                <span className="text-white font-bold text-sm">💀</span>
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                6. Потери здоровья: DALY и смертность
              </h2>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-6 col-span-full">
                <h4 className="font-semibold text-red-800 dark:text-red-300 mb-4 text-center">
                  Глобальная смертность (2021)
                </h4>
                <div className="text-center">
                  <p className="text-4xl font-bold text-red-600 dark:text-red-400 mb-2">8.1 млн</p>
                  <p className="text-sm text-red-700 dark:text-red-400 mb-4">общая смертность от загрязнения воздуха</p>
                  
                  <div className="grid md:grid-cols-2 gap-4 mt-4">
                    <div className="bg-white dark:bg-slate-700 rounded-lg p-4">
                      <p className="text-2xl font-bold text-red-600 dark:text-red-400">4.7 млн</p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">от наружного PM2.5</p>
                    </div>
                    <div className="bg-white dark:bg-slate-700 rounded-lg p-4">
                      <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">3.1 млн</p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">от внутри-домашнего загрязнения</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-6">
                <h4 className="font-semibold text-orange-800 dark:text-orange-300 mb-2">
                  Общие DALY
                </h4>
                <p className="text-2xl font-bold text-orange-600 dark:text-orange-400 mb-2">120 млн</p>
                <p className="text-sm text-orange-700 dark:text-orange-400">
                  потерянных лет здоровой жизни
                </p>
              </div>
              
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
                <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">
                  Европа
                </h4>
                <p className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-2">416,000–800,000</p>
                <p className="text-sm text-blue-700 dark:text-blue-400">
                  смертей ежегодно
                </p>
              </div>
              
              <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-6">
                <h4 className="font-semibold text-purple-800 dark:text-purple-300 mb-2">
                  Рост с 1990 по 2021
                </h4>
                <p className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-2">+102%</p>
                <p className="text-sm text-purple-700 dark:text-purple-400">
                  смертности от наружного PM2.5
                </p>
              </div>
              
              <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-6 col-span-full md:col-span-2 lg:col-span-1">
                <h4 className="font-semibold text-yellow-800 dark:text-yellow-300 mb-2">
                  Влияние на продолжительность жизни
                </h4>
                <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400 mb-2">−2.9 года</p>
                <p className="text-sm text-yellow-700 dark:text-yellow-400">
                  к средней продолжительности жизни (2015)
                </p>
              </div>
            </div>
          </motion.div>

          {/* Section 7: Pollution Sources */}
          <motion.div variants={itemVariants} className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8">
            <div className="flex items-center mb-6">
              <div className="w-8 h-8 bg-gray-500 rounded-full flex items-center justify-center mr-3">
                <span className="text-white font-bold text-sm">🏭</span>
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                7. Источники загрязнения
              </h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                  Наружные источники
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-gray-700 dark:text-gray-300">ТЭС и ТЭЦ</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-gray-700 dark:text-gray-300">Транспорт</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-gray-700 dark:text-gray-300">Промышленные выбросы</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-gray-700 dark:text-gray-300">Пыль</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-gray-700 dark:text-gray-300">Пожары</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-orange-800 dark:text-orange-200 mb-4">
                  Домашние источники
                </h3>
                <div className="text-center mb-4">
                  <p className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2">3.6 млрд</p>
                  <p className="text-sm text-orange-700 dark:text-orange-400">человек подвержены</p>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-brown-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-orange-700 dark:text-orange-300">Дрова</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-gray-800 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-orange-700 dark:text-orange-300">Уголь</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-green-700 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-orange-700 dark:text-orange-300">Навоз</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-blue-700 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-orange-700 dark:text-orange-300">Керосин</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Call to Action */}
          <motion.div 
            variants={itemVariants}
            className="bg-gradient-to-r from-eco-leaf to-sky-blue rounded-xl p-8 text-white text-center"
          >
            <h3 className="text-2xl font-bold mb-4">
              Присоединяйтесь к борьбе за чистый воздух
            </h3>
            <p className="text-lg mb-6 opacity-90">
              Каждое действие имеет значение. Используйте экологически чистые продукты AuaLine и помогите создать более здоровое будущее.
            </p>
            <Link 
              href="/shop"
              className="inline-block bg-white text-eco-leaf px-8 py-3 rounded-lg font-semibold hover:bg-slate-100 transition-colors"
            >
              Перейти в магазин
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
} 