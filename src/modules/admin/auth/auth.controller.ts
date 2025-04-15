import { Request, Response, NextFunction } from 'express'
import { adminService } from './auth.service'


/**
 * @swagger
 * /api/admin/auth/login:
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
    const admin = await adminService.loginAdmin(req)
    res.status(200).json({ success: true, data: admin, message: 'Login Successfully.' }) 
  } catch (error) {
    next(error)
  }
}


export const authController = {
  loginAdmin
}