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
    let stmt1 = evaluate(parser(lexical('(define a 1)')))
    let stmt2 = evaluate(parser(lexical('(a)')))
    assert.deepEqual(stmt2, 1)
  })

  it('case3', () => {
    assert.deepEqual(evaluate(parser(lexical('(if (< 0 1) (+ (* 2 3) (+ 5 6)) (+ 4 5))'))), 17)
  })

  it('case4', () => {
    assert.deepEqual(evaluate(parser(lexical('(define a (if (< 0 1) (+ (* 2 3) (+ 5 6)) (+ 4 5)))'))), 17)
  })

  it('case5', () => {
    assert.deepEqual(evaluate(parser(lexical('(* (define a 3) a)'))), 9)
  })

  it('case6', () => {
    assert.deepEqual(evaluate(parser(lexical('(* (define a 3) (+ a (0)))'))), 9)
  })

  it('case7', () => {
    let stmt1 = evaluate(parser(lexical('(define addOne (lambda (x) (+ x 1)))')))
    let stmt2 = evaluate(parser(lexical('(addOne 2)')))
    assert.deepEqual(stmt2, 3)
  })
})