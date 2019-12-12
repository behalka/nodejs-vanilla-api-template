const R = require('ramda')
const { User, Event } = require('../models')
const buildBaseRepo = require('./base-repo')
const buildUserRepo = require('./user-repo')

// fixme: intellisense thinks this is an array
const compileRepo = model => R.map(repoFn => repoFn(model))
const composeRepo = model => R.compose(compileRepo(model), R.merge)

// compiled
const userRepo = composeRepo(User)(buildBaseRepo, buildUserRepo)
const eventRepo = composeRepo(Event)(buildBaseRepo)

module.exports = {
  userRepo,
  eventRepo,
}
