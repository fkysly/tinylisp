'use strict'

class Env {
  constructor(parent) {
    this.parent = parent
    this.map = new Map()
  }

  find(key) {
    let currentEnv = this
    while (currentEnv) {
      if (currentEnv.map.has(key)) {
        return currentEnv.map.get(key)
      }
      currentEnv = currentEnv.parent
    }
    throw new Error(key + ' is not defined.')
  }

  define(key, value) {
    this.map.set(key, value)
    return value
  }
}

let globalEnv = getGlobalEnv()

function getGlobalEnv() {
  let env = new Env(null)

  // built-in function
  env.define('+', (a, b) => { return a + b })
  env.define('-', (a, b) => { return a - b })
  env.define('*', (a, b) => { return a * b })
  env.define('/', (a, b) => { return a / b })
  env.define('%', (a, b) => { return a % b })
  env.define('and', (a, b) => { return a && b })
  env.define('or', (a, b) => { return a || b })
  env.define('not', (a) => { return !a })
  env.define('<', (a, b) => { return a < b })
  env.define('=', (a, b) => { return a = b })
  env.define('>', (a, b) => { return a > b })
  env.define('<=', (a, b) => { return a <= b })
  env.define('>=', (a, b) => { return a >= b })

  return env
}

module.exports = {
  Env: Env,
  globalEnv: globalEnv
}