const stop = getServerHandler => async () => {
  const server = getServerHandler()
  if (server && server.listening) {
    await new Promise(done => server.close(done))
  }
  console.log('server closed')
}

const start = (koaApp, setServerHandler) => async () => {
  // signal handlers
  await new Promise(done => {
    const server = koaApp.listen(3000, done)
    setServerHandler(server)
  })
  console.log('server has started')
}

module.exports = {
  start,
  stop,
}
