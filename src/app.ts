import express, { Request, Response, NextFunction } from 'express'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import swaggerUi from 'swagger-ui-express'
import { createSwaggerSpec } from '@/config/swagger'
import adminAuthRoutes from '@/modules/admin/auth/auth.routes'
import adminAdminRoutes from '@/modules/admin/admins/admins.routes'
import adminLabRoutes from '@/modules/admin/labs/labs.routes'
import adminLessonRoutes from '@/modules/admin/lessons/lessons.routes'
import adminQuestionRoutes from '@/modules/admin/questions/questions.routes'
import coreUploadRoutes from '@/modules/core/upload/upload.routes'

// import errorHandler from '@/common/middlewares/error-handler'

dotenv.config()

const app = express()

// register
app.use(helmet())
app.use(cors())
app.use(express.json())
app.use(cookieParser())


// router
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(createSwaggerSpec()))

app.use('/upload', coreUploadRoutes)

app.use('/api/admin/auth', adminAuthRoutes)
app.use('/api/admin/admins', adminAdminRoutes)
app.use('/api/admin/labs', adminLabRoutes)
app.use('/api/admin', adminLessonRoutes)
app.use('/api/admin', adminQuestionRoutes)

// global error handler
app.use((err:any, req: Request, res: Response, next: NextFunction) => {
  res.status(err.statusCode || 500).json({ message: err.message })
})

export default app