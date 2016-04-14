'use strict'

const assert = require('chai').assert
const lexical = require('../src/lexical')

describe('lexical', () => {
  it('case1', () => {
    assert.deepEqual(lexical('(* 1 2)'), ['(', '*', 1, 2, ')'])
  })

  it('case2', () => {
    assert.deepEqual(lexical('(define a 0)'), ['(', 'define', 'a', 0, ')'])
  })

  it('case3', () => {
    assert.deepEqual(lexical('(define a (if (< 0 1) (+ (* 2 3) (+ 5 6)) (+ 4 5)))'), ['(', 'define', 'a', '(', 'if', '(', '<', 0, 1, ')', '(', '+', '(', '*', 2, 3, ')', '(', '+', 5, 6, ')', ')', '(', '+', 4, 5, ')', ')', ')'])
  })
})