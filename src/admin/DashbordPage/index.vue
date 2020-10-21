<template>
  <div class="dashbord">
    <DashbordItem
      v-for="item in state.items"
      :key="state.items.indexOf(item)"
      :state="item"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import DashbordItem from './DashbordItem/index.vue'

// 将屏幕width分为8份，每份为一标准高宽，允许内部所有组件高宽只能是整数倍
export default Vue.extend({
  components: {
    DashbordItem
  },
  props: {
    state: {
      type: Array,
      default() {
        return {
          items: [{ type: '', props: {}, position: { x: 1, y: 1, w: 1, h: 1 } }]
        }
      }
    }
  }
})
</script>

<style lang="scss" scoped>
.dashbord {
  position: relative;
  display: flex;
}
</style>
