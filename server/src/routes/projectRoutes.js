import express from 'express';
import { create, getAll, getById, update, remove, addMember, removeMember, archive } from '../controllers/projectController.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router({ mergeParams: true }); // to allow workspaceId from parent route if needed

router.use(verifyToken);

router.post('/', create);
router.get('/workspace/:workspaceId', getAll);
router.get('/:id', getById);
router.put('/:id', update);
router.delete('/:id', remove);

router.post('/:id/members', addMember);
router.delete('/:id/members/:userId', removeMember);
router.put('/:id/archive', archive);

export default router;
