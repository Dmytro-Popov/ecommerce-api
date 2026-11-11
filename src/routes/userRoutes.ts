import { Router } from 'express';
import {
  getUsers, createUser, getUserById, updateUser, deleteUser,
} from '../controllers/users.js';
import { validate } from '../middleware/index.js';
import { idParamsSchema, createUserSchema, updateUserSchema } from '../schemas/index.js';

const router = Router();

router.get('/', getUsers);
router.post('/', validate({ body: createUserSchema }), createUser);
router.get('/:id', validate({ params: idParamsSchema }), getUserById);
router.put('/:id', validate({ params: idParamsSchema, body: updateUserSchema }), updateUser);
router.delete('/:id', validate({ params: idParamsSchema }), deleteUser);

export default router;