import { Router } from 'express'
import { authController } from './auth.controller'
import { validateBody } from '@/common/middlewares/validate'
import { loginAdminSchema } from './auth.validator' 
import { authGuard } from '@/common/guard/auth.guard'

const router = Router()

router.post('/login', validateBody(loginAdminSchema), authController.loginAdmin)
router.post('/logout', authGuard, authController.logoutAdmin)
router.post('/refresh-token', authGuard, authController.refreshAccessToken)


export default router
