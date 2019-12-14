const makeListEvents = ({ findAll }) => async () => {
  const events = await findAll()
  return events
}

module.exports = {
  makeListEvents,
}
