import { asStringOptional } from 'src/utils/zod';
import { z } from 'zod';

export const analysisPersonSearchSchema = z.object({
  searchDocument: z.string().min(13, 'CPF inválido'),
  companyNameSearch: asStringOptional(z.string()),
});

export type AnalysisPersonSearchSchema = z.infer<
  typeof analysisPersonSearchSchema>