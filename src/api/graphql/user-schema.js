/* eslint-disable id-length */
// try to split schema defs into more files
const { objectType, queryField } = require('nexus')

const User = objectType({
  name: 'User',
  definition(t) {
    t.implements('Node')
    t.string('email')
    t.string('firstName', { nullable: true })
    t.string('lastName', {
      nullable: true,
      // scalar transformation example
      resolve: obj => `${obj.lastName}-foo`,
    })
  },
})

const userQueries = queryField('users', {
  type: 'User',
  list: true,
  resolve: () => [],
})

module.exports = {
  User,
  userQueries,
}