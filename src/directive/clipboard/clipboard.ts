// Inspired by https://github.com/Inndy/vue-clipboard2
const Clipboard = require('clipboard');
if (!Clipboard) {
  throw new Error('you should npm install `clipboard` --save at first ');
}

const ClipboardDirectiveOption: Vue.DirectiveOptions = {
  bind: (el: HTMLElement, binding: Vue.VNodeDirective, vnode: Vue.VNode, oldVnode: Vue.VNode) => {
    if (binding.arg === 'success') {
      (el as any)._v_clipboard_success = binding.value;
    } else if (binding.arg === 'error') {
      (el as any)._v_clipboard_error = binding.value;
    } else {
      const clipboard = new Clipboard(el, {
        text() { return binding.value; },
        action() { return binding.arg === 'cut' ? 'cut' : 'copy'; },
      });
      clipboard.on('success', (e: Event) => {
        const callback = (el as any)._v_clipboard_success;
        callback && callback(e); // eslint-disable-line
      });
      clipboard.on('error', (e: Event) => {
        const callback = (el as any)._v_clipboard_error;
        callback && callback(e); // eslint-disable-line
      });
      (el as any)._v_clipboard = clipboard;
    }
  },
  update: (el: HTMLElement, binding: Vue.VNodeDirective, vnode: Vue.VNode, oldVnode: Vue.VNode) => {
    if (binding.arg === 'success') {
      (el as any)._v_clipboard_success = binding.value;
    } else if (binding.arg === 'error') {
      (el as any)._v_clipboard_error = binding.value;
    } else {
      (el as any)._v_clipboard.text = function() { return binding.value; };
      (el as any)._v_clipboard.action = function() { return binding.arg === 'cut' ? 'cut' : 'copy'; };
    }
  },
  
  unbind: (el: HTMLElement, binding: Vue.VNodeDirective, vnode: Vue.VNode, oldVnode: Vue.VNode) => {
    if (binding.arg === 'success') {
      delete (el as any)._v_clipboard_success;
    } else if (binding.arg === 'error') {
      delete (el as any)._v_clipboard_error;
    } else {
      (el as any)._v_clipboard.destroy();
      delete (el as any)._v_clipboard;
    }
  },
};

export default ClipboardDirectiveOption;