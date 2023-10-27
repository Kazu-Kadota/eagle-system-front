import { emailValidator } from 'src/utils/zod'
import { z } from 'zod'

export const schema = z.object({
  email: emailValidator,
})

export type ForgotPasswordSchema = z.infer<typeof schema>
