import { PrismaClient } from '@prisma/client'

import { CustomError } from '@/middlewares/errorHandler'

import {
  CreateUser,
  GetUserUnique,
  UpdateUser,
  UserFollows,
} from '@/utils/types/user'

const prisma = new PrismaClient()

export const getUsersRepo = async () => {
  try {
    const users = await prisma.user.findMany()

    return users
  } catch (error) {
    throw error
  }
}

export const getUserUniqueRepo = async ({
  where,
  select,
  noValidate,
}: GetUserUnique) => {
  try {
    const user = await prisma.user.findUnique({
      where,
      select,
    })

    if (!user && !noValidate) {
      throw new CustomError(404, 'User is not found.')
    }

    return user
  } catch (error) {
    throw error
  }
}

export const createUserRepo = async (payload: CreateUser) => {
  try {
    const user = await prisma.user.create(payload)

    return user
  } catch (error) {
    throw error
  }
}

export const updateUserRepo = async (payload: UpdateUser) => {
  try {
    const user = await prisma.user.update(payload)

    return user
  } catch (error) {
    throw error
  }
}

export const getUserInfoRepo = async (id: string) => {
  try {
    const user = await getUserUniqueRepo({
      where: { id },
      select: {
        id: true,
        username: true,
        profile: {
          select: {
            avatar: true,
            bio: true,
            dob: true,
            headerImage: true,
            location: true,
            name: true,
            website: true,
          },
        },
        followings: {
          select: {
            username: true,
            profile: {
              select: {
                avatar: true,
                name: true,
                bio: true,
              },
            },
          },
        },
        followers: {
          select: {
            username: true,
            profile: {
              select: {
                avatar: true,
                name: true,
                bio: true,
              },
            },
          },
        },
        createdAt: true,
      },
    })

    return user
  } catch (error) {
    throw error
  }
}

export const checkIsFollowingRepo = async ({
  id,
  userId,
}: {
  id: string
  userId: string
}) => {
  try {
    const alreadyFollowing = await getUserUniqueRepo({
      where: {
        id,
        followings: {
          some: { id: userId },
        },
      },
      select: { id: true },
      noValidate: true,
    })

    return alreadyFollowing
  } catch (error) {
    throw error
  }
}

export const followUnfollowRepo = async ({
  id,
  userId,
  alreadyFollowing,
}: UserFollows) => {
  try {
    const res = await updateUserRepo({
      where: { id },
      data: {
        followings: {
          disconnect: alreadyFollowing ? { id: userId } : undefined,
          connect: !alreadyFollowing ? { id: userId } : undefined,
        },
      },
      select: { id: true },
    })

    return res
  } catch (error) {
    throw error
  }
}
