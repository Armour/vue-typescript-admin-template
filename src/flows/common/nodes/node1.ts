import { FunctionNode } from 'arkfbp/lib/functionNode'

export class Node1 extends FunctionNode {
  async run() {
    if (this.inputs === null) {
      return this.inputs
    }

    Object.keys(this.inputs.client_server).forEach((key) => {
      const ks = key.split('.')
      let temp = this.inputs.client
      for (let i = 0; i < ks.length - 1; i++) {
        const k = ks[i]
        temp = temp[k]
      }

      temp[ks[ks.length - 1]] = this.inputs.client_server[key]
      return this.inputs
    })
  }
}
