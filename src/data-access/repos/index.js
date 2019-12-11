const R = require('ramda')
const { User } = require('../models')
const baseRepo = require('./base-repo')
const userRepo = require('./user-repo')

// fixme: intellisense thinks this is an array
const compileRepo = R.map(repoFn => repoFn(User))

module.exports = {
  userRepo: { ...compileRepo(baseRepo), ...compileRepo(userRepo) },
}
