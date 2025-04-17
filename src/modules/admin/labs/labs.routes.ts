import { Router } from 'express'
import { labsController } from './labs.controller'
import { validateBody } from '@/common/middlewares/validateRequest'
import { createLabSchema, updateLabSchema } from './labs.validator'
import { authGuard } from '@/common/guard/auth.guard'

const router = Router()

router.post('/', authGuard, validateBody(createLabSchema), labsController.createLab)
router.get('/', authGuard, labsController.getAllLabs)
router.get('/:id', authGuard, labsController.getLabsById)
router.patch('/:id', authGuard, validateBody(updateLabSchema), labsController.updateLab)
router.delete('/:id', authGuard, labsController.deleteLab)
router.patch('/publish/:id', authGuard, labsController.publishLab)
router.patch('/unpublish/:id', authGuard, labsController.unpublishLab)

export default router
