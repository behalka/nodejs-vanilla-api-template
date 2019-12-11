const { userRepo } = require('../data-access/repos/index')
const { makeFindUser } = require('./find-user')

const findUser = makeFindUser({ findAll: userRepo.findAll })

module.exports = {
  findUser,
}
