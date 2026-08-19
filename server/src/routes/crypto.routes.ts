import { Router } from 'express';
import { getPrices, buyCrypto, sellCrypto, getCryptoWallet } from '../controllers/crypto.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();

router.get('/prices', getPrices);

router.use(authMiddleware);

router.post('/buy', buyCrypto);
router.post('/sell', sellCrypto);
router.get('/wallet', getCryptoWallet);

export default router;
