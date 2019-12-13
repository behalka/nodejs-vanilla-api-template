const Ajv = require('ajv')

const ajv = new Ajv()

// there will be imported schemas etc as in RichUncles codebase (e.g { type: email })

module.exports = ajv
