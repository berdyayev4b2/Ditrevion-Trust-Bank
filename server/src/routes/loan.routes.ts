import { Router } from 'express';
import { applyLoan, getLoanStatus, calculateLoanEMI, repayLoan } from '../controllers/loan.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();

router.get('/calculate', calculateLoanEMI);

router.use(authMiddleware);

router.post('/apply', applyLoan);
router.get('/status', getLoanStatus);
router.post('/repay', repayLoan);

export default router;
