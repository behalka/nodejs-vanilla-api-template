/* eslint-disable id-length */
const path = require('path')
const { makeSchema, interfaceType } = require('nexus')
const userSchema = require('./user-schema')
const eventSchema = require('./event-schema')

/**
 * GraphQL schema definition
 * Can (should) be easily spread into multiple files
 * the Koa "router" equivalent
 * should be split into "resolver" files similar as with type-graphql
 * THIS FILE should include interfaces and enums
 */

const Node = interfaceType({
  name: 'Node',
  definition(t) {
    // todo: or this? it's a string ?
    // t.id()
    t.field('id', { type: 'Int' })
    t.resolveType(() => null)
  },
})

const schema = makeSchema({
  types: [Node, ...Object.values(userSchema), ...Object.values(eventSchema)],
  outputs: {
    schema: path.join(__dirname, 'schema.gql'),
  },
})

module.exports = { schema }
