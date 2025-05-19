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
  return _stringToCheck && _stringToCheck.length > 1 &&
      _string.includes(_stringToCheck)
}

const stringUtility = {
  merge,
  isSubStringOf
}

export default stringUtility
