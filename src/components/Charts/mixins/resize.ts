import { debounce } from '@/utils';
import { Component, Vue, Watch } from 'vue-property-decorator';

@Component
export default class Resize extends Vue {
  private sidebarElm: any = null;

  mounted() {
    (this as any).__resizeHandler = debounce(() => {
      if ((this as any).chart) {
        (this as any).chart.resize();
      }
    }, 100);
    window.addEventListener('resize', (this as any).__resizeHandler);

    this.sidebarElm = document.getElementsByClassName('sidebar-container')[0];
    this.sidebarElm && this.sidebarElm.addEventListener('transitionend', this.sidebarResizeHandler);
  }

  beforeDestroy() {
    window.removeEventListener('resize', (this as any).__resizeHandler);

    this.sidebarElm && this.sidebarElm.removeEventListener('transitionend', this.sidebarResizeHandler);
  }
  
  sidebarResizeHandler(e: TransitionEvent) {
    if (e.propertyName === 'width') {
      (this as any).__resizeHandler();
    }
  }
}
