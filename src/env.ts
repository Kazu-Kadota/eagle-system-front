import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  client: {
    NEXT_PUBLIC_API_USER_URL: z.string().url(),
    NEXT_PUBLIC_API_REQUEST_URL: z.string().url(),
    NEXT_PUBLIC_API_REPORT_URL: z.string().url(),
    NEXT_PUBLIC_API_DECODER_URL: z.string().url(),
  },
  server: {
    AUTH_SECRET: z.string().min(1),
    AUTH_TRUST_HOST: z.union([z.literal('true'), z.literal('false')]),
  },
  experimental__runtimeEnv: {
    NEXT_PUBLIC_API_USER_URL: process.env.NEXT_PUBLIC_API_USER_URL,
    NEXT_PUBLIC_API_REQUEST_URL: process.env.NEXT_PUBLIC_API_REQUEST_URL,
    NEXT_PUBLIC_API_REPORT_URL: process.env.NEXT_PUBLIC_API_REPORT_URL,
    NEXT_PUBLIC_API_DECODER_URL: process.env.NEXT_PUBLIC_API_DECODER_URL,
  },
});
