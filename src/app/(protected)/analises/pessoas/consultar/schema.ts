import { asStringOptional } from '@/utils/zod/utils';
import { z } from 'zod';

export const analysisPersonSearchSchema = z.object({
  searchDocument: z.string().min(13, 'CPF inválido'),
  companyNameSearch: asStringOptional(z.string()),
});

export type AnalysisPersonSearchSchema = z.infer<
  typeof analysisPersonSearchSchema
>;
