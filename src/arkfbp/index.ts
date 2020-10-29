import { runWorkflowByClass } from 'arkfbp/lib/flow'
import { Loading } from 'element-ui'
import { FlowInput } from './flow'

const flows = require.context('@/flows', true, /\.ts$/)

function getUrl(url: string, data: any) {
  if (!data) {
    return url
  }

  const property = url.slice(url.indexOf('{') + 1, url.lastIndexOf('}'))
  return url.slice(0, url.indexOf('{')) + data[property] + url.slice(url.indexOf('}') + 1)
}

export function runFlowByFile(filename: string, inputs: FlowInput) {
  filename = filename.replace('@/flows', '.') + '/index.ts'
  const flow = flows(filename)
  return runWorkflowByClass(flow.Main, inputs)
}

export async function runAction(action: {flow: string, inputs: FlowInput}) {
  if (action.flow) {
    const loading = Loading.service({ fullscreen: true })
    const outputs = await runFlowByFile(action.flow, action.inputs)
    loading.close()
    return outputs
  }
}

export async function runFlow(state: any, flow: any, data: any) {
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
