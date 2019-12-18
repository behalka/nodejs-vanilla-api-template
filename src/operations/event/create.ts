import { EventInput } from '../../entities/event'
import { EventRepoType } from '../../data-access/repos'

type Deps = {
  create: EventRepoType['create']
}

export const makeCreateEvent = ({ create }: Deps) => async (input: EventInput) => {
  console.log(input, create, 'this will be an event')
  return create(input)
}
