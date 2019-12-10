// THIS FILE SHOULD HAVE NO IMPORTS ..
/**
 * The userRole options ask for 1) injection 2) there we could actually break the rule and import it
 * @param {Object} input validated user data
 * @param {string} userRole desired
 * @returns {Object} user database object
 */
const buildUser = (input, userRole) => {
  // todo: validate user role
  console.log(userRole, 'has to be one of USER/ADMIN')
  return { ...input, userRole }
}
// typescript type?
// business rules for the entity - e.g. validate the email
// input validation
const userInputSchema = {
  type: 'object',
  required: ['email'],
  properties: {
    email: { type: 'string' },
    firstName: { type: 'string' },
    lastName: { type: 'string' },
    // role: { type: 'string', defaultValue: 'ENUM_VALUE_HERE' },
  },
}

module.exports = {
  // when creating a new user object, this has to be used to validate it
  userInputSchema,
  buildUser,
}
