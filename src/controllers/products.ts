import type { Request, Response } from 'express'
import { Product } from '../models/Product.js'
import { Category } from '../models/Category.js'
import { HttpError } from '../middleware/index.js'

async function categoryExists(categoryId: string): Promise<boolean> {
  return (await Category.exists({ _id: categoryId })) !== null
}

export async function getProducts(req: Request, res: Response) {
  const filter: Record<string, unknown> = {}
  if (req.query.categoryId) {
    filter.categoryId = req.query.categoryId
  }
  const products = await Product.find(filter)
  res.json(products)
}

export async function createProduct(req: Request, res: Response) {
  if (!(await categoryExists(req.body.categoryId))) {
    return res.status(400).json({ message: 'Category does not exist' })
  }
  const product = await Product.create(req.body)
  res.status(201).json(product)
}

export async function getProductById(req: Request, res: Response) {
  const { id } = req.params
  const product = await Product.findById(id)
  if (!product) {
    throw new HttpError(404, 'Category not found')
  }
  res.json(product)
}

export async function updateProduct(req: Request, res: Response) {
  const { id } = req.params
  if (
    req.body.categoryId !== undefined &&
    !(await categoryExists(req.body.categoryId))
  ) {
    return res.status(400).json({ message: 'Category does not exist' })
  }
  const product = await Product.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  })
  if (!product) {
    throw new HttpError(404, 'Category not found')
  }
  res.json(product)
}

export async function deleteProduct(req: Request, res: Response) {
  const { id } = req.params
  const product = await Product.findByIdAndDelete(id)
  if (!product) {
    throw new HttpError(404, 'Category not found')
  }
  res.status(204).send()
}
