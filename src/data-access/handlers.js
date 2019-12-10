const makeStartConnection = knex => async () => {
  await knex.raw('SELECT 1+1')
  // todo: or throw an error
  return true
}

const makeStopConnection = knex => async () => {
  await knex.destroy()
  // todo: or throw an error
  return true
}

module.exports = {
  makeStartConnection,
  makeStopConnection,
}
