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

export async function getCategoryById(req: Request, res: Response) {
  const category = await Category.findById(req.params.id);
  if (!category) {
    return res.status(404).json({ message: 'Category not found' });
  }
  res.json(category);
}

export async function updateCategory(req: Request, res: Response) {
  const category = await Category.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    { new: true, runValidators: true }
  );
  if (!category) {
    return res.status(404).json({ message: 'Category not found' });
  }
  res.json(category);
}

export async function deleteCategory(req: Request, res: Response) {
  const category = await Category.findByIdAndDelete(req.params.id);
  if (!category) {
    return res.status(404).json({ message: 'Category not found' });
  }
  res.status(204).send();
}