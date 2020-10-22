<script lang="ts">
import DashboardItemState from '@/admin/DashboardPage/DashboardItem/DashboardItemState'
import { Component, Prop, Vue } from 'vue-property-decorator'
import { VNode } from 'vue/types/umd'
import CardPanel from '../CardPanel/index.vue'

@Component({
  name: 'DashboardItem',
  components: {
    CardPanel
  }
})
export default class extends Vue {
  @Prop({ required: true }) state!:DashboardItemState;

  render(h:Function):VNode {
    return h(
      'CardPanel',
      {
        class: 'div',
        props: {
          state: {
            color: '#ff0000',
            icon: 'peoples',
            number: 3498719,
            title: 'xxx总数'
          }
        }
      }
    )
  }
}
</script>

<style lang="scss" scoped>
.div{
  width: 100%;
  height: 100%;
}
</style>
