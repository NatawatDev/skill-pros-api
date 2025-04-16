import { AppDataSource } from '@/config/data-source'
import { Lesson } from '@/database/entities/lesson.entities'
import { Lab } from '@/database/entities/lab.entities'
import { BadRequestException, NotFoundException } from '@/common/exceptions'
import { ICreateLesson } from './lessons.validator'
import { LabStatusEnum } from '@/common/enum/lab.enum'

const lessonRepository = AppDataSource.getRepository(Lesson)
const labRepository = AppDataSource.getRepository(Lab)

const createLesson = async (labId: number, lessonList: ICreateLesson[], createdBy: string) => {
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

const updateLesson = async (labId: number, lessonId: number, payload: ICreateLesson, updatedBy: string) => {
  const lesson = await lessonRepository.findOne({
    where: { id: lessonId, lab: { id: labId } },
    relations: ['lab'],
  })
  if (!lesson) throw new NotFoundException('Lesson not found')

  const originalOrder = lesson.order
  const newOrder = payload.order

  const updated = await lessonRepository.save({
    ...lesson,
    ...payload,
    updatedBy,
  })

  if (newOrder !== undefined && newOrder !== originalOrder) {
    const lessons = await lessonRepository.find({
      where: { lab: { id: labId } },
      order: { order: 'ASC' },
    })

    const ordered = lessons
      .filter(l => l.id !== lessonId)
      .sort((a, b) => a.order - b.order)

    ordered.splice(newOrder, 0, updated)

    for (let i = 0; i < ordered.length; i++) {
      ordered[i].order = i
    }
    await lessonRepository.save(ordered)
  }

  return updated
}

const deleteLesson = async (labId: number, lessonId: number): Promise<void> => {
  const lesson = await lessonRepository.findOne({
    where: { id: lessonId, lab: { id: labId } },
    relations: ['lab'],
  })
  if (!lesson) throw new NotFoundException('Lesson not found')

  await lessonRepository.remove(lesson)

  const remaining = await lessonRepository.find({
    where: { lab: { id: labId } },
    order: { order: 'ASC' },
  })

  for (let i = 0; i < remaining.length; i++) {
    remaining[i].order = i
  }

  await lessonRepository.save(remaining)
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
