import { Model, ModelClass } from 'objection'

type ModelClassHack<T extends Model> = ModelClass<T>
// this is for Objection v2
// type ModelClassHack<T> = ModelClass<T> & typeof Model

export const findById = <T extends Model>(model: ModelClassHack<T>) => (id: number) =>
  model.query().findById(id)

export const create = <T extends Model>(model: ModelClassHack<T>) => input =>
  model.query().insert(input)

export const findAll = <T extends Model>(model: ModelClassHack<T>) => () =>
  model.query().orderBy('id', 'desc')

export const findAllByIds = <T extends Model>(model: ModelClassHack<T>) => (ids: number[] = []) =>
  model.query().findByIds(ids)

export const update = <T extends Model>(model: ModelClassHack<T>) => (inputs, whereCondition) =>
  model
    .query()
    .patch(inputs)
    .where(whereCondition)
