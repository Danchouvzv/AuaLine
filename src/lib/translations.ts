export type Language = 'ru' | 'en' | 'kz';

export interface Translations {
  [key: string]: {
    [K in Language]: string;
  };
}

export const translations: Translations = {
  // Navigation
  'nav.home': {
    ru: 'Главная',
    en: 'Home',
    kz: 'Басты бет'
  },
  'nav.shop': {
    ru: 'Магазин',
    en: 'Shop',
    kz: 'Дүкен'
  },
  'nav.about': {
    ru: 'О нас',
    en: 'About',
    kz: 'Біз туралы'
  },
  'nav.contact': {
    ru: 'Контакты',
    en: 'Contact',
    kz: 'Байланыс'
  },
  'nav.pollution-data': {
    ru: 'Данные о загрязнении',
    en: 'Pollution Data',
    kz: 'Ластану деректері'
  },
  'nav.back-home': {
    ru: 'Вернуться на главную',
    en: 'Back to Home',
    kz: 'Басты бетке оралу'
  },

  // Hero Section
  'hero.title': {
    ru: 'Превращаем загрязнение воздуха в экологически чистые чернила',
    en: 'Turning Air Pollution into Eco-Friendly Ink',
    kz: 'Ауа ластануын экологиялық таза сияға айналдырамыз'
  },
  'hero.subtitle': {
    ru: 'Инновационная технология AuaLine преобразует вредные частицы PM2.5 в высококачественные чернила для письма и рисования',
    en: 'AuaLine\'s innovative technology transforms harmful PM2.5 particles into high-quality writing and drawing inks',
    kz: 'AuaLine-ның инновациялық технологиясы зиянды PM2.5 бөлшектерін жоғары сапалы жазу және сурет салу сияларына айналдырады'
  },
  'hero.cta-shop': {
    ru: 'Перейти в магазин',
    en: 'Shop Now',
    kz: 'Дүкенге өту'
  },
  'hero.cta-learn': {
    ru: 'Узнать больше',
    en: 'Learn More',
    kz: 'Көбірек білу'
  },

  // Pollution Alert Section
  'pollution.title': {
    ru: 'Кризис загрязнения воздуха',
    en: 'Air Pollution Crisis',
    kz: 'Ауа ластану дағдарысы'
  },
  'pollution.subtitle': {
    ru: 'Мелкодисперсные частицы PM2.5 представляют критическую угрозу для здоровья человека по всему миру',
    en: 'Fine PM2.5 particles pose a critical threat to human health worldwide',
    kz: 'Ұсақ PM2.5 бөлшектері бүкіл әлемде адам денсаулығына сын тигізетін қауіп төндіреді'
  },
  'pollution.stat1-label': {
    ru: 'населения мира',
    en: 'of world population',
    kz: 'әлем халқының'
  },
  'pollution.stat1-desc': {
    ru: 'живет в условиях превышения нормы PM2.5',
    en: 'lives in conditions exceeding PM2.5 standards',
    kz: 'PM2.5 нормасынан асып кететін жағдайларда өмір сүреді'
  },
  'pollution.stat2-label': {
    ru: 'µg/m³',
    en: 'µg/m³',
    kz: 'µg/m³'
  },
  'pollution.stat2-desc': {
    ru: 'максимальный уровень загрязнения (в 16 раз выше нормы)',
    en: 'maximum pollution level (16 times above normal)',
    kz: 'ластанудың максималды деңгейі (нормадан 16 есе жоғары)'
  },
  'pollution.stat3-label': {
    ru: 'детей',
    en: 'children',
    kz: 'балалар'
  },
  'pollution.stat3-desc': {
    ru: 'умирают ежегодно от загрязнения воздуха',
    en: 'die annually from air pollution',
    kz: 'жыл сайын ауа ластануынан қайтыс болады'
  },
  'pollution.cta-title': {
    ru: 'Узнайте больше о глобальном загрязнении воздуха',
    en: 'Learn more about global air pollution',
    kz: 'Жаһандық ауа ластануы туралы көбірек біліңіз'
  },
  'pollution.cta-desc': {
    ru: 'Изучите подробную статистику, региональные данные и влияние на здоровье человека',
    en: 'Explore detailed statistics, regional data and impact on human health',
    kz: 'Толық статистиканы, аймақтық деректерді және адам денсаулығына әсерін зерттеңіз'
  },
  'pollution.cta-button': {
    ru: 'Посмотреть полные данные',
    en: 'View Full Data',
    kz: 'Толық деректерді көру'
  },
  'pollution.solution-text': {
    ru: 'превращает загрязнение воздуха в экологически чистые чернила',
    en: 'transforms air pollution into eco-friendly inks',
    kz: 'ауа ластануын экологиялық таза сияларға айналдырады'
  },
  'pollution.solution-cta': {
    ru: 'Присоединяйтесь к решению',
    en: 'Join the Solution',
    kz: 'Шешімге қосылыңыз'
  },

  // Pollution Data Page
  'pollution-data.title': {
    ru: 'Данные о загрязнении воздуха PM2.5',
    en: 'PM2.5 Air Pollution Data',
    kz: 'PM2.5 ауа ластану деректері'
  },
  'pollution-data.subtitle': {
    ru: 'Глобальная статистика загрязнения воздуха мелкодисперсными частицами и их влияние на здоровье человека',
    en: 'Global statistics of fine particulate air pollution and its impact on human health',
    kz: 'Ұсақ бөлшекті ауа ластануының жаһандық статистикасы және оның адам денсаулығына әсері'
  },
  'pollution-data.alert-title': {
    ru: 'Критическая ситуация',
    en: 'Critical Situation',
    kz: 'Сыни жағдай'
  },
  'pollution-data.alert-text': {
    ru: '99% населения мира живет в условиях превышения безопасной нормы ВОЗ по PM2.5 (5 µg/m³)',
    en: '99% of the world\'s population lives in conditions exceeding WHO safe PM2.5 standards (5 µg/m³)',
    kz: 'Әлем халқының 99%-ы ДДҰ-ның PM2.5 қауіпсіз нормасынан (5 µg/m³) асып кететін жағдайларда өмір сүреді'
  },

  // What We Do Section
  'what-we-do.title': {
    ru: 'Что мы делаем',
    en: 'What We Do',
    kz: 'Біз не істейміз'
  },
  'what-we-do.subtitle': {
    ru: 'Инновационная технология превращения загрязнения в продукты',
    en: 'Innovative technology turning pollution into products',
    kz: 'Ластануды өнімдерге айналдыратын инновациялық технология'
  },

  // Shop Section
  'shop.title': {
    ru: 'Наши продукты',
    en: 'Our Products',
    kz: 'Біздің өнімдер'
  },
  'shop.subtitle': {
    ru: 'Экологически чистые чернила из переработанного загрязнения воздуха',
    en: 'Eco-friendly inks made from recycled air pollution',
    kz: 'Қайта өңделген ауа ластануынан жасалған экологиялық таза сиялар'
  },
  'shop.view-all': {
    ru: 'Посмотреть все',
    en: 'View All',
    kz: 'Барлығын көру'
  },

  // CTA Section
  'cta.title': {
    ru: 'Присоединяйтесь к борьбе за чистый воздух',
    en: 'Join the Fight for Clean Air',
    kz: 'Таза ауа үшін күреске қосылыңыз'
  },
  'cta.subtitle': {
    ru: 'Каждое действие имеет значение. Используйте экологически чистые продукты AuaLine и помогите создать более здоровое будущее.',
    en: 'Every action matters. Use AuaLine eco-friendly products and help create a healthier future.',
    kz: 'Әрбір әрекеттің мәні бар. AuaLine экологиялық таза өнімдерін пайдаланыңыз және салауатты болашақ құруға көмектесіңіз.'
  }
};

export function getTranslation(key: string, language: Language): string {
  const translation = translations[key];
  if (!translation) {
    console.warn(`Translation not found for key: ${key}`);
    return key;
  }
  return translation[language] || translation.ru || key;
} 