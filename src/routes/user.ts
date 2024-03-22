import express from 'express'

import { followUnfollowUser, getUserUnique, getUsers } from '@/controllers/user'

import authentication from '@/middlewares/auth'

const router = express.Router()

router
  .get('/', getUsers)
  .get('/:id', getUserUnique)
  .use(authentication)
  .put('/:id/follow/:userId', followUnfollowUser)

export default router
