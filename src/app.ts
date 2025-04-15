import express from 'express'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import swaggerUi from 'swagger-ui-express'
import { createSwaggerSpec } from '@/config/swagger'

dotenv.config()

const app = express()

app.use(helmet())
app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(createSwaggerSpec()))

export default app