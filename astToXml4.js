export const astToXml4 = (ast) => {
  const {subvalues, suffix} = ast
  
  let ret = ''
  for (const {prefix, value} of subvalues) {
    const tag = prefix.trim()
    ret += subsToAttrs(value, tag)
  }
  return ret + suffix
}

const subsToAttrs = (ast, tag) => {
  const {subvalues, suffix} = ast
  let i = 0
  let isSelfClosing = true
  let ret = `<${tag} `
  for (; i < subvalues.length; ++i) {
    const {prefix, value} = subvalues[i]
    const name = prefix.trim()
    if (name[0] === '/') {
      isSelfClosing = false
      break
    }
    ret += `${name}="${astToAttrValue(value)}" `
  }
  if (isSelfClosing === false) {
    ret += '>'
    const {prefix, value} = subvalues[i]
    ret += subsToAttrs(value, prefix.trim().slice(1).trim())
    ++i
    for (; i < subvalues.length; ++i) {
      const {prefix, value} = subvalues[i]
      ret += subsToAttrs(value, prefix.trim())
    }
    ret += suffix + `</${tag}>`
  } else {
    ret += suffix + '/>'
  }
  return ret
}
const astToAttrValue = (ast) => {
  const {subvalues, suffix} = ast
  if (subvalues.length > 0) throw Error('expected 0 subvalues')
  return suffix.replaceAll('"', '&quot;')
}