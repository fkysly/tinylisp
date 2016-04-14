'use strict'

const Env = require('./env').Env
const globalEnv = require('./env').globalEnv
const isNumber = require('./util').isNumber
const isString = require('./util').isString

function evaluate(node, env) {
  if (typeof env === 'undefined') env = globalEnv

  if (isNumber(node.value)) {
    return node.value
  } else if (node.children.length === 0 && isString(node.value)) {
    return env.find(node.value)
  }

  if (node.children.length === 1) {
    if (isNumber(node.children[0].value)) {
      return node.children[0].value
    } else if (isString(node.children[0].value)) {
      return env.find(node.children[0].value)
    }
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

  } else if (node.children[0].value === 'lambda') {
    let params = node.children[1].children
    let body = node.children[2]
    return function () {
      let newEnv = new Env(env)
      for (let i = 0; i < params.length; i++) {
        newEnv.define(params[i].value, arguments[i])
      }
      return evaluate(body, newEnv)
    }

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