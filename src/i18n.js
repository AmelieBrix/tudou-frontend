import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translation files
import translationEN from './locales/en.json';
import translationDE from './locales/de.json';
import translationCN from './locales/cn.json';

// Define the translations for each language
const resources = {
  en: {
    translation: translationEN
  },
  de: {
    translation: translationDE
  },
  cn: {
    translation: translationCN
  }
};

// Initialize i18next
i18n
  .use(LanguageDetector) // Detects user's language
  .use(initReactI18next) // Passes i18n instance to react-i18next
  .init({
    resources,           // Load translations
    fallbackLng: 'en',    // Fallback language if translation not available
    interpolation: {
      escapeValue: false  // React already escapes values by default
    }
  });

export default i18n;
