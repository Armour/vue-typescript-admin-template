import { FunctionNode } from 'arkfbp/lib/functionNode'

export class Node1 extends FunctionNode {
  async run() {
    if (this.inputs === null) {
      return this.inputs
    }

    this.inputs.forEach((option: any) => {
      option.value = option.id
      option.label = option.title
      delete option.id
      delete option.title
    })

    return this.inputs
  }
}
