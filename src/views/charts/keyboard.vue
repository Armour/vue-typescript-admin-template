<template>
  <div class="chart-container">
    <chart
      height="100%"
      width="100%"
    />
  </div>
</template>

<script lang="ts">
import Chart from '@/components/Charts/Keyboard.vue'
import { Vue, Component } from 'vue-property-decorator'

@Component({
  components: {
    Chart
  }
})
export default class KeyboardChart extends Vue {
}
</script>

<style lang="scss" scoped>
.chart-container {
  position: relative;
  width: 100%;
  height: calc(100vh - 84px);
}
</style>
