import { Request, Response, NextFunction } from 'express'
import { Schema } from 'joi'
import { BadRequestException } from '@/common/exceptions/bad-request.exception'

export const validateBody = (schema: Schema) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    })

    if (error) {
      throw new BadRequestException(error.details.map(d => d.message).join(', '))
    }

    req.body = value
    next()
  }
}
