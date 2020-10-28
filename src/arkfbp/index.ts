import { runWorkflowByClass } from 'arkfbp/lib/flow'
import { Loading } from 'element-ui'
import { FlowInput } from './flow'

const flows = require.context('@/flows', true, /\.js$/)
// flows.keys().forEach((key) => {
//   console.log(key);
// });

export function runFlowByFile(filename: string, inputs: FlowInput) {
  filename = filename.replace('@/flows', '.') + '/index.js'
  const flow = flows(filename)
  console.log('arkfbp.js', flow)
  return runWorkflowByClass(flow.Main, inputs)
}

export async function runAction(action: {flow: string, inputs: FlowInput}) {
  if (action.flow) {
    const loading = Loading.service({ fullscreen: true })
    console.log(action.flow, action.inputs)
    const outputs = await runFlowByFile(action.flow, action.inputs)
    loading.close()
    return outputs
  }
}
