/* eslint-disable id-length */
const path = require('path')
const {
  objectType,
  makeSchema,
  interfaceType,
  inputObjectType,
  mutationType,
  arg,
  queryType,
} = require('nexus')

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
// Inputs
const CreateEventInput = inputObjectType({
  name: 'CreateInputType',
  definition(t) {
    t.string('name')
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
// Mutation
const Mutation = mutationType({
  definition(t) {
    t.field('createEvent', {
      type: Event,
      args: {
        input: arg({ type: CreateEventInput, required: true }),
      },
      resolve: (root, args) => {
        console.log(args.input.name)
        // todo:
        return null
      },
    })
  },
})
const schema = makeSchema({
  types: [Query, Mutation, User, Event, Node, CreateEventInput],
  outputs: {
    schema: path.join(__dirname, 'schema.gql'),
  },
})

module.exports = { schema }
