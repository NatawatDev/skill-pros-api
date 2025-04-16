import { Request, Response, NextFunction } from 'express'
import { ForbiddenException } from '@/common/exceptions'

export const adminRoleGuard = (requiredRole: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (req.user?.role !== requiredRole) {
      throw new ForbiddenException('You do not have permission to access this resource')
    }
    next()
  }
}
