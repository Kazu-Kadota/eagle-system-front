import dayjs from 'dayjs'
import { z } from 'zod'
import { requiredValidator } from './required'

export const dateValidator = requiredValidator.refine(
  (value) => dayjs(value, 'DD/MM/YYYY', true).isValid(),
  'Data inválida',
)

export const intervalDateValidator = (
  value: Record<'start_date' | 'final_date', string>,
  ctx: z.RefinementCtx,
) => {
  const startDate = dayjs(value.start_date, 'DD/MM/YYYY', true)
  const finalDate = dayjs(value.final_date, 'DD/MM/YYYY', true)

  if (finalDate.isBefore(startDate)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['start_date'],
      message: 'Data inicial deve ser menor que a data final',
    })
  }
}
