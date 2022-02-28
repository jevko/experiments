const getFirstJevkoAtKey = (jevko, key) => {
  const {subjevkos} = jevko
  for (const {prefix, jevko} of subjevkos) {
    if (prefix.trim() === key) return jevko
  }
  throw Error(`key not found: ${key}`)
}

const getLastJevkoAtKey = (jevko, key) => {
  const {subjevkos} = jevko
  for (let i = subjevkos.length - 1; i >= 0; --i) {
    const {prefix, jevko} = subjevkos[i]
    if (prefix.trim() === key) return jevko
  }
  throw Error(`key not found: ${key}`)
}

const getJevkoAtIndex = (jevko, index) => {
  const {subjevkos} = jevko
  if (index >= subjevkos.length) throw Error(`index not found: ${index}`)
  return subjevkos[index]
}

const getSuffixAsString = (jevko) => {
  return jevko.suffix
}

const getSuffixAsNumber = (jevko) => {
  const trimmed = jevko.suffix.trim()
  if (trimmed === 'NaN') return NaN
  const num = Number(trimmed)
  if (Number.isNaN(num)) throw Error(`not a number: ${trimmed}`)
  return num
}

const getSuffixAsBoolean = (jevko) => {
  const trimmed = jevko.suffix.trim()
  if (trimmed === 'true') return true
  if (trimmed === 'false') return false
  throw Error(`not a boolean: ${trimmed}`)
}

const getSuffixAsNull = (jevko) => {
  const {suffix} = jevko
  if (suffix === '') return null
  const trimmed = suffix.trim()
  if (trimmed === 'null') return null
  throw Error(`not a null: ${trimmed}`)
}