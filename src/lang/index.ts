import Vue from 'vue'
import VueI18n from 'vue-i18n'
import Cookies from 'js-cookie'

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

const i18n = new VueI18n({
  locale: Cookies.get('language') || 'en',
  messages
})

export default i18n
