const { expect } = require('chai')
const { makeFindUser } = require('../../src/operations/find-user')

const fakeUsers = [
  {
    id: 1,
    email: 'foo@bar.com',
  },
  {
    id: 2,
    email: 'baz@bar.com',
  },
]
const fakeRepo = {
  getAll: () => fakeUsers,
}

describe('find-user operation', () => {
  it('returns the data', async () => {
    const findUser = makeFindUser({ findAll: fakeRepo.getAll })
    const res = await findUser()
    expect(res).to.have.lengthOf(fakeUsers.length)
  })

  // todo: findUser op should have some business logic in it
  it.skip('returns empty array when there is a condition passed', async () => {
    const findUser = makeFindUser({ findAll: fakeRepo.getAll })
    const res = await findUser()
    expect(res).to.have.lengthOf(0)
  })
})
