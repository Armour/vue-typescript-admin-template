const req = require.context('../../icons/svg', false, /\.svg$/)
const re = /\.\/(.*)\.svg/
const requireAll = (requireContext: any) => requireContext.keys()

const icons = requireAll(req).map((str: string) => {
  const match = str.match(re)
  if (match !== null) return match[1]
  return null
})

export default icons
