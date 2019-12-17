import { Event, User } from '../models'
import * as makeBaseRepo from './base-repo'
import * as makeEventRepo from './event-repo'
import * as makeUserRepo from './user-repo'

// copypasted stuff
// cannot be done differently with types: https://github.com/Microsoft/TypeScript/issues/28655
// base methods are not even needed I guess
const eventRepo = {
  findById: makeBaseRepo.findById<Event>(Event),
  findAll: makeBaseRepo.findAll<Event>(Event),
  create: makeBaseRepo.create<Event>(Event),
  update: makeBaseRepo.update<Event>(Event),
  findAllByIds: makeBaseRepo.findAllByIds<Event>(Event),
  ...makeEventRepo,
}

export type EventRepoType = typeof eventRepo

const userRepo = {
  findById: makeBaseRepo.findById<User>(User),
  findAll: makeBaseRepo.findAll<User>(User),
  create: makeBaseRepo.create<User>(User),
  update: makeBaseRepo.update<User>(User),
  findAllByIds: makeBaseRepo.findAllByIds<User>(User),
  ...makeUserRepo,
}

export type UserRepoType = typeof userRepo

export { eventRepo, userRepo }
