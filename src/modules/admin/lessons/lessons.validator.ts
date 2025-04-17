import { z } from 'zod'
import { MediaTypeEnum } from '@/common/enum/media.enum'
import { LabStatusEnum } from '@/common/enum/lab.enum'

const attachmentPathSchema = z.object({
  url: z.string().url({ message: 'Invalid URL format' }),
  type: z.nativeEnum(MediaTypeEnum),
})

export const createLessonSchema = z.object({
  title: z.string(),
  content: z.string().optional(),
  attachmentPath: attachmentPathSchema.optional(),
  order: z.number().default(0),
  status: z.nativeEnum(LabStatusEnum).optional(),
})

export const createLessonListSchema = z.array(createLessonSchema).min(1)

export const updateLessonSchema = z.object({
  title: z.string().optional(),
  content: z.string().optional(),
  attachmentPath: attachmentPathSchema.optional(),
  order: z.number().optional(),
  status: z.nativeEnum(LabStatusEnum).optional(),
})


export type ILesson = z.infer<typeof createLessonSchema>
export type ILessonList = z.infer<typeof createLessonListSchema>