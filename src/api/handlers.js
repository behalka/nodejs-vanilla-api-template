const { log } = require('../utils/logger')

const stop = getServerHandler => async () => {
  const server = getServerHandler()
  if (server && server.listening) {
    await new Promise(done => server.close(done))
  }
  log.info('Server: closed')
}

const start = (koaApp, setServerHandler) => async () => {
  // signal handlers
  await new Promise(done => {
    const server = koaApp.listen(3000, done)
    setServerHandler(server)
  })
  log.info('Server: started')
}

module.exports = {
  start,
  stop,
}
