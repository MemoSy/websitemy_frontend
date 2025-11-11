import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translation files
import translationAR from './locales/ar/translation.json';
import translationEN from './locales/en/translation.json';
import translationTR from './locales/tr/translation.json';

// Available languages
export const languages = {
  ar: { nativeName: 'العربية', dir: 'rtl' },
  en: { nativeName: 'English', dir: 'ltr' },
  tr: { nativeName: 'Türkçe', dir: 'ltr' }
};

const resources = {
  ar: {
    translation: translationAR
  },
  en: {
    translation: translationEN
  },
  tr: {
    translation: translationTR
  }
};

i18n
  // Detect user language
  .use(LanguageDetector)
  // Pass the i18n instance to react-i18next
  .use(initReactI18next)
  // Init i18next
  .init({
    resources,
    fallbackLng: 'ar', // Default language (Arabic)
    debug: false, // Set to true for debugging
    
    interpolation: {
      escapeValue: false // React already escapes values
    },

    // Language detection options
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage']
    }
  });

// Set HTML dir and body class based on language
i18n.on('languageChanged', (lng) => {
  const dir = languages[lng as keyof typeof languages]?.dir || 'rtl';
  document.documentElement.dir = dir;
  document.documentElement.lang = lng;
  document.body.dir = dir;
  
  // Add/remove RTL class
  if (dir === 'rtl') {
    document.body.classList.add('rtl');
    document.body.classList.remove('ltr');
  } else {
    document.body.classList.add('ltr');
    document.body.classList.remove('rtl');
  }
});

// Set initial direction
const currentLang = i18n.language || 'ar';
const dir = languages[currentLang as keyof typeof languages]?.dir || 'rtl';
document.documentElement.dir = dir;
document.documentElement.lang = currentLang;
document.body.dir = dir;

// Add initial class
if (dir === 'rtl') {
  document.body.classList.add('rtl');
} else {
  document.body.classList.add('ltr');
}

export default i18n;
