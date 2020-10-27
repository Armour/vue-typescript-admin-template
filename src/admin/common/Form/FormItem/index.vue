<template>
  <el-form-item class="form-item">
    <span
      v-if="state.label"
      slot="label"
    >{{ state.label }}</span>
    <component :is="item" />
  </el-form-item>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import FormItemState from './FormItemState'
import Button from '@/admin/common/Button/index.vue'

@Component({
  name: 'Form',
  components: {
    Button
  }
})
export default class extends Vue {
  @Prop({ required: true }) state!: FormItemState;
  // @Watch('state', { immediate: true, deep: true })
  // fresh() {
  //   this.item = this.getItem()
  //   this.$forceUpdate()
  // }

  // item?:object

  get item(): object {
    const state = this.state
    return {
      components: {
        Button
      },
      render: (h: Function) => {
        return h(state.type, {
          props: {
            value: state.value,
            state: state.state
          },
          on: {
            ...state.on,
            // click: () => {
            //   runAction(state.on.click)
            // },
            input: (value: any) => {
              state.value = value
            }
          }
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.form-item{
  text-align: center;
}
</style>
