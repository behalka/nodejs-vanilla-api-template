import { InputId } from '../../entities/shared'
import { EventRepoType } from '../../data-access/repos'

// perhaps it's OK to just import types

type Deps = {
  findById: EventRepoType['findById']
}

export const makeFindEvent = ({ findById }: Deps) => async (input: InputId) => {
  const event = await findById(input.id)
  if (!event) {
    throw new Error('event not found')
  }
  return event
}
