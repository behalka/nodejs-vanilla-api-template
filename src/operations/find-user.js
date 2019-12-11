// the repo function is injected so it can be mocked
const makeFindUser = ({ findAll }) => (options = {}) => {
  if (!options.isAdmin) {
    console.log('no data for you')
    return []
  }

  return findAll()
}

module.exports = {
  makeFindUser,
}
