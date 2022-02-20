import express from 'express'

import {
  createUser,
  getAllUsers,
  getUserById,
  userLogin,
  getUserProfile,
  updateUserProfile,
  deleteUserProile,
} from '../controllers/userControler.js'
import { admin, protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/login').post(userLogin)
router
  .route('/profile/:id')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile)
router.route('/').get(protect, admin, getAllUsers).post(createUser)
router
  .route('/:id')
  .get(protect, admin, getUserById)
  .delete(protect, admin, deleteUserProile)

export default router
