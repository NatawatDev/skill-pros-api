import { ZodSchema, ZodError } from 'zod'
import { Request, Response, NextFunction } from 'express'

export const validateBody = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      (req as any).validateBody = schema.parse(req.body)
      next()
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({
          success: false,
          message: 'Validation error',
          error: error,
        })
      }
      next(error)
    }
  }
}

export const validateQuery = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      (req as any).validatedQuery = schema.parse(req.query)
      next()
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({
          success: false,
          message: 'Validation error',
          error: error,
        })
      }
      next(error)
    }
  }
}

export const validateParams = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      (req as any).validateParams = schema.parse(req.params)
      next()
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({
          success: false,
          message: 'Validation error',
          error: error,
        })
      }
      next(error)
    }
  }
}
