const { expect } = require('chai')
const request = require('supertest')
const app = require('../../src/api/app')

describe('test the tests!', () => {
  it('should pass', () => {
    expect(1 + 1).to.equal(2)
  })

  it('should call the dummy endpoint', () => {
    return request(app.getServer())
      .get('/')
      .expect(200)
  })

  it('should fetch some data via decorated Operation', async () => {
    const res = await request(app.getServer())
      .get('/data')
      .expect(200)
    expect(res.body).to.be.an('array')
    expect(res.body).to.have.lengthOf.greaterThan(0)
  })

  it('should fetch admins via decorated Operation', async () => {
    const res = await request(app.getServer())
      .get('/admin')
      .expect(200)
    expect(res.body).to.be.an('array')
    expect(res.body).to.have.lengthOf(1)
  })
})
