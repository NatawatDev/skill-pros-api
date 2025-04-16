import { Request, Response, NextFunction } from 'express'
import { authService } from './auth.service'
import { UnauthorizedException } from '@/common/exceptions'


/**
 * @swagger
 * /api/admin/auth/login:
 *   post:
 *     summary: Admin login
 *     tags: [Admin - Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid credentials
 */
const loginAdmin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const admin = await authService.loginAdmin(req)
    res.status(200).json({ success: true, data: admin, message: 'Login Successfully.' }) 
  } catch (error) {
    next(error)
  }
}


/**
 * @swagger
 * /api/admin/auth/logout:
 *   post:
 *     summary: Logout the current admin
 *     tags: [Admin - Auth]
 *     security:
 *       - bearerAuth: [] 
 *     responses:
 *       200:
 *         description: Logout successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                   example: Logout successfully.
 *       401:
 *         description: Unauthorized (missing or invalid token)
 */
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

/**
 * @swagger
 * /api/admin/auth/refresh-token:
 *   post:
 *     summary: Refresh access token using refresh token
 *     tags: [Admin - Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               refreshToken:
 *                 type: string
 *     responses:
 *       200:
 *         description: New access token issued
 *       401:
 *         description: Invalid or expired refresh token
 */
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