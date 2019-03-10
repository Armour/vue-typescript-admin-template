
import store from '@/store';

const permissions: Vue.DirectiveOptions = {
  inserted: (el: HTMLElement, binding: Vue.VNodeDirective, vnode: Vue.VNode, oldVnode: Vue.VNode) => {
    const { value } = binding;
    const roles = store.getters && store.getters.roles;

    if (value && value instanceof Array && value.length > 0) {
      const permissionRoles = value;

      const hasPermission = roles.some((role: any): boolean => {
        return permissionRoles.includes(role);
      });

      if (!hasPermission) {
        el.parentNode && el.parentNode.removeChild(el);
      }
    } else {
      throw new Error(`need roles! Like v-permission="['admin','editor']"`);
    }
  },
};
export default permissions;
