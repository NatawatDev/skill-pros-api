import { Router } from 'express'
import authRoutes from './auth/auth.routes'
import adminsRoutes from './admins/admins.routes'
import labsRoutes from './labs/labs.routes'
import lessonsRoutes from './lessons/lessons.routes'
import questionsRoutes from './questions/questions.routes'

const adminRouter = Router()

adminRouter.use('/auth', authRoutes)
adminRouter.use('/admins', adminsRoutes)
adminRouter.use('/labs', labsRoutes)
adminRouter.use(lessonsRoutes)      // path /labs/:id/lessons
adminRouter.use(questionsRoutes)    // path /labs/:id/questions

export default adminRouter
