<template>
  <div class="app-container">
    <el-input
      v-model="filterText"
      placeholder="Filter keyword"
      style="margin-bottom:30px;"
    />
    <el-tree
      ref="tree2"
      :data="data2"
      :props="defaultProps"
      :filter-node-method="filterNode"
      class="filter-tree"
      default-expand-all
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { Tree as ElTree } from 'element-ui'
import { TreeData } from 'element-ui/types/tree'

@Component({
  name: 'Tree'
})
export default class extends Vue {
  private filterText = '';
  private data2 = [{
    id: 1,
    label: 'Level one 1',
    children: [{
      id: 4,
      label: 'Level two 1-1',
      children: [{
        id: 9,
        label: 'Level three 1-1-1'
      }, {
        id: 10,
        label: 'Level three 1-1-2'
      }]
    }]
  }, {
    id: 2,
    label: 'Level one 2',
    children: [{
      id: 5,
      label: 'Level two 2-1'
    }, {
      id: 6,
      label: 'Level two 2-2'
    }]
  }, {
    id: 3,
    label: 'Level one 3',
    children: [{
      id: 7,
      label: 'Level two 3-1'
    }, {
      id: 8,
      label: 'Level two 3-2'
    }]
  }];

  private defaultProps = {
    children: 'children',
    label: 'label'
  };

  @Watch('filterText')
  private onFilterTextChange(value: string) {
    (this.$refs.tree2 as ElTree).filter(value)
  }

  private filterNode(value: string, data: TreeData) {
    if (!value) { return true }
    return data.label && data.label.indexOf(value) !== -1
  }
}
</script>
