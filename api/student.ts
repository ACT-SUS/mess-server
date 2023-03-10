import multer from 'multer';
import { Router } from 'express';
import {
    register,
    getAllStudents,
    getStudent,
    requestApproval,
    login,
    billGeneration,
    studentMonthlyStats,
    updateExpense,
} from '../controllers/student';

const router = Router();
const upload = multer();

router.post('/register', register);
router.post('/login', login);
router.post('/request-approval', upload.single('file'), requestApproval);
router.get('/', getAllStudents);
router.get('/:id', getStudent);
router.get('/bill/:id/:month', billGeneration);
router.get('/monthly-stats/:sid', studentMonthlyStats);
router.put('/update-expense/:sid', updateExpense);

export default router;
