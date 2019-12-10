const app = require('./app')
const handlers = require('./handlers')

const startApi = handlers.start(app.koa, app.setServer)
const stopApi = handlers.stop(app.getServer)

module.exports = {
  startApi,
  stopApi,
}
