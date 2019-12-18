'use strict'

module.exports = {
  timeout: 5000,
  colors: true,
  checkleaks: true,
  file: 'test/init.ts',
  require: ['ts-node/register/transpile-only'],
}
