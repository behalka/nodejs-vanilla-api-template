const { expect } = require('chai')
const { gql } = require('apollo-server-koa')
const request = require('supertest')
const app = require('../../src/api/app')

const query = `
  query FindEvent($id: Int!) {
    event(id: $id) {
      id
      name
    }
  }
`

describe('test graphql query!', () => {
  it('calls the graphql endpoint with a query', async () => {
    const res = await request(app.getServer())
      .post('/graphql')
      .send({
        query,
        variables: { id: 1 },
      })
      .expect(200)
    const event = res.body.data.event
    expect(event).to.have.property('id', 1)
  })

  it('calls the graphql endpoint with invalid id input', async () => {
    const res = await request(app.getServer())
      .post('/graphql')
      .send({
        query,
        variables: { id: 0 },
      })
      .expect(200)
    expect(res.body.errors)
      .to.be.an('array')
      .with.lengthOf(1)
    const [err] = res.body.errors
    expect(err).to.have.property('message', 'there were validation errors')
  })
})
