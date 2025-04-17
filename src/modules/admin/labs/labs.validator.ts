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

export const querySchema = z.object({
  page: z.coerce.number().min(1).default(1),
  limitPerPage: z.coerce.number().min(1).default(10),
  all: z.coerce.boolean().optional(),
  searchText: z.string().optional(),
})

export type IQueryLabs = z.infer<typeof querySchema>

export type ICreateLab = z.infer<typeof createLabSchema>
export type IUpdateLab = z.infer<typeof updateLabSchema>
