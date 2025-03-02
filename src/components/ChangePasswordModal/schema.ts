import { passwordValidator } from '@/utils/zod/password';
import { requiredValidator } from '@/utils/zod/required';
import { z } from 'zod';

export const changePasswordSchema = z
  .object({
    old_password: requiredValidator,
    password: passwordValidator,
    confirm_password: requiredValidator,
  })
  .superRefine((value, ctx) => {
    if (value.confirm_password !== value.password) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['confirm_password'],
        message: 'Senhas devem ser iguais',
      });
    }
  });

export type ChangePasswordSchema = z.infer<typeof changePasswordSchema>;
