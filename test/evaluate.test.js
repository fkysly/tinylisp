'use strict'

const assert = require('chai').assert
const lexical = require('../src/lexical')
const parser = require('../src/parser').parser
const evaluate = require('../src/evaluate')

describe('evaluate', () => {
  it('case1', () => {
    assert.deepEqual(evaluate(parser(lexical('(* 1 2)'))), 2)
  })

  it('case2', () => {
    assert.deepEqual(evaluate(parser(lexical('(define a 0)'))), 0)
  })

  it('case3', () => {
    assert.deepEqual(evaluate(parser(lexical('(if (< 0 1) (+ (* 2 3) (+ 5 6)) (+ 4 5))'))), 17)
  })

  it('case4', () => {
    assert.deepEqual(evaluate(parser(lexical('(define a (if (< 0 1) (+ (* 2 3) (+ 5 6)) (+ 4 5)))'))), 17)
  })
})