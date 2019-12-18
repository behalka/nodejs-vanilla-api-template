import { Model, knexSnakeCaseMappers } from 'objection'
import * as Knex from 'knex'
import { config } from '../config'
import { handlers } from './handlers'

// global database setup

// eslint-disable-next-line new-cap
const knex = Knex({
  client: 'pg',
  connection: {
    host: config.database.host,
    user: config.database.user,
    password: config.database.password,
    database: config.database.database,
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
