import { Resend } from 'resend'
import configuration from '@/config/configuraton'
import { inviteTemplate } from './templates/invite.template'
import { resetPasswordTemplate } from './templates/reset-password.template'

const config = configuration()
const resend = new Resend(config.mail.apiKey)

export const sendInviteEmail = async ({
  to,
  name,
  inviteLink
}: {
  to: string
  name: string
  inviteLink: string
}) => {
  const html = inviteTemplate(name, inviteLink)
  const sendInviteEmail = await resend.emails.send({
    from: 'SkillPros <noreply@resend.dev>',
    to,
    subject: 'You are invited to Skill Pros Admin Panel',
    html,
  })
  
  return sendInviteEmail
}

export const sendResetPasswordEmail = async ({
  to,
  name,
  resetLink,
}: {
  to: string
  name: string
  resetLink: string
}) => {
  const html = resetPasswordTemplate(name, resetLink)

  return await resend.emails.send({
    from: 'SkillPros <noreply@resend.dev>',
    to,
    subject: 'Reset your Password',
    html,
  })
}
