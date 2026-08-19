import { Router } from 'express';
import { sendMoney, getTransferHistory, getReceipt } from '../controllers/transfer.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();

router.use(authMiddleware);

router.post('/send', sendMoney);
router.get('/history', getTransferHistory);
router.get('/receipt/:receiptId', getReceipt);

export default router;
