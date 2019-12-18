const dotenv = require('dotenv')

dotenv.config()

// Update with your config settings.
const localSetting = {
  client: 'postgresql',
  connection: {
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  },
  pool: {
    min: 1,
    max: 2,
  },
}

const testSetting = {
  ...localSetting,
  connection: {
    ...localSetting.connection,
    database: process.env.DB_DATABASE_TEST,
  },
}

module.exports = {
  migration: {
    ...localSetting,
    debug: true,
  },

  development: {
    ...localSetting,
  },

  test: {
    ...testSetting,
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user: 'username',
      password: 'password',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user: 'username',
      password: 'password',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },
}
