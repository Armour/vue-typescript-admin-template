import { FunctionNode } from 'arkfbp/lib/functionNode';

export class Node2 extends FunctionNode {
  async run() {
    const state = this.$state.fetch();
    if (state.client_server == null) {
      return this.inputs;
    }

    Object.keys(state.client_server).forEach((key) => {
      const ks = key.split('.');
      let temp_c = state.client;
      for (let i = 0; i < ks.length - 1; i++) {
        temp_c = temp_c[ks[i]];
      }

      const vs = state.client_server[key].split('.');
      let temp_s = this.inputs;
      for (let i = 0; i < vs.length - 1; i++) {
        temp_s = temp_s[vs[i]];
      }
      temp_c[ks[ks.length - 1]] = temp_s[vs[vs.length - 1]];
    });

    return this.inputs;
  }
}
