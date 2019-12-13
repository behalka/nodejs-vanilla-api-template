const { expect } = require('chai')
const { makeFindUser } = require('../../src/operations/user/find-user')

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
  findOne: () => fakeUsers[0],
}

describe('find-user operation', () => {
  it('returns the data', async () => {
    const findUser = makeFindUser({ findById: fakeRepo.findOne })
    const res = await findUser({ id: 1 })
    expect(res).to.have.property('id', 1)
  })

  // todo: findUser op should have some business logic in it
  it.skip('returns empty array when there is a condition passed', async () => {
    const findUser = makeFindUser({ findAll: fakeRepo.getAll })
    const res = await findUser({ id: 1 })
    expect(res).to.have.lengthOf(0)
  })
})
