/* eslint-disable id-length */
import { objectType, queryField } from 'nexus'
import { listUsers } from '../../operations/user'

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
  resolve: () => listUsers({ isAdmin: true }),
})

export { User, userQueries }
