import Cookies from 'js-cookie'
import { VuexModule, Module, Mutation, Action, getModule } from 'vuex-module-decorators'
import store from '@/store'

export enum DeviceType {
  Mobile,
  Desktop,
}

export interface IAppState {
  device: DeviceType;
  sidebar: {
    opened: boolean;
    withoutAnimation: boolean;
  };
  language: string,
  size: string
}

@Module({ dynamic: true, store, name: 'app' })
class App extends VuexModule implements IAppState {
  public sidebar = {
    opened: Cookies.get('sidebarStatus') !== 'closed',
    withoutAnimation: false
  };
  public device = DeviceType.Desktop;
  public language = Cookies.get('language') || 'en';
  public size = Cookies.get('size') || 'medium';

  @Mutation
  private TOGGLE_SIDEBAR(withoutAnimation: boolean) {
    if (this.sidebar.opened) {
      Cookies.set('sidebarStatus', 'closed')
    } else {
      Cookies.set('sidebarStatus', 'opened')
    }
    this.sidebar.opened = !this.sidebar.opened
    this.sidebar.withoutAnimation = withoutAnimation
  }

  @Mutation
  private CLOSE_SIDEBAR(withoutAnimation: boolean) {
    Cookies.set('sidebarStatus', 'closed')
    this.sidebar.opened = false
    this.sidebar.withoutAnimation = withoutAnimation
  }

  @Mutation
  private TOGGLE_DEVICE(device: DeviceType) {
    this.device = device
  }

  @Mutation
  private SET_LANGUAGE(language: string) {
    Cookies.set('language', language)
    this.language = language
  }

  @Mutation
  private SET_SIZE(size: string) {
    Cookies.set('size', size)
    this.size = size
  }

  @Action
  public ToggleSideBar(withoutAnimation: boolean) {
    this.TOGGLE_SIDEBAR(withoutAnimation)
  }

  @Action
  public CloseSideBar(withoutAnimation: boolean) {
    this.CLOSE_SIDEBAR(withoutAnimation)
  }

  @Action
  public ToggleDevice(device: DeviceType) {
    this.TOGGLE_DEVICE(device)
  }

  @Action
  public SetLanguage(language: string) {
    this.SET_LANGUAGE(language)
  }

  @Action
  public SetSize(size: string) {
    this.SET_SIZE(size)
  }
}

export const AppModule = getModule(App)
