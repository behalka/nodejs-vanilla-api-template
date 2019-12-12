/* eslint-disable func-names */

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('user')
    .del()
    .then(() => {
      // Inserts seed entries
      return knex('user').insert([
        { id: 1, email: 'kaja@strv.com', password: 'foo', role: 'admin' },
        { id: 2, email: 'foo@bar.com', password: 'foo2' },
        { id: 3, email: 'baz@bar.com', password: 'foo3' },
      ])
    })
}
