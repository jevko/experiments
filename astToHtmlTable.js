export const astToHtmlTable = (ast) => {
  return `<table>${rows(ast)}</table>`
}
const rows = (ast) => {
  const {subvalues, suffix} = ast
  
  let ret = ''
  for (const {prefix, value} of subvalues) {
    const [pre, tag, post] = trim(prefix)
    if (tag === '') ret += `${pre}<tr>${cells(value, 'td')}</tr>`
    else if (tag === '#') ret += `${pre}<tr>${cells(value, 'th')}</tr>`
    else throw Error('oops')
  }

  return ret + suffix
}
const cells = (ast, tag) => {
  const {subvalues, suffix} = ast
  
  let ret = ''
  for (const {prefix, value} of subvalues) {
    const [pre, mid, post] = trim(prefix)
    if (mid === '') ret += `${pre}<${tag}>${astToHtml(value)}</${tag}>`
    else throw Error('oops')
  }

  return ret + suffix
}
export const astToHtml = (ast) => {
  const {subvalues, suffix} = ast
  
  let ret = ''
  for (const {prefix, value} of subvalues) {
    const [pre, tag, post] = trim(prefix)
    if (tag === '') ret += astToHtml(value)
    else ret += `${pre}<${tag}>${astToHtml(value)}</${tag}>`
  }
  return ret + suffix
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
