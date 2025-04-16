import jwt, { SignOptions }  from 'jsonwebtoken'
import configuration from '@/config/configuraton'
import { JwtPayload } from '@/common/interfaces/jwt-payload.interface'

const config = configuration()

const accessSecret = config.jwt.accessSecret as string
const refreshSecret = config.jwt.refreshSecret as string

if (!accessSecret || !refreshSecret) {
  throw new Error('JWT secrets are not defined in environment variables')
}

export const signAccessToken = (payload: object, expiresIn = '1h'): string => {
  return jwt.sign(payload, accessSecret, { expiresIn } as SignOptions)
}

export const signRefreshToken = (payload: object, expiresIn = '7d'): string => {
  return jwt.sign(payload, refreshSecret, { expiresIn } as SignOptions)
}

export const verifyAccessToken = (token: string): any => {
  return jwt.verify(token, accessSecret) as JwtPayload
}

export const verifyRefreshToken = (token: string): any => {
  return jwt.verify(token, refreshSecret) as JwtPayload
}