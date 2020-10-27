<template>
  <el-table>
    <TableColumns :state="state.columns" />
  </el-table>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import TableState from './TableState'

@Component({
  name: 'FromPage',
  components: {
  }
})
export default class extends Vue {
  @Prop({ required: true }) state!:TableState;
}
</script>
