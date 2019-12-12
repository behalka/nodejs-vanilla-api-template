/**
 * we can again
 * 1) pass the DB Model here
 * 2) require more "outer" DB Model here and mock the repo calls from operations
 *
 * 1) is implemented at the moment
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

// findAll override from base repo
const findAll = User => (filter = {}) => {
  // filter defaults
  const { usersOnly = true } = filter
  const query = User.query()
  if (usersOnly) {
    query.where('role', 'user')
  }
  return query
}

module.exports = {
  findAllAdmins,
  findAll,
}
