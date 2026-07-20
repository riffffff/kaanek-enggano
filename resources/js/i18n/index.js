import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

// Import translation files directly
import idCommon from '../locales/id/common.json'
import enCommon from '../locales/en/common.json'
import enHome from '../locales/en/home.json'
import enVillages from '../locales/en/villages.json'

// For Indonesian, we hardcode in components, but still need to define resources to avoid errors
const resources = {
  id: {
    common: idCommon,
    home: {},
    villages: {},
  },
  en: {
    common: enCommon,
    home: enHome,
    villages: enVillages,
  },
}

i18n
  // Detect user language
  .use(LanguageDetector)
  // Integrate with React
  .use(initReactI18next)
  // Initialize i18next
  .init({
    resources,
    fallbackLng: 'id',
    lng: 'id',
    defaultNS: 'common',
    ns: ['common', 'home', 'villages'],
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    // Custom function to return hardcoded Indonesian text when lng is 'id'
    parseMissingKeyHandler: (key) => key,
  })

export default i18n
