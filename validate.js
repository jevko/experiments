/**
 * Checks whether `str` conforms to the Jevko grammar:
 * 
 * ```abnf
 * Jevko = *(
 *   "[" Jevko "]" /
 *   "`" ("`" / "[" / "]") /
 *   %x0-5a / %x5c / %x5e-5f /
 *   %x61-10ffff
 * )
 * ```
 */
const validateJevko = (str) => {
  let level = 0, isEscaped = false, line = 1, column = 1

  for (let index = 0; index < str.length; ++index) {
    const character = str[index]

    if (character === '\n') {
      ++line
      column = 1
    } 
    else ++column

    if (isEscaped) {
      if (character === '`' || character === '[' || character === ']') isEscaped = false
      else return {valid: false, index, line, column, character, reason: 'invalid escape'}
    } 
    else if (character === ']') {
      if (level === 0) return {valid: false, index, line, column, reason: 'unexpected ]'}
      --level
    } 
    else if (character === '[') ++level
    else if (character === '`') isEscaped = true
  }

  if (isEscaped) return {valid: false, reason: 'Unexpected end after `'}
  if (level > 0) return {valid: false, reason: `Unexpected end: missing ${level} ]`}

  return {valid: true}
}
