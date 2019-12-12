const findById = model => id => model.query().findById(id)
const findAll = model => () => model.query()

const update = model => (inputs, whereCondition) =>
  model
    .query()
    .patch(inputs)
    .where(whereCondition)

module.exports = {
  update,
  findAll,
  findById,
}
