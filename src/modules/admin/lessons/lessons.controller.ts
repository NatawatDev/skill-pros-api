import { Request, Response, NextFunction } from 'express'
import { lessonsService } from './lessons.service'


/**
 * @swagger
 * /api/admin/labs/{labId}/lessons:
 *   get:
 *     summary: Get all lessons under a lab
 *     tags: [Admin - Lessons]
 *     parameters:
 *       - in: path
 *         name: labId
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: List of lessons
 */
const getLessons = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const lessons = await lessonsService.getLessons(+req.params.labId)
    res.status(200).json({ success: true, data: lessons })
  } catch (error) {
    next(error)
  }
}

/**
 * @swagger
 * /api/admin/labs/{labId}/lessons/{id}:
 *   get:
 *     summary: Get single lesson
 *     tags: [Admin - Lessons]
 *     parameters:
 *       - in: path
 *         name: labId
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lesson found
 */
const getLessonById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const lesson = await lessonsService.getLessonById(+req.params.labId, +req.params.id)
    res.status(200).json({ success: true, data: lesson })
  } catch (error) {
    next(error)
  }
}

/**
 * @swagger
 * /api/admin/labs/{labId}/lessons:
 *   post:
 *     summary: Create lesson under a lab
 *     tags: [Admin - Lessons]
 *     parameters:
 *       - in: path
 *         name: labId
 *         schema:
 *           type: integer
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateLesson'
 *     responses:
 *       201:
 *         description: Lesson created
 */
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
    const lesson = await lessonsService.updateLesson(
      +req.params.labId,
      +req.params.id,
      req.body,
      req.user!.email
    )
    res.status(200).json({ success: true, data: lesson, message: 'Lesson updated successfully' })
  } catch (error) {
    next(error)
  }
}

/**
 * @swagger
 * /api/admin/labs/{labId}/lessons/{id}:
 *   delete:
 *     summary: Delete a lesson
 *     tags: [Admin - Lessons]
 */
const deleteLesson = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await lessonsService.deleteLesson(+req.params.labId, +req.params.id)
    res.status(200).json({ success: true, message: 'Lesson deleted successfully' })
  } catch (error) {
    next(error)
  }
}

/**
 * @swagger
 * /api/admin/labs/lessons/publish/:id:
 *   patch:
 *     summary: Update lessons status to published
 *     tags: [Admin - Lessons]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Status updated successfully
 */
const publishLesson = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const lesson = await lessonsService.publishLesson(+req.params.id, req.user!.email)
    res.status(200).json({ success: true, data: lesson, message: 'Lesson published successfully.' })
  } catch (error) {
    next(error)
  }
}

/**
 * @swagger
 * /api/admin/labs/lessons/unpublish/:id:
 *   patch:
 *     summary: Update lessons status to unpublished
 *     tags: [Admin - Lessons]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Status updated successfully
 */
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
