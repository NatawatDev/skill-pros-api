import Joi from 'joi'
import { LabStatusEnum } from '@/common/enum/lab.enum'

export const createLabSchema = Joi.object({
  name: Joi.string().max(255).required(),
  description: Joi.string().optional(),
  attachmentPath: Joi.string().optional(),
})

export const updateLabSchema = Joi.object({
  name: Joi.string().max(255),
  description: Joi.string().optional(),
  attachmentPath: Joi.string().optional(),
}).min(1)

export const updateStatusSchema = Joi.object({
  status: Joi.string()
    .valid(LabStatusEnum.PUBLISHED, LabStatusEnum.UNPUBLISHED)
    .required(),
})