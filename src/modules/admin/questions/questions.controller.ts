import { Request, Response, NextFunction } from 'express'
import { questionsService } from './questions.service'


/**
 * @swagger
 * /api/admin/labs/{labId}/questions:
 *   post:
 *     summary: Create questions
 *     tags: [Admin - Questions]
 *     parameters:
 *       - in: path
 *         name: labId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the lab to add questions to
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               type: object
 *               required:
 *                 - questionText
 *                 - choices
 *                 - answer
 *               properties:
 *                 questionText:
 *                   type: string
 *                   example: What is the capital of France?
 *                 choices:
 *                   type: array
 *                   items:
 *                     type: object
 *                     required: [value, text]
 *                     properties:
 *                       value:
 *                         type: string
 *                         example: A
 *                       text:
 *                         type: string
 *                         example: Paris
 *                 answer:
 *                   type: string
 *                   example: A
 *                 explanation:
 *                   type: string
 *                   example: Paris is the capital city of France.
 *                 order:
 *                   type: integer
 *                   example: 0
 *     responses:
 *       201:
 *         description: Created questions successfully
 */
const createQuestions = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await questionsService.createQuestions(+req.params.labId, req.body, req.user!.email)
    res.status(201).json({ success: true, data: result, message: 'Questions created successfully.' })
  } catch (error) {
    next(error)
  }
}

/**
 * @swagger
 * /api/admin/labs/{labId}/questions:
 *   get:
 *     summary: Get all questions for a lab
 *     tags: [Admin - Questions]
 *     parameters:
 *       - in: path
 *         name: labId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the lab
 *     responses:
 *       200:
 *         description: List of questions
 */
const getQuestionsByLab = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await questionsService.getQuestionsByLab(+req.params.labId)
    res.status(200).json({ success: true, data: result })
  } catch (error) {
    next(error)
  }
}

/**
 * @swagger
 * /api/admin/labs/{labId}/questions:
 *   put:
 *     summary: Update questions for a lab
 *     tags: [Admin - Questions]
 *     parameters:
 *       - in: path
 *         name: labId
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               type: object
 *               required: [questionText, choices, answer, explanation]
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: Optional, for updates
 *                 questionText:
 *                   type: string
 *                 choices:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       value:
 *                         type: string
 *                       text:
 *                         type: string
 *                 answer:
 *                   type: string
 *                 explanation:
 *                   type: string
 *     responses:
 *       200:
 *         description: Questions updated successfully.
 */
const updateQuestions = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await questionsService.updateQuestions(+req.params.labId, req.body, req.user!.email)
    res.status(200).json({ success: true, data: result, message: 'Questions updated successfully.' })
  } catch (error) {
    next(error)
  }
}

/**
 * @swagger
 * /api/admin/labs/{labId}/questions/{id}:
 *   delete:
 *     summary: Delete a specific question
 *     tags: [Admin - Questions]
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
 *         description: Question ID
 *     responses:
 *       200:
 *         description: Question deleted successfully.
 */
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
