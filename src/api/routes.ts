import * as Router from 'koa-router'
import { findUser, listUsers } from '../operations/user'

const router = new Router()

// this file is gonna be wayyyyyy longer
router.get('/users', async ctx => {
  // isAdmin could come from Auth validation mdw
  const users = await listUsers({ isAdmin: false })
  ctx.body = users
})
router.get('/allUsers', async ctx => {
  // isAdmin could come from Auth validation mdw
  const users = await listUsers({ isAdmin: true })
  ctx.body = users
})
router.get('/user', async ctx => {
  // fixed id = 1
  ctx.body = await findUser({ id: 1 })
})
// router.get('/admin', async ctx => {
//   const users = await findAdmin({ isAdmin: true })
//   ctx.body = users
// })
router.get('/', ctx => {
  ctx.body = { hello: true }
})

export { router }
