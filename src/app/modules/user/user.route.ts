import express from 'express';
import { userControllers } from './user.controller';

const router = express.Router();

router.post('/create-user', userControllers.createUser);
router.get('/', userControllers.getAllUsers);
router
  .route('/:id')
  .get(userControllers.getSingleUser)
  .delete(userControllers.deleteUser);

export default router;
