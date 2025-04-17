import { TokenTypeEnum } from '@/common/enum/token.enum'
import { z } from 'zod'

export const inviteAdminSchema = z.object({
  firstname: z.string().max(100),
  lastname: z.string().max(100),
  email: z.string().email(),
  phone: z.string()
})

export const setupPasswordAdminSchema = z.object({
  inviteToken: z.string().max(100),
  password: z.string().min(6),
  confirmPassword: z.string().min(6),
})

export const verifyTokenSchema = z.object({
  token: z.string().max(100),
  type: z.enum([TokenTypeEnum.INVITE, TokenTypeEnum.RESET]),
})

export const forgetPasswordSchema = z.object({
  email: z.string().email(),
})

export const resetPasswordSchema = z.object({
  resetPasswordToken: z.string().max(100),
  password: z.string().min(6),
  confirmPassword: z.string().min(6),
})


export const querySchema = z.object({
  page: z.coerce.number().min(1).default(1),
  limitPerPage: z.coerce.number().min(1).default(10),
  all: z.coerce.boolean().optional(),
  searchText: z.string().optional(),
})

export type IQueryAdmins = z.infer<typeof querySchema>