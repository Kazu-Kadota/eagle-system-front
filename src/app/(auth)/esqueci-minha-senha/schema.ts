import { emailValidator } from '@/utils/zod/email';
import { z } from 'zod';

export const schema = z.object({
  email: emailValidator,
});

export type ForgotPasswordSchema = z.infer<typeof schema>;
