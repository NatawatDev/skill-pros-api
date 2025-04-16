import { Request } from 'express'
import { Admin } from '@/database/entities/admin.entities'
import { AppDataSource } from '@/config/data-source'
import * as argon from 'argon2'
import dayjs from 'dayjs'
import { ConflictException, UnauthorizedException } from '@/common/exceptions'
import { generateInviteToken } from '@/common/utils/token.util'
import { AdminRoleEnum, AdminStatusEnum } from '@/common/enum/admin.enum'
import { JwtPayload } from 'jsonwebtoken'
import { sendInviteEmail } from '@/services/email/email.services' 

const adminRepository = AppDataSource.getRepository(Admin)

const inviteAdmin = async (req: Request, inviter: JwtPayload) => {

  const { email, firstname, lastname } = req.body
  
  const existing = await adminRepository.findOneBy({ email: email })
  
  if (existing) throw new ConflictException('This email has already been invited.')

  const rawToken = generateInviteToken()
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
  
  const inviteLink = `${process.env.FRONTEND_URL}/setup-password?token=${rawToken}`
  await sendInviteEmail({
    to: email,
    name: `${firstname} ${lastname}`,
    inviteLink,
  })

  return { email }
}

const verifyInviteToken = async (req: Request) => {

  const { token } = req.body 

  const admins = await adminRepository.find({
    where: { status: AdminStatusEnum.PENDING },
  })

  for (const admin of admins) {
    if (admin.inviteToken && await argon.verify(admin.inviteToken, token)) {
      const expired = dayjs().diff(admin.invitedAt, 'hour') > 24
      if (expired) throw new UnauthorizedException('Invite token expired')
      return { email: admin.email }
    }
  }

  throw new UnauthorizedException('Invalid invite token')
}

const setupAccount = async (req: Request) => {

  const { inviteToken, password, confirmPassword } = req.body

  if (password !== confirmPassword) {
    throw new ConflictException('Your Password and Confirm password does not match.')
  }

  const admins = await adminRepository.find({
    where: { status: AdminStatusEnum.PENDING },
  })

  for (const admin of admins) {
    if (admin.inviteToken && await argon.verify(admin.inviteToken, inviteToken)) {
      if (dayjs().diff(admin.invitedAt, 'hour') > 24) {
        throw new UnauthorizedException('Invite token expired')
      }

      admin.password = await argon.hash(password)
      admin.status = AdminStatusEnum.ACTIVE
      admin.inviteToken = null
      await adminRepository.save(admin)
      return { email: admin.email }
    }
  }

  throw new UnauthorizedException('Invalid invite token')
}


export const adminsService = {
  inviteAdmin,
  setupAccount,
  verifyInviteToken
}