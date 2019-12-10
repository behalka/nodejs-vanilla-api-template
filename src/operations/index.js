const userRepo = require('../data-access/repos/user-repo')
const { makeFindUser } = require('./find-user')

const findUser = makeFindUser({ repo: userRepo })

module.exports = {
  findUser,
}
