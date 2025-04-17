import Joi from 'joi'
import { MediaTypeEnum } from '@/common/enum/media.enum'
import { LabStatusEnum } from '@/common/enum/lab.enum'

export interface ILesson {
  title: string
  content?: string
  attachmentPath?: { url: string, type: MediaTypeEnum }
  order?: number
  status?: LabStatusEnum
}

const attachmentPathSchema = Joi.object({
  url: Joi.string().required(),
  type: Joi.string().valid(...Object.values(MediaTypeEnum)).required()
})

const createLessonSchema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().optional(),
  attachmentPath: attachmentPathSchema.optional(),
  order: Joi.number().default(0),
  status: Joi.string().valid(...Object.values(LabStatusEnum)).optional(),
})

export const createLessonListSchema = Joi.array()
  .items(createLessonSchema)
  .min(1)
  .required()

export const updateLessonSchema = Joi.object({
  title: Joi.string().optional(),
  content: Joi.string().optional(),
  attachmentPath: attachmentPathSchema.optional(),
  order: Joi.number().default(0),
  status: Joi.string().valid(...Object.values(LabStatusEnum)).optional(),
})