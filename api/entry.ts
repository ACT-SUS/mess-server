import { Router } from 'express';
import {
    createEntry,
    entriesToday,
    nonvegEntry,
    studentEntries,
    studentNonvegEntries,
} from '../controllers/entry';

const router = Router();

router.post('/create', createEntry);
router.get('/today', entriesToday);
router.get('/student/:id', studentEntries);

router.post('/nonveg', nonvegEntry);
router.get('/nonveg-entries/:sid', studentNonvegEntries);

export default router;
