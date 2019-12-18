import * as chai from 'chai'
import * as chaiAsPromised from 'chai-as-promised'
import { api } from '../src/api'
import { database } from '../src/data-access'

chai.use(chaiAsPromised)

before(async () => {
  await database.startConnection()
  await api.startApi()
})

after(async () => {
  await api.stopApi()
  await database.stopConnection()
})
