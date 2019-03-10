import Clipboard from './clipboard';
import Vue, { VueConstructor } from 'vue';

const install: Vue.PluginFunction<any> = (Vue: VueConstructor<Vue>, options?: any) => Vue.directive('Clipboard', Clipboard);

if ((window as any).Vue) {
  (window as any).clipboard = Clipboard;
  Vue.use(install); // eslint-disable-line
}

(Clipboard as any).install = install;
export default Clipboard;

