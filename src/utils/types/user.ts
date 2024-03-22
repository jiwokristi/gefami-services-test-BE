import { Prisma } from '@prisma/client'

export type GetUserUnique = {
  where: Prisma.UserWhereUniqueInput
  select?: Prisma.UserSelect
  noValidate?: boolean
}

export type CreateUser = Prisma.UserCreateArgs

export type UpdateUser = Prisma.UserUpdateArgs

export type UserFollows = {
  id: string
  userId: string
  alreadyFollowing: boolean
}
