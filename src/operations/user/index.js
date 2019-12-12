const { compose } = require('ramda')
const base = require('../base')
const { userRepo } = require('../../data-access/repos/index')
const { makeFindUser } = require('./find-user')
const { makeListUsers } = require('./list-users')

// findUser is a compiled operation that can be used from API, worker, CLI...
const findUser = compose(
  // operation static metadata, e.g validation schema, execution context..
  base({ name: 'myFancyFnName' }),
  // operation "make"
  makeFindUser,
)({ findById: userRepo.findById })

const listUsers = compose(
  base({ name: 'findUsers' }),
  makeListUsers,
)({ findAll: userRepo.findAll })

// not sure this is the best thing to do ...
const findAdmin = compose(
  base({ name: 'myFancyFnName2' }),
  makeFindUser,
)({ findAll: userRepo.findAllAdmins })

module.exports = {
  findUser,
  findAdmin,
  listUsers,
}
