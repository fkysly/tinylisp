'use strict'

const Env = require('./env').Env
const globalEnv = require('./env').globalEnv

function evaluate(node, env) {
  if (typeof env === 'undefined') env = globalEnv

  if (typeof node.value === 'number') {
    return node.value
  }

  if (node.children.length === 1 && typeof node.children[0].value === 'number') {
    return node.children[0].value
  }

  if (node.children[0].value === 'if') {
    let cond = node.children[1]
    let expr1 = node.children[2]
    let expr2 = node.children[3]
    return evaluate((evaluate(cond, env) ? expr1 : expr2), env)

  } else if (node.children[0].value === 'define') {
    let variable = node.children[1].value
    let expr = node.children[2]
    return env.define(variable, evaluate(expr, env))

  } else {
    let func = env.find(node.children[0].value)
    let exprs = node.children.slice(1)
    let args = []
    for (let expr of exprs) {
      args.push(evaluate(expr, env))
    }
    return func.apply(null, args)
  }
}

module.exports = evaluate