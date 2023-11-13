import {
  asStringOptional,
  plateValidator,
  requiredValidator,
} from 'src/utils/zod'
import { z } from 'zod'

export const analysisVehicleSearchSchema = z.object({
  plateSearch: plateValidator,
  plateStateSearch: requiredValidator,
  companyNameSearch: asStringOptional(z.string()),
})

export type AnalysisVehicleSearchSchema = z.infer<
  typeof analysisVehicleSearchSchema
>
