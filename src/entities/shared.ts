export type InputId = {
  id: number
}

export const inputIdSchema = {
  type: 'object',
  required: ['id'],
  properties: {
    id: { type: 'number', minimum: 1 },
  },
}

// module.exports = {
//   inputIdSchema,
// }
