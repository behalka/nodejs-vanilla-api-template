import { config, ENUMS } from '../../config'
import { log } from '../../utils/logger'
import * as errors from '../../errors'

const formatApiError = (err: errors.ApiError) => {
  const payload: Record<string, any> = {
    message: err.message,
    name: err.name,
    extensions: {
      code: errors.ErrorCodes.GENERIC,
      ...err.extensions,
    },
    // code: err.extensions.code || errors.ErrorCodes.GENERIC,
  }
  if (config.env !== ENUMS.ENVIRONMENT.PROD) {
    payload.stack = err.stack
  }
}

const formatUnknownError = (err: Error) => {
  const payload: Record<string, any> = {
    message: err.message,
    name: err.name,
    code: 'GENERIC',
  }
  if (config.env !== ENUMS.ENVIRONMENT.PROD) {
    payload.stack = err.stack
  }
  return payload
}

const handleKnownError = (err: errors.ApiError, ctx: Api.IKoaCtx): void => {
  log.warn({ err, requestId: ctx.requestId }, 'Known error handled')
  ctx.status = err.extensions.statusCode || 500
  ctx.body = formatApiError(err)
}

const handleUnknownError = (err: Error, ctx: Api.IKoaCtx) => {
  log.error(
    {
      err,
      requestId: ctx.requestId,
      headers: ctx.headers,
      body: ctx.request.body,
    },
    'Unknown error handled',
  )
  ctx.status = 500
  ctx.body = formatUnknownError(err)
}

export const makeErrorHandlerMdw = () => async (ctx, next) => {
  try {
    // eslint-disable-next-line callback-return
    await next()
  } catch (err) {
    if (err instanceof errors.ApiError) {
      return handleKnownError(err, ctx)
    }
    return handleUnknownError(err, ctx)
  }
}
