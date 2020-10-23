<template>
  <component :is="item" />
</template>
<script lang="ts">
import DashboardItemState from '@/admin/DashboardPage/DashboardItem/DashboardItemState'
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { VNode } from 'vue/types/umd'
import CardPanel from '../CardPanel/index.vue'
import LineChart from '../LineChart/index.vue'
import PieChart from '../PieChart/index.vue'

@Component({
  name: 'DashboardItem',
  components: {
    CardPanel,
    LineChart,
    PieChart
  }
})
export default class extends Vue {
  @Prop({ required: true }) state!:DashboardItemState;

  @Watch('state', { immediate: true, deep: true })
  fresh() {
    this.item = this.getItem()
    console.log('fresh', this.item)
    this.$forceUpdate()
  }

  item?:object

  getItem():object {
    return {
      components: {
        CardPanel,
        LineChart,
        PieChart
      },
      render: (h:Function) => {
        return h(
          this.state.type,
          {
            class: 'full',
            props: {
              state: this.state.state
            }
          }
        )
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.full{
  width: 100%;
  height: 100%;
  background-color: white;
}
</style>
