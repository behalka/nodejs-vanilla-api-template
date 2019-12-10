'use strict'

module.exports = {
  extends: ['@strv/node/v12', '@strv/node/optional', '@strv/node/style', '@strv/mocha'],
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 9,
  },
}
