import express from 'express';
import { getStats, getRecentActivity } from '../controllers/dashboardController.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

router.use(verifyToken);

router.get('/stats', getStats);
router.get('/activity', getRecentActivity);

export default router;
