import express from 'express';
import { create, getAll, getById, update, remove, inviteMember, removeMember, getMembers } from '../controllers/workspaceController.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

router.use(verifyToken);

router.post('/', create);
router.get('/', getAll);
router.get('/:id', getById);
router.put('/:id', update);
router.delete('/:id', remove);

router.post('/:id/invite', inviteMember);
router.get('/:id/members', getMembers);
router.delete('/:id/members/:userId', removeMember);

export default router;
