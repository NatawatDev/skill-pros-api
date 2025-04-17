import express, { Request, Response, NextFunction, ErrorRequestHandler } from 'express'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import swaggerUi from 'swagger-ui-express'
import { createSwaggerSpec } from '@/config/swagger'
import coreUploadRoutes from '@/modules/core/upload/upload.routes'
import adminRouter from '@/modules/admin/admin.routes'
import limiter from '@/common/middlewares/ratelimit'

import errorHandler from '@/common/middlewares/error-handler'

dotenv.config()

const app = express()

// register
app.use(helmet())
app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.use(limiter)


// router
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(createSwaggerSpec()))

app.use('/upload', coreUploadRoutes)

app.use('/api/admin', adminRouter)

// global error handler
app.use(errorHandler)

export default app