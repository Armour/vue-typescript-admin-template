import { ECharts } from 'echarts'
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class ResizeMixin extends Vue {
  protected chart!: ECharts | null
  // use $_ for mixins properties
  // https://vuejs.org/v2/style-guide/index.html#Private-property-names-essential
  // eslint-disable-next-line camelcase
  private $_sidebarElm?: Element
  // eslint-disable-next-line camelcase
  private $_chartResizeHandler?: any

  mounted() {
    this.$_chartResizeHandler = () => {
      if (this.chart) {
        this.chart.resize()
      }
    }
    if (this.$_chartResizeHandler) {
      window.addEventListener('resize', this.$_chartResizeHandler)
    }
    this.$_sidebarElm = document.getElementsByClassName('sidebar-container')[0]
    if (this.$_sidebarElm) {
      this.$_sidebarElm.addEventListener('transitionend', this.$_sidebarResizeHandler)
    }
  }

  beforeDestroy() {
    if (this.$_chartResizeHandler) {
      window.removeEventListener('resize', this.$_chartResizeHandler)
    }
    if (this.$_sidebarElm) {
      this.$_sidebarElm.removeEventListener('transitionend', this.$_sidebarResizeHandler)
    }
  }

  // eslint-disable-next-line camelcase
  private $_sidebarResizeHandler(e: Event) {
    if ((e as TransitionEvent).propertyName === 'width') {
      this.$_chartResizeHandler()
    }
  }
}
