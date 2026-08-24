import express from 'express';
import { getAll, markRead, markAllRead, remove } from '../controllers/notificationController.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

router.use(verifyToken);

router.get('/', getAll);
router.put('/read-all', markAllRead);
router.put('/:id/read', markRead);
router.delete('/:id', remove);

export default router;
