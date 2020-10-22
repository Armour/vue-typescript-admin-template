interface LineData {
  name?: string

  data?: number[]

  color?: string
}

export default interface LineChartState {

  xAxis?: string[]

  series?: LineData[]

}

// const state = {
//   x_axis: ['a', 'b'],
//   datas: [
//     { name: '', data: [], color: '' },
//     { name: '', data: [], color: '' }
//   ]
// }
