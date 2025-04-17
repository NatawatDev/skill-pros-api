import express, { Request, Response, NextFunction } from 'express'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import swaggerUi from 'swagger-ui-express'
import { createSwaggerSpec } from '@/config/swagger'
import coreUploadRoutes from '@/modules/core/upload/upload.routes'
import adminRouter from '@/modules/admin/admin.routes'

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

app.use('/api/admin', adminRouter)

// global error handler
app.use((err:any, req: Request, res: Response, next: NextFunction) => {
  res.status(err.statusCode || 500).json({ message: err.message })
})

export default app