import Joi from 'joi'

export interface IQuestion {
  questionText: string,
  choices: IChoices[],
  answer: string,
  explanation?: string,
  order: number
}

interface IChoices {
  value: 'string',
  text: 'string'
}

const choiceSchema = Joi.object({
  value: Joi.string().required(),
  text: Joi.string().required()
})

const choiceListSchema = Joi.array()
  .items(choiceSchema)
  .min(1)
  .required()

const questionSchema = Joi.object({
  questionText: Joi.string().required(),
  choices: choiceListSchema.required(),
  answer: Joi.string().required(),
  order: Joi.number().default(0),
  explanation: Joi.string().optional()
})


export const questionListSchema = Joi.array()
  .items(questionSchema)
  .min(1)
  .required()