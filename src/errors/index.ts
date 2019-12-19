/* eslint-disable max-classes-per-file */

interface IApiErrorProps extends Record<string, any> {
  code: string
  statusCode?: number
}

export enum ErrorCodes {
  GENERIC = 'E_INTERNAL_API_ERROR',
  VALIDATION = 'E_VALIDATION_FAILED',
  NOT_FOUND = 'E_ENTITY_NOT_FOUND',
}

export class ApiError extends Error {
  public extensions: Record<string, any>
  /**
   * @param message error message
   * @param props object with additional information -> will be added to .extension field
   */
  constructor(message: string, props?: IApiErrorProps) {
    super(message)
    Error.captureStackTrace(this, this.constructor)
    this.name = this.constructor.name
    this.extensions = {
      ...props,
      name: this.name,
    }
  }
}

export class ValidationError extends ApiError {
  constructor(message = 'Validation failed', props?: IApiErrorProps, validationErrors?: any[]) {
    super(message, {
      code: ErrorCodes.VALIDATION,
      statusCode: 400,
      ...props,
      validationErrors,
    })
  }
}

export class NotFoundError extends ApiError {
  constructor(message = 'Entity not found', props?: IApiErrorProps) {
    super(message, {
      code: ErrorCodes.NOT_FOUND,
      statusCode: 404,
      ...props,
    })
  }
}
