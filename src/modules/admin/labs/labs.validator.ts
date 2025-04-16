import Joi from 'joi'
import { LabStatusEnum } from '@/common/enum/lab.enum'
import { MediaTypeEnum } from '@/common/enum/media.enum'

export interface IUpdateLab {
  name?: string
  description?: string
  attachmentPath?: IAttachmentPath
  status?: LabStatusEnum
}

interface IAttachmentPath {
  url: string,
  type: MediaTypeEnum
}

const attachmentPathSchema = Joi.object({
  url: Joi.string().required(),
  type: Joi.string().valid(...Object.values(MediaTypeEnum))
})

export const createLabSchema = Joi.object({
  name: Joi.string().max(255).required(),
  description: Joi.string().optional(),
  attachmentPath: attachmentPathSchema.optional(),
})

export const updateLabSchema = Joi.object({
  name: Joi.string().max(255),
  description: Joi.string().optional(),
  attachmentPath: attachmentPathSchema.optional(),
}).min(1)
