import { Router } from 'express'
import {
  getCategories,
  createCategory,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from '../controllers/categories.js'
import { validate } from '../middleware/index.js'
import {
  idParamsSchema,
  createCategorySchema,
  updateCategorySchema,
} from '../schemas/index.js'

const router = Router()
router.get('/', getCategories)
router.post('/', validate({ body: createCategorySchema }), createCategory)
router.get('/:id', validate({ params: idParamsSchema }), getCategoryById)
router.put(
  '/:id',
  validate({ params: idParamsSchema, body: updateCategorySchema }),
  updateCategory,
)
router.delete('/:id', validate({ params: idParamsSchema }), deleteCategory)
export default router
