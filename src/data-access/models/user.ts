import { JSONSchema } from 'objection'
import { userInputSchema } from '../../entities/user'
import { BaseModel } from './base'

export class User extends BaseModel {
  // todo: we have to add class properties now :o

  static get tableName() {
    return 'user'
  }

  static get jsonSchema(): JSONSchema {
    return userInputSchema
  }
}
