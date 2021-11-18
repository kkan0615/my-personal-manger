import { createI18n } from 'vue-i18n'
import { koreanDictionary } from '@/locales/langs/ko'
import { englishDictionary } from '@/locales/langs/en'
import { getCurrentLanguage } from '@/utils/lang'

const messages = {
  /* korean */
  ko: koreanDictionary,
  /* english */
  en: englishDictionary,
}

export const i18n = createI18n({
  // legacy: false,
  locale: getCurrentLanguage(), // set locale
  fallbackLocale: 'en', // set fallback locale
  messages, // set locale messages
})

export default i18n
