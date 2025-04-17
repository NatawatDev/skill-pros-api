import { AppDataSource } from '@/config/data-source'
import { Question } from '@/database/entities/question.entity'
import { Lab } from '@/database/entities/lab.entities'
import { NotFoundException, ConflictException } from '@/common/exceptions'
import { IQuestion } from './questions.validator'

const questionRepository = AppDataSource.getRepository(Question)
const labRepository = AppDataSource.getRepository(Lab)

const createQuestions = async (labId: number, payload: IQuestion[], createdBy: string) => {

  const lab = await labRepository.findOne({ where: { id: labId } })
  
  if (!lab) { 
    throw new NotFoundException('Lesson not found.')
  }
  
  const existingCount = await questionRepository.count({ where: { lab: { id: labId } } })

  if (existingCount + payload.length > 10) {
    throw new ConflictException('You can only have 10 questions per lab.')
  }

  const createdQuestions = payload.map((item) => {
    return questionRepository.create({
      ...item,
      order: item.order,
      createdBy,
      lab: { id: labId },
    })
  })

  return await questionRepository.save(createdQuestions)
}

const getQuestionsByLab = async (labId: number) => {
  return await questionRepository.find({
    where: { lab: { id: labId } },
    order: { order: 'ASC' },
  })
}

const updateQuestions = async (labId: number, payload: IQuestion[], userEmail: string) => {

  const lab = await labRepository.findOne({ where: { id: labId } })
  
  if (!lab) { 
    throw new NotFoundException('Lesson not found.')
  }

  const question = await questionRepository.find({ where: { lab: { id: labId } } })

  if (question.length + payload.length > 10) {
    throw new ConflictException('You can only have 10 questions per lab.')
  }
  
  const saveQuestion = payload.map((item, index) => {
    return questionRepository.create({
      ...item,
      ...question,
      order: index,
      createdBy: userEmail,
      lab: { id: labId },
    })
  })

  return await questionRepository.save(saveQuestion)
}

const deleteQuestion = async (id: number) => {
  const existing = await questionRepository.findOne({ where: { id } })

  if (!existing) { 
    throw new NotFoundException('Question not found')
  }

  return await questionRepository.remove(existing)
}

export const questionsService = {
  createQuestions,
  getQuestionsByLab,
  updateQuestions,
  deleteQuestion,
}
