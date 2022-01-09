export const encode = (value) => {
  if (typeof value === 'boolean') return value.toString()
  if (value === null) return 'null'
  if (value === undefined) return 'undefined'
  if (typeof value === 'number') return value.toString()
  if (typeof value === 'bigint') return value.toString() + 'n'
  if (typeof value === 'string') {
    // if (['true', 'false', 'null', 'undefined'].includes(value)) throw Error('bad string')
    return escape(value)
  }
  if (Array.isArray(value)) return encodeArray(value)
  if (typeof value === 'object') return encodeObject(value)
  // function or symbol
  throw Error('bad type: ' + typeof value)
}
const encodeArray = (arr) => {
  let ret = ''
  for (const item of arr) {
    ret += '[' + encode(item) + ']'
  }
  return ret
}
const encodeObject = (obj) => {
  let ret = ''
  for (const [key, value] of Object.entries(obj)) {
    ret += escape(key) + '[' + encode(value) + ']'
  }
  return ret
}

const escape = (str) => {
  let ret = ''
  for (const c of str) {
    if (['[', ']', '`'].includes(c)) ret += '`'
    ret += c
  }
  return ret
}