import { TokenTypeEnum } from '@/common/enum/token.enum'
import { IPaginate } from '@/services/pagination/pagination.interface'
import Joi from 'joi'
import { z } from 'zod'

export const inviteAdminSchema = Joi.object({
  firstname: Joi.string().max(100).required(),
  lastname: Joi.string().max(100).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required()
})

export const setupPasswordAdminSchema = Joi.object({
  inviteToken: Joi.string().max(100).required(),
  password: Joi.string().min(6).required(),
  confirmPassword: Joi.string().min(6).required()
}) 


export const verifyTokenSchema = Joi.object({
  token: Joi.string().max(100).required(),
  type: Joi.string().valid(...Object.values(TokenTypeEnum)).required(),
}) 

export const forgetPasswordSchema = Joi.object({
  email: Joi.string().email().required()
}) 

export const resetPasswordSchema = Joi.object({
  resetPasswordToken: Joi.string().max(100).required(),
  password: Joi.string().min(6).required(),
  confirmPassword: Joi.string().min(6).required(),
})

// export interface IQueryAdmins extends IPaginate {
//   searchText?: string
// }

// export const querySchema = Joi.object({
//   searchText: Joi.string().optional(),
//   page: Joi.number().required().min(1),
//   limitPerPage: Joi.number().required().min(1),
//   all: Joi.boolean().optional()
// })

export const querySchema = z.object({
  page: z.coerce.number().min(1).default(1),
  limitPerPage: z.coerce.number().min(1).default(10),
  all: z.coerce.boolean().optional(),
  searchText: z.string().optional(),
})

export type IQueryAdmins = z.infer<typeof querySchema>