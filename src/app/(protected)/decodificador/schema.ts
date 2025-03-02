import { isBase64, sanitizeBase64 } from '@/utils/base64';
import { requiredValidator } from '@/utils/zod/required';
import { z } from 'zod';

export const schema = z.object({
  encodedValue: requiredValidator
    .transform(sanitizeBase64)
    .refine(
      isBase64,
      'O texto deve estar no formato base64 para ser decodificado',
    ),
});

export type Base64DecoderSchema = z.infer<typeof schema>;
