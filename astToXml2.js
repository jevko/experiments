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

  let precontent = ''
  let content = undefined

  for (let i = 0; i < subvalues.length; ++i) {
    const {prefix, value} = subvalues[i]
    const {pretext, text} = getText(prefix)

    precontent += pretext

    if (text === undefined) {
      precontent += `="${astToAttrValue(value)}"`
    } else {
      content = text + astToElem(value) + getContent(subvalues, i + 1) + suffix
      break
    }
  }

  if (content === undefined) {
    const {pretext, text} = getText(suffix)
    precontent += pretext

    if (text === undefined) {
      // ?xml
      if (precontent[0] === '?') return `<${precontent}?>`
      // !doctype
      if (precontent[0] === '!') return `<${precontent}>`
      return `<${precontent}/>`
    }
    else content = text
  }

  const {tag, posttag} = getTag(precontent)
  return `<${tag}${posttag}>${content}</${tag}>`
}
const getText = (str) => {
  const i = str.indexOf('/')

  if (i === -1) return {pretext: str}
  return {pretext: str.slice(0, i), text: str.slice(i + 1)}
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
const getTag = (str) => {
  if (str.length === 0) throw Error('tag cannot be empty')
  const c = str[0]
  if (isWhitespace(c)) throw Error('tag must start nonblank')

  let index = -1
  for (let i = 0; i < str.length; ++i) {
    const c = str[i]
    if (isWhitespace(c)) {
      index = i
      break
    }
  }

  if (index === -1) return {tag: str, posttag: ''}

  const tag = str.slice(0, index)
  const posttag = str.slice(index)

  return {tag, posttag}
}
const isWhitespace = (c) => {
  return ' \n\r\t'.includes(c)
}
