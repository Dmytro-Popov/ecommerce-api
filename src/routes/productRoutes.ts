import { Router } from 'express';
import {
  getProducts, createProduct, getProductById, updateProduct, deleteProduct,
} from '../controllers/products.js';
import { validate } from '../middleware/index.js';
import {
  idParamsSchema, createProductSchema, updateProductSchema, productsQuerySchema,
} from '../schemas/index.js';

const router = Router();

router.get('/', validate({ query: productsQuerySchema }), getProducts);
router.post('/', validate({ body: createProductSchema }), createProduct);
router.get('/:id', validate({ params: idParamsSchema }), getProductById);
router.put('/:id', validate({ params: idParamsSchema, body: updateProductSchema }), updateProduct);
router.delete('/:id', validate({ params: idParamsSchema }), deleteProduct);

export default router;