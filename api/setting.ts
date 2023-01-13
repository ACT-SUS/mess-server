import { Router } from 'express'
import { getMenu, getPrices, getSemCycle, } from '../controllers/setting';
import { updatePrices, updateMenu, updateSemCycle } from './../controllers/setting';
const router = Router()

router.get('/menu', getMenu)
router.get('/prices', getPrices)
router.get('/semCycle', getSemCycle)

router.put('/menu', updateMenu)
router.put('/prices', updatePrices)
router.put('/semCycle', updateSemCycle)

export default router;