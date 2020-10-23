<template>
  <div>
    <DashboardPage :state="state" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import DashboardPage from '@/admin/DashboardPage/index.vue'

export default Vue.extend({
  components: {
    DashboardPage
  },
  data() {
    return {
      state: {
        items: [
          {
            position: { x: 0, y: 0, w: 4, h: 4 },
            type: 'PieChart',
            state: {
              title: '这是一个饼图',
              datas: [
                { value: 100, name: '小明' },
                { value: 200, name: '花花' },
                { value: 300, name: 'JJ' }
              ]
            }
          },
          {
            position: { x: 2, y: 0, w: 2, h: 4 },
            type: 'LineChart',
            state: {
              xAxis: ['1', '2', '3', '4', '5', '6', '7'],
              series: [
                { name: 'jone', data: [3, 6, 7, 5, 9, 2, 1] },
                { name: 'mike', data: [4, 2, 4, 1, 3, 4, 5] }
              ]
            }
          }
          // { position: { x: 4, y: 0, w: 4, h: 4 } }
        ]
      }
    }
  }
})
</script>
