import { requiredValidator } from '@/utils/zod/required';
import { CompanyType } from 'src/models';
import { z } from 'zod';

export const registerCompanySchema = z.object({
  name: requiredValidator,
  cnpj: z.string().min(18, 'CNPJ inválido'),
  type: z.nativeEnum(CompanyType),
});

export type RegisterCompanySchema = z.infer<typeof registerCompanySchema>;
