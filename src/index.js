const { startConnection, stopConnection } = require('./data-access/index')
const { User } = require('./data-access/models')

Promise.resolve()
  .then(() => startConnection())
  .then(async () => {
    const test = await User.query()
    console.log(test, 'users')
  })
  .then(() => stopConnection())
  .catch(err => {
    console.log(err, 'not this time')
    throw err
  })
