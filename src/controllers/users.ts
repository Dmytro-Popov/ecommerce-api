import type { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { User } from '../models/User.js';
import { HttpError } from '../middleware/index.js';

export async function getUsers(req: Request, res: Response) {
  const users = await User.find();
  res.json(users);
}

export async function createUser(req: Request, res: Response) {
  const { name, email, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashed });
  res.status(201).json(user);
}

export async function getUserById(req: Request, res: Response) {
  const user = await User.findById(req.params.id);
  if (!user) {
    throw new HttpError(404, 'User not found');
  }
  res.json(user);
}

export async function updateUser(req: Request, res: Response) {
  const data = { ...req.body };
  if (data.password) {
    data.password = await bcrypt.hash(data.password, 10);
  }
  const user = await User.findByIdAndUpdate(req.params.id, data, {
    new: true,
    runValidators: true,
  });
  if (!user) {
    throw new HttpError(404, 'User not found');
  }
  res.json(user);
}

export async function deleteUser(req: Request, res: Response) {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) {
    throw new HttpError(404, 'User not found');
  }
  res.status(204).send();
}