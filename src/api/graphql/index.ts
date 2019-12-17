/* eslint-disable id-length */
import * as path from 'path'
import { makeSchema, interfaceType } from 'nexus'
import * as userSchema from './user-schema'
import * as eventSchema from './event-schema'

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

export const schema = makeSchema({
  types: [Node, ...Object.values(userSchema), ...Object.values(eventSchema)],
  outputs: {
    schema: path.join(__dirname, 'schema.gql'),
  },
})
