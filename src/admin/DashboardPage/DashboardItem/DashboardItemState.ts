interface Position {
  x?:number
  y?:number
  w?:number
  h?:number
}

export default interface DashboardItemState {
  type?:string
  position?:Position
  props?:object
  on?:object
}
