'use strict'

function isNumber(x) {
  return typeof x === 'number'
}

function isString(x) {
  return typeof x === 'string'
}

module.exports = {
  isNumber: isNumber,
  isString: isString
}