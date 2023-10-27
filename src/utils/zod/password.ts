import { z } from 'zod'
import { requiredValidator } from './required'

export const passwordValidator = requiredValidator.regex(
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
  'Senha deve conter pelo menos 8 caracteres (1 maiúsculo, 1 minúsculo e 1 caractere especial)',
)

export const confirmationPasswordValidator = (
  value: Record<'password' | 'password_confirmation', string>,
  ctx: z.RefinementCtx,
) => {
  if (value.password_confirmation !== value.password) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['password_confirmation'],
      message: 'Senhas devem ser iguais',
    })
  }
}
