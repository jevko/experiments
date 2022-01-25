const parseLengthPrefixed = (str) => {
  const parents = []
  let parent = {subvalues: []}, buffer = '', mode = 'SubvalueCount', subvalueCounts = [], subvalueCount = 0, affixLength = 0
  for (let i = 0; i < str.length; ++i) {
    const c = str[i]
    if (mode === 'SubvalueCount') {
      if (c === ':') {
        if (subvalueCount > 0) subvalueCounts.push(subvalueCount)
        subvalueCount = +buffer
        buffer = ''
        if (subvalueCount > 0) mode = 'PrefixLength'
        else mode = 'SuffixLength'
      } else if ('0123456789'.includes(c)) buffer += c
      else throw Error('expected number')
    } else if (mode === 'PrefixLength') {
      if (c === ':') {
        affixLength = +buffer
        buffer = ''
        if (affixLength > 0) mode = 'Prefix'
        else {
          mode = 'SubvalueCount'
        }
      } else if ('0123456789'.includes(c)) buffer += c
      else throw Error('expected number')
    } else if (mode === 'Prefix') {
      buffer += c
      --affixLength
      if (affixLength === 0) {
        const value = {subvalues: []}
        parent.subvalues.push({prefix: buffer, value})
        parents.push(parent)
        parent = value
        buffer = ''

        mode = 'SubvalueCount'
      }
    } else if (mode === 'SuffixLength') {
      if (c === ':') {
        affixLength = +buffer
        buffer = ''
        if (affixLength > 0) mode = 'Suffix'
        else mode = 'PrefixLength' // or SL if last subvalue
      } else if ('0123456789'.includes(c)) buffer += c
      else throw Error('expected number')
    } else if (mode === 'Suffix') {
      buffer += c
      --affixLength
      if (affixLength === 0) {
        parent.suffix = buffer
        buffer = ''
        if (parents.length < 1) throw Error('Unexpected close!')
        parent = parents.pop()

        --subvalueCount

        if (subvalueCount === 0) mode = 'SuffixLength'
        else mode = 'PrefixLength'
      }
    }


    if (c === open) {
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
  if (mode !== 'END' || parents.length > 0) throw Error('Unexpected end!')
  parent.suffix = buffer
  return parent
}