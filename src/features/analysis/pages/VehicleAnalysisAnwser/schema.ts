import { AnalysisResult } from 'src/models'
import { z } from 'zod'

export const analysisAnswerSchema = z
  .object({
    analysis_info: z.string().optional(),
    analysis_result: z.nativeEnum(AnalysisResult),
    confirmed: z.literal<boolean>(true),
  })
  .superRefine((value, ctx) => {
    if (value.analysis_result === 'REJECTED' && !value.analysis_info) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['analysis_info'],
        message: 'Campo deve ser preenchido',
      })
    }
  })

export type AnalysisAnswerSchema = z.infer<typeof analysisAnswerSchema>
