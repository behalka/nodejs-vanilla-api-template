import { EventType } from '../../entities/event'

// this is a type for a repo fn
// each injected service/repo function would need this
// functions can be typed in a repo BUT they would need to be imported here
// perhaps it's OK to just import types
// our functions are still "pure" just their types are not
type FindByIdFn = ({ id }: { id: number }) => Promise<EventType>

export const makeFindEvent = ({ findById }: { findById: FindByIdFn }) => async ({ id }) => {
  const event = await findById(id)
  if (!event) {
    throw new Error('event not found')
  }
  return event
}

// module.exports = {
//   makeFindEvent,
// }
