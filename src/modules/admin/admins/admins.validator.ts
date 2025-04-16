import Joi from 'joi'

export const inviteAdminSchema = Joi.object({
  firstname: Joi.string().max(100).required(),
  lastname: Joi.string().max(100).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required()
})

export const setupPasswordAdminSchema = Joi.object({
  inviteToken: Joi.string().max(100).required(),
  password: Joi.string().min(6).required(),
  confirmPassword: Joi.string().min(6).required()
}) 


export const verifyInviteTokenSchema = Joi.object({
  inviteToken: Joi.string().max(100).required()
}) 