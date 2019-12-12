const pino = require('pino')

const getLogLevel = () => {
  if (process.env.NODE_ENV === 'test') {
    return 'error'
  }
  return 'debug'
}

// todo: setup and load config
const logger = pino({
  name: 'pino-logger-name',
  prettyPrint: true,
  level: getLogLevel(),
  serializers: {
    err: pino.stdSerializers.err,
    req: pino.stdSerializers.req,
    res: pino.stdSerializers.res,
  },
})

module.exports = logger
