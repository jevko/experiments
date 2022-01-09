export const astToJs = (ast) => {
  const {subvalues, suffix} = ast
  if (Array.isArray(subvalues) === false) throw Error('expected subvalues array')
  if (typeof suffix !== 'string') throw Error('expected string suffix')
  if (subvalues.length === 0) return suffixToJs(suffix)
  const first = subvalues[0]
  const key = first.prefix.trim()
  if (key === '') return astToArray(ast)
  return astToObject(ast)
}
const suffixToJs = (suffix) => {
  if (suffix === 'true') return true
  if (suffix === 'false') return false
  if (suffix === 'null') return null
  if (suffix === 'undefined') return undefined
  const num = +suffix
  if (Number.isNaN(num) === false) return num
  return suffix
}
const astToArray = (ast) => {
  const {subvalues, suffix} = ast
  if (suffix.trim() !== '') throw Error('expected empty suffix')
  const ret = []
  for (const item of subvalues) {
    if (item.prefix.trim() !== '') throw Error('expected empty padding')
    ret.push(astToJs(item.value))
  }
  return ret
}
const astToObject = (ast) => {
  const {subvalues, suffix} = ast
  if (suffix.trim() !== '') throw Error('expected empty suffix')
  const ret = {}
  for (const item of subvalues) {
    const key = item.prefix.trim()
    if (key === '') throw Error('expected nonempty key')
    ret[key] = astToJs(item.value)
  }
  return ret
}