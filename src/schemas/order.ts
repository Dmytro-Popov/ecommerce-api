import { z } from 'zod';
import { objectId } from './common.js';

const orderItemSchema = z.object({
  productId: objectId,
  quantity: z.number().int().min(1, 'Quantity must be at least 1'),
});

export const createOrderSchema = z.object({
  userId: objectId,
  products: z.array(orderItemSchema).min(1, 'Order must have at least one product'),
});

export const updateOrderSchema = createOrderSchema.partial();