const findById = model => id => model.query().findById(id)
const findAll = model => () => model.query()

const update = model => (inputs, whereCondition) =>
  model
    .query()
    .patch(inputs)
    .where(whereCondition)

const create = model => input => model.query().insert(input)

module.exports = {
  create,
  update,
  findAll,
  findById,
}
