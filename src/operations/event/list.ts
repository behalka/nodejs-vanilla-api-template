import { EventType } from '../../entities/event'

type FindAllRepoFn = () => Promise<[EventType]>

export const makeListEvents = ({ findAll }: { findAll: FindAllRepoFn }) => async () => {
  const events = await findAll()
  return events
}

// module.exports = {
//   makeListEvents,
// }
