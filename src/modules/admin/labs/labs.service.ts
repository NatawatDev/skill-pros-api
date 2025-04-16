import { Request } from 'express'
import { AppDataSource } from '@/config/data-source'
import { Lab } from '@/database/entities/lab.entities'
import { LabStatusEnum } from '@/common/enum/lab.enum'
import { NotFoundException } from '@/common/exceptions'
import { IUpdateLab } from './labs.interfaces'

const labRepository = AppDataSource.getRepository(Lab)

const createLab = async (req: Request) => {
  const { name, description, attachmentPath } = req.body
  
  const createdBy = req.user!.email

  const newLab = labRepository.create({
    name,
    description,
    attachmentPath,
    createdBy,
  })

  return await labRepository.save(newLab)
}

const getAllLabs = async () => {
  const lab = await labRepository.find({ where: { status: LabStatusEnum.PUBLISHED } })
  return lab
}

const getLabsById = async (id: number) => {

  const lab = await labRepository.findOne({
    where: { id, status: LabStatusEnum.PUBLISHED }
  })

  if (!lab) {
    throw new NotFoundException(`Lab with Id: ${id} not found.`)
  }

  return lab
}

const updateLab = async (id: number, payload: IUpdateLab, updatedBy: string) => {
  const lab = await labRepository.findOneBy({ id })
  
  if (!lab) {
    throw new NotFoundException('Lab not found')
  }

  return await labRepository.save({
    ...lab,
    ...payload,
    updatedBy: updatedBy
  })
}

const deleteLab = async (id: number) => {

  const exists = await labRepository.findOne({ where: { id } })
  
  if (!exists) {
    throw new NotFoundException('Lab not found')
  }
  
  await labRepository.delete(id)
}

const updateLabStatus = async (id: number, status: LabStatusEnum, updatedBy: string) => {
  const lab = await labRepository.findOneBy({ id })

  if (!lab) { 
    throw new NotFoundException('Lab not found')
  }

  return await labRepository.save({
    ...lab,
    status,
    updatedBy
  })
}


export const labsService = {
  createLab,
  getAllLabs,
  getLabsById,
  updateLab,
  deleteLab,
  updateLabStatus
}