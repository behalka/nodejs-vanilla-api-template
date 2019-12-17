import { InputId } from '../../entities/shared'
import { UserRepoType } from '../../data-access/repos'

type Deps = {
  findById: UserRepoType['findById']
}

export const makeFindUser = ({ findById }: Deps) => async (input: InputId) => {
  const user = await findById(input.id)
  if (!user) {
    throw new Error('not found this user')
  }
  return user
}
