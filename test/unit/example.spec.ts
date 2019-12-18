import { expect } from 'chai'
import { QueryBuilder } from 'objection'
import { makeFindUser } from '../../src/operations/user/find'
import { makeOperation } from '../../src/operations/base'
import { User } from '../../src/data-access/models'
import { UserType } from '../../src/entities/user'
import { InputId, inputIdSchema } from '../../src/entities/shared'

// move this into test factories
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
  findOne: (id: number) => (Promise.resolve(fakeUsers[0]) as unknown) as QueryBuilder<User, User>,
  findOneEmpty: (id: number) => Promise.resolve(null),
  findOneSimple: () => Promise.resolve(fakeUsers[1]),
}

/**
 * Mocking options:
 * 1) Provide the same type as there is in Deps
 * 2) cast deps obj. to any
 * 3) compile operation via makeOperation with different deps.
 *  That would test the schema validation too, if provided.
 */

describe('find-user operation', () => {
  // 1)
  it('returns the data', async () => {
    const findUser = makeFindUser({ findById: fakeRepo.findOne })
    const res = await findUser({ id: 1 })
    expect(res).to.have.property('id', 1)
  })

  // 2)
  it('returns empty array when there is a condition passed', async () => {
    const findUser = makeFindUser({ findById: fakeRepo.findOneEmpty } as any)
    await expect(findUser({ id: 1 })).to.be.rejectedWith(Error, 'not found this user')
  })

  // 3 a) ignored input type and validation
  it('returns the data from the compiled op', async () => {
    const myOwnFindUser = makeOperation<{}, UserType>({
      name: 'TEST',
      execute: makeFindUser,
      dependencies: {
        findById: fakeRepo.findOneSimple,
      },
    })
    // empty input type
    const res = await myOwnFindUser({})
    expect(res).to.have.property('id', 2)
  })

  // 3 b) tested (and failed) also with validation
  it('throws the validation error from the compiled op', async () => {
    const myOwnFindUser = makeOperation<InputId, UserType>({
      name: 'TEST',
      execute: makeFindUser,
      schema: inputIdSchema,
      dependencies: {
        findById: fakeRepo.findOneSimple,
      },
    })

    await expect(myOwnFindUser({ id: -1 })).to.be.rejectedWith(Error, 'validation errors')
  })
})
