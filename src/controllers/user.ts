import { NextFunction, Request, Response } from 'express'

import {
  checkIsFollowingRepo,
  followUnfollowRepo,
  getUsersRepo,
  getUserInfoRepo,
} from '@/repository/user'

export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const users = await getUsersRepo()

    res.status(200).json(users)
  } catch (error) {
    next(error)
  }
}

export const getUserUnique = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params

    const user = await getUserInfoRepo(id)

    res.status(200).json(user)
  } catch (error) {
    next(error)
  }
}

export const followUnfollowUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id, userId } = req.params

    const alreadyFollowing = await checkIsFollowingRepo({ id, userId })

    if (alreadyFollowing) {
      const unfollow = await followUnfollowRepo({
        id,
        userId,
        alreadyFollowing: !!alreadyFollowing,
      })

      res
        .status(200)
        .json({ message: 'Successfully unfollowed user.', id: unfollow.id })
      return
    }

    const follow = await followUnfollowRepo({
      id,
      userId,
      alreadyFollowing: !!alreadyFollowing,
    })

    res
      .status(200)
      .json({ message: 'Successfully followed user.', id: follow.id })
  } catch (error) {
    next(error)
  }
}
