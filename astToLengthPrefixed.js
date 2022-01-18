import { Buffer } from 'buffer';

export const astToLengthPrefixed = (ast) => {
  const {subvalues, suffix} = ast
  let ret = `${subvalues.length}:`

  for (const {prefix, value} of subvalues) {    
    const buf = Buffer.from(prefix, 'utf8')
    ret += `${buf.length}:${prefix}${astToLengthPrefixed(value)}`
  }

  const buf = Buffer.from(suffix, 'utf8')
  ret += `${buf.length}:${suffix}`

  return ret
}
