import { NextFunction, Request, Response } from 'express'

import { authSchema } from '@/utils/validations/auth'

import { comparePassword, hashPassword } from '@/utils/helpers/bcrypt'
import { signToken } from '@/utils/helpers/jwt'

import { CustomError } from '@/middlewares/errorHandler'

import { checkUserExistRepo, registerRepo } from '@/repository/auth'

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const safeParse = authSchema.safeParse(req.body)

    if (safeParse.success) {
      const password = await hashPassword(safeParse.data.password)
      const user = await registerRepo({
        username: safeParse.data.username,
        password,
      })

      res.status(201).json(user)
      return
    }

    throw new CustomError(400, safeParse.error.errors[0].message)
  } catch (error) {
    next(error)
  }
}

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const safeParse = authSchema.safeParse(req.body)

    if (safeParse.success) {
      const user = await checkUserExistRepo(safeParse.data.username)
      if (user) {
        const passwordsMatch = await comparePassword(
          safeParse.data.password,
          user.password,
        )

        if (passwordsMatch) {
          const accessToken = signToken({ id: user.id })
          res.status(200).json({
            accessToken,
            id: user.id,
            username: user.username,
          })
        }
      }

      throw new CustomError(
        401,
        'Oops! It looks like there might be a typo in your email or password.',
      )
    }

    throw new CustomError(400, safeParse.error.errors[0].message)
  } catch (error) {
    next(error)
  }
}
