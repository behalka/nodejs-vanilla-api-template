'use strict'

const config = require('@strv/prettier-config')

module.exports = {
  ...config,
  // custom rules
  printWidth: 110,
  trailingComma: 'all',
}
