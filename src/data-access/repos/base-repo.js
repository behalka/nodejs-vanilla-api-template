const update = model => (inputs, whereCondition) => {
  return model
    .query()
    .patch(inputs)
    .where(whereCondition)
}

const findAll = model => () => {
  return model.query()
}

module.exports = {
  update,
  findAll,
}
