const { compose } = require('ramda')
const base = require('../base')
const { eventRepo } = require('../../data-access/repos/index')
const { makeCreateEvent } = require('./create')

// findUser is a compiled operation that can be used from API, worker, CLI...
const createEvent = compose(
  // operation static metadata, e.g validation schema, execution context..
  base({ name: 'myFancyCreateEvent' }),
  // operation "make"
  makeCreateEvent,
)({ create: eventRepo.create })

module.exports = {
  createEvent,
}
