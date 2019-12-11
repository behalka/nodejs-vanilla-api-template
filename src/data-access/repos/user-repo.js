// const { User } = require('../models')

/**
 * we can again
 * 1) pass the DB Model here
 * 2) require more "outer" DB Model here and mock the repo calls from operations
 *
 * When 2) we cannot mock the model. That would be a pain though because we'd have
 * to mock the whole Objection.js API
 */

/**
 * unfortunately, this does not include the .query() method :(
 * so it does not work :(
 * but it's interesting
 * @typedef {import('objection').Model} Model
 */

const findAllAdmins = User => () => {
  return User.query().where('role', 'admin')
}

const findAll = User => () => {
  console.log('I am a findAll() overwrite')
  return User.query()
}

module.exports = {
  findAllAdmins,
  findAll,
}
