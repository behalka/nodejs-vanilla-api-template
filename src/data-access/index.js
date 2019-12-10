const { Model, knexSnakeCaseMappers } = require('objection')
const Knex = require('knex')
const handlers = require('./handlers')

// global database setup

// eslint-disable-next-line new-cap
const knex = Knex({
  client: 'pg',
  connection: {
    host: 'localhost',
    user: 'postgres',
    password: 'postgres',
    database: 'template-db',
  },
  ...knexSnakeCaseMappers(),
})

Model.knex(knex)

const startConnection = handlers.makeStartConnection(knex)
const stopConnection = handlers.makeStopConnection(knex)

module.exports = {
  startConnection,
  stopConnection,
}
