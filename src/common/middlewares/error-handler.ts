import { Request, Response, NextFunction } from 'express'
import { HttpException } from '@/common/exceptions/http-exception'

export default function errorHandler(err: Error, _req: Request, res: Response, _next: NextFunction) {
  let status = 500
  let message = 'Internal server error'

  if (err instanceof HttpException) {
    status = err.statusCode
    message = err.message
  }

  console.error('[Unhandled Error]', err)

  res.status(status).json({
    success: false,
    message,
    error: err
  })
}
