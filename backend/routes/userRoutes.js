import express from 'express'
import {
  getAllUsers,
  getUserById,
  userLogin,
} from '../controllers/userControler.js'
import { admin, protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/login').post(userLogin)
router.route('/').get(protect, admin, getAllUsers)
router.route('/:id').get(protect, admin, getUserById)

export default router
