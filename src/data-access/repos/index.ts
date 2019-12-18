import { Event, User } from '../models'
import * as makeBaseRepo from './base-repo'
import * as makeEventRepo from './event-repo'
import * as makeUserRepo from './user-repo'

// copypasted stuff
// cannot be done differently with types: https://github.com/Microsoft/TypeScript/issues/28655
// base methods are not even needed I guess
const eventRepo = {
  findById: makeBaseRepo.findById(Event),
  findAll: makeBaseRepo.findAll(Event),
  create: makeBaseRepo.create(Event),
  update: makeBaseRepo.update(Event),
  findAllByIds: makeBaseRepo.findAllByIds(Event),
  ...makeEventRepo,
}

export type EventRepoType = typeof eventRepo

const userRepo = {
  findById: makeBaseRepo.findById(User),
  findAll: makeBaseRepo.findAll(User),
  create: makeBaseRepo.create(User),
  update: makeBaseRepo.update(User),
  findAllByIds: makeBaseRepo.findAllByIds(User),
  ...makeUserRepo,
}

export type UserRepoType = typeof userRepo

export { eventRepo, userRepo }
