import { Model } from 'objection'

interface BaseModelCtor<T extends Model> {
  new (...args: any[]): T
}

export const findById = <R extends Model, T extends { new (...args: any[]): R }>(
  model: T,
) => id => {
  // nope
  console.log(model.query())
  // this works
  console.log(new model().$query())
}

export const findAll = model => () => model.query().orderBy('id', 'desc')

export const findAllByIds = model => (ids = []) => model.query().findByIds(ids)

export const update = model => (inputs, whereCondition) =>
  model
    .query()
    .patch(inputs)
    .where(whereCondition)

// at least this recognises .query()
export const create = <T extends typeof Model = any>(model: T) => input =>
  model.query().insert(input)
