import { Request, Response, NextFunction } from 'express'
import { uploadToS3 } from './upload.service'

const uploadFile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    
    if (!req.file) {
      res.status(400).json({
        success: false,
        message: 'No file uploaded',
      })
      return
    }

    const folder = req.query.dir as string
    const url = await uploadToS3(req.file, folder)

    res.status(200).json({
      success: true,
      message: 'Upload successfully.',
      data: { url },
    })
  } catch (error) {
    next(error)
  }
}

export const uploadController = {
  uploadFile,
}
