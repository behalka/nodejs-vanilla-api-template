const Router = require('koa-router')
// this is here only to try the tests
const { User } = require('../data-access/models')

const router = new Router()

// this file is gonna be wayyyyyy longer
router.get('/data', async ctx => {
  const users = await User.query()
  ctx.body = users
})
router.get('/', ctx => {
  ctx.body = { hello: true }
})

module.exports = { router }
