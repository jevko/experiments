export const astToXml3 = (ast) => {
  const {subvalues, suffix} = ast
  
  let ret = ''
  for (const {prefix, value} of subvalues) {
    const [pre, tag, post] = trim(prefix)
    if (tag === '') ret += astToXml3(value)
    else ret += `${pre}<${tag}>${astToXml3(value)}</${tag}>`
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