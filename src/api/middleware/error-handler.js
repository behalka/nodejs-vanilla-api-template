const log = require('../../utils/logger')

const formatUnknownError = err => {
  const payload = {
    message: err.message,
    name: err.name,
    code: 'GENERIC',
  }
  // if (config.env !== ENVIRONMENT.PROD) {
  //   payload.stack = err.stack
  // }
  // todo: return correlation id in prod
  return payload
}

// todo: provide knownErrorHandler

const handleUnknownError = (err, ctx) => {
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

const makeErrorHandlerMdw = () => async (ctx, next) => {
  try {
    // eslint-disable-next-line callback-return
    await next()
  } catch (err) {
    // if (err instanceof ApiError) {
    //   return handleKnownError(err, ctx)
    // }
    return handleUnknownError(err, ctx)
  }
}

module.exports = {
  makeErrorHandlerMdw,
}
