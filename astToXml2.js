export const astToXml2 = (ast) => {
  const {subvalues, suffix} = ast
  return getContent(subvalues, 0) + suffix
}

const getContent = (subvalues, startIndex) => {
  let content = ''
  for (let i = startIndex; i < subvalues.length; ++i) {
    const {prefix, value} = subvalues[i]
    content += prefix + astToElem(value)
  }
  return content
}

const astToElem = (ast) => {
  const {subvalues, suffix} = ast

  let tag = ''
  let attrs = ''
  let content = ''
  let hasContent = false

  if (subvalues.length === 0) {
    const {pretext, text} = getText(suffix)
    const {tag: t, posttag} = getTag(pretext)

    tag = t
    attrs = posttag

    if (text !== undefined) {
      content = text
      hasContent = true
    }
  } else {
    const {prefix, value} = subvalues[0]
    
    const {pretext, text} = getText(prefix)
    const {tag: t, posttag} = getTag(pretext)

    tag = t
    attrs = posttag

    if (text !== undefined) {
      content = text + astToElem(value) + getContent(subvalues, 1)
      hasContent = true
    } else {
      attrs += `="${astToAttrValue(value)}"`
      for (let i = 1; i < subvalues.length; ++i) {
        const {prefix, value} = subvalues[i]

        const {pretext, text} = getText(prefix)

        attrs += pretext

        if (text !== undefined) {
          content = text + astToElem(value) + getContent(subvalues, i + 1)
          hasContent = true
          break
        } else {
          attrs += `="${astToAttrValue(value)}"`
        }
      }
    }

    if (hasContent) {
      content += suffix
    } else {
      const {pretext: attr, text} = getText(suffix)
      attrs += attr
      
      if (text !== undefined) {
        content += text
        hasContent = true
      }
    }
  }

  if (hasContent) return `<${tag}${attrs}>${content}</${tag}>`
  return `<${tag}${attrs}/>`
}

const getText = (str) => {
  const i = str.indexOf('/')

  if (i === -1) return {pretext: str}
  return {pretext: str.slice(0, i), text: str.slice(i + 1)}
}

const getTag = (str) => {
  if (str.length === 0) throw Error('tag cannot be empty')
  const c = str.charAt(0)
  if (isWhitespace(c)) throw Error('tag must start nonblank')

  let index = -1
  for (let i = 0; i < str.length; ++i) {
    const c = str[i]
    if (isWhitespace(c)) {
      index = i
      break
    }
  }
  // const index = str.findIndex(isWhitespace)

  if (index === -1) return {tag: str, posttag: ''}

  const tag = str.slice(0, index)
  const posttag = str.slice(index)

  return {tag, posttag}
}

const isWhitespace = (c) => {
  return ' \n\r\t'.includes(c)
}

const astToAttrValue = (ast) => {
  const {subvalues, suffix} = ast
  if (Array.isArray(subvalues) === false) throw Error('expected subvalues array')
  if (typeof suffix !== 'string') throw Error('expected string suffix')

  if (subvalues.length > 0) {
    console.log(subvalues)
    throw Error('expected 0 subvalues')
  }

  return suffix.replaceAll('"', '&quot;')
}


