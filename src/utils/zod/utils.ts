import { z } from 'zod';

export const asStringOptional = <T extends z.ZodTypeAny>(schema: T) =>
  schema.optional().or(z.literal('').transform(() => undefined));
