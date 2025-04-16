import { Request, Response, NextFunction } from 'express'

export const validateFileUpload = (req: Request, res: Response, next: NextFunction): void => {
  if (!req.file) {
    res.status(400).json({
      success: false,
      message: 'File is required',
    })
    return
  }

  next()
}
