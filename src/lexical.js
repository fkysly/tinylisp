'use strict'

function lexical(program) {
  return program.replace(/\(/g, ' ( ').replace(/\)/g, ' ) ').split(' ').filter((token)=>{return token != ''})
}

module.exports = lexical