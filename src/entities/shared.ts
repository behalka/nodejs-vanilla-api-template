import { JSONSchema } from 'objection'

export type InputId = {
  id: number
}

export const inputIdSchema: JSONSchema = {
  type: 'object',
  required: ['id'],
  properties: {
    id: { type: 'number', minimum: 1 },
  },
}
