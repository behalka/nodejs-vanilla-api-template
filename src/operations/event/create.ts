import { EventType, EventInput } from '../../entities/event'

type CreateFn = (input: EventInput) => Promise<EventType>

export const makeCreateEvent = ({ create }: { create: CreateFn }) => async (input: EventInput) => {
  // fixme: input validation must be here!
  console.log(input, create, 'this will be an event')
  return create(input)
}

// module.exports = { makeCreateEvent }
