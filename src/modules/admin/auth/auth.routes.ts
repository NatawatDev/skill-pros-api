import { Router } from 'express'
import { authController } from './auth.controller'
import { validateBody } from '@/common/middlewares/validate'
import { loginAdminSchema } from './auth.validator'

const router = Router()

router.post('/login', validateBody(loginAdminSchema), authController.loginAdmin)


export default router
