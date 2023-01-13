import { Router } from 'express';
import {
    approvedStudents,
    approveStudent,
    pendingStudents,
    rejectedStudent,
    rejectStudent,
} from '../controllers/admin';

const router = Router();

router.put('/approve/:id', approveStudent);
router.put('/reject/:id', rejectStudent);
router.get('/pending', pendingStudents);
router.get('/approved', approvedStudents);
router.get('/rejected', rejectedStudent);

export default router;
