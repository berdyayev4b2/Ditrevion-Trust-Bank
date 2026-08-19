import { Router } from 'express';
import { getAccount, getBalance, getTransactionHistory, updateProfile, verifyKYC } from '../controllers/account.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();

router.use(authMiddleware);

router.get('/me', getAccount);
router.get('/balance', getBalance);
router.get('/transactions', getTransactionHistory);
router.put('/profile', updateProfile);
router.post('/verify-kyc', verifyKYC);

export default router;
