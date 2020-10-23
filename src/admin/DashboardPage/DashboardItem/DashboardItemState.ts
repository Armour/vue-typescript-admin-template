interface Position {
  x?:number
  y?:number
  w?:number
  h?:number
  i?:number
}

export default interface DashboardItemState {
  type?:string
  position?:Position
  state?:any
}
