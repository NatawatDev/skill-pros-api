import { Router } from 'express'
import { adminsController } from './admins.controller'
import { validateBody } from '@/common/middlewares/validate'
import { inviteAdminSchema, setupPasswordAdminSchema, verifyInviteTokenSchema } from './admins.validator' 
import { authGuard } from '@/common/guard/auth.guard'
import { permissionGuard } from '@/common/guard/role.guard'
import { AdminRoleEnum } from '@/common/enum/admin.enum'

const router = Router()

router.post('/invite', authGuard, permissionGuard(AdminRoleEnum.SUPERADMIN), validateBody(inviteAdminSchema), adminsController.inviteAdmin)
router.post('/setup-password', validateBody(setupPasswordAdminSchema), adminsController.setupAccount)
router.post('/verify-invite-token', validateBody(verifyInviteTokenSchema) , adminsController.verifyInviteToken)

export default router
