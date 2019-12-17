import { app } from './app'
const handlers = require('./handlers')

const startApi = handlers.start(app.koa, app.setServer)
const stopApi = handlers.stop(app.getServer)

export const api = {
  startApi,
  stopApi,
}
