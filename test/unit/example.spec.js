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

describe('find-user.js', () => {
  it('returns the data when isAdmin = true', async () => {
    const findUser = makeFindUser({ repo: fakeRepo })
    const res = await findUser({ isAdmin: true })
    expect(res).to.have.lengthOf(fakeUsers.length)
  })

  it('returns empty array when isAdmin = false', async () => {
    const findUser = makeFindUser({ repo: fakeRepo })
    const res = await findUser({ isAdmin: false })
    expect(res).to.have.lengthOf(0)
  })
})
