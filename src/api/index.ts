import express from 'express';

import weatherton from './weatherton';
import email from './email';

const router = express.Router();

router.use('/weatherton', weatherton);
router.use('/send', email);

export default router;
