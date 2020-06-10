import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const pt = require('../locales/pt.json');

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      ns: 'common',
      defaultNS: 'common',
      lowerCaseLng: true,
      nonExplicitWhitelist: true,

      lng: 'pt',
      fallbackLng: 'pt',
      debug: false,

      resources: {
        pt,
      },

      interpolation: {
        escapeValue: false,
      },

      react: {
        useSuspense: false,
      },
    });

export default i18n;
