import { Component, Vue, Watch } from 'vue-property-decorator'
import { DeviceType, AppModule } from '@/store/modules/app'

const WIDTH = 992 // refer to Bootstrap's responsive design

@Component
export default class ResizeHandlerMixin extends Vue {
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

  private beforeMount() {
    window.addEventListener('resize', this.resizeHandler)
  }

  private mounted() {
    const isMobile = this.isMobile()
    if (isMobile) {
      AppModule.ToggleDevice(DeviceType.Mobile)
      AppModule.CloseSideBar(true)
    }
  }

  private isMobile() {
    const rect = document.body.getBoundingClientRect()
    return rect.width - 1 < WIDTH
  }

  private resizeHandler() {
    if (!document.hidden) {
      const isMobile = this.isMobile()
      AppModule.ToggleDevice(isMobile ? DeviceType.Mobile : DeviceType.Desktop)
      if (isMobile) {
        AppModule.CloseSideBar(true)
      }
    }
  }
}
