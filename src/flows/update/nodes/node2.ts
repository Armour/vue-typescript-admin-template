import { FunctionNode } from 'arkfbp/lib/functionNode'

export class Node2 extends FunctionNode {
  async run() {
    const state = this.$state.fetch()
    if (this.inputs.error_code !== 0) {
      throw new Error(this.inputs.error_msg)
    }

    Object.keys(state.client_server).forEach((key) => {
      const ks = key.split('.')
      const vs = state.client_server[key].split('.')

      let temp = state.client
      for (let i = 0; i < ks.length - 1; i++) {
        temp = temp[ks[i]]
      }

      temp[ks[ks.length - 1]] = temp[vs[vs.length - 1]]
    })

    return this.inputs
  }
}
