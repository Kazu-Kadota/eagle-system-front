import { plateValidator } from '@/utils/zod/plate';
import { requiredValidator } from '@/utils/zod/required';
import { asStringOptional } from '@/utils/zod/utils';
import { z } from 'zod';

export const analysisVehicleSearchSchema = z.object({
  plateSearch: plateValidator,
  plateStateSearch: requiredValidator,
  companyNameSearch: asStringOptional(z.string()),
});

export type AnalysisVehicleSearchSchema = z.infer<
  typeof analysisVehicleSearchSchema
>;
