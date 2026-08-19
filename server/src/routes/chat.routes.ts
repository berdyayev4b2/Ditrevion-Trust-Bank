import { Router } from 'express';
import { sendMessage, getChatHistory, markAsRead } from '../controllers/chat.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();

router.use(authMiddleware);

router.post('/send', sendMessage);
router.get('/history', getChatHistory);
router.post('/mark-read', markAsRead);

export default router;
