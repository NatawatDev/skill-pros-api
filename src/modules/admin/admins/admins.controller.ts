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
 * /api/admin/admins/verify-invite-token:
 *   post:
 *     summary: Verify Invite Token
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
 *     responses:
 *       200:
 *         description: Validate invite token successfully
 *       401:
 *         description: Invalid or expired token
 */
const verifyInviteToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await adminsService.verifyInviteToken(req)
    res.status(200).json({ success: true, message: 'Validate invite token successfully', data: result })
  } catch (error) {
    next(error)
  }
}

export const adminsController = {
  inviteAdmin,
  setupAccount,
  verifyInviteToken
}