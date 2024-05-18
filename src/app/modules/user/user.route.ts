import express from 'express';
import { userControllers } from './user.controller';

const router = express.Router();

router.post('/create-user', userControllers.createUser);
router.get('/:id', userControllers.getSingleUser);
router.get('/', userControllers.getAllUsers);

export default router;
