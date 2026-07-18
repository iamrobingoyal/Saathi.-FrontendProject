import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './locales/en.json'
import hi from './locales/hi.json'
import pa from './locales/pa.json'
import ta from './locales/ta.json'
import bn from './locales/bn.json'
import mr from './locales/mr.json'

const saved = (() => {
  try {
    return JSON.parse(localStorage.getItem('saathi-settings'))?.state?.language
  } catch {
    return 'en'
  }
})()

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    hi: { translation: hi },
    pa: { translation: pa },
    ta: { translation: ta },
    bn: { translation: bn },
    mr: { translation: mr },
  },
  lng: saved || 'en',
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
})

export default i18n
