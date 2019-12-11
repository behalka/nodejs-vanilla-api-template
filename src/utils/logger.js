const pino = require('pino')

// todo: setup and load config
const logger = pino({
  name: 'pino-logger-name',
  prettyPrint: true,
  level: 'debug',
  serializers: {
    err: pino.stdSerializers.err,
    req: pino.stdSerializers.req,
    res: pino.stdSerializers.res,
  },
})

module.exports = logger
