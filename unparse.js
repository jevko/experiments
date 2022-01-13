export const unparse = (ast) => {
  const {subvalues, suffix, open, close, escape} = ast
  if (Array.isArray(subvalues) === false) throw Error('expected subvalues array')
  if (typeof suffix !== 'string') throw Error('expected string suffix')
  if (typeof open !== 'string') throw Error('expected string open')
  if (typeof close !== 'string') throw Error('expected string close')
  if (typeof escape !== 'string') throw Error('expected string escape')

  const openCloseEscape = [open, close, escape]
  return recur(ast, {open, close, escape, openCloseEscape})
}
const recur = (ast, opts) => {
  const {subvalues, suffix} = ast
  if (Array.isArray(subvalues) === false) throw Error('expected subvalues array')
  if (typeof suffix !== 'string') throw Error('expected string suffix')
  const {open, close} = opts
  let ret = ''
  for (let {prefix, value} of subvalues) {
    ret += escape(prefix, opts) + open + recur(value, opts) + close
  }
  return ret + escape(suffix, opts)
}
const escape = (str, opts) => {
  let ret = ''
  const {openCloseEscape, escape} = opts
  for (const c of str) {
    if (openCloseEscape.includes(c)) ret += escape
    ret += c
  }
  return ret
}