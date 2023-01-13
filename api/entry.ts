import { Router } from 'express';
import {
    createEntry,
    entriesToday,
    studentEntries,
} from '../controllers/entry';

const router = Router();

router.post('/create', createEntry);
router.get('/today', entriesToday);
router.get('/student/:id', studentEntries);

export default router;
