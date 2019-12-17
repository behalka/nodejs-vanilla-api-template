import { EventRepoType } from '../../data-access/repos'

// this deps should be overriden in tests
type Deps = {
  findAll: EventRepoType['findAll']
}

export const makeListEvents = ({ findAll }: Deps) => async () => {
  const events = await findAll()
  return events
}
