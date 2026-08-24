import express from 'express';
import { create, getAll, getById, update, remove, assign, moveStatus, addComment, toggleChecklist } from '../controllers/taskController.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

router.use(verifyToken);

router.post('/', create);
router.get('/project/:projectId', getAll);
router.get('/:id', getById);
router.put('/:id', update);
router.delete('/:id', remove);

router.put('/:id/assign', assign);
router.put('/:id/status', moveStatus);
router.post('/:id/comments', addComment);
router.put('/:id/checklist', toggleChecklist);

export default router;
