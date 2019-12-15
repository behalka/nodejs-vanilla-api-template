const Koa = require('koa')
const { ApolloServer } = require('apollo-server-koa')
const log = require('../utils/logger')
const { router } = require('./routes')
const { schema } = require('./graphql')
const { initLoaders } = require('./loaders')
const { makeErrorHandlerMdw } = require('./middleware/error-handler')

// GraphQL server plug-in
const graphQlServer = new ApolloServer({
  schema,
  introspection: true,
  engine: false,
  formatError: err => {
    log.warn({ err }, 'Apollo server handled this error for us')
    throw err
  },
  context: ({ ctx }) => ({
    loaders: initLoaders(),
    koaCtx: ctx,
  }),
})

// the context needed for start/stop functions
const koa = new Koa()

koa.use(makeErrorHandlerMdw())
koa.use(router.routes()).use(router.allowedMethods())
// plug-in apollo server
graphQlServer.applyMiddleware({ app: koa })
// http server is a "private" variable here
let server

const app = {
  koa,
  setServer: createdServer => {
    server = createdServer
  },
  getServer: () => server,
}

module.exports = app
