import { JsonSchema } from 'objection'
import { userInputSchema } from '../../entities/user'
import { BaseModel } from './base'

export class User extends BaseModel {
  // thanks to duck-typing this is forced from entities
  // when mapping from User (model) to UserType (entity)
  email: string
  lastName?: string
  firstName?: string
  role: string

  static get tableName() {
    return 'user'
  }

  static get jsonSchema(): JsonSchema {
    return userInputSchema
  }
}
