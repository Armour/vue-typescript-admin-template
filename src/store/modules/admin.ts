import { VuexModule, Module, Mutation, Action, getModule } from 'vuex-module-decorators'
import { runAction } from '@/arkfbp'
import { cloneDeep } from 'lodash'
import store from '@/store'

export interface IAdminState {
  admin: any
}

@Module({ dynamic: true, store, name: 'admin' })
class Admin extends VuexModule implements IAdminState {
  public admin: any = null

  @Mutation
  public CHANGE_ADMIN(payload: any) {
    this.admin = payload
  }

  @Action
  public async action(payload: { action: string, data?: any}) {
    const { action, data } = payload
    const admin = cloneDeep(this.admin)
    const flows = admin.apis[action].flows

    for (let i = 0; i < flows.length; i++) {
      await runFlow(admin, flows[i], data)
    }

    if (admin.apis[action].next) {
      const next = admin.apis[action].next

      for (let i = 0; i < next.length; i++) {
        await this.action({
          action: next[i].action
        })
      }
    }

    this.CHANGE_ADMIN(admin)
  }
}

function getUrl(url: string, data: any) {
  if (!data) {
    return url
  }

  const property = url.slice(url.indexOf('{') + 1, url.lastIndexOf('}'))
  return url.slice(0, url.indexOf('{')) + data[property] + url.slice(url.indexOf('}') + 1)
}

async function runFlow(state: any, flow: any, data: any) {
  if (flow.type === 'base') {
    await runAction({
      flow: `@/flows/${flow.name}`,
      inputs: {
        client: state,
        clientServer: flow.client_config
      }
    })
  }

  if (flow.type === 'function') {
    let params = state
    flow.request.split('.').forEach((v: string) => {
      params = params[v]
    })
    await runAction({
      flow: `@/flows/${flow.name}`,
      inputs: params
    })
  }

  if (flow.type === 'api') {
    let params: any = {}
    if (typeof flow.request === 'string') {
      let temp = state
      flow.request.split('.').forEach((v: string) => {
        temp = temp[v]
        params = temp
      })
    }

    if (typeof flow.request === 'object') {
      Object.keys(flow.request).forEach(key => {
        let temp = state
        const vs = flow.request[key].split('.')
        vs.forEach((v: string) => {
          temp = temp[v]
        })
        params[key] = temp
      })
    }

    await runAction({
      flow: `@/flows/${flow.name}`,
      inputs: {
        url: `api/admin/${getUrl(flow.url, data)}`,
        method: flow.method,
        params: params,
        client: state,
        clientServer: flow.client_config
      }
    })
  }
}

export const AdminModule = getModule(Admin)
