import * as dotenv from 'dotenv'

dotenv.config()

// eslint-disable-next-line import/first
import { mergeDeepRight } from 'ramda'
// eslint-disable-next-line import/first
import * as ENUMS from './enums'
// eslint-disable-next-line import/first
import * as overrides from './envs'

const parseBoolEnvVar = (value: string, defaultValue = false): boolean =>
  value ? value.toLowerCase() === 'true' : defaultValue

const env = (process.env.NODE_ENV || ENUMS.ENVIRONMENT.LOCAL) as ENUMS.ENVIRONMENT
const envConfig = overrides && overrides[env] ? overrides[env] : {}

const defaultConfig = {
  env,
  api: {
    port: 3000,
  },
  database: {
    host: 'localhost',
    user: 'postgres',
    password: 'postgres',
    database: 'vanilla-template-db',
  },
  logging: {
    logLevel: process.env.LOG_LEVEL || 'debug',
  },
}

// copied from TypeORM
type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends Array<infer U>
    ? Array<DeepPartial<U>>
    : T[P] extends ReadonlyArray<infer U>
    ? ReadonlyArray<DeepPartial<U>>
    : DeepPartial<T[P]>
}
type ConfigShape = typeof defaultConfig

export type ConfigOverride = DeepPartial<ConfigShape>

const config: ConfigShape = mergeDeepRight(defaultConfig, envConfig)

export { ENUMS, config }
