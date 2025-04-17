import { AppDataSource } from '@/config/data-source'
import { Lesson } from '@/database/entities/lesson.entities'
import { Lab } from '@/database/entities/lab.entities'
import { BadRequestException, ConflictException, NotFoundException } from '@/common/exceptions'
import { ILesson } from './lessons.validator'
import { LabStatusEnum } from '@/common/enum/lab.enum'

const lessonRepository = AppDataSource.getRepository(Lesson)
const labRepository = AppDataSource.getRepository(Lab)

const createLesson = async (labId: number, lessonList: ILesson[], createdBy: string) => {
  const lab = await labRepository.findOneBy({ id: labId })

  if (!lab) {
    throw new NotFoundException('Lab not found.')
  }

  const saveLesson = lessonList.map((item, index) => {
    return lessonRepository.create({
      ...item,
      order: index,
      status: LabStatusEnum.PUBLISHED,
      createdBy,
      lab,
    })
  })

  return await lessonRepository.save(saveLesson)
}

const getLessons = async (labId: number) => {
  return await lessonRepository.find({
    where: { lab: { id: labId } },
    order: { order: 'ASC' },
  })
}

const getLessonById = async (labId: number, lessonId: number) => {
  const lesson = await lessonRepository.findOne({
    where: { id: lessonId, lab: { id: labId } },
  })

  if (!lesson) { 
    throw new NotFoundException('Lesson not found')
  }
  
  return lesson
}

const updateLesson = async (labId: number, payload: ILesson[], userEmail: string) => {
    const lab = await labRepository.findOne({ where: { id: labId } })
    
    if (!lab) { 
      throw new NotFoundException('Lesson not found.')
    }
  
  
  const lesson = await lessonRepository.find({ where: { lab: { id: labId } } })
  
  if (lesson.length + payload.length > 5) {
    throw new ConflictException('You can only have 5 lessons per lab.')
  }

  const updatedLesson = payload.map((item, index) => {
    return lessonRepository.create({
      ...item,
      ...lesson,
      order: index,
      updatedBy: userEmail,
      lab: { id: labId }
    })
  }) 
  
  return await lessonRepository.save(updatedLesson)
}

const deleteLesson = async (id: number) => {
    const existing = await labRepository.findOne({ where: { id } })
  
    if (!existing) { 
      throw new NotFoundException('Lab not found')
    }
  
    return await labRepository.remove(existing)
}


const publishLesson = async (id: number, updatedBy: string) => {
  const lesson = await lessonRepository.findOneBy({ id })

  if (!lesson) { 
    throw new NotFoundException('lesson not found')
  }

  if (lesson.status !== LabStatusEnum.UNPUBLISHED) {
    throw new BadRequestException('lesson status is not unpublished')
  }

  return await lessonRepository.save({
    ...lesson,
    status: LabStatusEnum.PUBLISHED,
    updatedBy
  })
}

const unpublishLesson = async (id: number, updatedBy: string) => {
  const lesson = await lessonRepository.findOneBy({ id })

  if (!lesson) { 
    throw new NotFoundException('lesson not found')
  }

  if (lesson.status !== LabStatusEnum.PUBLISHED) {
    throw new BadRequestException('lesson status is not published')
  }

  return await lessonRepository.save({
    ...lesson,
    status: LabStatusEnum.UNPUBLISHED,
    updatedBy
  })
}


export const lessonsService = {
  createLesson,
  getLessons,
  getLessonById,
  updateLesson,
  deleteLesson,
  publishLesson,
  unpublishLesson
}
