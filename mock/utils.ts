export const param2Obj = (url: string) => {
  const search = url.split('?')[1]

  if (!search) {
    return {}
  }

  return JSON.parse(
    '{"' +
    decodeURIComponent(search)
      .replace(/"/g, '\\"')
      .replace(/&/g, '","')
      .replace(/=/g, '":"') +
    '"}'
  )
}
