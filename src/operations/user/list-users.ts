import { UserRepoType } from '../../data-access/repos'

type Deps = {
  findAll: UserRepoType['findAll']
}

export type ListFilter = { isAdmin: boolean }

export const makeListUsers = ({ findAll }: Deps) => async ({ isAdmin }: ListFilter) => {
  const usersFilter = { usersOnly: true }
  if (isAdmin) {
    usersFilter.usersOnly = false
  }
  const users = await findAll(usersFilter)
  return users
}
