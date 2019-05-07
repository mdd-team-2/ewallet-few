'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  ROOT_API: '"http://178.128.127.210:8080"',
  HASH_NONCE: '"mddteam2"'
})
