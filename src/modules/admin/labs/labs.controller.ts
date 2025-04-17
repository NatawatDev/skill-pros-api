import { Request, Response, NextFunction } from 'express'
import { labsService } from './labs.service'

const getAllLabs = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await labsService.getAllLabs()
    res.status(200).json({ success: true, data: result })
  } catch (error) {
    next(error)
  }
}

const getLabsById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await labsService.getLabsById(+req.params.id)
    res.status(200).json({ success: true, data: result })
  } catch (error) {
    next(error)
  }
}

const createLab = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await labsService.createLab(req)
    res.status(201).json({ success: true, message: 'Lab created successfully.', data: result })
  } catch (error) {
    next(error)
  }
}

const updateLab = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const lab = await labsService.updateLab(+req.params.id, req.body, req.user!.email)
    res.status(200).json({ success: true, data: lab, message: 'Lab updated successfully' })
  } catch (error) {
    next(error)
  }
}


const deleteLab = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await labsService.deleteLab(+req.params.id)
    res.status(200).json({ success: true, message: 'Lab deleted successfully' })
  } catch (error) {
    next(error)
  }
}

const publishLab = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const lab = await labsService.publishLab(+req.params.id, req.user!.email)
    res.status(200).json({ success: true, data: lab, message: 'Lab status updated successfully' })
  } catch (error) {
    next(error)
  }
}

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