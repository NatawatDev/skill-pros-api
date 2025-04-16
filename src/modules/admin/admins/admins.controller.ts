import { Request, Response, NextFunction } from 'express'
import { adminsService } from './admins.service'


/**
 * @swagger
 * /api/admin/admins/invite:
 *   post:
 *     summary: Admin login
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               firstname:
 *                 type: string
 *               lastname:
 *                 type: string
 *     responses:
 *       200:
 *         description: invite successful
 *       401:
 *         description: Invalid credentials
 */
const inviteAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const inviter = req.user!
    const result = await adminsService.inviteAdmin(req, inviter)
    res.status(201).json({
      success: true,
      message: 'Admin invited successfully.',
      data: result,
    })
  } catch (err) {
    next(err)
  }
}

/**
 * @swagger
 * /api/admin/admins/setup-password:
 *   post:
 *     summary: Setup password for invited admin
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               inviteToken:
 *                 type: string
 *               password:
 *                 type: string
 *               confirmPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Account setup successful
 *       401:
 *         description: Invalid or expired token
 */
const setupAccount = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await adminsService.setupAccount(req)
    res.status(200).json({ success: true, message: 'Account setup successfully', data: result })
  } catch (error) {
    next(error)
  }
}


/**
 * @swagger
 * /api/admin/admins/verify-token:
 *   post:
 *     summary: Verify Token (Invite / Reset)
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - token
 *               - type
 *             properties:
 *               token:
 *                 type: string
 *               type:
 *                 type: string
 *                 enum: [invite, reset]
 *                 description: Type of token (invite or reset)
 *     responses:
 *       200:
 *         description: Verify token successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     email:
 *                       type: string
 *       401:
 *         description: Invalid or expired token
 */
const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { token, type } = req.body
    const result = await adminsService.validateToken(token, type)
    res.status(200).json({ success: true, message: 'Verify token successfully', data: result })
  } catch (error) {
    next(error)
  }
}

/**
 * @swagger
 * /api/admin/admins/forget-password:
 *   post:
 *     summary: forget password
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Send forget password email successfully
 *       401:
 *         description: Invalid or expired token
 */
const forgetPassword = async (req: Request, res: Response, next: NextFunction) =>  {
  try {
    await adminsService.sendResetPassword(req)
    res.status(200).json({ success: true, message: 'Reset link sent to your email' })
  } catch (error) {
    next(error)
  }
}


/**
 * @swagger
 * /api/admin/admins/reset-password:
 *   post:
 *     summary: Reset password for admin
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               resetPasswordToken:
 *                 type: string
 *               password:
 *                 type: string
 *               confirmPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password reset successful
 *       401:
 *         description: Invalid or expired token
 */
const resetPassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await adminsService.resetPassword(req)
    res.status(200).json({ success: true, message: 'Password reset successful' })
  } catch (error) {
    next(error)
  }
}


export const adminsController = {
  inviteAdmin,
  setupAccount,
  verifyToken,
  forgetPassword,
  resetPassword
}