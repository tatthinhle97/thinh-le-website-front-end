/* Merge strings ignoring null and undefined elements */
import {useCallback} from 'react'

const merge = (_strings, _separator = ' ') => {
  if (!_strings) {
    return ''
  }

  let result = _strings[0] ? _strings[0] : ''
  for (let index = 1; index < _strings.length; index++) {
    if (_strings[index]) {
      if (result.length > 0) {
        result += _separator + _strings[index]
      } else {
        result += _strings[index]
      }
    }
  }

  return result
}

const isSubStringOf = function (_stringToCheck, _string) {
  return _stringToCheck.length > 1 &&
      _string.includes(_stringToCheck)
}

const extractNumbers = function (_string) {
  if (!_string) {
    return []
  }

  const numbersAsStrings = _string.match(/\d+/g)
  return numbersAsStrings.map(Number)
}

// SuffixMultipliers: K, M, ...
const extractNumbersWithSuffixMultipliers = function (_string) {
  if (!_string) {
    return []
  }
  const multiplier = {K: 1000, M: 1000000, B: 1000000000}
  const matches = [..._string.matchAll(/(\d+)([KM])/gi)]

  return matches.map(_match => {
    const number = parseInt(_match[1], 10)
    const suffixMultiplier = _match[2].toUpperCase()
    return number * (multiplier[suffixMultiplier] || 1)
  })
}

const formatMoneyWithSuffix = (_money) => {
  // Format millions as $1.2M, billions as $1.2B
  if (_money >= 1000000000) return `$${(_money / 1000000000).toFixed(1)}B`
  if (_money >= 1000000) return `$${(_money / 1000000).toFixed(1)}M`
  if (_money >= 1000) return `$${(_money / 1000).toFixed(1)}K`
  return `$${_money.toLocaleString()}` // Add commas to thousands
}

const stringUtility = {
  merge,
  isSubStringOf,
  extractNumbers,
  extractNumbersWithSuffixMultipliers,
  formatMoneyWithSuffix
}

export default stringUtility
