import { Router } from 'express';
import {
  getOrders, createOrder, getOrderById, updateOrder, deleteOrder,
} from '../controllers/orders.js';
import { validate } from '../middleware/index.js';
import { idParamsSchema, createOrderSchema, updateOrderSchema } from '../schemas/index.js';

const router = Router();

router.get('/', getOrders);
router.post('/', validate({ body: createOrderSchema }), createOrder);
router.get('/:id', validate({ params: idParamsSchema }), getOrderById);
router.put('/:id', validate({ params: idParamsSchema, body: updateOrderSchema }), updateOrder);
router.delete('/:id', validate({ params: idParamsSchema }), deleteOrder);

export default router;