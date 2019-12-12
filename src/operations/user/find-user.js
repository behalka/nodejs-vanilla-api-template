// the repo function is injected so it can be mocked
const makeFindUser = ({ findById }) => async id => {
  const users = await findById(id)
  return users
}

module.exports = {
  makeFindUser,
}
