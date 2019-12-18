import { userRepo } from '../../data-access/repos'
import { makeOperation } from '../base'
import { InputId, inputIdSchema } from '../../entities/shared'
import { UserType } from '../../entities/user'
import { makeFindUser } from './find'
import { makeListUsers, ListFilter } from './list-users'

const findUser = makeOperation<InputId, UserType>({
  name: 'MyFindUserOp',
  schema: inputIdSchema,
  execute: makeFindUser,
  dependencies: {
    findById: userRepo.findById,
  },
})

const listUsers = makeOperation<ListFilter, UserType[]>({
  name: 'MyListUsersOp',
  // todo: add validation for ListFilter
  execute: makeListUsers,
  dependencies: {
    findAll: userRepo.findAll,
  },
})

export { findUser, listUsers }
