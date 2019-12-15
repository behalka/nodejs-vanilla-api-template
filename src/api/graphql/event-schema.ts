/* eslint-disable id-length */
import { createEvent, listEvents, findEvent } from '../../operations/event/index'
import { objectType, extendType, arg, intArg, inputObjectType } from 'nexus'

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
      // args can be "any" we know what's in the operation thanks to type there and validation
      // resolve: async (root, args) => {
      resolve: async (root, args: { input: { name: string } }) => {
        // createEvent input is inferred and checked correctly
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
