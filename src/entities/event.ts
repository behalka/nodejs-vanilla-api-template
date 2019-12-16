export type EventInput = {
  name: string
}

// todo: and more stuff
export type EventType = EventInput & {
  ownerId?: number
}

export const eventBaseSchema = {
  type: 'object',
  required: ['name'],
  properties: {
    name: { type: 'string', minLength: 2, maxLength: 64 },
    // todo: shared rules for ids as validation input
    ownerId: { type: 'number', min: 1 },
  },
}
