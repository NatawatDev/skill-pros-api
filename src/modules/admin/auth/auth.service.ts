import { Request } from 'express'
import { Admin } from '@/database/entities/admin.entities'
import { AppDataSource } from '@/config/data-source'
import * as argon from 'argon2'
import { NotFoundException, ConflictException } from '@/common/exceptions'
import { signAccessToken, signRefreshToken } from '@/common/utils/jwt.util'

const adminRepository = AppDataSource.getRepository(Admin)

const loginAdmin = async (req: Request) => {
  const { email, password } = req.body

  const admin = await adminRepository.findOne({ where: { email } })

  if (!admin) {
    throw new NotFoundException('This email was not found.')
  }

  const passwordValid = await argon.verify(admin.password, password)
  if (!admin.password || !passwordValid) {
    throw new ConflictException('The password is incorrect. Please try again.')
  }

  const payload = {
    userId: admin.id,
    email: admin.email,
    role: admin.role,
  }

  const accessToken = signAccessToken(payload)
  const refreshToken = signRefreshToken(payload)

  const hashedRefreshToken = await argon.hash(refreshToken)

  admin.refreshToken = hashedRefreshToken
  admin.lastLoginAt = new Date()
  
  await adminRepository.save(admin)

  return {
    accessToken,
    refreshToken
  }
}

export const adminService = {
  loginAdmin,
}