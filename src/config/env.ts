import { z } from 'zod'

const envSchema = z.object({
  VITE_API_USER_URL: z.string().url(),
  VITE_API_REQUEST_URL: z.string().url(),
  VITE_API_REPORT_URL: z.string().url(),
})

export const env = envSchema.parse(import.meta.env)
