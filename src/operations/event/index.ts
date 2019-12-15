import { eventBaseSchema } from '../../entities/event'
import { makeCreateEvent } from './create'
import { makeFindEvent } from './find'
import { makeListEvents } from './list'

const { compose } = require('ramda')
const base = require('../base')
// const eventEntity = require('../../entities/event')
const { inputIdSchema } = require('../../entities/shared')
const { eventRepo } = require('../../data-access/repos/index')
// const { makeCreateEvent } = require('./create')
// const { makeFindEvent } = require('./find')
// const { makeListEvents } = require('./list')

// this type is correct
type CompiledCreateEventFn = ReturnType<typeof makeCreateEvent>

// findUser is a compiled operation that can be used from API, worker, CLI...
export const createEvent: CompiledCreateEventFn = compose(
  // operation static metadata, e.g validation schema, execution context..
  base({ name: 'myFancyCreateEvent', schema: eventBaseSchema }),
  // operation "make"
  makeCreateEvent,
)({ create: eventRepo.create })

// we don't need to create a type
export const findEvent: ReturnType<typeof makeFindEvent> = compose(
  base({ name: 'FindEvent', schema: inputIdSchema }),
  makeFindEvent,
)({ findById: eventRepo.findById })

export const listEvents: ReturnType<typeof makeListEvents> = compose(
  base({ name: 'ListEvents' }),
  makeListEvents,
)({ findAll: eventRepo.findAll })

// module.exports = {
//   createEvent,
//   findEvent,
//   listEvents,
// }
