// the repo function is injected so it can be mocked
const makeFindUser = ({ findAll }) => async () => {
  const users = await findAll()
  return users
}

module.exports = {
  makeFindUser,
}
