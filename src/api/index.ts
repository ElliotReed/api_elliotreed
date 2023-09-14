import express from 'express';

import key from './key';
import email from './email';

const router = express.Router();

router.use('/key', key);
router.use('/send', email);

export default router;
