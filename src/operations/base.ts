import { JsonSchema } from 'objection'
import { log } from '../utils/logger'
import { ajv } from '../utils/validator'

// returns whatever execute function returns
type CompiledOperation<IN, OUT> = (input: IN) => Promise<OUT>
type OperationInput<IN = any, OUT = any> = {
  name: string
  schema?: JsonSchema
  execute: (...args: any[]) => CompiledOperation<IN, OUT>
  // figure out type here
  // should be the first argument of execute
  dependencies: any
}

export const makeOperation = <IN, OUT>(
  props: OperationInput<IN, OUT>,
): CompiledOperation<IN, OUT> => {
  const { name, schema, execute, dependencies } = props
  // the function signature is correct
  const validationFunc = schema ? ajv.compile(schema) : () => true
  const operationCallback = execute(dependencies)

  return async (input: IN) => {
    const start = Date.now()
    // validation
    const valid = validationFunc(input)
    if (!valid) {
      // { validationErrors: validationFunc.errors, operation: name },
      log.warn('Operation input invalid')
      throw new Error('validation errors')
    }

    // todo: sanitize input
    log.info({ operation: name, input }, 'started!')
    const result = await operationCallback(input)
    log.info(
      {
        operation: name,
        timeElapsed: Date.now() - start,
      },
      'ended!',
    )
    return result
  }
}
