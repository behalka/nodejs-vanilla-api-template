const baseOperation = ({ name }) => operationCallback => async input => {
  const start = Date.now()
  console.log(`Operation ${name} has started!`)
  const result = await operationCallback(input)
  console.log(`Operation ${name} has ended! (time: ${Date.now() - start}ms)`)
  return result
}

module.exports = baseOperation
