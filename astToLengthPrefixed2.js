import { Buffer } from 'buffer';

export const astToLengthPrefixed2 = (ast) => {
  const {subvalues, suffix} = ast

  let ret = ''

  for (const {prefix, value} of subvalues) {
    const buf = Buffer.from(prefix, 'utf8')
    ret += `${buf.length}:${prefix}[${astToLengthPrefixed2(value)}]`
  }

  const buf = Buffer.from(suffix, 'utf8')
  ret += `${buf.length}:${suffix}`

  return ret
}
