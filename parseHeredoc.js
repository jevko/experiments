export const parseHeredoc = (str, {
  open = '[',
  close = ']',
  escape = '`',
  heredoc = '~',
} = {}) => {
  const parents = []
  let parent = {subvalues: []}, 
    buffer = [],
    chars = '',
    mode = 'normal', 
    delim = '', 
    line = '',
    lines = [];
  const flushChars = () => {
    if (chars !== '') {
      buffer.push({chars})
      chars = ''
    }
  }
  for (let i = 0; i < str.length; ++i) {
    const c = str[i]
    if (mode === 'escape') {
      if (c === escape || c === open || c === close) {
        flushChars()
        buffer.push({escape: c})
        mode = 'normal'
      } else if (c === heredoc) {
        mode = 'heredoc0'
      } else throw Error('Invalid escape!')
    } else if (mode === 'heredoc0') {
      if (c === '\n') mode = 'heredoc1'
      else delim += c
    } else if (mode === 'heredoc1') {
      if (c === '\n') {
        if (line === delim) {
          flushChars()
          buffer.push({lines, delimiter: delim})
          delim = ''
          line = ''
          lines = []
          mode = 'normal'
        } else {
          lines.push(line)
          line = ''
        }
      } else line += c
    } else if (c === escape) {mode = 'escape'}
    else if (c === open) {
      const value = {subvalues: []}
      flushChars()
      parent.subvalues.push({prefix: buffer, value})
      parents.push(parent)
      parent = value
      buffer = []
    } else if (c === close) {
      flushChars()
      parent.suffix = buffer
      buffer = []
      if (parents.length < 1) throw Error('Unexpected close!')
      parent = parents.pop()
    } else {chars += c}
  }
  if (mode !== 'normal' || parents.length > 0) throw Error('Unexpected end!')
  flushChars()
  parent.suffix = buffer
  parent.open = open
  parent.close = close
  parent.escape = escape
  parent.heredoc = heredoc
  return parent
}