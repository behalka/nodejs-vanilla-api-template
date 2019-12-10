// the repo is injected so it can be mocked
const makeFindUser = ({ repo }) => (options = {}) => {
  if (!options.isAdmin) {
    console.log('no data for you')
    return []
  }

  return repo.getAll()
}

module.exports = {
  makeFindUser,
}
