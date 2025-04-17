import { z } from 'zod'

const choiceSchema = z.object({
  value: z.string(),
  text: z.string(),
})

export const questionSchema = z.object({
  questionText: z.string(),
  choices: z.array(choiceSchema).min(1),
  answer: z.string(),
  order: z.number().default(0),
  explanation: z.string().optional(),
})

export const questionListSchema = z.array(questionSchema).min(1)

export type IQuestion = z.infer<typeof questionSchema>
export type IQuestionList = z.infer<typeof questionListSchema>
