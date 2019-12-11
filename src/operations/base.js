const log = require('../utils/logger')

const baseOperation = ({ name }) => operationCallback => async input => {
  const start = Date.now()
  log.info({ service: name }, 'started!')
  const result = await operationCallback(input)
  log.info({ service: name, timeElapsed: Date.now() - start }, 'ended!')
  return result
}

module.exports = baseOperation
