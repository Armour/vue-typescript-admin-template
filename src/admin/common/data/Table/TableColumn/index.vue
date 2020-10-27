<template>
  <el-table-column
    :type="state.type"
    :index="state.index"
    :label="state.label"
  />
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import TableColumnState from './TableColumnState'

@Component({
  name: 'FromPage',
  components: {
  }
})
export default class extends Vue {
  @Prop({ required: true }) state!:TableColumnState;
}
</script>
