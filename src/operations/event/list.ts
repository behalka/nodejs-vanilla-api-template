import { EventRepoType } from '../../data-access/repos'

type Deps = {
  findAll: EventRepoType['findAll']
}

export const makeListEvents = ({ findAll }: Deps) => async () => {
  const events = await findAll()
  return events
}
