'use strict'

const assert = require('chai').assert
const parser = require('../src/parser').parser
const Expression = require('../src/parser').Expression

describe('parser', function() {
  it('should return ast when tokens is right', function() {
    let ast1 = new Expression('', null)
    ast1.children.push(new Expression('*', ast1))
    ast1.children.push(new Expression('1', ast1))
    ast1.children.push(new Expression('2', ast1))
    assert.deepEqual(parser(['*', '1', '2']), ast1)

    let ast2 = new Expression('', null)
    let ast2Child1 = new Expression('(', ast2)
    ast2.children.push(ast2Child1)
    ast2Child1.children.push(new Expression('define', ast2Child1))
    ast2Child1.children.push(new Expression('a', ast2Child1))
    ast2Child1.children.push(new Expression('0', ast2Child1))
    assert.deepEqual(parser(['(', 'define', 'a', '0', ')']), ast2)

    let ast3 = new Expression('', null)
    let ast3Child1, ast3Child1Child1, ast3Child1Child1Child1, ast3Child1Child1Child2, ast3Child1Child1Child2Child1, ast3Child1Child1Child2Child2, ast3Child1Child1Child3
    ast3Child1 = new Expression('(', ast3)
    ast3.children.push(ast3Child1)
    ast3Child1.children.push(new Expression('define', ast3Child1))
    ast3Child1.children.push(new Expression('a', ast3Child1))
    ast3Child1Child1 = new Expression('(', ast3Child1)
    ast3Child1.children.push(ast3Child1Child1)
    ast3Child1Child1.children.push(new Expression('if', ast3Child1Child1))
    ast3Child1Child1Child1 = new Expression('(', ast3Child1Child1)
    ast3Child1Child1Child2 = new Expression('(', ast3Child1Child1)
    ast3Child1Child1Child3 = new Expression('(', ast3Child1Child1)
    ast3Child1Child1.children.push(ast3Child1Child1Child1)
    ast3Child1Child1.children.push(ast3Child1Child1Child2)
    ast3Child1Child1.children.push(ast3Child1Child1Child3)
    
    ast3Child1Child1Child1.children.push(new Expression('<', ast3Child1Child1Child1))
    ast3Child1Child1Child1.children.push(new Expression('0', ast3Child1Child1Child1))
    ast3Child1Child1Child1.children.push(new Expression('1', ast3Child1Child1Child1))
    
    ast3Child1Child1Child2.children.push(new Expression('+', ast3Child1Child1Child2))
    ast3Child1Child1Child2Child1 = new Expression('(', ast3Child1Child1Child2)
    ast3Child1Child1Child2Child2 = new Expression('(', ast3Child1Child1Child2)
    ast3Child1Child1Child2.children.push(ast3Child1Child1Child2Child1)
    ast3Child1Child1Child2.children.push(ast3Child1Child1Child2Child2)
    
    ast3Child1Child1Child2Child1.children.push(new Expression('*', ast3Child1Child1Child2Child1))
    ast3Child1Child1Child2Child1.children.push(new Expression('2', ast3Child1Child1Child2Child1))
    ast3Child1Child1Child2Child1.children.push(new Expression('3', ast3Child1Child1Child2Child1))
    
    ast3Child1Child1Child2Child2.children.push(new Expression('+', ast3Child1Child1Child2Child2))
    ast3Child1Child1Child2Child2.children.push(new Expression('5', ast3Child1Child1Child2Child2))
    ast3Child1Child1Child2Child2.children.push(new Expression('6', ast3Child1Child1Child2Child2))
    
    ast3Child1Child1Child3.children.push(new Expression('+', ast3Child1Child1Child3))
    ast3Child1Child1Child3.children.push(new Expression('4', ast3Child1Child1Child3))
    ast3Child1Child1Child3.children.push(new Expression('5', ast3Child1Child1Child3))
    assert.deepEqual(parser(['(', 'define', 'a', '(', 'if', '(', '<', '0', '1', ')', '(', '+', '(', '*', '2', '3', ')', '(', '+', '5', '6', ')', ')', '(', '+', '4', '5', ')', ')', ')']), ast3)
  })
})