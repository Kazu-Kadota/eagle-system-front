import {
  confirmationPasswordValidator,
  passwordValidator,
} from '@/utils/zod/password';
import { requiredValidator } from '@/utils/zod/required';
import { z } from 'zod';

export const schema = z
  .object({
    password: passwordValidator,
    confirm_password: requiredValidator,
  })
  .superRefine(confirmationPasswordValidator);

export type ResetPasswordFormData = z.infer<typeof schema>;
