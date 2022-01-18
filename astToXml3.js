export const astToXml3 = (ast) => {
  const {subvalues, suffix} = ast
  
  let ret = ''
  for (const {prefix, value} of subvalues) {
    const tag = prefix.trim()
    if (tag === '') astToXml3(value)
    else ret += `<${tag}>${astToXml3(value)}</${tag}>`
  }
  return ret + suffix
}