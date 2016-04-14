'use strict'

function lexical(program) {
  return program
    .replace(/\(/g, ' ( ')
    .replace(/\)/g, ' ) ')
    .split(' ')
    .filter((token) => {
      return token != ''
    })
    .map((token) => {
      let tmp = Number(token)
      return isNaN(tmp) ? token : tmp
    })
}

module.exports = lexical