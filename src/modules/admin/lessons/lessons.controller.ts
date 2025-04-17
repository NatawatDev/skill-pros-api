import { Request, Response, NextFunction } from 'express'
import { lessonsService } from './lessons.service'


const getLessons = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const lessons = await lessonsService.getLessons(+req.params.labId)
    res.status(200).json({ success: true, data: lessons })
  } catch (error) {
    next(error)
  }
}

const getLessonById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const lesson = await lessonsService.getLessonById(+req.params.labId, +req.params.id)
    res.status(200).json({ success: true, data: lesson })
  } catch (error) {
    next(error)
  }
}

const createLesson = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await lessonsService.createLesson(+req.params.labId, req.body, req.user!.email)
    res.status(201).json({ success: true, data: result })
  } catch (error) {
    next(error)
  }
}

const updateLesson = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const lesson = await lessonsService.updateLesson(+req.params.labId, req.body, req.user!.email)
    res.status(200).json({ success: true, data: lesson, message: 'Lesson updated successfully' })
  } catch (error) {
    next(error)
  }
}

const deleteLesson = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await lessonsService.deleteLesson(+req.params.id)
    res.status(200).json({ success: true, message: 'Lesson deleted successfully' })
  } catch (error) {
    next(error)
  }
}

const publishLesson = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const lesson = await lessonsService.publishLesson(+req.params.id, req.user!.email)
    res.status(200).json({ success: true, data: lesson, message: 'Lesson published successfully.' })
  } catch (error) {
    next(error)
  }
}

const unpublishLesson = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const lesson = await lessonsService.unpublishLesson(+req.params.id, req.user!.email)
    res.status(200).json({ success: true, data: lesson, message: 'Lesson unpublished successfully.' })
  } catch (error) {
    next(error)
  }
}


export const lessonsController = {
  createLesson,
  getLessons,
  getLessonById,
  updateLesson,
  deleteLesson,
  publishLesson,
  unpublishLesson
}
