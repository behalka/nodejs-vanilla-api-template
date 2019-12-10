const api = require('./api/index')
const database = require('./data-access/index')

const removeProcessListeners = () => {
  process.removeAllListeners('SIGINT')
  process.removeAllListeners('SIGTERM')
}

const handleFatalErrors = () => {
  removeProcessListeners()
  console.log('Something really bad happened. Exiting the process')
}

const stopServices = async () => {
  await api.stopApi()
  await database.stopConnection()
  removeProcessListeners()
  console.log('stopping ALL')
}

const startServices = async () => {
  await database.startConnection()
  await api.startApi()
  console.log('starting ALL')

  process.once('SIGINT', () => stopServices())
  process.once('SIGTERM', () => stopServices())
  // todo: set up unhandled rejection etc
}

Promise.resolve()
  .then(() => startServices())
  .catch(err => {
    console.log(err, 'not this time')
    throw err
  })
