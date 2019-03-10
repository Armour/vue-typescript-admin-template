import drag from './drag';
import Vue, { VueConstructor } from 'vue';


const install: Vue.PluginFunction<any> = (Vue: VueConstructor<Vue>, options?: any) =>  Vue.directive('el-drag-dialog', drag);

if ((window as any).Vue) {
  (window as any)['el-drag-dialog'] = drag;
  Vue.use(install); // eslint-disable-line
}

(drag as any).install = install;
export default drag;
