import type { Request, Response } from 'express';
import { isValidObjectId } from 'mongoose';
import { Product } from '../models/Product.js';
import { Category } from '../models/Category.js';

async function categoryExists(categoryId: unknown): Promise<boolean> {
  if (typeof categoryId !== 'string' || !isValidObjectId(categoryId)) return false;
  return (await Category.exists({ _id: categoryId })) !== null;
}

export async function getProducts(req: Request, res: Response) {
  const filter: Record<string, unknown> = {};
  const { categoryId } = req.query;
  if (categoryId !== undefined) {
    if (typeof categoryId !== 'string' || !isValidObjectId(categoryId)) {
      return res.status(400).json({ message: 'Invalid categoryId' });
    }
    filter.categoryId = categoryId;
  }
  const products = await Product.find(filter);
  res.json(products);
}

export async function createProduct(req: Request, res: Response) {
  if (!(await categoryExists(req.body.categoryId))) {
    return res.status(400).json({ message: 'Category does not exist' });
  }
  const product = await Product.create(req.body);
  res.status(201).json(product);
}

export async function getProductById(req: Request, res: Response) {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    return res.status(400).json({ message: 'Invalid id' });
  }
  const product = await Product.findById(id);
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }
  res.json(product);
}

export async function updateProduct(req: Request, res: Response) {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    return res.status(400).json({ message: 'Invalid id' });
  }
  if (req.body.categoryId !== undefined && !(await categoryExists(req.body.categoryId))) {
    return res.status(400).json({ message: 'Category does not exist' });
  }
  const product = await Product.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }
  res.json(product);
}

export async function deleteProduct(req: Request, res: Response) {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    return res.status(400).json({ message: 'Invalid id' });
  }
  const product = await Product.findByIdAndDelete(id);
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }
  res.status(204).send();
}