'use strict'

const lexical = require('./lexical')
const evaluate = require('./evaluate')
const parser = require('./parser').parser

function tinylisp(program) {
  return evaluate(parser(lexical(program)))
}

module.exports = tinylisp