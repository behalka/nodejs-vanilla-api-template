const Koa = require('koa')
const { router } = require('./routes')

// the context needed for start/stop functions
const koa = new Koa()
koa.use(router.routes()).use(router.allowedMethods())
// server is a "private" variable here
let server

const app = {
  koa,
  setServer: createdServer => {
    server = createdServer
  },
  getServer: () => server,
}

module.exports = app
