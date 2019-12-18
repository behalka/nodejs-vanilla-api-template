import { User } from '../models'

export const findAllAdmins = () => User.query().where('role', 'admin')

// findAll override from base repo
export const findAll = filter => {
  // filter defaults
  const { usersOnly = true } = filter
  const query = User.query().orderBy('id', 'desc')
  if (usersOnly) {
    query.where('role', 'user')
  }
  return query
}
