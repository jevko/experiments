export const astToString = (ast) => {
  const {subvalues, suffix} = ast
  if (Array.isArray(subvalues) === false) throw Error('expected subvalues array')
  if (typeof suffix !== 'string') throw Error('expected string suffix')
  let ret = ''
  for (let {prefix, value} of subvalues) {
    ret += escape(prefix) + '[' + astToString(value) + ']'
  }
  return ret + escape(suffix)
}
const escape = (str) => {
  let ret = ''
  for (const c of str) {
    if (['[', ']', '`'].includes(c)) ret += '`'
    ret += c
  }
  return ret
}