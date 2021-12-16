import { createI18n } from 'vue-i18n'
import ja from '@/lang/ja.json'
import en from '@/lang/en.json'

const i18n = createI18n({
  locale: navigator.language.toLowerCase(),
  fallbackLocale: 'en',
  messages: {
    ja,
    en,
    'en-us': en,
  },
})

export default i18n
