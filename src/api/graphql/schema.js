/* eslint-disable id-length */
const path = require('path')
const { objectType, makeSchema, interfaceType, queryType } = require('nexus')

/**
 * GraphQL schema definition
 * Can (should) be easily spread into multiple files
 * the Koa "router" equivalent
 */

const Node = interfaceType({
  name: 'Node',
  definition(t) {
    t.id('id')
    t.resolveType(() => null)
  },
})
// objects
const User = objectType({
  name: 'User',
  definition(t) {
    t.implements(Node)
    t.string('email')
    t.string('firstName', { nullable: true })
    t.string('lastName', {
      nullable: true,
      // scalar transformation example
      resolve: obj => `${obj.lastName}-foo`,
    })
  },
})
const Event = objectType({
  name: 'Event',
  definition(t) {
    t.implements(Node)
    t.string('name')
    t.field('owner', {
      type: 'User',
      resolve: (root, args, context) => {
        // (object) field resolver example
        return { id: 1, email: 'mock@email.com' }
      },
    })
  },
})
// Query
const Query = queryType({
  definition(t) {
    t.list.field('users', {
      type: User,
      // at least we dont have to build parallel resolvers structure?
      resolve: () => [],
    })
    t.field('event', {
      type: Event,
      resolve: () => ({ id: 1, name: 'myMockEvent' }),
    })
  },
})

const schema = makeSchema({
  types: [Query, User, Event, Node],
  outputs: {
    schema: path.join(__dirname, 'schema.gql'),
  },
})

module.exports = { schema }
