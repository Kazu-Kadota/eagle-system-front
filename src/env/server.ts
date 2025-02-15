import 'server-only';
import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  server: {
    AUTH_SECRET: z.string().min(1),
  },
  experimental__runtimeEnv: {
    AUTH_SECRET: process.env.AUTH_SECRET,
  },
});
