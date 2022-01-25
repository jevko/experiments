import { Buffer } from 'buffer';

const digits = [...'0123456789'].map(c => c.charCodeAt(0))
const colon = ':'.charCodeAt(0)

export const parseLengthPrefixed2 = (str1, {
  open = '['.charCodeAt(0),
  close = ']'.charCodeAt(0),
} = {}) => {
  const parents = []
  let parent = {subvalues: []}, buffer = [], affix = []
  const str = Buffer.from(str1, 'utf8')
  for (let i = 0; i < str.length; ++i) {
    const c = str[i]

    if (digits.includes(c)) buffer.push(c)
    else if (c === colon) {
      const length = +String.fromCharCode(...buffer)
      buffer = []
      ++i
      affix = str.slice(i, i + length)
      console.log(affix.toString('utf8'))
      i += length - 1
    } else {
      if (buffer.length > 0) throw Error('expected :')
      if (c === open) {
        const value = {subvalues: []}
        parent.subvalues.push({prefix: affix, value})
        parents.push(parent)
        parent = value
      } else if (c === close) {
        parent.suffix = affix
        if (parents.length < 1) throw Error('Unexpected close!')
        parent = parents.pop()
      } else throw Error(`unexpected character ${String.fromCharCode(c)}`)
    } 
  }
  if (buffer.length > 0 || parents.length > 0) throw Error('Unexpected end!')
  parent.suffix = affix
  parent.open = open
  parent.close = close
  return parent
}