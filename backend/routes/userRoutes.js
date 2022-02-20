import express from 'express'

import {
  createUser,
  getAllUsers,
  getUserById,
  userLogin,
} from '../controllers/userControler.js'
import { admin, protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/login').post(userLogin)
router.route('/').get(protect, admin, getAllUsers).post(createUser)
router.route('/:id').get(protect, admin, getUserById)

export default router
