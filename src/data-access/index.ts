import { Model, knexSnakeCaseMappers } from 'objection'
import * as Knex from 'knex'

import handlers = require('./handlers')

// global database setup

// eslint-disable-next-line new-cap
const knex = Knex({
  client: 'pg',
  connection: {
    host: 'localhost',
    user: 'postgres',
    password: 'postgres',
    database: 'vanilla-template-db',
  },
  ...knexSnakeCaseMappers(),
})

Model.knex(knex)

const startConnection = handlers.makeStartConnection(knex)
const stopConnection = handlers.makeStopConnection(knex)

export const database = {
  startConnection,
  stopConnection,
}
