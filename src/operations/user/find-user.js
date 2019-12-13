// the repo function is injected so it can be mocked
const makeFindUser = ({ findById }) => async ({ id }) => {
  const user = await findById(id)
  if (!user) {
    throw new Error('not found this user')
  }
  return user
}

module.exports = {
  makeFindUser,
}
