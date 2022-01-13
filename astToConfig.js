export const astToConfig = (ast) => {
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
    ret.push(astToConfig(item.value))
  }
  return ret
}
const astToObject = (ast) => {
  const {subvalues, suffix} = ast
  if (suffix.trim() !== '') throw Error('expected empty suffix')
  const ret = {}
  for (const item of subvalues) {
    const trimmed = item.prefix.trim()
    if (trimmed === '') throw Error('expected nonempty key')

    if (trimmed.startsWith('-')) continue

    const i = trimmed.indexOf('\n')
    const key = i === -1? trimmed: trimmed.slice(0, i).trim()

    ret[key] = astToConfig(item.value)
  }
  return ret
}