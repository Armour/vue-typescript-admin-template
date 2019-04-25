import { debounce } from '@/utils'
import { Component, Vue } from 'vue-property-decorator'
import { ECharts } from 'echarts'

@Component
export class ResizeMixin extends Vue {
  // eslint-disable-next-line camelcase
  private $_sidebarElm: Element | undefined
  private __resizeHandler: any
  public chart!: ECharts | null

  mounted() {
    this.__resizeHandler = debounce(() => {
      if (this.chart) {
        this.chart.resize()
      }
    }, 100)
    window.addEventListener('resize', this.__resizeHandler)
    this.$_sidebarElm = document.getElementsByClassName('sidebar-container')[0]
    this.$_sidebarElm &&
      this.$_sidebarElm.addEventListener(
        'transitionend',
        this.$_sidebarResizeHandler
      )
  }

  beforeDestroy() {
    window.removeEventListener('resize', this.__resizeHandler)

    this.$_sidebarElm &&
      this.$_sidebarElm.removeEventListener(
        'resize',
        this.$_sidebarResizeHandler
      )
  }

  // use $_ for mixins properties
  // https://vuejs.org/v2/style-guide/index.html#Private-property-names-essential
  // eslint-disable-next-line camelcase
  private $_sidebarResizeHandler(e: Event) {
    if ((e as TransitionEvent).propertyName === 'width') {
      this.__resizeHandler()
    }
  }
}
