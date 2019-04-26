import { Component, Vue, Watch } from 'vue-property-decorator'
import { AppModule, DeviceType } from '@/store/modules/app'

const WIDTH = 992 // refer to Bootstrap's responsive design

@Component
export default class ResizeMixin extends Vue {
  get device() {
    return AppModule.device
  }

  get sidebar() {
    return AppModule.sidebar
  }

  @Watch('$route')
  private OnRouteChange() {
    if (this.device === DeviceType.Mobile && this.sidebar.opened) {
      AppModule.CloseSideBar(false)
    }
  }

  beforeMount() {
    window.addEventListener('resize', this.$_resizeHandler)
  }

  mounted() {
    const isMobile = this.$_isMobile()
    if (isMobile) {
      AppModule.ToggleDevice(DeviceType.Mobile)
      AppModule.CloseSideBar(true)
    }
  }

  beforeDestroy() {
    window.removeEventListener('resize', this.$_resizeHandler)
  }

  // use $_ for mixins properties
  // https://vuejs.org/v2/style-guide/index.html#Private-property-names-essential
  // eslint-disable-next-line camelcase
  private $_isMobile() {
    const rect = document.body.getBoundingClientRect()
    return rect.width - 1 < WIDTH
  }

  // eslint-disable-next-line camelcase
  private $_resizeHandler() {
    if (!document.hidden) {
      const isMobile = this.$_isMobile()
      AppModule.ToggleDevice(isMobile ? DeviceType.Mobile : DeviceType.Desktop)
      if (isMobile) {
        AppModule.CloseSideBar(true)
      }
    }
  }
}
