import { EventType, EventInput } from '../../entities/event'
import { inputIdSchema, InputId } from '../../entities/shared'
import { eventRepo } from '../../data-access/repos'
import { makeOperation } from '../base'
import { makeCreateEvent } from './create'
import { makeFindEvent } from './find'
import { makeListEvents } from './list'

// different output types allow for a difference between
// whatever QueryBuilders input and entity type shapes
const findEvent = makeOperation<InputId, EventType>({
  name: 'MyFindOperation',
  schema: inputIdSchema,
  execute: makeFindEvent,
  dependencies: {
    findById: eventRepo.findById,
  },
})

const listEvents = makeOperation<{}, EventType[]>({
  name: 'MyListOperation',
  execute: makeListEvents,
  dependencies: {
    findAll: eventRepo.findAll,
  },
})

const createEvent = makeOperation<EventInput, EventType>({
  name: 'MyListOperation',
  execute: makeCreateEvent,
  dependencies: { create: eventRepo.create },
})

export { findEvent, listEvents, createEvent }
