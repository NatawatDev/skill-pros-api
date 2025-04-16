import { Router } from 'express'
import multer from 'multer'
import { uploadController } from './upload.controller'
import { authGuard } from '@/common/guard/auth.guard'
import { validateFileUpload } from '@/common/middlewares/validate-file'

const router = Router()
const upload = multer()

router.post('/', authGuard, upload.single('file'), validateFileUpload, uploadController.uploadFile)

export default router
