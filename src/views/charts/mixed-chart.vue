<template>
  <div class="chart-container">
    <mixed-chart
      height="100%"
      width="100%"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import MixedChart from '@/components/Charts/MixedChart.vue'

@Component({
  components: {
    MixedChart
  }
})
export default class MixedChartDemo extends Vue {}
</script>

<style lang="scss" scoped>
.chart-container {
  position: relative;
  width: 100%;
  height: calc(100vh - 84px);
}
</style>
