import * as Koa from 'koa'
import { ApolloServer } from 'apollo-server-koa'
import { log } from '../utils/logger'
import { schema } from './graphql'
import { router } from './routes'
import { makeErrorHandlerMdw } from './middleware/error-handler'
import { initLoaders } from './loaders'

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

export const app = {
  koa,
  setServer: createdServer => {
    server = createdServer
  },
  getServer: () => server,
}
