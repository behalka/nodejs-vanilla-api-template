import { EventInput, EventType } from '../../entities/event'
import { EventRepoType } from '../../data-access/repos'

// input of the repo fn and of the operation have the same shape
type Deps = {
  create: EventRepoType['create']
}

// this would happen in tests -> how to pass it in?
// we can compile it the same way we do in index with different stuff
type MockDeps = {
  create: (...args: any[]) => Promise<EventType>
}

// fixme: <D = Deps> and { create }: D
// BUT why is D = {} ??
export const makeCreateEvent = ({ create }: Deps) => async (input: EventInput) => {
  console.log(input, create, 'this will be an event')
  return create(input)
}

// this will be in unit tests
const fakeCreate = () => Promise.resolve({ id: 1, name: 'foo' })
const mockCreateEvent = makeCreateEvent<MockDeps>({ create: fakeCreate })
