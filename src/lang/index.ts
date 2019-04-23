import Vue from 'vue'
import VueI18n from 'vue-i18n'

import { getLanguage } from '@/utils/cookies'
import elementEnLocale from 'element-ui/lib/locale/lang/en' // element-ui built-in lang
import elementZhLocale from 'element-ui/lib/locale/lang/zh-CN'// element-ui built-in lang
import elementEsLocale from 'element-ui/lib/locale/lang/es'// element-ui built-in lang
import enLocale from './en'
import zhLocale from './zh'
import esLocale from './es'

Vue.use(VueI18n)

const messages = {
  en: {
    ...enLocale,
    ...elementEnLocale
  },
  zh: {
    ...zhLocale,
    ...elementZhLocale
  },
  es: {
    ...esLocale,
    ...elementEsLocale
  }
}

export const getLocale = () => {
  const cookieLanguage = getLanguage()
  if (cookieLanguage) {
    return cookieLanguage
  }

  const language = navigator.language.toLowerCase()
  const locales = Object.keys(messages)
  for (const locale of locales) {
    if (language.indexOf(locale) > -1) {
      return locale
    }
  }

  // Default language is english
  return 'en'
}

const i18n = new VueI18n({
  locale: getLocale(),
  messages
})

export default i18n
