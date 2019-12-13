/* eslint-disable id-length */
const { objectType, extendType, arg, intArg, inputObjectType } = require('nexus')
const { createEvent, findEvent } = require('../../operations/event/index')

const Event = objectType({
  name: 'Event',
  definition(t) {
    t.implements('Node')
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

const CreateEventInput = inputObjectType({
  name: 'CreateInputType',
  definition(t) {
    t.string('name')
  },
})

const eventQueries = extendType({
  type: 'Query',
  definition(t) {
    t.field('event', {
      type: Event,
      args: { id: intArg() },
      resolve: (root, args) => findEvent(args),
    })
  },
})

const eventMutations = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('createEvent', {
      type: Event,
      args: {
        input: arg({ type: CreateEventInput, required: true }),
      },
      resolve: async (root, args) => {
        console.log(args.input.name)
        const event = await createEvent(args.input)
        return event
      },
    })
  },
})

module.exports = {
  Event,
  eventQueries,
  eventMutations,
}
