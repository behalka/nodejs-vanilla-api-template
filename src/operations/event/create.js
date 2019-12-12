const makeCreateEvent = ({ create }) => async input => {
  // fixme: input validation must be here!
  console.log(input, 'this will be an event')
  return create(input)
}

module.exports = { makeCreateEvent }
