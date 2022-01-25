export const astToJs2 = (ast) => {
  const {subvalues, suffix} = ast
  if (Array.isArray(subvalues) === false) throw Error('expected subvalues array')
  if (typeof suffix !== 'string') throw Error('expected string suffix')
  if (subvalues.length === 0) return suffixToJs(suffix)
  const {prefix} = subvalues[0]
  if (prefix.startsWith(',')) return astToArray(ast)
  if (prefix.startsWith(':')) return astToObject(ast)
  throw Error(`unrecognized type: ${prefix}`)
}
const suffixToJs = (suffix) => {
  if (suffix === ':') return {}
  if (suffix === ',') return []
  if (suffix === 't') return true
  if (suffix === 'f') return false
  if (suffix === 'n') return null
  if (suffix === 'u') return undefined
  const num = +suffix
  if (Number.isNaN(num) === false) return num
  if (suffix.startsWith("'")) return suffix.slice(1)
  throw Error(`unrecognized type: ${suffix}`)
}
const astToArray = (ast) => {
  const {subvalues, suffix} = ast
  if (suffix.trim() !== '') throw Error('expected empty suffix')
  const ret = []
  const {prefix, value} = subvalues[0]
  if (prefix.slice(1).trim() !== '') throw Error('expected empty padding')
  ret.push(astToJs2(value))
  for (const item of subvalues.slice(1)) {
    if (item.prefix.trim() !== '') throw Error('expected empty padding')
    ret.push(astToJs2(item.value))
  }
  return ret
}
const astToObject = (ast) => {
  const {subvalues, suffix} = ast
  if (suffix.trim() !== '') throw Error('expected empty suffix')
  const ret = {}
  const {prefix, value} = subvalues[0]
  const key = prefix.slice(1).trim()
  if (key === '') throw Error('expected nonempty key')
  ret[key] = astToJs2(value)
  for (const item of subvalues.slice(1)) {
    const key = item.prefix.trim()
    if (key === '') throw Error('expected nonempty key')
    ret[key] = astToJs2(item.value)
  }
  return ret
}