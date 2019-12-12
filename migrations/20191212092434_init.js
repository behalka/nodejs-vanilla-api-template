/* eslint-disable import/group-exports, func-names */

exports.up = function(knex) {
  return knex.schema
    .createTable('user', table => {
      table.increments('id')
      table.string('email').notNullable()
      table
        .string('role')
        .notNullable()
        .default('user')
      table.string('password').notNullable()
      table.string('first_name')
      table.string('last_name')
    })
    .createTable('event', table => {
      table.increments('id')
      table.string('name').notNullable()
      table.integer('owner_id')
      table
        .foreign('owner_id')
        .references('user.id')
        .onDelete('CASCADE')
    })
}

exports.down = function(knex) {
  return knex.schema.dropTable('event').dropTable('user')
}
