import { Request, Response, NextFunction } from 'express'
import { verifyAccessToken } from '@/common/utils/jwt.util'
import { UnauthorizedException } from '@/common/exceptions'
import { JwtPayload } from '../interfaces/jwt-payload.interface'

export const authGuard = (req: Request, res: Response, next: NextFunction) => {
  if ((req as any).isPublic === true) {
    return next()
  }

  const authHeader = req.headers.authorization
  const token = authHeader?.split(' ')[1]

  if (!token) {
    return next(new UnauthorizedException())
  }

  let payload: JwtPayload | undefined
  
  try {
    payload = verifyAccessToken(token)
    req.user = payload
    next()
  } catch (e) {
    next(new UnauthorizedException('Invalid or expired access token'))
  }
  

}
