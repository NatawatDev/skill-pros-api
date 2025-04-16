import { Request, Response, NextFunction } from 'express'
import { ForbiddenException } from '@/common/exceptions'
import { AdminRoleEnum } from '@/common/enum/admin.enum'

export const permissionGuard = (requiredRole: AdminRoleEnum) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (req.user?.role !== AdminRoleEnum.SUPERADMIN) {
      throw new ForbiddenException('You do not have permission to access this resource')
    }
    next()
  }
}
