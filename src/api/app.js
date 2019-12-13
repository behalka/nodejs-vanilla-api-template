const Koa = require('koa')
const { ApolloServer } = require('apollo-server-koa')
const { router } = require('./routes')
const { schema } = require('./graphql')

// GraphQL server plug-in
const graphQlServer = new ApolloServer({
  schema,
  introspection: true,
  engine: false,
})

// the context needed for start/stop functions
const koa = new Koa()
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
