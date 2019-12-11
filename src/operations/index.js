const { compose } = require('ramda')
const { userRepo } = require('../data-access/repos/index')
const { makeFindUser } = require('./find-user')
const base = require('./base')

// findUser is a compiled operation that can be used from API, worker, CLI...
const findUser = compose(
  // operation static metadata, e.g validation schema, execution context..
  base({ name: 'myFancyFnName' }),
  // operation "make"
  makeFindUser,
)({ findAll: userRepo.findAll })

const findAdmin = compose(
  base({ name: 'myFancyFnName2' }),
  makeFindUser,
)({ findAll: userRepo.findAllAdmins })

module.exports = {
  findUser,
  findAdmin,
}
