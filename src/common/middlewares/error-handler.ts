import { Request, Response, NextFunction } from 'express'
import { HttpException } from '@/common/exceptions/http-exception'

export default function errorHandler(err: any, req: Request, res: Response, next: NextFunction): Response {
  const status = err.statusCode || 500
  const message = status === 500 ? 'Internal server error' : err.message || 'Unexpected error'

  console.error('[Unhandled Error]', err)

  return res.status(status).json({
    success: false,
    message,
    error: err || null,
  })
}