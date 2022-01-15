export const astToXml = (ast) => {
  const {subvalues, suffix} = ast
  if (Array.isArray(subvalues) === false) throw Error('expected subvalues array')
  if (typeof suffix !== 'string') throw Error('expected string suffix')
  let ret = ''
  let openTag = ''
  for (let {prefix, value} of subvalues) {
    if (openTag === '') {
      const {tag, attrs} = astToTag(value)
      ret += prefix + '<' + attrs + '>'
      openTag = tag
    } else {
      if (prefix.trim() !== '') throw Error('expected blank prefix')
      ret += astToXml(value) + '</' + openTag + '>'
      openTag = '' 
    }
  }
  return ret + suffix
}

const astToTag = (ast) => {
  const {subvalues, suffix} = ast
  if (Array.isArray(subvalues) === false) throw Error('expected subvalues array')
  if (typeof suffix !== 'string') throw Error('expected string suffix')

  const trimmedSuffix = suffix.trim()
  const isSelfClosing = trimmedSuffix.endsWith('/')

  let tag = ''
  let attrs = ''
  if (subvalues.length === 0) {
    if (isSelfClosing) tag = trimmedSuffix.slice(0, -1).trim()
    else tag = trimmedSuffix
    // console.log(tag)
  } else {
    const {prefix, value} = subvalues[0]
    const trimmedPrefix = prefix.trim()
    if (trimmedPrefix === '') throw Error('expected nonempty prefix')
    // todo: consider other whitespace
    const spi = trimmedPrefix.indexOf(' ')
    tag = spi === -1? trimmedPrefix: trimmedPrefix.slice(0, spi)

    for (let {prefix, value} of subvalues) {
      attrs += prefix + '="' + astToAttrValue(value) + '"'
    }
  }
  attrs += suffix

  return {tag: isSelfClosing? '': tag, attrs}
}

const astToAttrValue = (ast) => {
  const {subvalues, suffix} = ast
  if (Array.isArray(subvalues) === false) throw Error('expected subvalues array')
  if (typeof suffix !== 'string') throw Error('expected string suffix')

  if (subvalues.length > 0) throw Error('expected 0 subvalues')

  return suffix.replaceAll('"', '&quot;')
}