import { createUserRepo, getUserUniqueRepo } from './user'

export const registerRepo = async ({
  username,
  password,
}: {
  username: string
  password: string
}) => {
  try {
    const user = await createUserRepo({
      data: {
        username,
        password,
        profile: {
          create: {
            name: username,
          },
        },
      },
    })

    return user
  } catch (error) {
    throw error
  }
}

export const checkUserExistRepo = async (username: string) => {
  try {
    const existingUser = await getUserUniqueRepo({
      where: {
        username,
      },
      select: {
        id: true,
        password: true,
        username: true,
      },
      noValidate: true,
    })

    return existingUser
  } catch (error) {
    throw error
  }
}
