import Clipboard from './clipboard';
import Vue from 'vue';

const install = (Vue: Vue) => Vue.directive('Clipboard', Clipboard);

if (window.Vue) {
  window.clipboard = Clipboard;
  Vue.use(install); // eslint-disable-line
}

Clipboard.install = install;
export default Clipboard;
