import { z } from 'zod'
import { LabStatusEnum } from '@/common/enum/lab.enum'
import { MediaTypeEnum } from '@/common/enum/media.enum'

const attachmentPathSchema = z.object({
  url: z.string().url({ message: 'Invalid URL format' }),
  type: z.nativeEnum(MediaTypeEnum),
})

export const createLabSchema = z.object({
  name: z.string().max(255),
  description: z.string().optional(),
  attachmentPath: attachmentPathSchema.optional(),
})

export const updateLabSchema = z.object({
  name: z.string().max(255).optional(),
  description: z.string().optional(),
  attachmentPath: attachmentPathSchema.optional(),
  status: z.nativeEnum(LabStatusEnum).optional(),
})

export type ICreateLab = z.infer<typeof createLabSchema>
export type IUpdateLab = z.infer<typeof updateLabSchema>
