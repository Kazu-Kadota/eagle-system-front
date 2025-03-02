import { z } from 'zod';
import { emailValidator } from '@/utils/zod/email';
import { passwordValidator } from '@/utils/zod/password';
import { requiredValidator } from '@/utils/zod/required';
import { UserType } from 'src/models';

export const registerUserSchema = z
  .object({
    user_first_name: requiredValidator,
    user_last_name: requiredValidator,
    email: emailValidator,
    password: passwordValidator,
    password_confirmation: requiredValidator,
    company_name: requiredValidator,
    user_type: z.nativeEnum(UserType),
    api: z.enum(['true', 'false']),
  })
  .superRefine((value, ctx) => {
    if (value.password_confirmation !== value.password) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['password_confirmation'],
        message: 'Senhas devem ser iguais',
      });
    }
  });

export type RegisterUserSchema = z.infer<typeof registerUserSchema>;
