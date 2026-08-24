import express from 'express';
import { send, getConversation, getWorkspaceMessages, remove, markAsRead } from '../controllers/messageController.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

router.use(verifyToken);

router.post('/', send);
router.get('/workspace/:workspaceId', getWorkspaceMessages);
router.get('/workspace/:workspaceId/user/:userId', getConversation);
router.delete('/:id', remove);
router.put('/workspace/:workspaceId/read', markAsRead);

export default router;
