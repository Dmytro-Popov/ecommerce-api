import { Router } from 'express';
import { getCategories, createCategory } from '../controllers/categories.js';

const router = Router();
router.get('/', getCategories);
router.post('/', createCategory);

export default router;