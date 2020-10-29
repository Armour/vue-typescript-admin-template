import { FunctionNode } from 'arkfbp/lib/functionNode';

export class Node1 extends FunctionNode {
  async run() {
    if (this.inputs === null) {
      return this.inputs;
    }
    this.inputs.avatar_url.replace('https://cdn.yixi.tv/almond/', '');

    return this.inputs;
  }
}
