/* eslint-disable @typescript-eslint/no-unused-vars, import/no-unused-modules */
import * as Koa from 'koa'
import { ENUMS } from '../../config'

declare global {
  namespace Api {
    export interface IAuthInfo {
      role: ENUMS.ROLE
      userId: string
      email: string
    }

    export interface IKoaCtx extends Koa.Context {
      requestId: string
      auth?: IAuthInfo
    }
  }
}
