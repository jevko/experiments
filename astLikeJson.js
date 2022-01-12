export const astLikeJson = (ast) => {
  const {subvalues, suffix} = ast
  if (Array.isArray(subvalues) === false) throw Error('expected subvalues array')
  if (typeof suffix !== 'string') throw Error('expected string suffix')
  if (subvalues.length === 0) return suffixToJs(suffix)
  const {prefix} = subvalues[0]
  const trimmed = prefix.trim()
  if (trimmed.startsWith('{')) return astToObject(ast)
  if (trimmed.startsWith('[')) return astToArray(ast)
  throw Error(`unrecognized prefix: ${prefix}`)
}
const suffixToJs = (suffix) => {
  if (suffix === 'true') return true
  if (suffix === 'false') return false
  if (suffix === 'null') return null
  if (suffix === '{}') return {}
  if (suffix === '[]') return []
  if (suffix.startsWith('"')) return suffix.slice(1)
  const num = +suffix
  if (Number.isNaN(num) === false) return num
  throw Error(`unrecognized suffix: ${suffix}`)
}
const astToArray = (ast) => {
  const {subvalues, suffix} = ast
  if (suffix.trim() !== ']') throw Error('expected ] suffix')
  const ret = []
  for (const item of subvalues) {
    ret.push(astLikeJson(item.value))
  }
  return ret
}
const astToObject = (ast) => {
  const {subvalues, suffix} = ast
  if (suffix.trim() !== '}') throw Error('expected } suffix')
  if (subvalues.length % 2 !== 0) throw Error('expected even number of subvalues')
  const ret = {}
  for (let i = 0; i < subvalues.length; i += 2) {
    const keyp = subvalues[i].value
    const valp = subvalues[i+1].value
    if (keyp.subvalues.length > 0) throw Error('expected empty subvalues for key')
    const key = keyp.suffix
    ret[key] = astLikeJson(valp)
  }
  return ret
}