import { Router } from 'express'
import { labsController } from './labs.controller'
import { validateBody } from '@/common/middlewares/validate'
import { createLabSchema, updateLabSchema, updateStatusSchema } from './labs.validator'
import { authGuard } from '@/common/guard/auth.guard'

const router = Router()

router.post('/', authGuard, validateBody(createLabSchema), labsController.createLab)
router.get('/', authGuard, labsController.getAllLabs)
router.get('/:id', authGuard, labsController.getLabsById)
router.patch('/:id', authGuard, validateBody(updateLabSchema), labsController.updateLab)
router.delete('/:id', authGuard, labsController.deleteLab)
router.patch('/:id/status', authGuard, validateBody(updateStatusSchema), labsController.updateLabStatus)

export default router
