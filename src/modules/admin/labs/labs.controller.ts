import { Request, Response, NextFunction } from 'express'
import { labsService } from './labs.service'

/**
 * @swagger
 * /api/admin/labs:
 *   get:
 *     summary: Get all labs
 *     tags: [Admin - Labs]
 *     responses:
 *       200:
 *         description: A list of labs
 */
const getAllLabs = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await labsService.getAllLabs()
    res.status(200).json({ success: true, data: result })
  } catch (error) {
    next(error)
  }
}

/**
 * @swagger
 * /api/admin/labs/{id}:
 *   get:
 *     summary: Get lab by ID
 *     tags: [Admin - Labs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lab fetched successfully
 */
const getLabsById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await labsService.getLabsById(+req.params.id)
    res.status(200).json({ success: true, data: result })
  } catch (error) {
    next(error)
  }
}

/**
 * @swagger
 * /api/admin/labs:
 *   post:
 *     summary: Create a new lab
 *     tags: [Admin - Labs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Network Fundamentals"
 *               description:
 *                 type: string
 *                 example: "Basic networking concepts"
 *               attachmentPath:
 *                 type: object
 *                 properties:
 *                   url:
 *                     type: string
 *                     format: uri
 *                     example: "https://example.com/lab.pdf"
 *                   type:
 *                     type: string
 *                     enum: [pdf, image, video]
 *                     example: pdf
 *     responses:
 *       201:
 *         description: Lab created successfully
 */

const createLab = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await labsService.createLab(req)
    res.status(201).json({ success: true, message: 'Lab created successfully.', data: result })
  } catch (error) {
    next(error)
  }
}

/**
 * @swagger
 * /api/admin/labs/{id}:
 *   patch:
 *     summary: Update a lab
 *     tags: [Admin - Labs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               attachmentPath:
 *                 type: object
 *                 properties:
 *                   url:
 *                     type: string
 *                     format: uri
 *                     example: "https://example.com/lab.pdf"
 *                   type:
 *                     type: string
 *                     enum: [pdf, image, video]
 *                     example: pdf
 *     responses:
 *       200:
 *         description: Lab updated successfully
 */
const updateLab = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const lab = await labsService.updateLab(+req.params.id, req.body, req.user!.email)
    res.status(200).json({ success: true, data: lab, message: 'Lab updated successfully' })
  } catch (error) {
    next(error)
  }
}

/**
 * @swagger
 * /api/admin/labs/{id}:
 *   delete:
 *     summary: Delete a lab
 *     tags: [Admin - Labs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lab deleted successfully
 */
const deleteLab = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await labsService.deleteLab(+req.params.id)
    res.status(200).json({ success: true, message: 'Lab deleted successfully' })
  } catch (error) {
    next(error)
  }
}

/**
 * @swagger
 * /api/admin/labs/publish/{id}:
 *   patch:
 *     summary: Update lab status to published
 *     tags: [Admin - Labs]
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
const publishLab = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const lab = await labsService.publishLab(+req.params.id, req.user!.email)
    res.status(200).json({ success: true, data: lab, message: 'Lab status updated successfully' })
  } catch (error) {
    next(error)
  }
}

/**
 * @swagger
 * /api/admin/labs/unpublish/{id}:
 *   patch:
 *     summary: Update lab status to unpublished
 *     tags: [Admin - Labs]
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
const unpublishLab = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const lab = await labsService.unpublishLab(+req.params.id, req.user!.email)
    res.status(200).json({ success: true, data: lab, message: 'Lab status updated successfully' })
  } catch (error) {
    next(error)
  }
}

export const labsController = {
  createLab,
  getAllLabs,
  getLabsById,
  updateLab,
  deleteLab,
  publishLab,
  unpublishLab
}