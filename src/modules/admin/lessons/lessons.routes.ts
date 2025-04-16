import { Router } from 'express'
import { lessonsController } from './lessons.controller'
import { authGuard } from '@/common/guard/auth.guard'
import { validateBody } from '@/common/middlewares/validate'
import { createLessonListSchema, updateLessonSchema } from './lessons.validator'

const router = Router({ mergeParams: true })

router.use(authGuard)

router.get('/labs/:labId/lessons', authGuard, lessonsController.getLessons)
router.get('/labs/:labId/lessons/:id', authGuard, lessonsController.getLessonById)
router.post('/labs/:labId/lessons', authGuard, validateBody(createLessonListSchema), lessonsController.createLesson)
router.patch('/labs/:labId/lessons/:lessonId', authGuard, validateBody(updateLessonSchema), lessonsController.updateLesson)
router.delete('/labs/:labId/lessons/:lessonId', authGuard, lessonsController.deleteLesson)
router.patch('/labs/lessons/publish/:id', authGuard, lessonsController.publishLesson)
router.patch('/labs/lessons/unpublish/:id', authGuard, lessonsController.unpublishLesson)

export default router
