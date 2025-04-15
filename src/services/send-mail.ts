import { Resend } from 'resend'
import configuration from '@/config/configuraton'

const config = configuration()

const resend = new Resend(config.mail.apiKey)

export const sendInviteEmail = async ({ to, name, inviteLink }: {
  to: string
  name: string
  inviteLink: string
}) => {
  const result = await resend.emails.send({
    from: 'SkillPros <noreply@resend.dev>',
    to,
    subject: 'You are invited to SkillPros',
    html: `
      <p>Hello ${name},</p>
      <p>You have been invited to join SkillPros Admin Panel.</p>
      <p><a href="${inviteLink}">Click here to set your password</a></p>
    `,
  })

  return result
}
