import { map, compose, merge } from 'ramda'
import { Event } from '../models'
import * as makeBaseRepo from './base-repo'

const createForEventt = makeBaseRepo.create(Event)
Promise.resolve(() => createForEventt({ name: 'foo' })).then(event => console.log(event))

const compileRepo = model => map(repoFn => repoFn(model))
const composeRepo = model => compose(compileRepo(model), merge)

// fixme:
// export const userRepo = composeRepo(User)(buildBaseRepo, buildUserRepo)
// export const eventRepo = composeRepo(Event)(buildBaseRepo, {})

// module.exports = {
//   userRepo,
//   eventRepo,
// }
