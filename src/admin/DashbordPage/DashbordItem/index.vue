<script lang="ts">
import Vue, { VNode } from 'vue'

// 将屏幕width分为8份，每份为一标准高宽，允许内部所有组件高宽只能是整数倍
export default Vue.extend({
  components: {},
  props: {
    state: {
      type: Object,
      default() {
        return {
          type: '',
          props: {},
          on: {},
          position: { x: 1, y: 1, w: 1, h: 1 }
        }
      }
    }
  },
  render(h): VNode {
    return h(this.state.type, {
      props: this.state.props,
      on: this.state.on,
      class: 'dashbord-item'
    })
  }
})
</script>

<style lang="scss" scoped>
.dashbord-item {
  position: relative;
}
</style>
