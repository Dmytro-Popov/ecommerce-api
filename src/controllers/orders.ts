import type { Request, Response } from 'express';
import { Order } from '../models/Order.js';
import { User } from '../models/User.js';
import { Product } from '../models/Product.js';
import { HttpError } from '../middleware/index.js';

type Item = { productId: string; quantity: number };

async function assertUserExists(userId: string) {
  if (!(await User.exists({ _id: userId }))) {
    throw new HttpError(400, 'User does not exist');
  }
}

async function calculateTotal(items: Item[]): Promise<number> {
  const ids = [...new Set(items.map((i) => i.productId))];
  const found = await Product.find({ _id: { $in: ids } });

  if (found.length !== ids.length) {
    throw new HttpError(400, 'One or more products do not exist');
  }

  const prices = new Map(found.map((p) => [p.id, p.price]));
  const sum = items.reduce((acc, i) => acc + prices.get(i.productId)! * i.quantity, 0);
  return Math.round(sum * 100) / 100;
}

export async function getOrders(req: Request, res: Response) {
  const orders = await Order.find();
  res.json(orders);
}

export async function createOrder(req: Request, res: Response) {
  const { userId, products } = req.body;
  await assertUserExists(userId);
  const total = await calculateTotal(products);
  const order = await Order.create({ userId, products, total });
  res.status(201).json(order);
}

export async function getOrderById(req: Request, res: Response) {
  const order = await Order.findById(req.params.id);
  if (!order) {
    throw new HttpError(404, 'Order not found');
  }
  res.json(order);
}

export async function updateOrder(req: Request, res: Response) {
  const data: Record<string, unknown> = {};

  if (req.body.userId !== undefined) {
    await assertUserExists(req.body.userId);
    data.userId = req.body.userId;
  }
  if (req.body.products !== undefined) {
    data.products = req.body.products;
    data.total = await calculateTotal(req.body.products);
  }

  const order = await Order.findByIdAndUpdate(req.params.id, data, {
    new: true,
    runValidators: true,
  });
  if (!order) {
    throw new HttpError(404, 'Order not found');
  }
  res.json(order);
}

export async function deleteOrder(req: Request, res: Response) {
  const order = await Order.findByIdAndDelete(req.params.id);
  if (!order) {
    throw new HttpError(404, 'Order not found');
  }
  res.status(204).send();
}