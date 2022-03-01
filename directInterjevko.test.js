import {getFirstJevkoAtKey, getJevkoAtIndex, getLastJevkoAtKey, getSuffixAsBoolean, getSuffixAsNull, getSuffixAsNumber, getSuffixAsString} from './directInterjevko.js'

import {parseJevko} from 'https://cdn.jsdelivr.net/gh/jevko/parsejevko.js@v0.1.3/mod.js'

const {test} = Deno

const jevko = parseJevko(`
alpha [0]
alpha [1]
beta [[0][1][2][3]]
boolean [true]
null []
number [33.2]
string [hello]
`)

const assert = (cond, reason = '') => {
  if (cond === false) {
    throw Error(`Assertion failed: ${reason}`)
  }
}

test('all', () => {
  assert(getSuffixAsString(getFirstJevkoAtKey(jevko, 'alpha')) === '0')
  assert(getSuffixAsString(getLastJevkoAtKey(jevko, 'alpha')) === '1')
  assert(getSuffixAsString(getJevkoAtIndex(getLastJevkoAtKey(jevko, 'beta'), 2)) === '2')
  assert(getSuffixAsBoolean(getLastJevkoAtKey(jevko, 'boolean')) === true)
  assert(getSuffixAsNull(getLastJevkoAtKey(jevko, 'null')) === null)
  assert(getSuffixAsNumber(getLastJevkoAtKey(jevko, 'number')) === 33.2)
  assert(getSuffixAsString(getLastJevkoAtKey(jevko, 'string')) === 'hello')
})
