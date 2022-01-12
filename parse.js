export const parse = (str, {
  open = '[',
  close = ']',
  escape = '`'
} = {}) => {
  const parents = []
  let parent = {subvalues: []}, buffer = '', isEscaped = false
  for (let i = 0; i < str.length; ++i) {
    const c = str[i]
    if (isEscaped) {
      if (c === escape || c === open || c === close) {
        buffer += c
        isEscaped = false
      } else throw Error('Invalid escape!')
    } else if (c === escape) {isEscaped = true}
    else if (c === open) {
      const value = {subvalues: []}
      parent.subvalues.push({prefix: buffer, value})
      parents.push(parent)
      parent = value
      buffer = ''
    } else if (c === close) {
      parent.suffix = buffer
      buffer = ''
      if (parents.length < 1) throw Error('Unexpected close!')
      parent = parents.pop()
    } else {buffer += c}
  }
  if (isEscaped || parents.length > 0) throw Error('Unexpected end!')
  parent.suffix = buffer
  parent.open = open
  parent.close = close
  parent.escape = escape
  return parent
}