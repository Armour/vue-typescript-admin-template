<template>
  <TableColumn :state="state">
    <template v-if="state.children">
      <TableColumns
        v-for="child in state.children"
        :key="state.indexOf(child)"
        :state="child"
      />
    </template>
  </tablecolumn>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import TableColumn from './TableColumn/index.vue'
import TableColumnState from './TableColumn/TableColumnState'

@Component({
  name: 'TableColumns',
  components: {
    TableColumn
  }
})
export default class extends Vue {
  @Prop({ required: true }) state!:TableColumnState;
}
</script>
