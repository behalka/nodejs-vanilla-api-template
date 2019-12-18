import * as pino from 'pino'
import { config } from '../config'

export const log = pino({
  name: 'pino-logger-name',
  prettyPrint: true,
  level: config.logging.logLevel,
  serializers: {
    err: pino.stdSerializers.err,
    req: pino.stdSerializers.req,
    res: pino.stdSerializers.res,
  },
})
