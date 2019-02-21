import waves from './waves'

const install = function(Vue: any) {
  Vue.directive('waves', waves)
}

declare var window: any;

if (window.Vue) {
  window.waves = waves
  window.Vue.use(install); // eslint-disable-line
}

Object.assign("install", install);

export default waves
