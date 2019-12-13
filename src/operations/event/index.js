const { compose } = require('ramda')
const base = require('../base')
const eventEntity = require('../../entities/event')
const { inputIdSchema } = require('../../entities/shared')
const { eventRepo } = require('../../data-access/repos/index')
const { makeCreateEvent } = require('./create')
const { makeFindEvent } = require('./find')

// findUser is a compiled operation that can be used from API, worker, CLI...
const createEvent = compose(
  // operation static metadata, e.g validation schema, execution context..
  base({ name: 'myFancyCreateEvent', schema: eventEntity.inputSchema }),
  // operation "make"
  makeCreateEvent,
)({ create: eventRepo.create })

const findEvent = compose(
  base({ name: 'FindEvent', schema: inputIdSchema }),
  makeFindEvent,
)({ findById: eventRepo.findById })

module.exports = {
  createEvent,
  findEvent,
}
