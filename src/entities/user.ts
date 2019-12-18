// THIS FILE SHOULD HAVE NO IMPORTS ..
import { JSONSchema } from 'objection'

export type UserType = {
  email: string
  firstName?: string
  lastName?: string
}

/**
 * The userRole options ask for 1) injection 2) there we could actually break the rule and import it
 * @param {Object} input validated user data
 * @param {string} userRole desired
 * @returns {Object} user database object
 */
export const buildUser = (input, userRole) => {
  // todo: validate user role
  console.log(userRole, 'has to be one of USER/ADMIN')
  return { ...input, userRole }
}

// typescript type?
// business rules for the entity - e.g. validate the email
// input validation
export const userInputSchema: JSONSchema = {
  type: 'object',
  required: ['email'],
  properties: {
    email: { type: 'string' },
    firstName: { type: 'string' },
    lastName: { type: 'string' },
    // role: { type: 'string', defaultValue: 'ENUM_VALUE_HERE' },
  },
}

// module.exports = {
//   // when creating a new user object, this has to be used to validate it
//   userInputSchema,
//   buildUser,
// }
