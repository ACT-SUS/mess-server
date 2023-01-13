import { Router } from 'express'
import { getMenu } from '../controllers/setting';

const router = Router()

router.get('/menu', getMenu)
// router.put('/menu', getMenu)

// router.get('/price',);
// router.put('/price',);


// router.get('/sem-cycle',)
// router.put('/sem-cycle',)

export default router;