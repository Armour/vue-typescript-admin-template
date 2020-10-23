<template>
  <div class="background">
    <grid-layout
      :layout.sync="layout"
      :col-num="8"
      :is-draggable="true"
      :is-resizable="true"
      :is-mirrored="false"
      :responsive="true"
      :vertical-compact="true"
      :margin="[32, 32]"
      :use-css-transforms="true"
    >
      <grid-item
        v-for="item in layout"
        :key="item.i"
        :x="item.x"
        :y="item.y"
        :w="item.w"
        :h="item.h"
        :i="item.i"
        @resized="resizedHandler"
      >
        <DashboardItem :state="state.items[item.i]" />
      </grid-item>
    </grid-layout>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import DashboardItem from './DashboardItem/index.vue'
import DashboardPageState from './DashboardPageState'
import VueGridLayout from 'vue-grid-layout'

// 将屏幕width分为8份，每份为一标准高宽，允许内部所有组件高宽只能是整数倍
@Component({
  name: 'DashboardPage',
  components: {
    DashboardItem,
    GridLayout: VueGridLayout.GridLayout,
    GridItem: VueGridLayout.GridItem
  }
})
export default class extends Vue {
  @Prop({ required: true }) state!:DashboardPageState;

  private layout?:any[] = [];// 必须有初始值

  @Watch('state', { immediate: true })
  freshLayout() {
    if (this.state.items == null) { return }

    this.layout?.splice(0, this.layout.length)
    for (let i = 0; i < this.state.items.length; i++) {
      const item = this.state.items[i]
      if (item.position) { item.position.i = i }
      this.layout?.push(item.position)
    }
    console.log('freshLayout', this.layout)
  }

  resizedHandler(i:number, newH:number, newW:number) {
    if (this.state.items) {
      const item = this.state.items[i]
      if (item.position) {
        item.position.h = newH
        item.position.w = newW
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.background{
  background-color: rgb(240, 242, 245);
  min-height: 100%;
}
</style>
