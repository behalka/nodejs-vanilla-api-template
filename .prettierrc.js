'use strict'

const config = require('@strv/prettier-config')

module.exports = {
  ...config,
  // custom rules
  printWidth: 100,
  trailingComma: 'all',
}
