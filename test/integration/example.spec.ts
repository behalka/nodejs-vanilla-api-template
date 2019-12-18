import { expect } from 'chai'
import * as request from 'supertest'
import { app } from '../../src/api/app'

describe('test the tests!', () => {
  it('should pass', () => {
    expect(1 + 1).to.equal(2)
  })

  it('should call the dummy endpoint', () => {
    return request(app.getServer())
      .get('/')
      .expect(200)
  })

  it('should fetch one user via decorated Operation', async () => {
    const res = await request(app.getServer())
      .get('/user')
      .expect(200)
    expect(res.body).to.be.an('object')
    expect(res.body).to.have.property('id', 1)
  })

  it('should fetch users', async () => {
    const res = await request(app.getServer())
      .get('/users')
      .expect(200)
    expect(res.body).to.be.an('array')
    expect(res.body).to.have.lengthOf(2)
  })

  it('should fetch users and admins', async () => {
    const res = await request(app.getServer())
      .get('/allUsers')
      .expect(200)
    expect(res.body).to.be.an('array')
    expect(res.body).to.have.lengthOf(3)
  })
})
