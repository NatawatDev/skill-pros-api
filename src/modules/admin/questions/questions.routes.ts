import { Router } from 'express'
import { authGuard } from '@/common/guard/auth.guard'
import { validateBody } from '@/common/middlewares/validate'
import { questionsController } from './questions.controller'
import { questionListSchema } from './questions.validator'

const router = Router()

router.post('/labs/:labId/questions', authGuard, validateBody(questionListSchema), questionsController.createQuestions)
router.get('/labs/:labId/questions', authGuard, questionsController.getQuestionsByLab)
router.put('/labs/:labId/questions', authGuard, validateBody(questionListSchema), questionsController.updateQuestions)
router.delete('/labs/:labId/questions/:id', authGuard, questionsController.deleteQuestion)

export default router
