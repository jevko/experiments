import { Buffer } from 'buffer';

export const astToLengthPrefixed3 = (ast) => {
  const {subvalues, suffix} = ast

  let ret = ''

  for (const {prefix, value} of subvalues) {
    const buf = Buffer.from(prefix, 'utf8')
    const {length} = buf
    ret += `${length > 0? `${length}[${prefix}`: '['}${astToLengthPrefixed3(value)}`
  }

  const buf = Buffer.from(suffix, 'utf8')
  const {length} = buf
  ret += `${length > 0? `${length}]${suffix}`: ']'}`

  return ret
}
