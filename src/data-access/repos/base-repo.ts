import { Model, ModelClass } from 'objection'
import { Event } from '../models'

interface BaseModelCtor<T extends Model> {
  new (...args: any[]): T
}

// export const findById = <R extends Model>(model: R) => id => {
//   // nope
//   console.log(model)
// }
type ModelClassHack<T> = ModelClass<T> & typeof Model

export const findById = <T extends Model>(model: ModelClass<T> & typeof Model) => id =>
  model.query<T>().findById(id)

export const create = <T extends Model>(model: ModelClassHack<T>) => input =>
  model.query().insert(input)

export const findAll = <T extends Model>(model: ModelClassHack<T>) => () =>
  model.query().orderBy('id', 'desc')

// export const findAllByIds = model => (ids = []) => model.query().findByIds(ids)

// export const update = model => (inputs, whereCondition) =>
//   model
//     .query()
//     .patch(inputs)
//     .where(whereCondition)

// at least this recognises .query()
