'use strict'

const assert = require('chai').assert
const lexical = require('../src/lexical')
const parser = require('../src/parser').parser
const Expression = require('../src/parser').Expression

describe('parser', () => {
  it('case1', () => {
    let ast1 = new Expression('(', null)
    ast1.children.push(new Expression('*', ast1))
    ast1.children.push(new Expression(1, ast1))
    ast1.children.push(new Expression(2, ast1))
    assert.deepEqual(parser(lexical('(* 1 2)')), ast1)
  })

  it('case2', () => {
    let ast2 = new Expression('(', null)
    ast2.children.push(new Expression('define', ast2))
    ast2.children.push(new Expression('a', ast2))
    ast2.children.push(new Expression(0, ast2))
    assert.deepEqual(parser(lexical('(define a 0)')), ast2)
  })

  it ('case3', () => {
    let ast3 = new Expression('(', null)
    ast3.children.push(new Expression('define', ast3))
    ast3.children.push(new Expression('a', ast3))
    let ast3Child = new Expression('(', ast3)
    ast3.children.push(ast3Child)
    ast3Child.children.push(new Expression('*', ast3Child))
    ast3Child.children.push(new Expression(1, ast3Child))
    ast3Child.children.push(new Expression(2, ast3Child))
    assert.deepEqual(parser(lexical('(define a (* 1 2))')), ast3)
  })
})