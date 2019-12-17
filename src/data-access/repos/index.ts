import { map, compose, merge } from 'ramda'
import { Model, ModelClass, QueryBuilder } from 'objection'

import { Event } from '../models'
import * as makeBaseRepo from './base-repo'
import { BuildTypes } from 'nexus/dist/core'
// import { QueryBuilder } from 'knex'

// and now we ideally want this type to be mapped to a new "compiled" object
const findById = makeBaseRepo.findById(Event)
const findAll = makeBaseRepo.findAll(Event)
const create = makeBaseRepo.create(Event)

type ModelClassHack<T> = ModelClass<T> & typeof Model
type MyReturnType<
  M extends Model,
  T extends (model: ModelClassHack<M>) => () => QueryBuilder<M>
> = T extends (model: ModelClassHack<M>) => infer R ? R : never

// TODO: downgrade objection and see what happens!!!!

// const x = <T = number>(model) => (id: T) => 5
const myFindAll: MyReturnType<Event, typeof makeBaseRepo.findById> = findById

Promise.resolve(() => myFindAll()).then(events => console.log(events))
// the same issue over
// const compileBaseRepo = <T>(model: ModelClassHack<T>) => ({
//   findById: makeBaseRepo.findById<T>(model),
// })
const eventRepo = {
  findById: makeBaseRepo.findById(Event),
}

// todo: add the generic
type BuiltTypes = { [K in keyof typeof makeBaseRepo]?: ReturnType<makeBaseRepo<Event>[K]> }
const builtTypesForEvent: BuiltTypes = {
  findById,
  create,
  findAll,
}
// return QueryBuilder<Model>
builtTypesForEvent.create({ input: 'fff' })

const compileRepo = model => map(repoFn => repoFn(model))
const compiledForEvent = compileRepo(Event)(makeBaseRepo)
// Promise.resolve(() => findEventById(4).then(event => console.log(event))
// Promise.resolve(() => createForEvent({ name: 'foo' })).then(event => console.log(event))

const composeRepo = model => compose(compileRepo(model), merge)

// fixme:
// export const userRepo = composeRepo(User)(buildBaseRepo, buildUserRepo)
// export const eventRepo = composeRepo(Event)(buildBaseRepo, {})

// module.exports = {
//   userRepo,
//   eventRepo,
// }
