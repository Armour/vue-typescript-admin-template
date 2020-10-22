<template>
  <div />
</template>

<script lang="ts">
import echarts, { EChartOption } from 'echarts'
import { Component, Prop, Watch } from 'vue-property-decorator'
import { mixins } from 'vue-class-component'
import ResizeMixin from '@/components/Charts/mixins/resize'
import LineChartState from './LineChartState'

@Component({
  name: 'LineChart'
})
export default class extends mixins(ResizeMixin) {
  @Prop({ required: true }) private state!: LineChartState;

  @Watch('state', { deep: true })
  private onChartDataChange(value: LineChartState) {
    this.setOptions(value)
  }

  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  }

  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  }

  private initChart() {
    this.chart = echarts.init(this.$el as HTMLDivElement, 'macarons')
    this.setOptions(this.state)
  }

  private setOptions(state: LineChartState) {
    if (this.chart) {
      const legendData:string[] = []
      const seriesData: object[] = []
      if (state.series !== null) {
        state.series?.forEach((serie) => {
          legendData.push(serie.name || '')
          seriesData.push({
            name: serie.name,
            itemStyle: {
              color: serie.color,
              lineStyle: {
                color: serie.color,
                width: 2
              }
            },
            smooth: true,
            type: 'line',
            data: serie.data,
            animationDuration: 2800,
            animationEasing: 'cubicInOut'
          })
        })
      }

      this.chart.setOption({
        xAxis: {
          data: state.xAxis,
          boundaryGap: false,
          axisTick: {
            show: false
          }
        },
        grid: {
          left: 10,
          right: 10,
          bottom: 20,
          top: 30,
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          },
          padding: 8
        },
        yAxis: {
          axisTick: {
            show: false
          }
        },
        legend: {
          data: legendData
        },
        series: seriesData
      } as EChartOption<EChartOption.SeriesLine>)
    }
  }
}
</script>
