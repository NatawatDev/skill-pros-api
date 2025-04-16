export interface JwtPayload {
  userId: number
  email: string
  role: 'superadmin' | 'editor'
}