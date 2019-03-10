import permission from './permission';
import Vue, { VueConstructor } from 'vue';

const install: Vue.PluginFunction<any> = (Vue: VueConstructor<Vue>, options?: any) => {
  Vue.directive('permission', permission);
};

if ((window as any).Vue) {
  (window as any)['permission'] = permission;
  Vue.use(install); // eslint-disable-line
}

(permission as any).install = install;
export default permission;
