import express from 'express';
import { getUsers, getUserById, updateUser, deleteUser, updateAvatar } from '../controllers/userController.js';
import { verifyToken } from '../middleware/auth.js';
import { authorize } from '../middleware/rbac.js';

const router = express.Router();

router.use(verifyToken);

router.get('/', authorize('admin'), getUsers);
router.get('/:id', getUserById);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
router.put('/:id/avatar', updateAvatar);

export default router;
