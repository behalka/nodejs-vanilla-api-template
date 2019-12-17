import * as pino from 'pino'

const getLogLevel = () => {
  if (process.env.NODE_ENV === 'test') {
    return 'error'
  }
  return 'debug'
}

export const log = pino({
  name: 'pino-logger-name',
  prettyPrint: true,
  level: getLogLevel(),
  serializers: {
    err: pino.stdSerializers.err,
    req: pino.stdSerializers.req,
    res: pino.stdSerializers.res,
  },
})
