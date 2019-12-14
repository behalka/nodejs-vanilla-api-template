/* eslint-disable id-length */
const { objectType, extendType, arg, intArg, inputObjectType } = require('nexus')
const { createEvent, findEvent, listEvents } = require('../../operations/event/index')

const Event = objectType({
  name: 'Event',
  definition(t) {
    t.implements('Node')
    t.string('name')
    t.field('owner', {
      type: 'User',
      nullable: true,
      resolve: async (root, args, context) => {
        // this always has to be there if field can be null
        // dataloader does not accept "null" keys
        if (!root.ownerId) {
          return Promise.resolve(null)
        }
        return context.loaders.user.eventOwnersLoader.load(root.ownerId)
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
    t.list.field('events', {
      type: Event,
      resolve: () => listEvents(),
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
