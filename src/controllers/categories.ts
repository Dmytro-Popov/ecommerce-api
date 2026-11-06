import type { Request, Response } from 'express';
import { Category } from '../models/Category.js';

export async function getCategories(req: Request, res: Response) {
  const categories = await Category.find();
  res.json(categories);
}

export async function createCategory(req: Request, res: Response) {
  const category = await Category.create({ name: req.body.name });
  res.status(201).json(category);
}