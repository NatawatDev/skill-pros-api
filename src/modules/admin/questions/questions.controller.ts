import { Request, Response, NextFunction } from 'express'
import { questionsService } from './questions.service'

const createQuestions = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await questionsService.createQuestions(+req.params.labId, req.body, req.user!.email)
    res.status(201).json({ success: true, data: result, message: 'Questions created successfully.' })
  } catch (error) {
    next(error)
  }
}

const getQuestionsByLab = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await questionsService.getQuestionsByLab(+req.params.labId)
    res.status(200).json({ success: true, data: result })
  } catch (error) {
    next(error)
  }
}

const updateQuestions = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await questionsService.updateQuestions(+req.params.labId, req.body, req.user!.email)
    res.status(200).json({ success: true, data: result, message: 'Questions updated successfully.' })
  } catch (error) {
    next(error)
  }
}

const deleteQuestion = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await questionsService.deleteQuestion(+req.params.id)
    res.status(200).json({ success: true, message: 'Question deleted successfully.' })
  } catch (error) {
    next(error)
  }
}

export const questionsController = {
  createQuestions,
  getQuestionsByLab,
  updateQuestions,
  deleteQuestion,
}
