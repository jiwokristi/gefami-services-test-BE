import { NextFunction, Request, Response } from 'express'

import { verifyToken } from '@/utils/helpers/jwt'

import { CustomError } from './errorHandler'

export default async function authentication(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { authorization } = req.headers

    if (authorization) {
      const tokenVerified = verifyToken(authorization.split(' ')[1])

      // @ts-ignore
      req.user = tokenVerified.id
      next()
      return
    }

    throw new CustomError(401, 'Please login first.')
  } catch (error) {
    next(error)
  }
}
