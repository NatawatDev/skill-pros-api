import { Request, Response, NextFunction } from 'express'
import { authService } from './auth.service'
import { UnauthorizedException } from '@/common/exceptions'


const loginAdmin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const admin = await authService.loginAdmin(req)
    res.status(200).json({ success: true, data: admin, message: 'Login Successfully.' }) 
  } catch (error) {
    next(error)
  }
}

const logoutAdmin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    console.log('user', req.user)
    const userId = req.user?.userId

    if (!userId) {
      throw new UnauthorizedException('Missing user information')
    }
    
    await authService.logoutAdmin(userId)
    res.status(200).json({
      success: true,
      message: 'Logout successfully.',
    })
  } catch (error) {
    next(error)
  }
}

const refreshAccessToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { refreshToken } = req.body

    if (!refreshToken) {
      throw new UnauthorizedException('Missing refresh token')
    }

    const result = await authService.refreshAccessToken(refreshToken)

    res.status(200).json({
      success: true,
      message: 'Token refreshed successfully.',
      data: result,
    })
  } catch (error) {
    next(error)
  }
}


export const authController = {
  loginAdmin,
  logoutAdmin,
  refreshAccessToken
}