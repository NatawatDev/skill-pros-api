import { Request } from 'express'
import { Admin } from '@/database/entities/admin.entities'
import { AppDataSource } from '@/config/data-source'
import * as argon from 'argon2'
import dayjs from 'dayjs'
import { ConflictException, UnauthorizedException, NotFoundException, BadRequestException } from '@/common/exceptions'
import { generateToken } from '@/common/utils/token.util'
import { AdminRoleEnum, AdminStatusEnum } from '@/common/enum/admin.enum'
import { JwtPayload } from 'jsonwebtoken'
import { sendInviteEmail, sendResetPasswordEmail } from '@/services/email/email.services'
import configuration from '@/config/configuraton'
import { IsNull, Not } from 'typeorm'
import { TokenTypeEnum } from '@/common/enum/token.enum'

const config = configuration()

const adminRepository = AppDataSource.getRepository(Admin)

const inviteAdmin = async (req: Request, inviter: JwtPayload) => {

  const { email, firstname, lastname } = req.body
  
  const existing = await adminRepository.findOneBy({ email: email })
  
  if (existing) throw new ConflictException('This email has already been invited.')

  const rawToken = generateToken()
  const hashedToken = await argon.hash(rawToken)

  const newAdmin = adminRepository.create({
    ...req.body,
    status: AdminStatusEnum.PENDING,
    role: AdminRoleEnum.EDITOR,
    inviteToken: hashedToken,
    invitedBy: inviter.userId,
    invitedAt: new Date(),
  })

  await adminRepository.save(newAdmin)
  
  await sendInviteEmail({
    to: email,
    name: `${firstname} ${lastname}`,
    inviteLink: `${config.frontend.url}/setup-password?token=${rawToken}`,
  })

  return { email }
}

export const validateToken = async (token: string, type: TokenTypeEnum): Promise<Admin> => {

  const admins = await adminRepository.find({
    where: type === TokenTypeEnum.INVITE
      ? { status: AdminStatusEnum.PENDING, inviteToken: Not(IsNull()) }
      : { resetPasswordToken: Not(IsNull()) },
  })

  for (const admin of admins) {
    const hash = type === TokenTypeEnum.INVITE ? admin.inviteToken : admin.resetPasswordToken
    const timestamp = type === TokenTypeEnum.INVITE ? admin.invitedAt : admin.updatedAt

    if (hash && await argon.verify(hash, token)) {
      const isExpired = timestamp && dayjs().diff(timestamp, 'hour') > 24
      if (isExpired) throw new UnauthorizedException(`${type} token expired.`)
      return admin
    }
  }

  throw new UnauthorizedException(`Invalid ${type} token`)
}

const setupAccount = async (req: Request) => {
  const { inviteToken, password, confirmPassword } = req.body

  if (password !== confirmPassword) {
    throw new ConflictException('Password and Confirm Password does not match.')
  }

  const admin = await validateToken(inviteToken, TokenTypeEnum.INVITE)

  if (!admin) {
    throw new NotFoundException('Admin Not Found.')
  }

  admin.password = await argon.hash(password)
  admin.inviteToken = null
  admin.status = AdminStatusEnum.ACTIVE

  await adminRepository.save(admin)
}

const sendResetPassword = async (req: Request) => {

  const { email } = req.body

  const admin = await adminRepository.findOneBy({ email })

  if (!admin) { 
    throw new NotFoundException('Email not found.')
  }

  if (admin.role === AdminRoleEnum.SUPERADMIN) {
    throw new BadRequestException('This account is not allowed to reset password via email.')
  }

  const rawToken = generateToken()
  const hashedToken = await argon.hash(rawToken)

  admin.resetPasswordToken = hashedToken
  await adminRepository.save(admin)

  await sendResetPasswordEmail({
    to: admin.email,
    name: admin.firstname,
    resetLink: `${config.frontend.url}/reset-password?token=${rawToken}`
  })
}

const resetPassword = async (req: Request) => {
  const { resetPasswordToken, password, confirmPassword } = req.body

  if (password !== confirmPassword) {
    throw new ConflictException('Password and Confirm Password does not match.')
  }

  const admin = await validateToken(resetPasswordToken, TokenTypeEnum.RESET)

  if (!admin) {
    throw new NotFoundException('Admin Not Found.')
  }

  admin.password = await argon.hash(password)
  admin.resetPasswordToken = null
  await adminRepository.save(admin)
}


export const adminsService = {
  inviteAdmin,
  setupAccount,
  validateToken,
  sendResetPassword,
  resetPassword
}