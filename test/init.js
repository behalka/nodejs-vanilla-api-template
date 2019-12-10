const api = require('../src/api')
const db = require('../src/data-access')

before(async () => {
  await db.startConnection()
  await api.startApi()
})

after(async () => {
  await api.stopApi()
  await db.stopConnection()
})
