import { BaseModel } from './base'

export class Event extends BaseModel {
  name: string
  ownerId?: number

  static get tableName() {
    return 'event'
  }
}
