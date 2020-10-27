<template>
  <el-form>
    <div
      v-for="item in state.items"
      :key="state.items.indexOf(item)"
      class="row"
    >
      <div
        v-for="it in item"
        :key="item.indexOf(it)"
        class="col"
      >
        <form-item :state="it" />
      </div>
    </div>
  </el-form>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import FormState from './FormState'
import FormItem from './FormItem/index.vue'

@Component({
  name: 'Form',
  components: {
    FormItem
  }
})
export default class extends Vue {
  @Prop({ required: true }) state!:FormState;
}
</script>

<style lang="scss" scoped>
.row {
  display: flex;
}
.col {
  margin: 12px;
  flex: auto;
}
</style>
