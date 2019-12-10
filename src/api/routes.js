const Router = require('koa-router')
const { findUser } = require('../operations/index')

const router = new Router()

// this file is gonna be wayyyyyy longer
router.get('/data', async ctx => {
  // isAdmin could come from Auth validation mdw
  const users = await findUser({ isAdmin: true })
  ctx.body = users
})
router.get('/', ctx => {
  ctx.body = { hello: true }
})

module.exports = { router }
