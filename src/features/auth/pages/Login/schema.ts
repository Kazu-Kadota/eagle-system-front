import { emailValidator, passwordValidator } from 'src/utils/validators'
import { z } from 'zod'

export const schema = z.object({
  email: emailValidator,
  password: passwordValidator,
})

export type LoginSchema = z.infer<typeof schema>
