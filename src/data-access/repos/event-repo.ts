import { Event } from '../models'
// EventType should not be defined here ...
// a mapper function that would be a part of entity .. maybe?
// import { EventType } from '../../entities/event'

export const findByOwnerId = (ownerId: number) => Event.query().where('ownerId', ownerId)

export const findByDunno = () => findByOwnerId(1).andWhere('name', 'Dunno')
