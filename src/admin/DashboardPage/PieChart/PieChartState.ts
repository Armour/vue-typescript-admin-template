interface PieData {
  name?:string
  value?:string
}

export default interface PieChartState {
  title?:string
  datas?:PieData[]
}
