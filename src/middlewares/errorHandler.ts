import { NextFunction, Request, Response } from 'express'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { JsonWebTokenError } from 'jsonwebtoken'

export class CustomError extends Error {
  code: number

  constructor(code: number, message: string) {
    super(message)
    this.code = code
  }
}

const errorHandler = (
  error: CustomError | PrismaClientKnownRequestError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log('ERROR HANDLER ----->', error)

  let status: number
  let errorMessage: string

  if (error instanceof JsonWebTokenError) {
    status = 401
    errorMessage = error.message
  } else if (error instanceof PrismaClientKnownRequestError) {
    switch (error.code) {
      case 'P2002':
        status = 409
        errorMessage = `Unique constraint error in: ${(
          error.meta?.target as string[]
        )?.join(', ')}.`
        break
      case 'P2025':
        // Error from the child ID not being found.
        status = 404
        errorMessage =
          'An operation failed because it depends on one or more records that were required but not found. Expected 1 records to be connected, found only 0.'
        break
      case 'P2016':
        // Error from the parent ID not being found.
        status = 404
        errorMessage =
          'Required exactly one parent ID to be present for connect query, found 0.'
        break
      case 'P2024':
        status = 408
        errorMessage = 'Request Timeout. Please try again.'
        break

      default:
        status = 500
        errorMessage =
          'We apologize, but it appears that something unexpected occurred.'
        break
    }
  } else if (error instanceof CustomError) {
    status = error.code
    errorMessage = error.message
  } else {
    status = 500
    errorMessage =
      'We apologize, but it appears that something unexpected occurred.'
  }

  res.status(status).json({ status, error: errorMessage })
}

export default errorHandler
