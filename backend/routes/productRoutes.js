import express from 'express'
import {
  getProductById,
  getProducts,
  createProduct,
  deleteProduct,
  updateProduct,
} from '../controllers/productControlers.js'
import { admin, protect } from '../middleware/authMiddleware.js'

const router = express.Router()
//
router.route('/').get(getProducts).post(protect, admin, createProduct)

router
  .route('/:id')
  .get(getProductById)
  .delete(protect, admin, deleteProduct)
  .put(protect, admin, updateProduct)

export default router
