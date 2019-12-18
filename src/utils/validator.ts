import * as Ajv from 'ajv'

// there will be imported schemas etc as in RichUncles codebase (e.g { type: email })
export const ajv = new Ajv()
