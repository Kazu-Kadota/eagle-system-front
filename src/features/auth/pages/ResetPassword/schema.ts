import {
  confirmationPasswordValidator,
  passwordValidator,
  requiredValidator,
} from 'src/utils/zod'
import { z } from 'zod'

export const schema = z
  .object({
    password: passwordValidator,
    confirm_password: requiredValidator,
  })
  .superRefine(confirmationPasswordValidator)

export type ResetPasswordFormData = z.infer<typeof schema>
