export const astToXml6 = (ast) => {
  return recur('', '', ast)
}
const recur = (Pre, Tag, ast) => {
  const {subvalues, suffix} = ast
  let attrs = '', content = ''

  if (subvalues.length > 0) {
    const {prefix, value} = subvalues[0]
    const [pre, tag, post] = trim(prefix)
    if (tag === '') attrs = ' ' + astToAttrs(value)
    else content += recur(pre, tag, value)

    for (let i = 1; i < subvalues.length; ++i) {
      const {prefix, value} = subvalues[i]
      const [pre, tag, post] = trim(prefix)
      content += recur(pre, tag, value)
    }

  }
  content += suffix
  if (Tag === '') return content
  return `${Pre}<${Tag}${attrs}>${content}</${Tag}>`
}
const astToAttrs = (ast) => {
  const {subvalues, suffix} = ast
  let ret = ''
  for (const {prefix, value} of subvalues) {
    ret += prefix + `="${astToAttrValue(value)}"`
  }
  return ret + suffix
}
const astToAttrValue = (ast) => {
  const {subvalues, suffix} = ast
  if (subvalues.length > 0) throw Error('expected 0 subvalues')
  return suffix.replaceAll('"', '&quot;')
}
const trim = (prefix) => {
  let i = 0, j = 0
  for (; i < prefix.length; ++i) {
    if (isWhitespace(prefix[i]) === false) break
  }
  for (j = i; j < prefix.length; ++j) {
    if (isWhitespace(prefix[j])) break
  }
  return [prefix.slice(0, i), prefix.slice(i, j), prefix.slice(j)]
}
const isWhitespace = (c) => {
  return ' \n\r\t'.includes(c)
}