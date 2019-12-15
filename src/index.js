const api = require('./api/index')
const database = require('./data-access/index')
const log = require('./utils/logger')

const removeProcessListeners = () => {
  process.removeAllListeners('SIGINT')
  process.removeAllListeners('SIGTERM')
}

const handleFatalErrors = err => {
  removeProcessListeners()
  log.fatal({ err }, 'Something really bad happened. Exiting the process')

  setTimeout(() => {
    throw err
  }, 5000).unref()
}

const stopServices = async () => {
  await api.stopApi()
  await database.stopConnection()
  removeProcessListeners()
  log.debug('ALL: stopping')
}

const startServices = async () => {
  await database.startConnection()
  await api.startApi()
  log.debug('ALL: started')

  process.once('SIGINT', () => stopServices())
  process.once('SIGTERM', () => stopServices())
  // todo: set up unhandled rejection etc
}

Promise.resolve()
  .then(() => startServices())
  .catch(err => handleFatalErrors(err))
