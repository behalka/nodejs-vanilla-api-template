/* eslint-disable max-classes-per-file */
const { Model } = require('objection')
const { userInputSchema } = require('../entities/user')

class User extends Model {
  static get tableName() {
    return 'user'
  }

  static get jsonSchema() {
    // can reuse easily
    // fixme: should be the complete schema, not the input
    return userInputSchema
  }
}

class Event extends Model {
  static get tableName() {
    return 'event'
  }
}

module.exports = {
  User,
  Event,
}
