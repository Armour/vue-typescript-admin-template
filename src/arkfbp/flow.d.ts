// export interface Flow {
//   name: string
//   type: string
//   request: string|Map<string, string>
//   url: string
//   method: string
//   clientConfig: Map<string, string>
// }

export interface FlowInput {
  url?: string
  method?: string
  params?: Map<string, string>
  client?: Map<string, string>
  clientServer?: Map<string, string>
}
