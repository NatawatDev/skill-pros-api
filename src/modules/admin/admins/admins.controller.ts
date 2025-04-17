import { Request, Response, NextFunction } from 'express'
import { adminsService } from './admins.service'
import { IQueryAdmins, querySchema } from './admins.validator'


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

const setupAccount = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await adminsService.setupAccount(req)
    res.status(200).json({ success: true, message: 'Account setup successfully', data: result })
  } catch (error) {
    next(error)
  }
}

const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { token, type } = req.body
    const result = await adminsService.validateToken(token, type)
    res.status(200).json({ success: true, message: 'Verify token successfully', data: result })
  } catch (error) {
    next(error)
  }
}

const forgetPassword = async (req: Request, res: Response, next: NextFunction) =>  {
  try {
    await adminsService.sendResetPassword(req)
    res.status(200).json({ success: true, message: 'Reset link sent to your email' })
  } catch (error) {
    next(error)
  }
}

const resetPassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await adminsService.resetPassword(req)
    res.status(200).json({ success: true, message: 'Password reset successful' })
  } catch (error) {
    next(error)
  }
}

const findAllAdmins = async (req: Request, res: Response, next: NextFunction) => {
  try {

    const query = querySchema.parse(req.query)
    const result = await adminsService.findAllAdmins(query)
    
    res.status(200).json({ success: true, data: result })
  } catch (error) {
    next(error)
  }
}


export const adminsController = {
  inviteAdmin,
  setupAccount,
  verifyToken,
  forgetPassword,
  resetPassword,
  findAllAdmins
}