// Update with your config settings.
const localSetting = {
  client: 'postgresql',
  connection: {
    database: 'vanilla-template-db',
    user: 'postgres',
    password: 'postgres',
  },
  pool: {
    min: 1,
    max: 2,
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
