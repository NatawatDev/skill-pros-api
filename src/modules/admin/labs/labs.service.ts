import { Request } from 'express'
import { AppDataSource } from '@/config/data-source'
import { Lab } from '@/database/entities/lab.entities'
import { LabStatusEnum } from '@/common/enum/lab.enum'
import { BadRequestException, NotFoundException } from '@/common/exceptions'
import { IQueryLabs, IUpdateLab } from './labs.validator'
import { paginate } from '@/services/pagination/pagination.services'

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

const getAllLabs = async (options: IQueryLabs) => {
    const { searchText, page, limitPerPage, all } = options
  
    const query = labRepository
      .createQueryBuilder('lab')
      .where('lab.status = :status',
        { status: LabStatusEnum.PUBLISHED })
      .orderBy('lab.createdAt', 'DESC')
  
    if (searchText) {
      query.andWhere(
        `(lab.name ILIKE :search)`,
        { search: `%${searchText}%` }
      )
    }
  
    return await paginate(query, { 
      page, 
      limitPerPage, 
      all 
    })
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

const publishLab = async (id: number, updatedBy: string) => {
  const lab = await labRepository.findOneBy({ id })

  if (!lab) { 
    throw new NotFoundException('Lab not found')
  }

  if (lab.status !== LabStatusEnum.UNPUBLISHED) {
    throw new BadRequestException('Lab status is not unpublished')
  }

  return await labRepository.save({
    ...lab,
    status: LabStatusEnum.PUBLISHED,
    updatedBy
  })
}

const unpublishLab = async (id: number, updatedBy: string) => {
  const lab = await labRepository.findOneBy({ id })

  if (!lab) { 
    throw new NotFoundException('Lab not found')
  }

  if (lab.status !== LabStatusEnum.PUBLISHED) {
    throw new BadRequestException('Lab status is not published')
  }

  return await labRepository.save({
    ...lab,
    status: LabStatusEnum.UNPUBLISHED,
    updatedBy
  })
}


export const labsService = {
  createLab,
  getAllLabs,
  getLabsById,
  updateLab,
  deleteLab,
  publishLab,
  unpublishLab
}