import { VuexModule, Module, Mutation, Action, getModule } from 'vuex-module-decorators'
import store from '@/store'
import variables from '@/styles/variables.scss'
import defaultSettings from '@/settings'

export interface ISettingsState {
  theme: string
  fixedHeader: boolean
  showSettings: boolean
  showTagsView: boolean
  showSidebarLogo: boolean
}

@Module({ dynamic: true, store, name: 'settings' })
class Settings extends VuexModule implements ISettingsState {
  public theme = variables.theme
  public fixedHeader = defaultSettings.fixedHeader
  public showSettings = defaultSettings.showSettings
  public showTagsView = defaultSettings.showTagsView
  public showSidebarLogo = defaultSettings.showSidebarLogo

  @Mutation
  private CHANGE_SETTING(payload: { key: string, value: any }) {
    const { key, value } = payload
    if (this.hasOwnProperty(key)) {
      (this as any)[key] = value
    }
  }

  @Action
  public ChangeSetting(payload: { key: string, value: any}) {
    this.CHANGE_SETTING(payload)
  }
}

export const SettingsModule = getModule(Settings)
