import { emailValidator } from '@/utils/zod/email';
import { passwordValidator } from '@/utils/zod/password';
import { z } from 'zod';

export const schema = z.object({
  email: emailValidator,
  password: passwordValidator,
});

export type LoginSchema = z.infer<typeof schema>;
