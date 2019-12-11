'use strict'

const config = require('@strv/prettier-config')

module.exports = {
  ...config,
  // custom rules
  printWidth: 99,
  trailingComma: 'all',
}
