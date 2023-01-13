import { Router } from 'express';
import { pushNotification, subscribeNotification } from '../controllers/notification';

const router = Router();

router.post('/send', pushNotification);
router.post('/subscribe', subscribeNotification)

export default router;
