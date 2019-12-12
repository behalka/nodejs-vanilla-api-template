const makeListUsers = ({ findAll }) => async ({ isAdmin }) => {
  const usersFilter = {}
  if (isAdmin) {
    usersFilter.usersOnly = false
  }
  const users = await findAll(usersFilter)
  return users
}

module.exports = {
  makeListUsers,
}
