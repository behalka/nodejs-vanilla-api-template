import { config } from '../config'
import { log } from '../utils/logger'

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
    const server = koaApp.listen(config.api.port, done)
    setServerHandler(server)
  })
  log.info('Server: started')
}

export const handlers = { start, stop }
