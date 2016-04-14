'use strict'

const assert = require('chai').assert
const lexical = require('../src/lexical')

describe('lexical', function() {
  it('should return tokens when program is right', function() {
    assert.deepEqual(lexical('* 1 2'), ['*', '1', '2'])
    assert.deepEqual(lexical('(define a 0)'), ['(', 'define', 'a', '0', ')'])
    assert.deepEqual(lexical('(define a (if (< 0 1) (+ (* 2 3) (+ 5 6)) (+ 4 5)))'), ['(', 'define', 'a', '(', 'if', '(', '<', '0', '1', ')', '(', '+', '(', '*', '2', '3', ')', '(', '+', '5', '6', ')', ')', '(', '+', '4', '5', ')', ')', ')'])
  })
})