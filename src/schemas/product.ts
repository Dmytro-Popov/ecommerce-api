import { z } from 'zod';
import { objectId } from './common.js';

export const createProductSchema = z.object({
  name: z.string().trim().min(1, 'Name is required'),
  description: z.string().optional(),
  price: z.number().min(0, 'Price must be 0 or more'),
  categoryId: objectId,
});

export const updateProductSchema = createProductSchema.partial();

export const productsQuerySchema = z.object({
  categoryId: objectId.optional(),
});