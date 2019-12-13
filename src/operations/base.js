const log = require('../utils/logger')
const ajv = require('../utils/validator')

const baseOperation = ({ name, schema }) => {
  // the function signature is correct
  const validationFunc = schema ? ajv.compile(schema) : () => true

  return operationCallback => async input => {
    const start = Date.now()
    // validation
    const valid = validationFunc(input)
    if (!valid) {
      log.warn(
        { validationErrors: validationFunc.errors, operation: name },
        'Operation input invalid',
      )
      throw new Error('there were validation errors')
    }

    // todo: sanitize input
    log.info({ operation: name, input }, 'started!')
    const result = await operationCallback(input)
    log.info(
      {
        operation: name,
        timeElapsed: Date.now() - start,
      },
      'ended!',
    )
    return result
  }
}

module.exports = baseOperation
