import { VuexModule, Module, Mutation, Action, getModule } from 'vuex-module-decorators'
import store from '@/store'

export interface IErrorLogState {
  logs: string[]
}

@Module({ dynamic: true, store, name: 'errorLog' })
class ErrorLog extends VuexModule implements IErrorLogState {
  public logs: string[] = []

  @Mutation
  private ADD_ERROR_LOG(log: string) {
    this.logs.push(log)
  }

  @Action
  public AddErrorLog(log: string) {
    this.ADD_ERROR_LOG(log)
  }
}

export const ErrorLogModule = getModule(ErrorLog)
