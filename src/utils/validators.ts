import dayjs from 'dayjs'
import { z } from 'zod'
import { isCNPJ } from './cnpj'
import { isCPF } from './cpf'
import { isDocumentValid } from './document'

export const requiredValidator = z.string().min(1, 'Campo deve ser preenchido')

export const emailValidator = requiredValidator.email('Email inválido')

export const passwordValidator = requiredValidator.regex(
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
  'Senha deve conter pelo menos 8 caracteres (1 maiúsculo, 1 minúsculo e 1 caractere especial)',
)

export const plateValidator = requiredValidator.min(
  7,
  'Placa precisa ter no mínimo 7 caracteres',
)

export const documentValidator = requiredValidator.refine(
  isDocumentValid,
  'CPF/CNPJ inválido',
)

export const cpfValidator = requiredValidator.refine(isCPF, 'CPF inválido')

export const cnpjValidator = requiredValidator.refine(isCNPJ, 'CNPJ inválido')

export const dateValidator = requiredValidator.refine(
  (value) => dayjs(value, 'DD/MM/YYYY', true).isValid(),
  'Data inválida',
)

export const cnhValidator = z
  .string()
  .regex(/(?=.*\d)[A-Za-z0-9]{1,11}/, 'CNH inválida')

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

export const confirmationPasswordValidator = (
  value: Record<'password' | 'password_confirmation', string>,
  ctx: z.RefinementCtx,
) => {
  if (value.password_confirmation !== value.password) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['password_confirmation'],
      message: 'Senhas devem ser iguais',
    })
  }
}

export const asStringOptional = <T extends z.ZodTypeAny>(schema: T) =>
  schema.optional().or(z.literal('').transform(() => undefined))
