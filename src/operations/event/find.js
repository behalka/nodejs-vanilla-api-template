const makeFindEvent = ({ findById }) => async ({ id }) => {
  const event = await findById(id)
  if (!event) {
    throw new Error('event not found')
  }
  return event
}

module.exports = {
  makeFindEvent,
}
