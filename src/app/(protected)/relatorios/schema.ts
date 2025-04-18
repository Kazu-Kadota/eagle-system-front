import { dateValidator, intervalDateValidator } from '@/utils/zod/date';
import { UserType } from 'src/models';
import { z } from 'zod';

export const reportSchema = z
  .object({
    start_date: dateValidator,
    final_date: dateValidator,
    company: z.string().optional(),
    userType: z.nativeEnum(UserType).optional(),
  })
  .superRefine(intervalDateValidator)
  .superRefine((values, ctx) => {
    if (values.userType === UserType.ADMIN && !values.company) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['company'],
        message: 'Campo não deve ser vazio',
      });
    }
  });

export type ReportSchema = z.infer<typeof reportSchema>;
