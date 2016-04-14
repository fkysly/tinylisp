'use strict'

class Expression {

  constructor(value, parent) {
    this.value = value
    this.parent = parent
    this.children = []
  }
}

function parser(tokens) {
  let ast = new Expression('', null)
  let currentNode = ast
  for (let token of tokens) {
    if (token === '(') {
      let node = new Expression(token, currentNode)
      currentNode.children.push(node)
      currentNode = node
    } else if (token === ')') {
      currentNode = currentNode.parent
    } else {
      currentNode.children.push(new Expression(token, currentNode))
    }
  }

  return ast
}

module.exports = {
  parser: parser,
  Expression: Expression
}