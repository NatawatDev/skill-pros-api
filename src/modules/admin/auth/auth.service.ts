import { Request } from 'express'
import { Admin } from '@/database/entities/admin.entities'
import { AppDataSource } from '@/config/data-source'
import * as argon from 'argon2'
import { NotFoundException, ConflictException, UnauthorizedException } from '@/common/exceptions'
import { signAccessToken, signRefreshToken, verifyRefreshToken } from '@/common/utils/jwt.util'

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

const logoutAdmin = async (userId: number): Promise<void> => {
  const adminRepository = AppDataSource.getRepository(Admin)
  
  const exists = await adminRepository.exists({ where: { id: userId } })

  if (!exists) {
    throw new NotFoundException('Admin not found')
  }

  await adminRepository.update(userId, { refreshToken: null } )
}

const refreshAccessToken = async (refreshToken: string) => {
  const payload = verifyRefreshToken(refreshToken)
  const { userId } = payload

  const adminRepository = AppDataSource.getRepository(Admin)
  const admin = await adminRepository.findOneBy({ id: userId })

  if (!admin || !admin.refreshToken) {
    throw new UnauthorizedException('Admin not found or no refresh token stored')
  }

  const isMatch = await argon.verify(admin.refreshToken, refreshToken)

  if (!isMatch) {
    throw new UnauthorizedException('Invalid refresh token')
  }

  const newAccessToken = signAccessToken({ userId: admin.id, email: admin.email, role: admin.role })
  const newRefreshToken = signRefreshToken({ userId: admin.id })

  admin.refreshToken = await argon.hash(newRefreshToken)
  
  await adminRepository.save(admin)

  return {
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
  }
}

export const authService = {
  loginAdmin,
  logoutAdmin,
  refreshAccessToken
}