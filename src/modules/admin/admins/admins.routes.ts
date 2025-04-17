import { Router } from 'express'
import { adminsController } from './admins.controller'
import { validateBody } from '@/common/middlewares/validate' 
import { authGuard } from '@/common/guard/auth.guard'
import { permissionGuard } from '@/common/guard/role.guard'
import { AdminRoleEnum } from '@/common/enum/admin.enum'
import { 
  inviteAdminSchema, 
  setupPasswordAdminSchema, 
  verifyTokenSchema, 
  forgetPasswordSchema, 
  resetPasswordSchema, 
  querySchema
} from './admins.validator'
import { validateQuery } from '@/common/middlewares/validateRequest'

const router = Router()

router.get('/', authGuard,  validateQuery(querySchema), adminsController.findAllAdmins)
router.post('/invite', authGuard, permissionGuard(AdminRoleEnum.SUPERADMIN), validateBody(inviteAdminSchema), adminsController.inviteAdmin)
router.post('/setup-password', validateBody(setupPasswordAdminSchema), adminsController.setupAccount)
router.post('/verify-token', validateBody(verifyTokenSchema) , adminsController.verifyToken)
router.post('/forget-password', validateBody(forgetPasswordSchema) , adminsController.forgetPassword),
router.post('/reset-password', validateBody(resetPasswordSchema) , adminsController.resetPassword)

export default router
