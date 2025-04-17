import { z } from 'zod'

export const loginAdminSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
})