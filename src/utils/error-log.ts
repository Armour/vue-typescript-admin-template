import Vue from 'vue'
import { ErrorLogModule } from '@/store/modules/errorLog'
// import { isString, isArray } from '@/utils/validate'
// import settings from '@/settings'

// TODO: Enable below section after add settings support
// you can set in settings.js
// errorLog:'production' | ['production', 'development']
// const { errorLog: needErrorLog } = settings

// const checkNeed = () => {
//   const env = process.env.NODE_ENV
//   if (isString(needErrorLog)) {
//     return env === needErrorLog
//   }
//   if (isArray(needErrorLog) && env) {
//     return needErrorLog.includes(env)
//   }
//   return false
// }

// if (checkNeed()) {
Vue.config.errorHandler = function(err, vm, info) {
  ErrorLogModule.AddErrorLog({
    err,
    vm,
    info,
    url: window.location.href
  })
}
// }
