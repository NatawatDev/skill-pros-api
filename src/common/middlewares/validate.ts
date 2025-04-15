import { Request, Response, NextFunction } from 'express'
import { ObjectSchema } from 'joi'
import { BadRequestException } from '@/common/exceptions/bad-request.exception'

export const validateBody = (schema: ObjectSchema) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, { abortEarly: false })
    if (error) {
      throw new BadRequestException(error.details.map(d => d.message).join(', '))
    }
    next()
  }
}